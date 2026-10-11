"""Generate the three album covers (original generative art in the site's palette).

Usage (needs numpy, pillow, scipy):
    python3 scripts/generate-covers.py path/to/bruno-ace-sc.woff
The font is Bruno Ace SC (the site's heading font), e.g. from @fontsource/bruno-ace-sc.
Writes src/assets/covers/<album>.webp
"""

import math
import os
import sys

import numpy as np
from PIL import Image, ImageDraw, ImageFont
from scipy.ndimage import gaussian_filter

S = 1200  # render size, downscaled at the end for smooth edges
OUT = 640
OUT_DIR = os.path.join(os.path.dirname(__file__), "..", "src", "assets", "covers")

PINK = np.array([255, 55, 103]) / 255
PURPLE = np.array([177, 41, 211]) / 255
BLUE = np.array([91, 31, 219]) / 255
CYAN = np.array([80, 200, 255]) / 255
WHITE = np.array([1.0, 1.0, 1.0])


def mix(a, b, t):
    return a + (b - a) * t


def background(top=(10, 2, 40), bottom=(0, 0, 0)):
    y = np.linspace(0, 1, S)[:, None, None]
    img = mix(np.array(top) / 255, np.array(bottom) / 255, y) * np.ones((S, S, 3))
    return img


def glow(layer, sigmas=(2, 8, 24, 60), weights=(1.0, 0.8, 0.6, 0.45)):
    """Neon glow: sharp core + several blurred copies added together."""
    out = layer * 1.0
    for s, w in zip(sigmas, weights):
        out += gaussian_filter(layer, sigma=(s, s, 0)) * w * 1.6
    return out


def canvas():
    return Image.new("L", (S, S), 0)


def as_rgb(mask_img, color, strength=1.0):
    m = np.asarray(mask_img, dtype=np.float32)[:, :, None] / 255
    return m * color * strength


def tonemap(img):
    img = 1 - np.exp(-img * 1.4)  # soft highlight roll-off, like a camera
    return np.clip(img, 0, 1)


def noise(img, amount=0.035, seed=0):
    rng = np.random.default_rng(seed)
    return img + rng.normal(0, amount, img.shape[:2])[:, :, None]


def text_layer(font_path, title, top="DJ KASZANKA", size=118, y=980, top_y=70):
    big = ImageFont.truetype(font_path, size)
    small = ImageFont.truetype(font_path, 40)
    t = canvas()
    d = ImageDraw.Draw(t)
    w = d.textlength(title, font=big)
    if w > S - 120:  # shrink long titles to fit
        big = ImageFont.truetype(font_path, int(size * (S - 120) / w))
        w = d.textlength(title, font=big)
    d.text(((S - w) / 2, y), title, font=big, fill=255)
    tw = d.textlength(top, font=small)
    d.text(((S - tw) / 2, top_y), top, font=small, fill=255)
    return t


def finish(img, txt, name, text_color=WHITE, glow_color=PINK):
    img = img + glow(as_rgb(txt, glow_color, 0.35), sigmas=(4, 16), weights=(0.6, 0.4))
    img = tonemap(img)
    m = np.asarray(txt, dtype=np.float32)[:, :, None] / 255
    img = img * (1 - m) + text_color * m  # crisp white text on top
    img = np.clip(noise(img, seed=len(name)), 0, 1)
    out = Image.fromarray((img * 255).astype(np.uint8)).resize((OUT, OUT), Image.LANCZOS)
    os.makedirs(OUT_DIR, exist_ok=True)
    path = os.path.join(OUT_DIR, f"{name}.webp")
    out.save(path, quality=88, method=6)
    print(path)


def unstoppable(font):
    """Neon tunnel rushing toward a vanishing point."""
    img = background((18, 0, 40), (2, 0, 10))
    vx, vy = S / 2, S * 0.47
    layers = np.zeros((S, S, 3))
    n = 16
    for i in range(n):
        t = i / (n - 1)  # 0 = far, 1 = near
        scale = 0.06 + (t ** 2.2) * 1.15
        hw, hh = S * 0.42 * scale, S * 0.42 * scale
        m = canvas()
        d = ImageDraw.Draw(m)
        d.rounded_rectangle([vx - hw, vy - hh, vx + hw, vy + hh], radius=hw * 0.18,
                            outline=255, width=max(2, int(2 + 7 * t)))
        color = mix(BLUE, PINK, t) if t < 0.7 else mix(PINK, PURPLE, (t - 0.7) / 0.3)
        layers += as_rgb(m, color, 0.35 + 0.65 * t)
    # speed lines from the vanishing point
    rng = np.random.default_rng(3)
    lines = canvas()
    d = ImageDraw.Draw(lines)
    for _ in range(70):
        a = rng.uniform(0, 2 * math.pi)
        r0, r1 = rng.uniform(80, 300), rng.uniform(500, 1100)
        d.line([vx + math.cos(a) * r0, vy + math.sin(a) * r0,
                vx + math.cos(a) * r1, vy + math.sin(a) * r1], fill=int(rng.uniform(60, 160)), width=2)
    layers += as_rgb(lines, mix(PURPLE, WHITE, 0.3), 0.5)
    # bright core
    core = canvas()
    ImageDraw.Draw(core).ellipse([vx - 14, vy - 14, vx + 14, vy + 14], fill=255)
    layers += as_rgb(core, WHITE, 1.0)
    img += glow(layers)
    finish(img, text_layer(font, "UNSTOPPABLE"), "unstoppable")


