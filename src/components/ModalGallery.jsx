import { VscChromeClose } from "react-icons/vsc";

const ModalGallery = ({ onClose, gallery, picNumber, prevPic, nextPic }) => {
  return (
    <div className="bg-modal-bg fixed inset-0 z-[999] flex h-screen w-screen items-center justify-center text-white">
      <button
        className="group absolute right-12 top-[78vh] inline-block translate-y-[-50%] cursor-pointer px-4 min-[540px]:top-[86vh] md:right-4 md:top-1/2 xl:right-6 2xl:right-36 min-[1700px]:right-72"
        onClick={nextPic}
      >
        <div className="h-5 w-1 skew-x-[20deg] bg-white duration-300 group-hover:bg-main-b"></div>
        <div className="h-5 w-1 -skew-x-[20deg] bg-white duration-300 group-hover:bg-main-b"></div>
      </button>
      <button
        className="group absolute left-12 top-[78vh] inline-block translate-y-[-50%] cursor-pointer px-4 min-[540px]:top-[86vh] md:left-4 md:top-1/2 xl:left-6 2xl:left-36 min-[1700px]:left-72"
        onClick={prevPic}
      >
        <div className="h-5 w-1 -skew-x-[20deg] bg-white duration-300 group-hover:bg-main-b"></div>
        <div className="h-5 w-1 skew-x-[20deg] bg-white duration-300 group-hover:bg-main-b"></div>
      </button>
      <VscChromeClose
        onClick={onClose}
        size={40}
        className="absolute right-8 top-20 cursor-pointer duration-300 hover:fill-main-b lg:top-12 xl:right-6 2xl:right-36 min-[1700px]:right-72"
      />
      <div className="max-w-[1100px]">
        <img
          src={gallery[picNumber].largeWEBP}
          alt={gallery[picNumber].desc}
          className="hidden lg:block"
        />
        <img
          src={gallery[picNumber].small}
          alt={gallery[picNumber].desc}
          className="lg:hidden"
        />
      </div>
    </div>
  );
};
export default ModalGallery;
