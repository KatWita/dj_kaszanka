import { motion } from "framer-motion";
// import { ALBUMS_URL } from "../utils/fetch";
// import { useLoaderData } from "react-router-dom";
import { useState } from "react";
import { redPattern, bluePattern, purplePattern } from "../assets/albums";
import { albums } from "../utils/data";
import AlbumsCovers from "../components/AlbumsCovers";
import AlbumContainer from "../components/AlbumContainer";
// export const loader = async () => {
//   const res = await fetch(ALBUMS_URL);

//   return res.json();
// };

const AlbumsPage = () => {
  const [currentAlbum, setCurrentAlbum] = useState(0);

  // const albums = useLoaderData();

  {
    /* <figure>
        <figcaption>Listen to the T-Rex:</figcaption>
        <audio controls src="/media/cc0-audio/t-rex-roar.mp3"></audio>
      </figure> */
  }

  return (
    <motion.section
      initial={{ x: "-200vw" }}
      animate={{ x: 0 }}
      transition={{ duration: 1 }}
      className="lg:px-22 overflow-hidden px-10 max-[350px]:px-4 lg:flex lg:h-[calc(100vh-81px)] lg:items-start lg:justify-between lg:pt-16 xl:px-24 2xl:px-44 min-[1700px]:px-[18rem]"
    >
      <AlbumsCovers
        albums={albums}
        setCurrentAlbum={setCurrentAlbum}
        currentAlbum={currentAlbum}
      />
      <AlbumContainer albums={albums} currentAlbum={currentAlbum} />
      <div className="absolute inset-0 -z-[1]">
        <img
          src={redPattern}
          className="absolute -left-12 top-[31rem] -z-[1] w-20 max-[340px]:-left-14 lg:left-[8rem] lg:top-[30rem] lg:w-[10rem] xl:left-[14rem] 2xl:left-[17rem] min-[1700px]:left-[26rem]"
        />
        <img
          src={bluePattern}
          className="absolute -right-12 top-0 -z-[1] w-24 max-[340px]:-right-14 lg:right-20 lg:top-0 lg:w-40 xl:right-[14rem] 2xl:right-[18rem] min-[1700px]:right-[24rem]"
        />
        <img
          src={purplePattern}
          className="absolute -right-20 top-[40rem] -z-[1] w-28 md:top-[48rem] lg:-right-[5rem] lg:top-[26rem] lg:w-52 2xl:right-0 min-[1700px]:right-[8rem]"
        />
      </div>
    </motion.section>
  );
};
export default AlbumsPage;