def unlocked(font):
    """Circular audio waveform, like sound radiating from a speaker."""
    img = background((6, 0, 30), (0, 0, 6))
    cx, cy = S / 2, S * 0.46
    rng = np.random.default_rng(7)
    layers = np.zeros((S, S, 3))
    bins = 180
    spectrum = np.abs(np.convolve(rng.normal(0, 1, bins), np.ones(5) / 5, mode="same"))
    spectrum = spectrum / spectrum.max()
    for ring, (base, amp, color, width) in enumerate([
        (250, 130, PURPLE, 5), (215, 70, BLUE, 3), (300, 60, CYAN, 2), (190, 30, PINK, 2)
    ]):
        m = canvas()
        d = ImageDraw.Draw(m)
        pts = []
        for i in range(bins + 1):
            a = 2 * math.pi * i / bins - math.pi / 2
            v = spectrum[(i + ring * 23) % bins] * (0.6 + 0.4 * math.sin(i * 0.15 + ring))
            r = base + amp * v
            pts.append((cx + math.cos(a) * r, cy + math.sin(a) * r))
        d.line(pts, fill=255, width=width, joint="curve")
        layers += as_rgb(m, color, 0.9)
    # spectrum bars around the inner circle
    bars = canvas()
    d = ImageDraw.Draw(bars)
    for i in range(96):
        a = 2 * math.pi * i / 96
        v = spectrum[i * 2 % bins]
        r0, r1 = 150, 150 + 18 + 60 * v
        d.line([cx + math.cos(a) * r0, cy + math.sin(a) * r0,
                cx + math.cos(a) * r1, cy + math.sin(a) * r1], fill=255, width=6)
    layers += as_rgb(bars, mix(PINK, PURPLE, 0.3), 0.8)
    # floating particles
    dots = canvas()
    d = ImageDraw.Draw(dots)
    for _ in range(160):
        x, y, r = rng.uniform(0, S), rng.uniform(0, S * 0.85), rng.uniform(1, 3.5)
        d.ellipse([x - r, y - r, x + r, y + r], fill=int(rng.uniform(80, 255)))
    layers += as_rgb(dots, mix(CYAN, WHITE, 0.4), 0.6)
    img += glow(layers)
    finish(img, text_layer(font, "UNLOCKED"), "unlocked", glow_color=PURPLE)


def outta_control(font):
    """Laser show over a synthwave grid, with a glitch."""
    img = background((30, 0, 22), (4, 0, 8))
    layers = np.zeros((S, S, 3))
    horizon = S * 0.62
    # perspective grid floor
    grid = canvas()
    d = ImageDraw.Draw(grid)
    for i in range(-14, 15):
        d.line([S / 2 + i * 18, horizon, S / 2 + i * 190, S], fill=200, width=3)
    for k in range(1, 14):
        y = horizon + (S - horizon) * (k / 13) ** 2.1
        d.line([0, y, S, y], fill=int(120 + 100 * k / 13), width=3)
    layers += as_rgb(grid, PURPLE, 0.55)
    # lasers fanning out from two sources
    rng = np.random.default_rng(11)
    lasers = canvas()
    d = ImageDraw.Draw(lasers)
    for sx in (S * 0.3, S * 0.7):
        for _ in range(16):
            a = rng.uniform(-math.pi * 0.95, -math.pi * 0.05)
            d.line([sx, horizon, sx + math.cos(a) * 1600, horizon + math.sin(a) * 1600],
                   fill=int(rng.uniform(140, 255)), width=3)
    layers += as_rgb(lasers, PINK, 0.8)
    # sun-like glow at the horizon
    sun = canvas()
    ImageDraw.Draw(sun).ellipse([S / 2 - 150, horizon - 150, S / 2 + 150, horizon + 150], fill=255)
    sun_l = as_rgb(sun, mix(PINK, WHITE, 0.2), 0.5)
    sun_l[int(horizon):] = 0  # only the top half above the horizon
    layers += sun_l
    img += glow(layers)
    # glitch: shift a few horizontal slices and split RGB channels
    for _ in range(9):
        y0 = int(rng.uniform(0, S * 0.8))
        h = int(rng.uniform(6, 40))
        img[y0:y0 + h] = np.roll(img[y0:y0 + h], int(rng.uniform(-60, 60)), axis=1)
    img[:, :, 0] = np.roll(img[:, :, 0], 6, axis=1)
    img[:, :, 2] = np.roll(img[:, :, 2], -6, axis=1)
    finish(img, text_layer(font, "OUTTA CONTROL"), "outta-control")


if __name__ == "__main__":
    if len(sys.argv) < 2:
        sys.exit(__doc__)
    font_path = sys.argv[1]
    unstoppable(font_path)
    unlocked(font_path)
    outta_control(font_path)
