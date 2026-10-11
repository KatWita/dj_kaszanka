import AboutSlider from "./AboutSlider";
import SectionTitle from "./SectionTitle";
import triangle from "../assets/triangle-contact.svg";
import { redPattern, bluePattern, purplePattern } from "../assets/about-slider";

const AboutSliderPage = () => {
  return (
    <article className="relative overflow-hidden lg:min-h-[calc(100vh-81px)] lg:snap-end lg:pt-0">
      <div className="mt-20 lg:relative lg:top-[calc(18vh-81px)]">
        <div className="px-10 max-[350px]:px-4 xl:px-24 2xl:px-44 min-[1700px]:px-72">
          <SectionTitle
            text="Colaborates"
            redText="with"
            triangle={triangle}
            twoPart={true}
          />
        </div>
        <AboutSlider />
      </div>
      <div className="absolute inset-0 z-[-2]">
        <img
          src={redPattern}
          className="absolute -right-16 top-100 z-[-2] w-28 lg:-right-24 lg:top-160 lg:w-[18rem] 2xl:right-12 min-[1700px]:right-28 min-[1700px]:top-172"
        />
        <img
          src={bluePattern}
          className="absolute -right-12 top-24 z-[-2] w-24 max-[340px]:-right-12 md:right-20 md:top-10 lg:right-36 lg:top-16 lg:w-56 xl:right-56 xl:w-[16rem] 2xl:right-84 min-[1700px]:right-124"
        />
        <img
          src={purplePattern}
          className="absolute -left-12 top-104 z-[-2] w-20 max-[340px]:-left-14 lg:-left-40 lg:top-120 lg:w-56 xl:-left-52 xl:w-[18rem] 2xl:-left-40 min-[1700px]:left-0 min-[1700px]:top-136"
        />
      </div>
    </article>
  );
};
export default AboutSliderPage;
