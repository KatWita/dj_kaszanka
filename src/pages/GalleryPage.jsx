import { AnimatePresence, motion } from "motion/react";
import { useState } from "react";
import SectionTitle from "../components/SectionTitle";
import triangle from "../assets/triangle-contact.svg";
import GalleryThumb from "../components/GalleryThumb";
import RevealOnScroll from "../components/RevealOnScroll";
import Lightbox from "../components/Lightbox";
import { photos } from "../lib/gallery";
import { redPattern, bluePattern, purplePattern } from "../assets/gallery";

const GalleryPage = () => {
  const [openIndex, setOpenIndex] = useState(null); // photo shown in the lightbox

  return (
    <motion.section
      initial={{ x: "-200vw" }}
      animate={{ x: 0 }}
      transition={{ duration: 1 }}
      className="pb-player px-page relative overflow-hidden lg:min-h-[calc(100vh-81px)]"
    >
      <div className="mb-8 flex flex-col pt-20">
        <SectionTitle text="Gallery" redText=":" triangle={triangle} classnames="text-2xl" />
        <div className="mt-10 grid gap-x-5 gap-y-4 md:grid-cols-2 lg:grid-cols-4">
          {/* all 16 at once: images are lazy-loaded, so only what's on screen downloads;
              photos further down slide in as you scroll to them */}
          {photos.map((photo, i) => (
            <RevealOnScroll key={photo.name} delay={(i % 4) * 80}>
              <GalleryThumb photo={photo} onOpen={() => setOpenIndex(i)} />
            </RevealOnScroll>
          ))}
        </div>
      </div>
      <AnimatePresence>
        {openIndex !== null && (
          <Lightbox
            key="lightbox"
            photos={photos}
            index={openIndex}
            onIndexChange={setOpenIndex}
            onClose={() => setOpenIndex(null)}
          />
        )}
      </AnimatePresence>
      <div className="absolute inset-0 z-[-1]">
        <img
          src={redPattern}
          className="absolute -right-4 top-240 z-[-1] w-20 md:top-192 lg:-right-12 lg:top-160 lg:w-36 2xl:right-0 3xl:right-32"
        />
        <img
          src={bluePattern}
          className="absolute -right-2 top-8 z-[-1] w-24 max-[340px]:-right-14 md:right-8 lg:right-20 lg:top-12 lg:w-40 xl:right-56 2xl:right-72 3xl:right-96"
        />
        <img
          src={purplePattern}
          className="absolute -left-2 top-124 z-[-1] w-24 max-[340px]:-left-14 lg:-left-8 lg:top-100 lg:w-40 xl:left-0 2xl:left-8 3xl:left-28"
        />
      </div>
    </motion.section>
  );
};
export default GalleryPage;
