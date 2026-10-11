import { useCallback, useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { VscChromeClose } from "react-icons/vsc";

const WHEEL_THRESHOLD = 30; // px of wheel movement that counts as one "step"
const WHEEL_COOLDOWN = 450; // ms between photo changes while wheeling
const SWIPE_THRESHOLD = 50; // px of horizontal drag for a swipe

// same skewed-bars arrow as the About carousel; `className` sets the clickable area
const Arrow = ({ dir, onClick, className = "size-12" }) => (
  <button
    type="button"
    onClick={onClick}
    aria-label={dir === "next" ? "Next photo" : "Previous photo"}
    className={`group grid place-items-center focus-visible:outline-2 focus-visible:-outline-offset-2 focus-visible:outline-main-r ${className}`}
  >
    <span className="block">
      <span className={`block h-5 w-1 bg-white duration-300 group-hover:bg-main-b ${dir === "next" ? "skew-x-20" : "skew-x-[-20deg]"}`} />
      <span className={`block h-5 w-1 bg-white duration-300 group-hover:bg-main-b ${dir === "next" ? "skew-x-[-20deg]" : "skew-x-20"}`} />
    </span>
  </button>
);

const Photo = ({ photo }) => {
  const [loaded, setLoaded] = useState(false);
  const imgRef = useCallback((img) => {
    if (img?.complete && img.naturalWidth > 0) setLoaded(true);
  }, []);
  const ratio = photo.width / photo.height;

  return (
    // the box gets the photo's exact proportions, as big as fits the screen
    <div
      className="relative overflow-hidden"
      style={{ aspectRatio: `${photo.width} / ${photo.height}`, width: `min(1100px, var(--lb-max-w), calc(74vh * ${ratio}))` }}
    >
      <div
        aria-hidden="true"
        className="absolute inset-0 scale-110 bg-cover bg-center blur-xl"
        style={{ backgroundImage: `url(${photo.placeholder})` }}
      />
      {!loaded && (
        <div className="absolute inset-0 grid place-items-center" role="status">
          <span className="size-10 animate-spin rounded-full border-2 border-white/20 border-t-main-r" />
          <span className="sr-only">Loading photo…</span>
        </div>
      )}
      <img
        ref={imgRef}
        src={photo.large}
        alt={photo.alt}
        onLoad={() => setLoaded(true)}
        draggable={false}
        className={`absolute inset-0 size-full object-contain transition-opacity duration-300 select-none ${loaded ? "opacity-100" : "opacity-0"}`}
      />
    </div>
  );
};

const Lightbox = ({ photos, index, onIndexChange, onClose }) => {
  const dialogRef = useRef(null);
  const closeRef = useRef(null);
  const lastWheel = useRef(0);
  const wheelSum = useRef(0);
  const swipeStart = useRef(null);
  const [direction, setDirection] = useState(0);
  const reduceMotion = useReducedMotion();
  const photo = photos[index];

  const go = useCallback(
    (step) => {
      setDirection(step);
      onIndexChange((index + step + photos.length) % photos.length); // wraps around
    },
    [index, photos.length, onIndexChange],
  );

  // lock page scroll, move focus into the dialog, give it back on close
  useEffect(() => {
    const opener = document.activeElement;
    const html = document.documentElement;
    const prevOverflow = html.style.overflow;
    html.style.overflow = "hidden";
    closeRef.current?.focus();
    return () => {
      html.style.overflow = prevOverflow;
      opener?.focus?.();
    };
  }, []);

  // keyboard: Esc closes, arrows navigate, Tab stays inside the dialog
  useEffect(() => {
    const onKey = (e) => {
      if (e.key === "Escape") onClose();
      else if (e.key === "ArrowRight") go(1);
      else if (e.key === "ArrowLeft") go(-1);
      else if (e.key === "Tab") {
        // only buttons that are actually shown (mobile/desktop arrows are hidden by breakpoint)
        const focusable = [...(dialogRef.current?.querySelectorAll("button") ?? [])].filter(
          (el) => el.offsetParent !== null,
        );
        if (!focusable.length) return;
        const first = focusable[0];
        const last = focusable[focusable.length - 1];
        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault();
          last.focus();
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault();
          first.focus();
        }
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [go, onClose]);

  // preload the neighbours so next/previous show up instantly
  useEffect(() => {
    for (const step of [1, -1]) {
      const img = new Image();
      img.src = photos[(index + step + photos.length) % photos.length].large;
    }
  }, [index, photos]);

  // mouse wheel / trackpad: one photo per gesture, with a short cooldown
  const onWheel = (e) => {
    const now = Date.now();
    // still in the cooldown after a change: the rest of this gesture is ignored
    if (now - lastWheel.current < WHEEL_COOLDOWN) {
      wheelSum.current = 0;
      return;
    }
    wheelSum.current += Math.abs(e.deltaY) > Math.abs(e.deltaX) ? e.deltaY : e.deltaX;
    if (Math.abs(wheelSum.current) < WHEEL_THRESHOLD) return;
    lastWheel.current = now;
    go(wheelSum.current > 0 ? 1 : -1);
    wheelSum.current = 0;
  };

  // touch / pen swipe
  const onPointerDown = (e) => {
    if (e.pointerType !== "mouse") swipeStart.current = e.clientX;
  };
  const onPointerUp = (e) => {
    if (swipeStart.current === null) return;
    const dx = e.clientX - swipeStart.current;
    swipeStart.current = null;
    if (Math.abs(dx) > SWIPE_THRESHOLD) go(dx < 0 ? 1 : -1);
  };

  const offset = reduceMotion ? 0 : 60;

  return createPortal(
    <motion.div
      ref={dialogRef}
      role="dialog"
      aria-modal="true"
      aria-label="Photo viewer"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.2 }}
      onWheel={onWheel}
      onPointerDown={onPointerDown}
      onPointerUp={onPointerUp}
      onPointerCancel={() => (swipeStart.current = null)}
      className="fixed inset-0 z-[999] flex touch-pan-y flex-col items-center justify-center gap-4 bg-modal-bg px-4 text-white [--lb-max-w:calc(100vw-2rem)] md:[--lb-max-w:calc(100vw-12rem)]"
    >
      <button
        ref={closeRef}
        type="button"
        onClick={onClose}
        aria-label="Close"
        className="absolute top-5 right-5 grid size-11 place-items-center duration-300 hover:text-main-b focus-visible:outline-2 focus-visible:outline-main-r lg:top-8 lg:right-8"
      >
        <VscChromeClose size={34} />
      </button>

      {/* desktop: each arrow is a tall strip along the screen edge (pinned, so it doesn't
          move with the photo width, and easy to hit: next to / above / below the arrow works) */}
      <Arrow
        dir="prev"
        onClick={() => go(-1)}
        className="absolute inset-y-24 left-0 hidden w-24 duration-300 hover:bg-white/5 md:grid"
      />
      <Arrow
        dir="next"
        onClick={() => go(1)}
        className="absolute inset-y-24 right-0 hidden w-24 duration-300 hover:bg-white/5 md:grid"
      />

      <div className="flex items-center">
        <AnimatePresence mode="popLayout" initial={false} custom={direction}>
          <motion.div
            key={photo.name}
            custom={direction}
            initial={{ opacity: 0, x: direction * offset }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -direction * offset }}
            transition={{ duration: 0.3, ease: "easeOut" }}
          >
            <Photo photo={photo} />
          </motion.div>
        </AnimatePresence>
      </div>

      <div className="flex w-full max-w-[1100px] items-center justify-between gap-4 text-sm">
        <Arrow dir="prev" onClick={() => go(-1)} className="size-16 md:hidden" />
        <p className="flex-1 text-center font-bruno-ace text-main-r" aria-live="polite">
          {index + 1} / {photos.length}
        </p>
        <Arrow dir="next" onClick={() => go(1)} className="size-16 md:hidden" />
      </div>
    </motion.div>,
    document.body,
  );
};

export default Lightbox;
