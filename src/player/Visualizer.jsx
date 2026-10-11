import { useEffect, useRef } from "react";
import { usePlayer } from "./playerContext";

const BAR_COLOR = "#B129D3"; // same solid purple as the equalizers

/**
 * Live spectrum bars drawn from the Web Audio analyser.
 * `active` = whether this instance should react (e.g. only for the album that's playing).
 */
const Visualizer = ({ active = true, bars = 32, className = "" }) => {
  const canvasRef = useRef(null);
  const { analyserRef, isPlaying } = usePlayer();

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext("2d");
    if (!ctx) return;
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const levels = new Float32Array(bars);
    let data = null;
    let raf = 0;

    const draw = () => {
      raf = 0;
      const analyser = analyserRef.current;
      const live = active && isPlaying && analyser && !reduceMotion;
      if (live) {
        data ??= new Uint8Array(analyser.frequencyBinCount);
        analyser.getByteFrequencyData(data);
      }
      const { width: w, height: h } = canvas;
      ctx.clearRect(0, 0, w, h);
      ctx.fillStyle = BAR_COLOR;

      const slot = w / bars;
      const barW = Math.max(1, slot * 0.5); // thin bars with sharp ends, like the rest of the site
      let settled = true;
      for (let i = 0; i < bars; i++) {
        // more bars for bass/mids, where most of the energy in EDM is
        const bin = data ? Math.floor(Math.pow(i / bars, 1.5) * data.length * 0.75) : 0;
        const target = live ? data[bin] / 255 : 0;
        levels[i] += (target - levels[i]) * (live ? 0.5 : 0.12);
        if (levels[i] > 0.01) settled = false;
        const barH = Math.max(h * 0.08, levels[i] * h);
        ctx.fillRect(i * slot + (slot - barW) / 2, h - barH, barW, barH);
      }
      if (live || !settled) raf = requestAnimationFrame(draw);
    };

    const resize = () => {
      const dpr = window.devicePixelRatio || 1;
      const rect = canvas.getBoundingClientRect();
      canvas.width = Math.max(1, Math.round(rect.width * dpr));
      canvas.height = Math.max(1, Math.round(rect.height * dpr));
      if (!raf) draw();
    };
    const observer = new ResizeObserver(resize);
    observer.observe(canvas);
    resize();

    return () => {
      cancelAnimationFrame(raf);
      observer.disconnect();
    };
  }, [active, isPlaying, analyserRef, bars]);

  return <canvas ref={canvasRef} aria-hidden="true" className={className} />;
};

export default Visualizer;
