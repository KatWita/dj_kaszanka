// Animated equalizer bars (pure CSS, see .eq in index.css).
// Bars freeze when playback is paused and stay static for reduced-motion users.
const Equalizer = ({ size = 26, playing = true, className = "" }) => (
  <span
    aria-hidden="true"
    className={`eq ${className}`}
    data-playing={playing}
    style={{ width: size, height: size }}
  >
    <span className="eq-bar" />
    <span className="eq-bar" />
    <span className="eq-bar" />
    <span className="eq-bar" />
  </span>
);

export default Equalizer;
