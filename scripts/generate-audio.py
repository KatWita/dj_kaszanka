"""Generate the 10-second preview clips used by the albums player.

Everything is synthesized from scratch (no samples), so the clips are original
and free to use. Each album has its own style; each track gets its own seed,
tempo, key, chord progression and arrangement, so no two clips sound the same.

Usage (needs numpy, scipy and ffmpeg):
    python3 scripts/generate-audio.py
Writes MP3s to public/audio/<album>/<NN>-<title>.mp3
"""

import os
import re
import zlib
import subprocess
import tempfile

import numpy as np
from scipy.io import wavfile
from scipy.signal import butter, sosfilt

SR = 44100
LENGTH = 10.0
OUT_DIR = os.path.join(os.path.dirname(__file__), "..", "public", "audio")

ALBUMS = {
    "unstoppable": [
        "Under Arrest", "Boobylicious", "Devastation", "Ready for the Night",
        "Sneaky Dingdong", "Pump the Beat Up", "Clap that Booty",
        "Show Me the Beach", "Clap Your Hands",
    ],
    "unlocked": [
        "What is life", "Satisfaction", "Hit the b-Ass", "My Heart Aches",
        "Teabag in the Morning", "Sexplosion", "Underboobed",
    ],
    "outta-control": [
        "General Commander", "Contract to Kill", "Against the Dark",
        "A Dangerous Man", "Force of Execution", "Into the Sun",
        "Belly of the Beast", "Out for a Kill", "Attack Force",
        "Executive Decision", "Out of Reach",
    ],
}

# Album styles: tempo range, which layers play, and timbre settings.
STYLES = {
    "unstoppable": dict(bpm=(122, 126), bass="offbeat", stabs=True, arp=False,
                        pad=0.10, lead=False, drive=1.0, hat_open=True),
    "unlocked": dict(bpm=(118, 124), bass="rolling", stabs=False, arp=True,
                     pad=0.22, lead=False, drive=1.0, hat_open=False),
    "outta-control": dict(bpm=(128, 132), bass="drive", stabs=False, arp=False,
                          pad=0.08, lead=True, drive=3.0, hat_open=True),
}

# Chord progressions as scale degrees in natural minor (0-based).
PROGRESSIONS = [
    [0, 5, 2, 6], [0, 3, 4, 0], [5, 6, 0, 0], [0, 6, 5, 6],
    [0, 2, 5, 4], [3, 4, 0, 5], [0, 5, 3, 4], [5, 3, 0, 6],
]
MINOR = [0, 2, 3, 5, 7, 8, 10]

N = int(SR * LENGTH)
t_all = np.arange(N) / SR


def mtof(m):
    return 440.0 * 2 ** ((m - 69) / 12)


def lowpass(x, cutoff, order=2):
    return sosfilt(butter(order, min(cutoff, SR * 0.45), "low", fs=SR, output="sos"), x)


def highpass(x, cutoff, order=2):
    return sosfilt(butter(order, cutoff, "high", fs=SR, output="sos"), x)


def bandpass(x, lo, hi, order=2):
    return sosfilt(butter(order, [lo, hi], "band", fs=SR, output="sos"), x)


def saw(freq, dur, detune=0.0):
    """Band-limited sawtooth (additive), optional detune in cents."""
    t = np.arange(int(dur * SR)) / SR
    f = freq * 2 ** (detune / 1200)
    out = np.zeros_like(t)
    for k in range(1, max(2, min(40, int((SR * 0.45) / f)))):
        out += np.sin(2 * np.pi * k * f * t) / k
    return out * 0.6


def env(n, attack=0.005, decay=0.3, sustain=0.0, release=0.05):
    t = np.arange(n) / SR
    e = np.minimum(1.0, t / max(attack, 1e-4))
    d = sustain + (1 - sustain) * np.exp(-np.maximum(t - attack, 0) / max(decay, 1e-4))
    e = e * d
    r = int(release * SR)
    if 0 < r < n:
        e[-r:] *= np.linspace(1, 0, r)
    return e


def place(buf, sig, start_s, gain=1.0):
    i = int(start_s * SR)
    if i >= len(buf):
        return
    j = min(len(buf), i + len(sig))
    buf[i:j] += sig[: j - i] * gain


