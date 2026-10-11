import soundWave from "../assets/red-sound-wave.gif";
import { FaRegCirclePlay, FaRegCirclePause } from "react-icons/fa6";
import { usePlayer } from "../player/playerContext";

const AlbumSongs = ({ album }) => {
  const { current, isPlaying, playTrack } = usePlayer();

  return (
    <div className="text-[15px] md:text-[16px]">
      <div className="mt-14 grid grid-cols-12 border-b pb-[2px]" aria-hidden="true">
        <p className="col-start-1 col-end-3 text-center min-[33.75rem]:col-end-2 min-[33.75rem]:pl-4 min-[33.75rem]:text-left md:text-left">
          #
        </p>
        <p className="col-start-3 col-end-10 pl-2 sm:col-start-2 md:pl-4">
          Title
        </p>
        <p className="col-span-3 col-start-10 pr-2 text-right md:col-span-2 md:col-start-11 md:pr-4">
          Duration
        </p>
      </div>
      <ol className="pt-2.5" aria-label={`${album.name} tracklist`}>
        {album.music.map(({ id, title, duration }, index) => {
          const isActive = current?.album.slug === album.slug && current?.index === index;
          const isTrackPlaying = isActive && isPlaying;

          return (
            <li key={id}>
              <button
                type="button"
                onClick={() => playTrack(album, index)}
                aria-label={`${isTrackPlaying ? "Pause" : "Play"} ${title}`}
                aria-current={isActive ? "true" : undefined}
                className="group grid w-full grid-cols-12 py-3 text-left duration-300 hover:bg-albums-bg-hover focus-visible:bg-albums-bg-hover focus-visible:outline-none md:px-0.5 lg:py-1.5"
              >
                <span className="relative col-start-1 col-end-3 text-center min-[33.75rem]:col-end-2 min-[33.75rem]:pl-4 min-[33.75rem]:text-left">
                  {isTrackPlaying ? (
                    <img
                      src={soundWave}
                      alt=""
                      className="relative bottom-[-4px] left-[10px] duration-300 group-hover:opacity-0 group-focus-visible:opacity-0 min-[24.375rem]:left-[12px] min-[26.875rem]:left-[14px] min-[33.75rem]:left-[-6px] sm:left-[-2px]"
                    />
                  ) : (
                    <span
                      className={`block duration-300 group-hover:opacity-0 group-focus-visible:opacity-0 ${isActive ? "text-main-r" : ""}`}
                    >
                      {`${index + 1}.`}
                    </span>
                  )}

                  <span className="absolute -top-px left-2 opacity-0 duration-300 group-hover:opacity-100 group-focus-visible:opacity-100 min-[24.375rem]:left-2.5 min-[26.875rem]:left-[14px] min-[33.75rem]:left-[8px]">
                    {isTrackPlaying ? (
                      <FaRegCirclePause size={26} className="duration-300 hover:fill-main-r" />
                    ) : (
                      <FaRegCirclePlay size={26} className="duration-300 hover:fill-main-r" />
                    )}
                  </span>
                </span>

                <span
                  className={`col-start-3 col-end-11 pl-2 sm:col-start-2 md:pl-4 ${isActive ? "text-main-r" : ""}`}
                >
                  {title}
                </span>
                <span
                  className={`col-span-2 col-start-11 pr-2 text-right md:pr-4 ${isActive ? "text-main-r" : ""}`}
                >
                  {duration}
                </span>
              </button>
            </li>
          );
        })}
      </ol>
    </div>
  );
};
export default AlbumSongs;
