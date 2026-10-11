import AlbumHeader from "./AlbumHeader";
import AlbumSongs from "./AlbumSongs";

const AlbumContainer = ({ album }) => {
  return (
    <div className="mt-[calc(24px+1.25rem)] mb-4 bg-input-bg px-3 py-4 sm:px-8 lg:w-4/5">
      <AlbumHeader album={album} />
      <AlbumSongs album={album} />
    </div>
  );
};
export default AlbumContainer;
