import { useEffect, useRef } from "react";
import { animate, useInView, useReducedMotion } from "motion/react";

/**
 * Counts from 0 to `value` the first time it scrolls into view.
 * Digits in the site font have different widths, so intermediate values can be
 * wider than the final one. Invisible placeholders ("000", "111" … "999" for a
 * 3-digit value) reserve the widest possible width, so nothing around it moves.
 */
const PLACEHOLDER_DIGITS = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9"];

const CountUp = ({ value, duration = 2, delay = 0, className = "" }) => {
  const ref = useRef(null);
  // start only once the numbers are clearly on screen (not just peeking in at the bottom edge)
  const inView = useInView(ref, { once: true, amount: "all", margin: "0px 0px -20% 0px" });
  const reduceMotion = useReducedMotion();

  useEffect(() => {
    const el = ref.current;
    if (!inView || !el) return;
    if (reduceMotion) {
      el.textContent = String(value);
      return;
    }
    // update the DOM directly: no React re-render on every animation frame
    const controls = animate(0, value, {
      duration,
      delay,
      ease: [0.16, 1, 0.3, 1], // fast start, soft landing
      onUpdate: (v) => {
        el.textContent = String(Math.round(v));
      },
    });
    return () => controls.stop();
  }, [inView, reduceMotion, value, duration, delay]);

  return (
    <span className={`inline-grid ${className}`}>
      {PLACEHOLDER_DIGITS.map((d) => (
        <span key={d} className="invisible col-start-1 row-start-1" aria-hidden="true">
          {d.repeat(String(value).length)}
        </span>
      ))}
      <span ref={ref} className="col-start-1 row-start-1" aria-hidden="true">
        0
      </span>
      <span className="sr-only">{value}</span>
    </span>
  );
};

export default CountUp;
