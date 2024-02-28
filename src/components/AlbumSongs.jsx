import soundWave from "../assets/red-sound-wave.gif";
import { FaRegCirclePlay, FaRegCirclePause } from "react-icons/fa6";

const AlbumSongs = ({
  albums,
  currentAlbum,
  currentAudio,
  setCurrentAudio,
  isPlaying,
  setIsPlaying,
}) => {
  return (
    <div className="text-[15px] md:text-[16px]">
      <div className="mt-14 grid grid-cols-12 border-b-[1px] pb-[2px]">
        <p className="col-start-1 col-end-3 text-center min-[540px]:col-end-2 min-[540px]:pl-4 min-[540px]:text-left md:text-left">
          #
        </p>
        <p className="col-start-3 col-end-10 pl-2 sm:col-start-2 md:pl-4">
          Title
        </p>
        <p className="col-span-3 col-start-10 pr-2 text-right md:col-span-2 md:col-start-11 md:pr-4">
          Duration
        </p>
      </div>
      <div className="pt-2.5">
        {albums[currentAlbum].music.map(({ id, title, duration }, index) => {
          return (
            <div
              key={id}
              className="group grid grid-cols-12 py-3 duration-300 hover:bg-albums-bg-hover md:px-0.5 lg:py-1.5"
              onClick={() => {
                if (isPlaying && currentAudio === id) {
                  setIsPlaying(false);
                } else {
                  setIsPlaying(false);
                  setIsPlaying(true);
                }
                setCurrentAudio(id);
              }}
            >
              <div className="relative col-start-1 col-end-3 text-center min-[540px]:col-end-2 min-[540px]:pl-4 min-[540px]:text-left">
                {isPlaying && currentAudio === id ? (
                  <img
                    src={soundWave}
                    className="relative -bottom-[4px] left-[10px] duration-300 group-hover:opacity-0 min-[390px]:left-[12px] min-[430px]:left-[14px] min-[540px]:-left-[6px] sm:-left-[2px]"
                  />
                ) : (
                  <p className={`duration-300 group-hover:opacity-0`}>
                    {`${index + 1}.`}
                  </p>
                )}

                <div className="absolute -top-[1px] left-2 opacity-0 duration-300 group-hover:opacity-100 min-[390px]:left-2.5 min-[430px]:left-[14px] min-[540px]:left-[8px]">
                  {isPlaying && id === currentAudio ? (
                    <FaRegCirclePause
                      size={26}
                      className="cursor-pointer duration-300 hover:fill-main-r"
                      onClick={() => {
                        setIsPlaying(false);
                      }}
                    />
                  ) : (
                    <FaRegCirclePlay
                      size={26}
                      className="cursor-pointer duration-300 hover:fill-main-r"
                      onClick={() => {
                        setIsPlaying(true);
                        setCurrentAudio(id);
                      }}
                    />
                  )}
                </div>
              </div>

              <p
                className={`col-start-3 col-end-11 pl-2 sm:col-start-2 md:pl-4 ${isPlaying && currentAudio === id ? "text-main-r" : null}`}
              >
                {title}
              </p>
              <p
                className={`col-span-2 col-start-11 pr-2 text-right md:pr-4 ${isPlaying && currentAudio === id ? "text-main-r" : null}`}
              >
                {duration}
              </p>
            </div>
          );
        })}
      </div>
    </div>
  );
};
export default AlbumSongs;
