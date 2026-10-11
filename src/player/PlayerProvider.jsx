import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { PlayerContext } from "./playerContext";

/**
 * One audio element for the whole site (like Spotify: only one thing plays at a time).
 * `isPlaying` mirrors the real <audio> play/pause events, so the UI can never
 * disagree with what you actually hear.
 */
const PlayerProvider = ({ children }) => {
  const audioRef = useRef(null);
  const [current, setCurrent] = useState(null); // { album, index }
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);

  const load = useCallback((album, index) => {
    const audio = audioRef.current;
    if (!audio) return;
    audio.src = album.music[index].src;
    setCurrent({ album, index });
    setCurrentTime(0);
    setDuration(0);
    // play() rejects when interrupted by a quick track switch; that's fine
    audio.play().catch(() => {});
  }, []);

  const toggle = useCallback(() => {
    const audio = audioRef.current;
    if (!audio || !audio.currentSrc) return;
    if (audio.paused) audio.play().catch(() => {});
    else audio.pause();
  }, []);

  const playTrack = useCallback(
    (album, index) => {
      const isSameTrack =
        current?.album.slug === album.slug && current?.index === index;
      if (isSameTrack) toggle();
      else load(album, index);
    },
    [current, load, toggle],
  );

  const next = useCallback(() => {
    const audio = audioRef.current;
    if (!current || !audio) return;
    if (current.index + 1 < current.album.music.length) {
      load(current.album, current.index + 1);
    } else {
      // end of the album: stop and rewind
      audio.pause();
      audio.currentTime = 0;
    }
  }, [current, load]);

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

  const seek = useCallback((time) => {
    const audio = audioRef.current;
    if (!audio || !audio.currentSrc) return;
    audio.currentTime = time;
    setCurrentTime(time);
  }, []);

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
      play: () => audioRef.current?.play().catch(() => {}),
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
  }, [current, next, prev]);

  const value = useMemo(
    () => ({
      current,
      currentTrack: current ? current.album.music[current.index] : null,
      isPlaying,
      currentTime,
      duration,
      playTrack,
      toggle,
      next,
      prev,
      seek,
    }),
    [current, isPlaying, currentTime, duration, playTrack, toggle, next, prev, seek],
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
        onEnded={next}
      />
    </PlayerContext>
  );
};

export default PlayerProvider;
