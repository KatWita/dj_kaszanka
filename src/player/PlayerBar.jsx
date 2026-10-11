import { AnimatePresence, motion } from "motion/react";
import {
  FaBackwardStep,
  FaForwardStep,
  FaPause,
  FaPlay,
  FaRepeat,
  FaShuffle,
  FaVolumeHigh,
  FaVolumeLow,
  FaVolumeXmark,
  FaXmark,
} from "react-icons/fa6";
import { formatTime, usePlayer } from "./playerContext";
import Visualizer from "./Visualizer";

const iconBtn =
  "relative grid size-9 shrink-0 place-items-center rounded-full text-white/80 duration-300 hover:text-main-r focus-visible:outline-2 focus-visible:outline-main-r";
const activeDot =
  "after:absolute after:bottom-0.5 after:left-1/2 after:size-1 after:-translate-x-1/2 after:rounded-full after:bg-main-r";

const PlayButton = ({ isPlaying, onClick, size = "size-10" }) => (
  <button
    type="button"
    onClick={onClick}
    aria-label={isPlaying ? "Pause" : "Play"}
    className={`grid ${size} shrink-0 place-items-center rounded-full bg-white text-[#07031a] duration-300 hover:scale-105 hover:bg-main-r hover:text-white focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-main-r`}
  >
    {isPlaying ? <FaPause size={15} /> : <FaPlay size={15} className="translate-x-px" />}
  </button>
);

const SeekBar = ({ currentTime, duration, seek, className = "" }) => {
  const pct = duration ? (Math.min(currentTime, duration) / duration) * 100 : 0;
  return (
    <input
      type="range"
      aria-label="Seek"
      min={0}
      max={duration || 0}
      step={0.1}
      value={Math.min(currentTime, duration || 0)}
      onChange={(e) => seek(Number(e.target.value))}
      className={`range ${className}`}
      style={{ "--p": `${pct}%` }}
    />
  );
};

const PlayerBar = () => {
  const p = usePlayer();
  const { current, currentTrack, isPlaying, currentTime, duration, volume, muted, shuffle, repeat } = p;
  const VolumeIcon = muted || volume === 0 ? FaVolumeXmark : volume < 0.5 ? FaVolumeLow : FaVolumeHigh;
  const shownVolume = muted ? 0 : volume;

  return (
    <AnimatePresence>
      {current && (
        <motion.aside
          aria-label="Music player"
          initial={{ y: "100%" }}
          animate={{ y: 0 }}
          exit={{ y: "100%" }}
          transition={{ type: "spring", stiffness: 260, damping: 30 }}
          className="fixed inset-x-0 bottom-0 z-45 border-t border-main-b-h bg-[#07031a]/95 text-white shadow-[0_-10px_40px_rgba(91,31,219,0.25)] backdrop-blur-md"
        >
          {/* phones: progress line on top */}
          <SeekBar {...p} className="absolute inset-x-0 -top-px block w-full rounded-none md:hidden" />

          <div className="px-page grid grid-cols-[minmax(0,1fr)_auto] items-center gap-3 py-2.5 md:grid-cols-[minmax(0,1fr)_minmax(0,34rem)_minmax(0,1fr)] md:gap-6 md:py-3">
            {/* now playing */}
            <div className="flex min-w-0 items-center gap-3">
              <img
                src={current.album.cover}
                alt=""
                className="size-11 shrink-0 border border-white/20 md:size-14"
              />
              <div className="min-w-0">
                <p className="truncate text-sm font-medium" title={currentTrack.title}>
                  {currentTrack.title}
                </p>
                <p className="truncate text-xs text-main-r">
                  {current.album.name}
                  <span className="text-white/50 md:hidden">
                    {" "}
                    · {formatTime(currentTime)} / {formatTime(duration)}
                  </span>
                </p>
              </div>
            </div>

            {/* phones: compact controls */}
            <div className="flex items-center gap-1 md:hidden">
              <PlayButton isPlaying={isPlaying} onClick={p.toggle} size="size-9" />
              <button type="button" onClick={p.next} aria-label="Next track" className={iconBtn}>
                <FaForwardStep size={16} />
              </button>
              <button type="button" onClick={p.stop} aria-label="Close player" className={iconBtn}>
                <FaXmark size={16} />
              </button>
            </div>

            {/* desktop: transport + progress */}
            <div className="hidden flex-col items-center gap-1.5 md:flex">
              <div className="flex items-center gap-3">
                <button
                  type="button"
                  onClick={p.toggleShuffle}
                  aria-label="Shuffle"
                  aria-pressed={shuffle}
                  title="Shuffle"
                  className={`${iconBtn} ${shuffle ? `text-main-r! ${activeDot}` : ""}`}
                >
                  <FaShuffle size={15} />
                </button>
                <button type="button" onClick={p.prev} aria-label="Previous track" className={iconBtn}>
                  <FaBackwardStep size={17} />
                </button>
                <PlayButton isPlaying={isPlaying} onClick={p.toggle} />
                <button type="button" onClick={p.next} aria-label="Next track" className={iconBtn}>
                  <FaForwardStep size={17} />
                </button>
                <button
                  type="button"
                  onClick={p.cycleRepeat}
                  aria-label={`Repeat: ${repeat}`}
                  title={`Repeat: ${repeat}`}
                  className={`${iconBtn} ${repeat !== "off" ? `text-main-r! ${activeDot}` : ""}`}
                >
                  <FaRepeat size={15} />
                  {repeat === "one" && (
                    <span className="absolute top-0.5 right-0.5 grid size-3.5 place-items-center rounded-full bg-main-r text-[9px] leading-none font-bold text-white">
                      1
                    </span>
                  )}
                </button>
              </div>
              <div className="flex w-full items-center gap-3 text-xs text-white/60 tabular-nums">
                <span className="w-9 text-right">{formatTime(currentTime)}</span>
                <SeekBar {...p} className="flex-1" />
                <span className="w-9">{formatTime(duration)}</span>
              </div>
            </div>

            {/* desktop: visualizer, volume, close */}
            <div className="hidden items-center justify-end gap-2 md:flex">
              <Visualizer className="mr-2 hidden h-8 w-28 lg:block" bars={36} />
              <button
                type="button"
                onClick={p.toggleMute}
                aria-label={muted ? "Unmute" : "Mute"}
                className={iconBtn}
              >
                <VolumeIcon size={16} />
              </button>
              <input
                type="range"
                aria-label="Volume"
                min={0}
                max={1}
                step={0.01}
                value={shownVolume}
                onChange={(e) => p.setVolume(Number(e.target.value))}
                className="range w-20 lg:w-24"
                style={{ "--p": `${shownVolume * 100}%` }}
              />
              <span className="mx-2 h-6 w-px bg-white/15" aria-hidden="true" />
              <button
                type="button"
                onClick={p.stop}
                aria-label="Close player"
                title="Stop and close"
                className={iconBtn}
              >
                <FaXmark size={16} />
              </button>
            </div>
          </div>
        </motion.aside>
      )}
    </AnimatePresence>
  );
};

export default PlayerBar;