def kick(drive):
    n = int(0.45 * SR)
    t = np.arange(n) / SR
    f = 45 + 110 * np.exp(-t / 0.035)
    phase = 2 * np.pi * np.cumsum(f) / SR
    body = np.sin(phase) * np.exp(-t / 0.28)
    click = np.random.randn(n) * np.exp(-t / 0.002) * 0.3
    k = body + click
    return np.tanh(k * drive) / np.tanh(drive)


def clap():
    n = int(0.25 * SR)
    noise = bandpass(np.random.randn(n), 900, 3500)
    t = np.arange(n) / SR
    # three quick hits then a tail, like a hand clap
    e = sum(np.exp(-np.maximum(t - d, 0) / 0.008) * (t >= d) for d in (0, 0.011, 0.022))
    e += np.exp(-np.maximum(t - 0.03, 0) / 0.09) * (t >= 0.03) * 0.6
    return noise * e * 0.9


def hat(open_=False):
    n = int((0.22 if open_ else 0.05) * SR)
    noise = highpass(np.random.randn(n), 7000)
    return noise * env(n, 0.001, 0.07 if open_ else 0.015) * (0.35 if open_ else 0.3)


def render_track(album, index, title):
    style = STYLES[album]
    rng = np.random.default_rng(zlib.crc32(f"{album}/{title}".encode()))
    np.random.seed(int(rng.integers(0, 2**31)))

    bpm = rng.uniform(*style["bpm"])
    beat = 60 / bpm
    bar = beat * 4
    root = 45 + int(rng.integers(0, 8))  # A2..E3 area
    prog = PROGRESSIONS[int(rng.integers(0, len(PROGRESSIONS)))]
    n_bars = int(np.ceil(LENGTH / bar)) + 1

    drums = np.zeros(N)
    bass = np.zeros(N)
    music_l = np.zeros(N)
    music_r = np.zeros(N)
    duck = np.ones(N)  # sidechain envelope

    k = kick(style["drive"])
    duck_shape = 1 - 0.7 * np.exp(-np.arange(int(beat * SR)) / SR / (beat * 0.25))

    def chord_notes(deg, octave=0):
        return [root + 12 * octave + MINOR[(deg + s) % 7] + 12 * ((deg + s) // 7)
                for s in (0, 2, 4)]

    for b in range(n_bars):
        bar_start = b * bar
        deg = prog[b % len(prog)]
        notes = chord_notes(deg, 1)
        bass_note = root - 12 + MINOR[deg % 7]

        for q in range(4):
            t0 = bar_start + q * beat
            place(drums, k, t0, 1.0)
            place(duck, duck_shape - 1, t0)
            if q in (1, 3):
                place(drums, clap(), t0, 0.55)
            place(drums, hat(style["hat_open"] and q % 2 == 1), t0 + beat / 2, 1.0)
            if album == "outta-control" or rng.random() < 0.5:
                place(drums, hat(), t0 + beat / 4, 0.5)
                place(drums, hat(), t0 + 3 * beat / 4, 0.5)

            # bass
            if style["bass"] == "offbeat":
                s = lowpass(saw(mtof(bass_note), beat * 0.45), 700) * env(int(beat * 0.45 * SR), 0.003, 0.12, 0.3)
                place(bass, s, t0 + beat / 2, 0.9)
            elif style["bass"] == "rolling":
                for s16 in (1, 2, 3):
                    s = lowpass(saw(mtof(bass_note), beat * 0.22), 600) * env(int(beat * 0.22 * SR), 0.003, 0.07)
                    place(bass, s, t0 + s16 * beat / 4, 0.8)
            else:  # drive
                for s8 in (0, 1):
                    s = saw(mtof(bass_note), beat * 0.48)
                    s = np.tanh(lowpass(s, 1200) * 3) * env(len(s), 0.002, 0.15, 0.4)
                    place(bass, s, t0 + s8 * beat / 2, 0.7)

        # pad (whole bar, detuned, stereo)
        if style["pad"] > 0:
            for i, m in enumerate(notes):
                for det, side in ((-9, music_l), (9, music_r)):
                    s = lowpass(saw(mtof(m), bar), 1400) * env(int(bar * SR), 0.25, 1.5, 0.6, 0.2)
                    place(side, s, bar_start, style["pad"] / 3)

        # house stabs on the offbeats
        if style["stabs"]:
            for pos in (0.5, 1.5, 2.75, 3.5):
                if rng.random() < 0.8:
                    for m in notes + [notes[0] + 12]:
                        s = lowpass(saw(mtof(m + 12), 0.25), 2600) * env(int(0.25 * SR), 0.002, 0.09)
                        place(music_l, s, bar_start + pos * beat, 0.09)
                        place(music_r, s, bar_start + pos * beat + 0.004, 0.09)

        # arpeggio
        if style["arp"]:
            pattern = [0, 1, 2, 1, 2, 0, 2, 1] if index % 2 else [0, 2, 1, 2, 0, 1, 2, 3]
            tones = notes + [notes[0] + 12]
            for s16 in range(16):
                m = tones[pattern[s16 % len(pattern)] % len(tones)] + 12
                s = lowpass(saw(mtof(m), beat / 4), 3200) * env(int(beat / 4 * SR), 0.002, 0.08)
                place(music_l, s, bar_start + s16 * beat / 4, 0.12)
                place(music_r, s, bar_start + s16 * beat / 4, 0.08)

        # big-room lead
        if style["lead"]:
            motif = [0, 0, 2, 0, 1, 0, 2, 1]
            for s8 in range(8):
                if (s8 + index) % 3 == 2:
                    continue
                m = notes[motif[s8] % 3] + 12
                s = sum(saw(mtof(m), beat / 2 * 0.9, d) for d in (-14, 0, 14))
                s = lowpass(np.tanh(s * 1.5), 4500) * env(len(s), 0.004, 0.18, 0.2)
                place(music_l, s, bar_start + s8 * beat / 2, 0.07)
                place(music_r, s, bar_start + s8 * beat / 2 + 0.006, 0.07)

    # simple stereo delay on the music bus
    d = int(beat * 0.75 * SR)
    music_l[d:] += music_r[:-d] * 0.25
    music_r[d:] += music_l[:-d] * 0.25

    duck = np.clip(duck, 0.25, 1)
    bass *= duck
    left = drums + bass + music_l * duck
    right = drums + bass + music_r * duck
    mix = np.stack([left, right], axis=1)

    # fades + master: normalize, soft-clip, normalize to -1 dBFS
    fade_in, fade_out = int(0.02 * SR), int(1.2 * SR)
    mix[:fade_in] *= np.linspace(0, 1, fade_in)[:, None]
    mix[-fade_out:] *= np.linspace(1, 0, fade_out)[:, None] ** 1.5
    mix /= np.max(np.abs(mix)) + 1e-9
    mix = np.tanh(mix * 1.6) / np.tanh(1.6)
    mix *= 10 ** (-1 / 20) / (np.max(np.abs(mix)) + 1e-9)
    return mix


def slugify(s):
    return re.sub(r"[^a-z0-9]+", "-", s.lower()).strip("-")


def main():
    for album, titles in ALBUMS.items():
        folder = os.path.join(OUT_DIR, album)
        os.makedirs(folder, exist_ok=True)
        for i, title in enumerate(titles):
            mix = render_track(album, i, title)
            name = f"{i + 1:02d}-{slugify(title)}.mp3"
            with tempfile.NamedTemporaryFile(suffix=".wav") as tmp:
                wavfile.write(tmp.name, SR, (mix * 32767).astype(np.int16))
                subprocess.run(
                    ["ffmpeg", "-y", "-loglevel", "error", "-i", tmp.name,
                     # web-friendly loudness (-14 LUFS) with true-peak headroom
                     "-af", "loudnorm=I=-14:TP=-1.5:LRA=11", "-ar", str(SR),
                     "-codec:a", "libmp3lame", "-b:a", "96k", os.path.join(folder, name)],
                    check=True,
                )
            print(f"/audio/{album}/{name}")


if __name__ == "__main__":
    main()
