import { motion } from "motion/react";
import SectionTitle from "../components/SectionTitle";
import triangle from "../assets/triangle-contact.svg";
import { redPattern, bluePattern, purplePattern } from "../assets/tours";
import ToursFilterBtns from "../components/ToursFilterBtns";
import Tours from "../components/Tours";
import { useState } from "react";
import { tours } from "../utils/data";

const ToursPage = () => {
  const [month, setMonth] = useState("april");
  const [currentItem, setCurrentItem] = useState(0);
  const [toursCount, setToursCount] = useState(3);

  return (
    <motion.section
      initial={{ x: "-200vw" }}
      animate={{ x: 0 }}
      transition={{ duration: 1 }}
      className="pb-player px-page relative overflow-hidden lg:flex lg:min-h-[calc(100vh-81px)]"
    >
      <div className="mt-16 lg:mt-[114px]">
        <SectionTitle
          text="Upcomming"
          redText="dates"
          triangle={triangle}
          twoPart={true}
        />
        <div className="mt-6 flex w-full flex-col items-center justify-center">
          <ToursFilterBtns
            setMonth={setMonth}
            currentItem={currentItem}
            setCurrentItem={setCurrentItem}
            setToursCount={setToursCount}
            tours={tours}
          />
          <Tours
            month={month}
            toursCount={toursCount}
            setToursCount={setToursCount}
            tours={tours}
          />
        </div>
        <div className="absolute inset-0 z-[-1]">
          <img
            src={redPattern}
            className="absolute -left-12 top-124 z-[-1] w-20 max-[340px]:-left-14 lg:-left-40 lg:top-160 lg:w-36 xl:-left-20 xl:top-164 2xl:left-0 2xl:top-160 3xl:left-24"
          />
          <img
            src={bluePattern}
            className="absolute -right-12 top-0 z-[-1] w-24 max-[340px]:-right-12 md:right-20 md:top-10 lg:right-20 lg:top-10 lg:w-40 xl:right-40 2xl:right-56 3xl:right-88"
          />
          <img
            src={purplePattern}
            className="absolute -right-16 top-240 z-[-1] w-28 md:top-192 lg:-right-60 lg:top-144 lg:w-52 xl:-right-32 2xl:-right-12 3xl:right-16"
          />
        </div>
      </div>
    </motion.section>
  );
};
export default ToursPage;
