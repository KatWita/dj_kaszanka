import triangle from "../assets/triangle-contact.svg";
import { usePlayer } from "../player/playerContext";
import Equalizer from "../player/Equalizer";

const AlbumsCovers = ({ albums, setCurrentAlbum, currentAlbum }) => {
  const { current, isPlaying } = usePlayer();

  return (
    <div className="flex flex-col items-center">
      <h3 className="relative mb-5">
        <img
          src={triangle}
          alt=""
          className="absolute -top-4 -left-8 z-[-1] w-10 lg:-top-4 xl:-top-8 xl:-left-12 xl:w-14"
        />
        Choose <span className="text-main-r">album</span>:
      </h3>
      <div className="flex gap-5 lg:flex-col">
        {albums.map(({ cover, name, slug }, index) => {
          const isSelected = currentAlbum === index;
          const isPlayingHere = isPlaying && current?.album.slug === slug;

          return (
            <button
              key={slug}
              type="button"
              className="group relative block focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-main-r"
              onClick={() => setCurrentAlbum(index)}
              aria-pressed={isSelected}
              aria-label={`Show album ${name}${isPlayingHere ? " (now playing)" : ""}`}
            >
              <img
                src={cover}
                alt=""
                className={`border lg:w-[160px] xl:w-[200px] ${isSelected ? "scale-105 border-main-r" : "border-white"} duration-300 group-hover:border-main-r`}
              />
              {isPlayingHere && (
                <span className="absolute top-2 left-2 flex items-center gap-2 bg-slider-bg px-2 py-1 text-[10px] tracking-widest text-main-r uppercase">
                  <Equalizer size={16} className="p-0!" />
                  <span className="max-sm:hidden">Playing</span>
                </span>
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
};
export default AlbumsCovers;
