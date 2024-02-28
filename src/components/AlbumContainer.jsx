import { useState } from "react";
import AlbumHeader from "./AlbumHeader";
import AlbumSongs from "./AlbumSongs";

const AlbumContainer = ({ albums, currentAlbum }) => {
  const [currentAudio, setCurrentAudio] = useState(1);
  const [isPlaying, setIsPlaying] = useState(false);

  return (
    <div className="mt-[calc(24px+1.25rem)] bg-input-bg px-3 py-4 sm:px-8 lg:w-4/5 mb-4">
      <AlbumHeader
        albums={albums}
        currentAlbum={currentAlbum}
        isPlaying={isPlaying}
        setIsPlaying={setIsPlaying}
        currentAudio={currentAudio}
      />

      <div>
        <AlbumSongs
          albums={albums}
          currentAlbum={currentAlbum}
          currentAudio={currentAudio}
          setCurrentAudio={setCurrentAudio}
          isPlaying={isPlaying}
          setIsPlaying={setIsPlaying}
        />
      </div>
    </div>
  );
};
export default AlbumContainer;
