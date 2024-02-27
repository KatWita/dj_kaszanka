import SocialIcons from "./SocialIcons";

function AboutSingleSlide({ image, pseudo, ...otherProps }) {
  return (
    <div {...otherProps} className="group relative overflow-hidden">
      <div className="absolute bottom-0 lg:-bottom-[100%] left-0 w-full bg-slider-bg py-3 text-center lg:duration-300 lg:group-hover:bottom-0">
        <p className="font-bruno-ace text-bold">{pseudo}</p>
      </div>
      <div className="absolute right-0 lg:right-[-100%] top-0 bg-slider-bg p-2 text-center lg:duration-300 lg:group-hover:right-0">
        <SocialIcons classnames="flex-col gap-2" />
      </div>
      <img src={image} alt={`${pseudo}'s pictures`} className="w-[100%]" />
    </div>
  );
}

export default AboutSingleSlide;
