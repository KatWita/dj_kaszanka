import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { PlayerContext } from "./playerContext";
import { albums } from "../utils/data";

const STORAGE_KEY = "kaszanka-player";
const REPEAT_MODES = ["off", "all", "one"];

const loadSettings = () => {
  try {
    return JSON.parse(localStorage.getItem(STORAGE_KEY)) ?? {};
  } catch {
    return {};
  }
};

const isTypingTarget = (el) =>
  el instanceof HTMLElement &&
  (el.isContentEditable ||
    ["INPUT", "TEXTAREA", "SELECT", "BUTTON", "A"].includes(el.tagName));

/**
 * One audio element for the whole site (like Spotify: only one thing plays at a time).
 * `isPlaying` mirrors the real <audio> play/pause events, so the UI can never
 * disagree with what you actually hear.
 */
const PlayerProvider = ({ children }) => {
  const audioRef = useRef(null);
  const analyserRef = useRef(null); // Web Audio analyser for the visualizers
  const [current, setCurrent] = useState(null); // { album, index }
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [settings] = useState(loadSettings);
  const [volume, setVolumeState] = useState(settings.volume ?? 0.8);
  const [muted, setMuted] = useState(settings.muted ?? false);
  const [shuffle, setShuffle] = useState(settings.shuffle ?? false);
  const [repeat, setRepeat] = useState(settings.repeat ?? "off");

  // remember the listener's preferences between visits
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify({ volume, muted, shuffle, repeat }));
    } catch {
      /* storage unavailable (private mode etc.) */
    }
  }, [volume, muted, shuffle, repeat]);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;
    audio.volume = volume;
    audio.muted = muted;
  }, [volume, muted]);

  // The analyser can only be created after a user gesture (browser autoplay rules),
  // so it is set up lazily on the first play.
  const ensureAnalyser = useCallback(() => {
    const audio = audioRef.current;
    if (analyserRef.current || !audio) {
      analyserRef.current?.context.resume?.();
      return;
    }
    const Ctx = window.AudioContext || window.webkitAudioContext;
    if (!Ctx) return;
    try {
      const ctx = new Ctx();
      const source = ctx.createMediaElementSource(audio);
      const analyser = ctx.createAnalyser();
      analyser.fftSize = 256;
      analyser.smoothingTimeConstant = 0.8;
      source.connect(analyser);
      analyser.connect(ctx.destination);
      analyserRef.current = analyser;
    } catch {
      /* visualizer is a nice-to-have; playback works without it */
    }
  }, []);

  const play = useCallback(() => {
    ensureAnalyser();
    // play() rejects when interrupted by a quick track switch; that's fine
    audioRef.current?.play().catch(() => {});
  }, [ensureAnalyser]);

  const load = useCallback(
    (album, index) => {
      const audio = audioRef.current;
      if (!audio) return;
      audio.src = album.music[index].src;
      setCurrent({ album, index });
      setCurrentTime(0);
      setDuration(0);
      play();
    },
    [play],
  );

  const toggle = useCallback(() => {
    const audio = audioRef.current;
    if (!audio || !audio.getAttribute("src")) return;
    if (audio.paused) play();
    else audio.pause();
  }, [play]);

  const playTrack = useCallback(
    (album, index) => {
      const isSameTrack = current?.album.slug === album.slug && current?.index === index;
      if (isSameTrack) toggle();
      else load(album, index);
    },
    [current, load, toggle],
  );

  const pickNextIndex = useCallback(() => {
    const total = current.album.music.length;
    if (shuffle && total > 1) {
      let i = current.index;
      while (i === current.index) i = Math.floor(Math.random() * total);
      return i;
    }
    return current.index + 1 < total ? current.index + 1 : null;
  }, [current, shuffle]);

  const next = useCallback(() => {
    const audio = audioRef.current;
    if (!current || !audio) return;
    const i = pickNextIndex();
    if (i !== null) return load(current.album, i);
    if (repeat === "all") return load(current.album, 0);
    // end of the album: carry on with the next album (like Spotify's autoplay)
    const nextAlbum = albums[albums.findIndex((a) => a.slug === current.album.slug) + 1];
    if (nextAlbum) return load(nextAlbum, 0);
    // end of the last album: stop and rewind
    audio.pause();
    audio.currentTime = 0;
  }, [current, load, pickNextIndex, repeat]);

  const handleEnded = useCallback(() => {
    if (repeat === "one") {
      audioRef.current.currentTime = 0;
      play();
    } else next();
  }, [repeat, next, play]);

  const prev = useCallback(() => {
    const audio = audioRef.current;
    if (!current || !audio) return;
    // like most players: restart the track unless we're right at its start
    if (audio.currentTime > 3 || current.index === 0) {
      audio.currentTime = 0;
    } else {
      load(current.album, current.index - 1);
    }
  }, [current, load]);

  // Stop the music completely and hide the player bar
  const stop = useCallback(() => {
    const audio = audioRef.current;
    if (audio) {
      audio.pause();
      audio.removeAttribute("src");
      audio.load();
    }
    setCurrent(null);
    setCurrentTime(0);
    setDuration(0);
    if ("mediaSession" in navigator) navigator.mediaSession.metadata = null;
  }, []);

  const seek = useCallback((time) => {
    const audio = audioRef.current;
    if (!audio || !audio.getAttribute("src")) return;
    audio.currentTime = time;
    setCurrentTime(time);
  }, []);

  const setVolume = useCallback((v) => {
    setVolumeState(v);
    if (v > 0) setMuted(false);
  }, []);

  const toggleMute = useCallback(() => setMuted((m) => !m), []);
  const toggleShuffle = useCallback(() => setShuffle((s) => !s), []);
  const cycleRepeat = useCallback(
    () => setRepeat((r) => REPEAT_MODES[(REPEAT_MODES.indexOf(r) + 1) % REPEAT_MODES.length]),
    [],
  );

  // Space = play/pause anywhere on the page (except while typing or on a focused control)
  useEffect(() => {
    const onKey = (e) => {
      if (e.code !== "Space" || !current || isTypingTarget(e.target)) return;
      e.preventDefault();
      toggle();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [current, toggle]);

  // Lock-screen / media-key controls
  useEffect(() => {
    if (!current || !("mediaSession" in navigator)) return;
    const { album, index } = current;
    if (typeof window.MediaMetadata === "function") {
      navigator.mediaSession.metadata = new window.MediaMetadata({
        title: album.music[index].title,
        artist: "DJ Kaszanka",
        album: album.name,
        artwork: [{ src: new URL(album.cover, window.location.href).href }],
      });
    }
    const handlers = {
      play,
      pause: () => audioRef.current?.pause(),
      nexttrack: next,
      previoustrack: prev,
    };
    for (const [action, handler] of Object.entries(handlers)) {
      try {
        navigator.mediaSession.setActionHandler(action, handler);
      } catch {
        /* action not supported in this browser */
      }
    }
  }, [current, next, prev, play]);

  const value = useMemo(
    () => ({
      current,
      currentTrack: current ? current.album.music[current.index] : null,
      isPlaying,
      currentTime,
      duration,
      volume,
      muted,
      shuffle,
      repeat,
      analyserRef,
      playTrack,
      toggle,
      next,
      prev,
      seek,
      stop,
      setVolume,
      toggleMute,
      toggleShuffle,
      cycleRepeat,
    }),
    [
      current, isPlaying, currentTime, duration, volume, muted, shuffle, repeat,
      playTrack, toggle, next, prev, seek, stop, setVolume, toggleMute, toggleShuffle, cycleRepeat,
    ],
  );

  return (
    <PlayerContext value={value}>
      {children}
      <audio
        ref={audioRef}
        preload="none"
        onPlay={() => setIsPlaying(true)}
        onPause={() => setIsPlaying(false)}
        onTimeUpdate={(e) => setCurrentTime(e.currentTarget.currentTime)}
        onDurationChange={(e) => setDuration(e.currentTarget.duration)}
        onEnded={handleEnded}
      />
    </PlayerContext>
  );
};

export default PlayerProvider;
