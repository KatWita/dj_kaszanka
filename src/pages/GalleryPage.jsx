import { motion } from "motion/react";
import SectionTitle from "../components/SectionTitle";
import triangle from "../assets/triangle-contact.svg";
import gallery from "../utils/gallery";
import MainButton from "../components/MainButton";
import { useState } from "react";
import { createPortal } from "react-dom";
import ModalGallery from "../components/ModalGallery";
import { redPattern, bluePattern, purplePattern } from "../assets/gallery";

const GalleryPage = () => {
  const [showGalleryItems, setShowGalleryItems] = useState(6);
  const [picNumber, setPicNumber] = useState(0);
  const [showPicture, setShowPicture] = useState(false);

  const handleShowPicture = (index) => {
    setPicNumber(index);
    setShowPicture(true);
  };

  const prevPic = () => {
    picNumber === 0
      ? setPicNumber(gallery.slice(0, showGalleryItems).length - 1)
      : setPicNumber(picNumber - 1);
  };

  const nextPic = () => {
    picNumber + 1 === gallery.slice(0, showGalleryItems).length
      ? setPicNumber(0)
      : setPicNumber(picNumber + 1);
  };

  return (
    <motion.section
      initial={{ x: "-200vw" }}
      animate={{ x: 0 }}
      transition={{ duration: 1 }}
      className="px-page relative lg:min-h-[calc(100vh-81px)] overflow-hidden"
    >
      {showPicture &&
        createPortal(
          <ModalGallery
            onClose={() => setShowPicture(false)}
            gallery={gallery}
            picNumber={picNumber}
            prevPic={prevPic}
            nextPic={nextPic}
          />,
          document.body,
        )}
      <div className="mb-8 flex flex-col pt-20">
        <SectionTitle
          text="Gallery"
          redText=":"
          triangle={triangle}
          classnames="text-2xl"
        />
        <div className="mt-10 grid gap-x-5 gap-y-4 md:grid-cols-2 lg:grid-cols-3">
          {gallery
            .map(({ id, small, desc }, index) => {
              return (
                <div key={id} className="group overflow-hidden">
                  <img
                    src={small}
                    alt={desc}
                    className="cursor-pointer border border-main-b-h object-cover transition-transform duration-300 w-full md:aspect-[440/263] lg:group-hover:scale-[1.05]"
                    onClick={() => handleShowPicture(index)}
                  />
                </div>
              );
            })
            .slice(0, showGalleryItems)}
        </div>
        {showGalleryItems <= gallery.length && (
          <MainButton
            type="button"
            content="LOAD MORE"
            classnames="mt-8 mb-6 lg:mb-0 w-full lg:w-[200px] lg:mx-auto"
            onClick={() => setShowGalleryItems(showGalleryItems + 6)}
          />
        )}
      </div>
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
