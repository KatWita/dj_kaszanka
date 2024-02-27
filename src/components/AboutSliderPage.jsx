import AboutSlider from "./AboutSlider";
import SectionTitle from "./SectionTitle";
import triangle from "../assets/triangle-contact.svg";
import { redPattern, bluePattern, purplePattern } from "../assets/about-slider";

const AboutSliderPage = () => {
  return (
    <article className="relative overflow-hidden lg:min-h-[calc(100vh-81px)] lg:snap-end lg:pt-0">
      <div className="mt-20 lg:relative lg:top-[calc(18vh-81px)]">
        <div className="lg:px-22 px-10 max-[350px]:px-4 xl:px-24 2xl:px-44 min-[1700px]:px-[18rem]">
          <SectionTitle
            text="Colaborates"
            redText="with"
            triangle={triangle}
            twoPart={true}
          />
        </div>
        <AboutSlider />
      </div>
      <div className="absolute inset-0 -z-[2]">
        <img
          src={redPattern}
          className="absolute -right-16 top-[25rem] -z-[2] w-28 lg:-right-[6rem] lg:top-[40rem] lg:w-[18rem] 2xl:right-[3rem] min-[1700px]:right-[7rem] min-[1700px]:top-[43rem]"
        />
        <img
          src={bluePattern}
          className="absolute -right-12 top-[6rem] -z-[2] w-24 max-[340px]:-right-12 md:right-20 md:top-10 lg:right-[9rem] lg:top-16 lg:w-[14rem] xl:right-[14rem] xl:w-[16rem] 2xl:right-[21rem] min-[1700px]:right-[31rem]"
        />
        <img
          src={purplePattern}
          className="absolute -left-12 top-[26rem] -z-[2] w-20 max-[340px]:-left-14 lg:-left-[10rem] lg:top-[30rem] lg:w-[14rem] xl:-left-[13rem] xl:w-[18rem] 2xl:-left-[10rem] min-[1700px]:left-0 min-[1700px]:top-[34rem]"
        />
      </div>
    </article>
  );
};
export default AboutSliderPage;
