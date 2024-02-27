import ScrollDownIcon from "./ScrollDownIcon";
import SectionTitle from "./SectionTitle";
import KaszankaDesktop from "../assets/kaszanka-about-desktop.png";
import bgPattern from "../assets/bg-patterns-about.png";
import triangle from "../assets/triangle-contact.svg";

const AboutBioPage = () => {
  return (
    <article className="lg:px-22 relative px-10 max-[350px]:px-4 md:flex lg:h-[calc(100vh-81px)] lg:snap-end lg:items-center lg:overflow-y-clip xl:px-24 2xl:px-44 min-[1700px]:px-[18rem]">
      <div className="mt-14 pr-4 lg:mt-0 lg:w-1/2">
        <SectionTitle
          text="Biography"
          redText=":"
          triangle={triangle}
          twoPart={false}
        />
        <div className="mt-10 flex flex-col gap-4 lg:mb-20">
          <p>
            Błażej “DJ Kaszanka” Kiełbasiński is a polish EDM artist born in
            Koszalin.
            <br className="hidden xl:inline" /> He is known mainly for his
            extraordinary acrobatic performances on stage.
          </p>
          <p>
            Before he started producing music, he was the county's table tennis
            champion. <br className="hidden 2xl:inline" /> Thanks to this
            achievement, he doesn't break his wrists while scratching even{" "}
            <br className="hidden 2xl:inline" />
            in strange positions.
          </p>
          <p>
            At the age of 5, he received his first keyboard from his
            grandfather. <br className="hidden xl:inline" /> After playing for a
            week, he managed to come up with a piece called{" "}
            <br className="hidden xl:inline" />
            "Can you feel it" which he played in front of his parents and
            siblings. <br className="hidden xl:inline" />
            He received the "best artist of the month" award from his father for
            this song.
          </p>
          <p>
            From this time - it was obvious that he was destined for success.
          </p>
        </div>
        <ScrollDownIcon classnames="hidden lg:block" />
      </div>
      <div className="hidden lg:block">
        <img
          src={KaszankaDesktop}
          className="absolute -right-0 bottom-0 z-[2] hidden lg:block lg:w-[500px] xl:right-[6rem] 2xl:right-[13rem] 2xl:w-[540px] min-[1700px]:right-[19rem]"
        />
        <img
          src={bgPattern}
          className="absolute -right-[17vw] bottom-4 sm:-bottom-10 sm:-right-[20vw] md:-bottom-14 md:-right-[18vw] md:w-[620px] min-[860px]:-right-[15vw] lg:-bottom-28 lg:-right-[6rem] lg:w-[600px] xl:-bottom-[8rem] xl:right-0 xl:w-[620px] 2xl:-bottom-60 2xl:right-[2rem] 2xl:w-[760px] min-[1700px]:right-[8rem]"
        />
      </div>
    </article>
  );
};
export default AboutBioPage;
