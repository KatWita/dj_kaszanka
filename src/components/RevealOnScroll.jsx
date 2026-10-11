import { useEffect, useLayoutEffect, useRef, useState } from "react";

/**
 * Fades + slides its content in when scrolled into view.
 * Anything already on screen when the page opens is shown right away
 * (it arrives with the page transition, so no second animation).
 */
const RevealOnScroll = ({ children, delay = 0, className = "" }) => {
  const ref = useRef(null);
  const [hidden, setHidden] = useState(false);

  // before the first paint: hide only what starts below the fold
  useLayoutEffect(() => {
    const el = ref.current;
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (!el || reduceMotion || !("IntersectionObserver" in window)) return;
    if (el.getBoundingClientRect().top > window.innerHeight) setHidden(true);
  }, []);

  useEffect(() => {
    const el = ref.current;
    if (!el || !hidden) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setHidden(false);
          observer.disconnect();
        }
      },
      { rootMargin: "0px 0px -10% 0px" },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [hidden]);

  return (
    <div
      ref={ref}
      className={`transition duration-700 ease-out ${hidden ? "translate-y-8 opacity-0" : "translate-y-0 opacity-100"} ${className}`}
      style={{ transitionDelay: hidden ? "0ms" : `${delay}ms` }}
    >
      {children}
    </div>
  );
};

export default RevealOnScroll;
