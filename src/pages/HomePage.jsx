import bgPattern from "../assets/bg-patterns-home.png";
import KaszankaMobile from "../assets/kaszanka-mobile.png";
import KaszankaDesktop from "../assets/kaszanka-desktop.png";
import triangle from "../assets/triangle-home.svg";
import MainButton from "../components/MainButton";
import { motion } from "motion/react";

const HomePage = () => {
  return (
    <motion.header
      className="relative h-[calc(100vh-81px)] overflow-hidden px-10 max-[350px]:px-4 lg:flex xl:px-24 2xl:px-44 3xl:px-72"
      initial={{ x: "-200vw" }}
      animate={{ x: 0 }}
      transition={{ duration: 1 }}
    >
      <div className="relative z-1 mt-8 max-w-[370px] min-[24.375rem]:mt-16 md:mt-32 md:max-w-[480px] min-[51.25rem]:mt-60 lg:mt-[30vh] xl:max-w-[520px]">
        <img
          src={triangle}
          className="absolute -left-3 -top-6 -z-10 w-10 sm:-left-5 sm:-top-8 md:-left-8 md:w-14 lg:w-16"
        />
        <h1 className="text-3xl leading-[46px] max-[395px]:text-2xl max-[395px]:leading-8 md:text-[40px] 2xl:text-[2.875rem]">
          <span className="text-4xl leading-10 min-[25.75rem]:text-[44px] md:text-6xl md:leading-none 2xl:text-[4.188rem]">
            WITH <span className="text-main-r">MUSIC</span>
          </span>
          <span className="text-main-p"> WE</span> CAN CHANGE THE WORLD
        </h1>
        <MainButton to="/tours" content="JOIN ME" classnames="lg:px-16 mt-10" />
      </div>
      <div className="z-0">
        <img
          src={KaszankaMobile}
          className="absolute bottom-0 right-8 z-2 w-[27vh] max-[374px]:right-2 min-[24.375rem]:w-[220px] min-[25.75rem]:w-[230px] min-[34.375rem]:right-20 sm:right-14 lg:hidden"
        />
        <img
          src={KaszankaDesktop}
          className="absolute z-2 hidden lg:bottom-0 lg:right-40 lg:block xl:right-60 2xl:right-68 2xl:w-[300px] 3xl:right-112"
        />
        <img
          src={bgPattern}
          className="max-[374px]:-right-[4rem]sm:-bottom-10 absolute -right-24 bottom-4 min-[34.375rem]:w-[550px] sm:bottom-0 sm:right-[-17vw] sm:w-[570px] md:-bottom-14 md:right-[-18vw] md:w-[620px] min-[53.75rem]:right-[-15vw] lg:-right-4 lg:bottom-12 lg:w-[640px] xl:right-12 2xl:bottom-0 2xl:right-12 2xl:w-[720px] 3xl:right-56"
        />
      </div>
    </motion.header>
  );
};
export default HomePage;
