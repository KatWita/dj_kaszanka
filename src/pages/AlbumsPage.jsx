import { motion } from "framer-motion";
// import { ALBUMS_URL } from "../utils/fetch";
// import { useLoaderData } from "react-router-dom";
import { useState } from "react";
import MusicSitesIcons from "../components/MusicSitesIcons";
import PlayAndPauseBtn from "../components/PlayAndPauseBtn";
import { redPattern, bluePattern, purplePattern } from "../assets/albums";
import triangle from "../assets/triangle-contact.svg";
import soundWave from "../assets/red-sound-wave.gif";
import { albums } from "../utils/data";
// export const loader = async () => {
//   const res = await fetch(ALBUMS_URL);

//   return res.json();
// };

const AlbumsPage = () => {
  const [currentAlbum, setCurrentAlbum] = useState(0);
  const [currentAudio, setCurrentAudio] = useState(1);
  const [isPlaying, setIsPlaying] = useState(false);
  // const albums = useLoaderData();
  // console.log(albums);
  // console.log(currentAudio);
  return (
    <motion.section
      initial={{ x: "-200vw" }}
      animate={{ x: 0 }}
      transition={{ duration: 1 }}
      className="lg:px-22 overflow-hidden px-10 max-[350px]:px-4 lg:flex lg:h-[calc(100vh-81px)] lg:items-start lg:justify-between lg:pt-16 xl:px-24 2xl:px-44 min-[1700px]:px-[18rem]"
    >
      <div className="flex flex-col items-center">
        <h3 className="relative mb-5">
          <img
            src={triangle}
            className="absolute -left-8 -top-4 -z-[1] w-10 lg:-top-4 xl:-left-12 xl:-top-8 xl:w-14"
          />
          Choose <span className="text-main-r">album</span>:
        </h3>
        <div className="flex gap-5 lg:flex-col">
          {albums.map(({ cover, name }, index) => {
            return (
              <button
                key={name}
                className="group block"
                onClick={() => setCurrentAlbum(index)}
              >
                <img
                  src={cover}
                  alt={`${name} album cover`}
                  className={`border-[1px] lg:w-[160px] xl:w-[200px] ${currentAlbum === index ? "scale-105 border-main-r" : "border-white"} duration-300 group-hover:border-main-r`}
                />
              </button>
            );
          })}
        </div>
      </div>
      {/* <figure>
        <figcaption>Listen to the T-Rex:</figcaption>
        <audio controls src="/media/cc0-audio/t-rex-roar.mp3"></audio>
      </figure> */}
      <div className="mt-[calc(24px+1.25rem)] bg-input-bg px-3 py-4 sm:px-8 lg:w-4/5">
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
            <PlayAndPauseBtn
              size={60}
              isPlaying={isPlaying}
              setIsPlaying={setIsPlaying}
            />
            <MusicSitesIcons />
          </div>
        </div>
        <div>
          <div className="mt-14 grid grid-cols-12 border-b-[1px] pb-[2px]">
            <p className="col-start-1 col-end-2 md:pl-4">#</p>
            <p className="col-start-2 col-end-10 md:col-end-11 md:pl-4">
              Title
            </p>
            <p className="col-span-3 col-start-10 text-right md:col-span-2 md:col-start-11 md:pr-4">
              Duration
            </p>
          </div>
          <div className="pt-2.5">
            {albums[currentAlbum].music.map(({ id, title, duration }) => {
              return (
                <div
                  key={id}
                  className="group grid grid-cols-12 py-3 duration-300 hover:bg-albums-bg-hover md:px-0.5 lg:py-1.5"
                >
                  <div className="relative col-start-1 col-end-2 md:pl-4">
                    <p className="duration-300 group-hover:opacity-0">
                      {`${id}.`}
                    </p>
                    <PlayAndPauseBtn
                      classnames="absolute left-[8px] -top-[1px] opacity-0 group-hover:opacity-100 duration-300"
                      size={26}
                      isPlaying={isPlaying}
                      setIsPlaying={setIsPlaying}
                    />
                  </div>

                  <p className="col-start-2 col-end-11 md:pl-4">{title}</p>
                  <p className="col-span-2 col-start-11 text-right md:pr-4">
                    {duration}
                  </p>
                </div>
              );
            })}
          </div>

          {/* syf do wyjebania */}
          {/* <div
            className={`grid grid-cols-12 items-center px-0.5 py-1 ${currentAudio === 1 ? "font-bold text-main-r" : null}`}
          >
            {currentAudio === 1 ? (
              <img src={soundWave} />
            ) : (
              <p className={`col-start-1 col-end-2 pl-2`}>
                {`${albums[0].music[1].id}.`}
              </p>
            )}

            <p className="col-start-2 col-end-11">{albums[0].music[1].title}</p>
            <p className="col-span-2 col-start-11 pr-2 text-right">
              {albums[0].music[1].duration}
            </p>
          </div> */}
          {/* syf do wyjebania */}
        </div>
      </div>
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
