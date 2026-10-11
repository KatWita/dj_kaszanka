// Animated equalizer bars (CSS animation, see .eq in index.css).
// Thin, dense, sharp-edged bars in one solid colour, matching the nav's sound-wave GIF.
// Bars freeze when playback is paused and stay static for reduced-motion users.

// fixed pseudo-random timings so every bar moves differently (but the same on every render)
const DURATIONS = [0.9, 0.62, 1.1, 0.75, 0.55, 0.95, 0.68, 1.05, 0.8, 0.6, 0.98, 0.72, 0.85];
const STATIC_HEIGHTS = [0.4, 0.7, 0.55, 0.9, 0.65, 1, 0.75, 0.85, 0.5, 0.8, 0.6, 0.45, 0.3];

const Equalizer = ({ size = 26, bars = 13, playing = true, className = "" }) => (
  <span
    aria-hidden="true"
    className={`eq ${className}`}
    data-playing={playing}
    style={{ width: size, height: size }}
  >
    {Array.from({ length: bars }, (_, i) => (
      <span
        key={i}
        className="eq-bar"
        style={{
          animationDuration: `${DURATIONS[i % DURATIONS.length]}s`,
          animationDelay: `-${(i * 0.37) % 1}s`,
          "--h": STATIC_HEIGHTS[i % STATIC_HEIGHTS.length],
        }}
      />
    ))}
  </span>
);

export default Equalizer;
