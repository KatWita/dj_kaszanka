import { motion } from "motion/react";
import { useState } from "react";
import { redPattern, bluePattern, purplePattern } from "../assets/albums";
import { albums } from "../utils/data";
import AlbumsCovers from "../components/AlbumsCovers";
import AlbumContainer from "../components/AlbumContainer";

const AlbumsPage = () => {
  const [currentAlbum, setCurrentAlbum] = useState(0);

  return (
    <motion.section
      initial={{ x: "-200vw" }}
      animate={{ x: 0 }}
      transition={{ duration: 1 }}
      className="relative overflow-hidden px-10 max-[350px]:px-4 lg:flex lg:h-[calc(100vh-81px)] lg:items-start lg:justify-between lg:pt-16 xl:px-24 2xl:px-44 min-[1700px]:px-72"
    >
      <AlbumsCovers
        albums={albums}
        setCurrentAlbum={setCurrentAlbum}
        currentAlbum={currentAlbum}
      />
      <AlbumContainer album={albums[currentAlbum]} />
      <div className="absolute inset-0 z-[-1]">
        <img
          src={redPattern}
          className="absolute -left-12 top-124 z-[-1] w-20 max-[340px]:-left-14 lg:left-32 lg:top-120 lg:w-40 xl:left-56 2xl:left-68 min-[1700px]:left-104"
        />
        <img
          src={bluePattern}
          className="absolute -right-12 top-0 z-[-1] w-24 max-[340px]:-right-14 lg:right-20 lg:top-0 lg:w-40 xl:right-56 2xl:right-72 min-[1700px]:right-96"
        />
        <img
          src={purplePattern}
          className="absolute -right-20 top-160 z-[-1] w-28 md:top-192 lg:-right-20 lg:top-104 lg:w-52 2xl:right-0 min-[1700px]:right-32"
        />
      </div>
    </motion.section>
  );
};
export default AlbumsPage;
