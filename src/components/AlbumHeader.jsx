import MusicSitesIcons from "./MusicSitesIcons";
import { FaRegCirclePlay, FaRegCirclePause } from "react-icons/fa6";
import { formatTime, usePlayer } from "../player/playerContext";
import Visualizer from "../player/Visualizer";

const toSeconds = (d) => {
  const [m, s] = d.split(":").map(Number);
  return m * 60 + s;
};

const AlbumHeader = ({ album }) => {
  const { current, isPlaying, playTrack, toggle } = usePlayer();
  const isThisAlbum = current?.album.slug === album.slug;
  const isThisAlbumPlaying = isThisAlbum && isPlaying;
  const totalTime = album.music.reduce((sum, t) => sum + toSeconds(t.duration), 0);

  return (
    <div className="flex flex-col items-start justify-between gap-8 md:flex-row md:items-center lg:gap-0">
      <div className="flex shrink-0 items-center justify-between gap-12 max-[466px]:gap-7">
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
          <p className="mt-1 font-encode-sans text-xs text-white/60">
            {album.music.length} tracks · {formatTime(totalTime)}
          </p>
        </div>
      </div>
      <div className="flex w-full items-center justify-between gap-6 md:w-auto md:flex-1 md:justify-end md:gap-8 md:pl-8 xl:gap-12">
        <button
          type="button"
          // continue this album if it's loaded, otherwise start it from track 1
          onClick={() => (isThisAlbum ? toggle() : playTrack(album, 0))}
          aria-label={isThisAlbumPlaying ? `Pause ${album.name}` : `Play ${album.name}`}
          className="shrink-0 rounded-full duration-300 hover:text-main-r focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-main-r"
        >
          {isThisAlbumPlaying ? (
            <FaRegCirclePause size={60} />
          ) : (
            <FaRegCirclePlay size={60} />
          )}
        </button>
        <Visualizer
          active={isThisAlbum}
          bars={24}
          className="hidden h-12 min-w-0 flex-1 sm:block md:max-w-48"
        />
        <MusicSitesIcons />
      </div>
    </div>
  );
};
export default AlbumHeader;
