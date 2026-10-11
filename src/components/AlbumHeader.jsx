import MusicSitesIcons from "./MusicSitesIcons";
import { FaRegCirclePlay, FaRegCirclePause } from "react-icons/fa6";
import { usePlayer } from "../player/playerContext";

const AlbumHeader = ({ album }) => {
  const { current, isPlaying, playTrack, toggle } = usePlayer();
  const isThisAlbum = current?.album.slug === album.slug;
  const isThisAlbumPlaying = isThisAlbum && isPlaying;

  return (
    <div className="flex flex-col items-start justify-between gap-8 md:flex-row md:items-center lg:gap-0">
      <div className="flex items-center justify-between gap-12 max-[466px]:gap-7">
        <img
          src={album.cover}
          alt={`${album.name} album cover`}
          className="block w-[100px] border max-[380px]:w-[80px]"
        />
        <div className="font-bruno-ace">
          <p className="mb-4 font-encode-sans text-sm font-medium uppercase">
            Album
          </p>
          <p className="text-[1.25rem] uppercase max-[466px]:text-[1rem] max-[380px]:text-[.8rem]">
            {album.name}
          </p>
          <p className="text-main-r max-[466px]:text-[.9rem]">{album.year}</p>
        </div>
      </div>
      <div className="flex w-full justify-between md:w-auto md:gap-8 min-[820px]:gap-16 lg:gap-20 xl:gap-32 2xl:gap-44">
        <button
          type="button"
          // continue this album if it's loaded, otherwise start it from track 1
          onClick={() => (isThisAlbum ? toggle() : playTrack(album, 0))}
          aria-label={isThisAlbumPlaying ? `Pause ${album.name}` : `Play ${album.name}`}
          className="rounded-full duration-300 hover:text-main-r focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-main-r"
        >
          {isThisAlbumPlaying ? (
            <FaRegCirclePause size={60} />
          ) : (
            <FaRegCirclePlay size={60} />
          )}
        </button>
        <MusicSitesIcons />
      </div>
    </div>
  );
};
export default AlbumHeader;
