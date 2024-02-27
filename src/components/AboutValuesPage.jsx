import MainButton from "./MainButton";
import ScrollDownIcon from "./ScrollDownIcon";
import triangleHome from "../assets/triangle-home.svg";
import secondKaszankaMobile from "../assets/kaszanka-about-2-mobile.png";
import secondKaszankaDesktop from "../assets/kaszanka-about-2-desktop.png";
import secondBgPattern from "../assets/bg-patterns-about-2.png";

const aboutInfo = [
  { value: 3, text: "albums" },
  { value: 42, text: "songs" },
  { value: 9, text: "singles" },
  { value: 243, text: "concerts" },
];

const AboutValuesPage = () => {
  return (
    <article className="lg:px-22 relative overflow-y-clip px-10 max-[350px]:px-4 md:flex md:justify-end lg:h-[calc(100vh-81px)] lg:snap-end lg:items-center xl:px-24 2xl:px-44 min-[1700px]:px-[18rem]">
      <div className="flex flex-col items-center sm:gap-28 md:gap-20">
        <div className="relative mt-24 inline-block border-y-2 border-main-b py-1.5 sm:w-full sm:px-6 md:mt-32">
          <img
            src={triangleHome}
            className="absolute -right-4 -top-[68px] w-[68px]"
          />
          <div className="flex flex-wrap sm:justify-between sm:gap-6 md:gap-10 2xl:gap-16">
            {aboutInfo.map(({ value, text }) => {
              return (
                <div
                  className="w-1/2 text-center font-bruno-ace sm:w-auto md:w-auto"
                  key={text}
                >
                  <p className="text-3xl sm:text-5xl xl:text-6xl 2xl:text-7xl">
                    {value}
                  </p>
                  <p className="text-[1.2rem] text-main-r sm:text-[1.4rem] xl:text-[1.5rem] 2xl:text-[1.625rem]">
                    {text}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
        <MainButton
          type="button"
          to="/albums"
          content="CHECK MY MUSIC"
          classnames="mt-12 mb-[24rem] sm:mb-[11rem] md:mb-[12rem] lg:mb-0 sm:self-end md:self-center"
        />
        <ScrollDownIcon classnames="hidden lg:block self-end" />
      </div>
      <div className="">
        <img
          src={secondKaszankaMobile}
          className="absolute bottom-0 left-1/2 z-[2] w-[130px] -translate-x-1/2 min-[500px]:right-0 sm:left-[8.5rem] sm:translate-x-0 md:left-[4rem] lg:hidden"
        />
        <img
          src={secondKaszankaDesktop}
          className="absolute bottom-0 z-[2] hidden lg:left-32 lg:block lg:w-[240px] xl:left-[12rem] xl:w-[260px] 2xl:left-[13rem] 2xl:w-[270px] min-[1700px]:left-[20rem]"
        />
        <img
          src={secondBgPattern}
          className="absolute bottom-0 left-1/2 w-[280px] -translate-x-1/2 sm:left-[13rem] md:left-0 md:translate-x-0 lg:bottom-[4rem] lg:left-[2rem] lg:w-[460px] xl:left-[5rem] xl:w-[500px] 2xl:bottom-[3rem] 2xl:left-[5rem] 2xl:w-[540px] min-[1700px]:left-[12rem]"
        />
      </div>
    </article>
  );
};
export default AboutValuesPage;
