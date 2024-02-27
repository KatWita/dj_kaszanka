import triangle from "../assets/triangle-contact.svg";
import { redPattern, bluePattern, purplePattern } from "../assets/contact";
import ContactForm from "../components/ContactForm";
import SocialIcons from "../components/SocialIcons";
import { motion } from "framer-motion";
import SectionTitle from "../components/SectionTitle";

const ContactPage = () => {
  return (
    <motion.section
      className="md:align-center lg:px-22 relative overflow-hidden px-10 max-[350px]:px-4 md:min-h-[calc(100vh-81px)] lg:flex xl:px-24 2xl:px-44 min-[1700px]:px-[18rem]"
      initial={{ x: "-200vw" }}
      animate={{ x: 0 }}
      transition={{ duration: 1 }}
    >
      <div className="pr-30 mt-16 md:mt-24 lg:mt-[114px] lg:w-2/5">
        <SectionTitle
          text="Contact"
          redText="me"
          triangle={triangle}
          twoPart={true}
          classnames="text-2xl"
        />
        <ContactForm />
      </div>

      <div className="lg:1/2 mt-14 lg:z-10 lg:mt-[calc(6rem+32px+64px)] lg:pl-32 2xl:pl-36">
        <div>
          <p>
            MY <span className="text-main-r">STUDIO</span>:
          </p>
          <p className="mt-4 text-[0.938rem]">
            ul. Szynkowa 23, 75-642 Koszalin
          </p>
        </div>
        <div className="my-6 h-0.5 w-[50px] bg-main-b"></div>
        <div>
          <p>
            BOOKINGS/<span className="text-main-r">SHOWS</span>:
          </p>
          <div className="mb-2 mt-4">
            <a href="tel:+48999888777" className="text-[0.938rem]">
              +48 999 888 777
            </a>
          </div>
          <div>
            <a
              href="mailto:bookings@djkaszanka.com"
              className="text-[0.938rem]"
            >
              bookings@djkaszanka.com
            </a>
          </div>
        </div>
        <div className="my-6 h-0.5 w-[50px] bg-main-b"></div>
        <div className="relative z-10">
          <p>
            SOCIALS<span className="text-main-r">:</span>
          </p>
          <SocialIcons classnames="mb-6 mt-4 gap-5" />
        </div>
      </div>
      <div className="absolute inset-0 -z-[1]">
        <img
          src={redPattern}
          className="absolute -bottom-16 right-32 -z-[1] w-28 sm:-bottom-[8rem] sm:right-[14rem] sm:w-44 lg:-bottom-[9rem] lg:right-[20rem] lg:w-[20rem] xl:-bottom-[11rem] xl:right-[26rem] xl:w-[22rem] 2xl:-bottom-[8rem] 2xl:right-[32rem] min-[1700px]:right-[46rem]"
        />
        <img
          src={bluePattern}
          className="absolute bottom-4 right-4 -z-[1] w-24 sm:bottom-[1rem] sm:right-[2rem] sm:w-[8rem] lg:bottom-[3rem] lg:right-[1rem] lg:w-[14rem] xl:-bottom-[5rem] xl:right-[5rem] xl:w-[15rem] 2xl:bottom-[8rem] 2xl:right-[10rem] min-[1700px]:right-[24rem]"
        />
        <img
          src={purplePattern}
          className="absolute bottom-32 right-2 -z-[1] w-24 sm:bottom-44 sm:w-[9rem] lg:bottom-[22rem] lg:w-[14rem] xl:right-16 xl:w-[16rem] 2xl:bottom-[27rem] 2xl:right-[10rem] min-[1700px]:right-[20rem]"
        />
      </div>
    </motion.section>
  );
};
export default ContactPage;
