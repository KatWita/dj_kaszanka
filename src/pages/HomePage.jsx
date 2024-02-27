import bgPattern from "../assets/bg-patterns-home.png";
import KaszankaMobile from "../assets/kaszanka-mobile.png";
import KaszankaDesktop from "../assets/kaszanka-desktop.png";
import triangle from "../assets/triangle-home.svg";
import MainButton from "../components/MainButton";
import { motion } from "framer-motion";

const HomePage = () => {
  return (
    <motion.header
      className="lg:px-22 relative h-[calc(100vh-81px)] overflow-hidden px-10 max-[350px]:px-4 lg:flex xl:px-24 2xl:px-44 min-[1700px]:px-[18rem]"
      initial={{ x: "-200vw" }}
      animate={{ x: 0 }}
      transition={{ duration: 1 }}
    >
      <div className="relative z-[1] mt-[2rem] max-w-[370px] min-[390px]:mt-[4rem] md:mt-[8rem] md:max-w-[480px] min-[820px]:mt-[15rem] lg:mt-[30vh] xl:max-w-[520px]">
        <img
          src={triangle}
          className="absolute -left-3 -top-6 -z-10 w-10 sm:-left-5 sm:-top-8 md:-left-8 md:w-14 lg:w-16"
        />
        <h1 className="text-3xl leading-[46px] max-[395px]:text-2xl md:text-[40px] 2xl:text-[2.875rem]">
          <span className="text-4xl min-[412px]:text-[44px] md:text-6xl 2xl:text-[4.188rem]">
            WITH <span className="text-main-r">MUSIC</span>
          </span>
          <span className="text-main-p"> WE</span> CAN CHANGE THE WORLD
        </h1>
        <MainButton to="/tours" content="JOIN ME" classnames="lg:px-16 mt-10" />
      </div>
      <div className="z-0">
        <img
          src={KaszankaMobile}
          className="absolute bottom-0 right-8 z-[2] w-[27vh] max-[374px]:right-2 min-[390px]:w-[220px] min-[412px]:w-[230px] min-[550px]:right-[5rem] sm:right-14 lg:hidden"
        />
        <img
          src={KaszankaDesktop}
          className="absolute z-[2] hidden lg:bottom-0 lg:right-40 lg:block xl:right-[15rem] 2xl:right-[17rem] 2xl:w-[300px] min-[1700px]:right-[28rem]"
        />
        <img
          src={bgPattern}
          className="max-[374px]:-right-[4rem]sm:-bottom-10 absolute -right-[6rem] bottom-4 min-[550px]:w-[550px] sm:bottom-0 sm:-right-[17vw] sm:w-[570px] md:-bottom-14 md:-right-[18vw] md:w-[620px] min-[860px]:-right-[15vw] lg:-right-[1rem] lg:bottom-12 lg:w-[640px] xl:right-[3rem] 2xl:bottom-0 2xl:right-[3rem] 2xl:w-[720px] min-[1700px]:right-[14rem]"
        />
      </div>
    </motion.header>
  );
};
export default HomePage;
