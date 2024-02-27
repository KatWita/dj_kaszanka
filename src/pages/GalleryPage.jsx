import { motion } from "framer-motion";
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
      className="lg:px-22 px-10 max-[350px]:px-4 lg:min-h-[calc(100vh-81px)] overflow-hidden xl:px-24 2xl:px-44 min-[1700px]:px-[18rem]"
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
      <div className="mb-8 flex flex-col pt-[5rem]">
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
                    className="cursor-pointer border-[1px] border-main-b-h object-cover transition-transform duration-300 md:h-[263px] md:w-[440px] lg:group-hover:scale-[1.05]"
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
            to="#"
            classnames="mt-8 mb-6 lg:mb-0 w-full lg:w-[200px] lg:mx-auto"
            fnc={() => setShowGalleryItems(showGalleryItems + 6)}
          />
        )}
      </div>
      <div className="absolute inset-0 -z-[1]">
        <img
          src={redPattern}
          className="absolute -right-4 top-[60rem] -z-[1] w-20 md:top-[48rem] lg:-right-[3rem] lg:top-[40rem] lg:w-36 2xl:right-0 min-[1700px]:right-[8rem]"
        />
        <img
          src={bluePattern}
          className="absolute -right-2 top-8 -z-[1] w-24 max-[340px]:-right-14 md:right-8 lg:right-20 lg:top-12 lg:w-40 xl:right-[14rem] 2xl:right-[18rem] min-[1700px]:right-[24rem]"
        />
        <img
          src={purplePattern}
          className="absolute -left-2 top-[31rem] -z-[1] w-24 max-[340px]:-left-14 lg:-left-[2rem] lg:top-[25rem] lg:w-[10rem] xl:left-0 2xl:left-[2rem] min-[1700px]:left-[7rem]"
        />
      </div>
    </motion.section>
  );
};
export default GalleryPage;
