import { useEffect, useRef } from "react";
import { animate, useInView, useReducedMotion } from "motion/react";

/**
 * Counts from 0 to `value` the first time it scrolls into view.
 * The final number is rendered invisibly underneath to reserve its width,
 * so neighbouring columns don't shift while the digits grow.
 */
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
      <span className="invisible col-start-1 row-start-1" aria-hidden="true">
        {value}
      </span>
      <span ref={ref} className="col-start-1 row-start-1" aria-hidden="true">
        0
      </span>
      <span className="sr-only">{value}</span>
    </span>
  );
};

export default CountUp;
