import { AnimatePresence, motion } from "motion/react";
import { FaBackwardStep, FaForwardStep, FaPause, FaPlay, FaXmark } from "react-icons/fa6";
import { formatTime, usePlayer } from "./playerContext";

const iconBtn =
  "grid size-9 place-items-center rounded-full duration-300 hover:text-main-r focus-visible:outline-2 focus-visible:outline-main-r";

const MiniPlayer = () => {
  const { current, currentTrack, isPlaying, currentTime, duration, toggle, next, prev, seek, stop } =
    usePlayer();

  return (
    <AnimatePresence>
      {current && (
        <motion.aside
          aria-label="Music player"
          initial={{ y: 120, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 120, opacity: 0 }}
          transition={{ type: "spring", stiffness: 260, damping: 26 }}
          className="fixed inset-x-3 bottom-3 z-45 border border-main-b-h bg-input-bg text-white shadow-[0_0_30px_rgba(91,31,219,0.35)] backdrop-blur-md sm:inset-x-auto sm:right-6 sm:bottom-6 sm:w-[360px]"
        >
          <div className="flex items-center gap-3 p-3">
            <img
              src={current.album.cover}
              alt=""
              className="size-12 shrink-0 border border-white/30"
            />
            <div className="min-w-0 flex-1">
              <p className="truncate text-sm font-medium" title={currentTrack.title}>
                {currentTrack.title}
              </p>
              <p className="truncate text-xs text-main-r">
                {current.album.name} · {formatTime(currentTime)} / {formatTime(duration)}
              </p>
            </div>
            <div className="flex shrink-0 items-center">
              <button type="button" onClick={prev} aria-label="Previous track" className={iconBtn}>
                <FaBackwardStep size={16} />
              </button>
              <button
                type="button"
                onClick={toggle}
                aria-label={isPlaying ? "Pause" : "Play"}
                className={`${iconBtn} bg-white/10`}
              >
                {isPlaying ? <FaPause size={14} /> : <FaPlay size={14} className="translate-x-px" />}
              </button>
              <button type="button" onClick={next} aria-label="Next track" className={iconBtn}>
                <FaForwardStep size={16} />
              </button>
              <span className="mx-1 h-6 w-px bg-white/20" aria-hidden="true" />
              <button
                type="button"
                onClick={stop}
                aria-label="Close player"
                title="Stop and close"
                className={`${iconBtn} text-white/70`}
              >
                <FaXmark size={16} />
              </button>
            </div>
          </div>
          <input
            type="range"
            aria-label="Seek"
            min={0}
            max={duration || 0}
            step={0.1}
            value={Math.min(currentTime, duration || 0)}
            onChange={(e) => seek(Number(e.target.value))}
            className="block h-1 w-full cursor-pointer accent-main-r"
          />
        </motion.aside>
      )}
    </AnimatePresence>
  );
};

export default MiniPlayer;
