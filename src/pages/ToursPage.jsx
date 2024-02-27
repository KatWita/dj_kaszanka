import { motion } from "framer-motion";
import SectionTitle from "../components/SectionTitle";
import triangle from "../assets/triangle-contact.svg";
import { redPattern, bluePattern, purplePattern } from "../assets/tours";
import ToursFilterBtns from "../components/ToursFilterBtns";
import Tours from "../components/Tours";
import { useState } from "react";
import { tours } from "../utils/data";
// import { TOURS_URL } from "../utils/fetch";

// export const loader = async () => {
//   const res = await fetch(TOURS_URL);

//   return res.json();
// };

const ToursPage = () => {
  const [month, setMonth] = useState("april");
  const [currentItem, setCurrentItem] = useState(0);
  const [toursCount, setToursCount] = useState(3);

  return (
    <motion.section
      initial={{ x: "-200vw" }}
      animate={{ x: 0 }}
      transition={{ duration: 1 }}
      className="lg:px-22 relative overflow-hidden px-10 max-[350px]:px-4 lg:flex lg:min-h-[calc(100vh-81px)] xl:px-24 2xl:px-44 min-[1700px]:px-[18rem]"
    >
      <div className="pr-30 mt-16 lg:mt-[114px]">
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
        <div className="absolute inset-0 -z-[1]">
          <img
            src={redPattern}
            className="absolute -left-12 top-[31rem] -z-[1] w-20 max-[340px]:-left-14 lg:-left-[10rem] lg:top-[40rem] lg:w-36 xl:-left-[5rem] xl:top-[41rem] 2xl:left-0 2xl:top-[40rem] min-[1700px]:left-[6rem]"
          />
          <img
            src={bluePattern}
            className="absolute -right-12 top-0 -z-[1] w-24 max-[340px]:-right-12 md:right-20 md:top-10 lg:right-20 lg:top-10 lg:w-40 xl:right-[10rem] 2xl:right-[14rem] min-[1700px]:right-[22rem]"
          />
          <img
            src={purplePattern}
            className="absolute -right-16 top-[60rem] -z-[1] w-28 md:top-[48rem] lg:-right-[15rem] lg:top-[36rem] lg:w-52 xl:-right-[8rem] 2xl:-right-[3rem] min-[1700px]:right-[4rem]"
          />
        </div>
      </div>
    </motion.section>
  );
};
export default ToursPage;
