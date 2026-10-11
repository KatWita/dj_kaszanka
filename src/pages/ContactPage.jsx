import triangle from "../assets/triangle-contact.svg";
import { redPattern, bluePattern, purplePattern } from "../assets/contact";
import ContactForm from "../components/ContactForm";
import SocialIcons from "../components/SocialIcons";
import { motion } from "motion/react";
import SectionTitle from "../components/SectionTitle";

const ContactPage = () => {
  return (
    <motion.section
      className="pb-player px-page md:align-center relative overflow-hidden md:min-h-[calc(100vh-81px)] lg:flex"
      initial={{ x: "-200vw" }}
      animate={{ x: 0 }}
      transition={{ duration: 1 }}
    >
      <div className="mt-16 md:mt-24 lg:mt-[114px] lg:w-2/5">
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
      <div className="absolute inset-0 z-[-1]">
        <img
          src={redPattern}
          className="absolute -bottom-16 right-32 z-[-1] w-28 sm:-bottom-32 sm:right-56 sm:w-44 lg:-bottom-36 lg:right-80 lg:w-[20rem] xl:-bottom-44 xl:right-104 xl:w-88 2xl:-bottom-32 2xl:right-128 3xl:right-184"
        />
        <img
          src={bluePattern}
          className="absolute bottom-4 right-4 z-[-1] w-24 sm:bottom-4 sm:right-8 sm:w-32 lg:bottom-12 lg:right-4 lg:w-56 xl:-bottom-20 xl:right-20 xl:w-60 2xl:bottom-32 2xl:right-40 3xl:right-96"
        />
        <img
          src={purplePattern}
          className="absolute bottom-32 right-2 z-[-1] w-24 sm:bottom-44 sm:w-36 lg:bottom-88 lg:w-56 xl:right-16 xl:w-[16rem] 2xl:bottom-108 2xl:right-40 3xl:right-80"
        />
      </div>
    </motion.section>
  );
};
export default ContactPage;
