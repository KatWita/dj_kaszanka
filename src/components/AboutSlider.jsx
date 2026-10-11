import { useCallback, useEffect, useState } from "react";
import useEmblaCarousel from "embla-carousel-react";
import Autoplay from "embla-carousel-autoplay";
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

const prefersReducedMotion = () =>
  typeof window !== "undefined" &&
  window.matchMedia("(prefers-reduced-motion: reduce)").matches;

const AboutSlider = () => {
  const [emblaRef, emblaApi] = useEmblaCarousel(
    { loop: true, slidesToScroll: "auto", duration: 30 },
    [
      Autoplay({
        delay: 4000,
        stopOnInteraction: false,
        stopOnMouseEnter: true,
        playOnInit: !prefersReducedMotion(),
      }),
    ],
  );
  const [snaps, setSnaps] = useState([]);
  const [selected, setSelected] = useState(0);

  // keep dots in sync with Embla (number of pages changes with screen width)
  useEffect(() => {
    if (!emblaApi) return;
    const sync = () => {
      setSnaps(emblaApi.scrollSnapList());
      setSelected(emblaApi.selectedScrollSnap());
    };
    sync();
    emblaApi.on("select", sync).on("reInit", sync);
    return () => {
      emblaApi.off("select", sync).off("reInit", sync);
    };
  }, [emblaApi]);

  const prev = useCallback(() => emblaApi?.scrollPrev(), [emblaApi]);
  const next = useCallback(() => emblaApi?.scrollNext(), [emblaApi]);

  return (
    <div className="relative after:absolute after:top-[-30px] after:z-[-1] after:h-full after:w-screen after:bg-slider-bg">
      <div className="px-page mt-16 mb-8">
        <section className="relative" aria-roledescription="carousel" aria-label="Collaborations">
          <PrevArrow onClick={prev} />
          <div className="-mx-[15px] overflow-hidden lg:-mx-5" ref={emblaRef}>
            <div className="flex touch-pan-y">
              {colaborations.map(({ img, pseudo }, i) => (
                <div
                  key={pseudo}
                  className="min-w-0 shrink-0 grow-0 basis-full px-[15px] min-[32.5625rem]:basis-1/2 lg:basis-1/3 lg:px-5"
                  role="group"
                  aria-roledescription="slide"
                  aria-label={`${i + 1} of ${colaborations.length}`}
                >
                  <AboutSingleSlide image={img} pseudo={pseudo} />
                </div>
              ))}
            </div>
          </div>
          <NextArrow onClick={next} />
          <ul className="mt-8 flex w-full justify-center gap-2 sm:gap-4">
            {snaps.map((_, i) => (
              <li key={i}>
                <button
                  type="button"
                  onClick={() => emblaApi?.scrollTo(i)}
                  aria-label={`Go to slide group ${i + 1}`}
                  aria-current={i === selected ? "true" : undefined}
                  className={`border border-main-r px-2 py-0.5 duration-300 ${i === selected ? "bg-main-r" : ""}`}
                />
              </li>
            ))}
          </ul>
        </section>
      </div>
    </div>
  );
};
export default AboutSlider;
