import MusicSitesIcons from "./MusicSitesIcons";
import { FaRegCirclePlay, FaRegCirclePause } from "react-icons/fa6";

const AlbumHeader = ({
  albums,
  currentAlbum,
  isPlaying,
  setIsPlaying,
  currentAudio,
}) => {
  return (
    <div className="flex flex-col items-start justify-between gap-8 md:flex-row md:items-center lg:gap-0">
      <div className="flex items-center justify-between gap-12 max-[466px]:gap-7">
        <img
          src={albums[currentAlbum].cover}
          alt={`${albums[currentAlbum].name} album cover`}
          className="block w-[100px] border-[1px] max-[380px]:w-[80px]"
        />
        <div className="font-bruno-ace">
          <p className="mb-4 font-encode-sans text-sm font-medium uppercase">
            Album
          </p>
          <p className="text-[1.25rem] uppercase max-[466px]:text-[1rem] max-[380px]:text-[.8rem]">
            {albums[currentAlbum].name}
          </p>
          <p className="text-main-r max-[466px]:text-[.9rem]">
            {albums[currentAlbum].year}
          </p>
        </div>
      </div>
      <div
        className="flex w-full justify-between md:w-auto md:gap-8
  min-[820px]:gap-16 lg:gap-20 xl:gap-32 2xl:gap-44"
      >
        <div>
          {isPlaying ? (
            <FaRegCirclePause
              size={60}
              className="cursor-pointer duration-300 hover:fill-main-r"
              onClick={() => {
                setIsPlaying((prev) => !prev);
              }}
            />
          ) : (
            <FaRegCirclePlay
              size={60}
              className="cursor-pointer duration-300 hover:fill-main-r"
              onClick={() => {
                setIsPlaying((prev) => !prev);
                console.log(currentAudio);
              }}
            />
          )}
        </div>
        <MusicSitesIcons />
      </div>
    </div>
  );
};
export default AlbumHeader;
