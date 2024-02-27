import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import {
  david,
  pesto,
  pain,
  gr8,
  shoulder,
  pinky,
  steve,
  chainbreakers,
  gustavo,
} from "../assets/colaborations";
import { NextArrow, PrevArrow } from "./AboutSliderArrows";
import AboutSingleSlide from "./AboutSingleSlide";

const colaborations = [
  { img: pesto, pseudo: "DJ Pesto" },
  { img: david, pseudo: "David van Burden" },
  { img: shoulder, pseudo: "Mr Shoulderspeaker" },
  { img: pinky, pseudo: "Pinky Tho" },
  { img: chainbreakers, pseudo: "The Chainbreakers" },
  { img: steve, pseudo: "Steve Milwaukee" },
  { img: gustavo, pseudo: "DJ Gustavo" },
  { img: gr8, pseudo: "Miss gr8" },
  { img: pain, pseudo: "Lil Pain" },
];

const AboutSlider = () => {
  const settings = {
    customPaging: function () {
      return (
        <button className="border border-main-r px-2 py-0.5 duration-300"></button>
      );
    },
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 3,
    initalSlide: 0,
    autoplay: true,
    autoplaySpeed: 4000,
    nextArrow: <NextArrow />,
    prevArrow: <PrevArrow />,
    appendDots: (dots) => (
      <div className="w-full">
        <ul
          style={{
            display: "flex",
            justifyContent: "center",
          }}
          className="mt-8 w-full gap-2 sm:gap-[1rem]"
        >
          {dots}
        </ul>
      </div>
    ),
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          dots: true,
        },
      },
      {
        breakpoint: 520,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          dots: true,
        },
      },
      {
        breakpoint: 350,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          dots: true,
          arrows: false,
        },
      },
    ],
  };

  return (
    <div className="after:contene-[''] relative after:absolute after:-top-[30px] after:-z-[1] after:h-full after:w-screen after:bg-slider-bg">
      <div className="slider-container lg:px-22 mb-8 mt-16 px-10 max-[350px]:px-4 xl:px-24 2xl:px-44 min-[1700px]:px-[18rem]">
        <Slider {...settings}>
          {colaborations.map(({ img, pseudo }) => (
            <AboutSingleSlide key={pseudo} image={img} pseudo={pseudo} />
          ))}
        </Slider>
      </div>
    </div>
  );
};
export default AboutSlider;
