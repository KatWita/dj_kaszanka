import { motion } from "framer-motion";
import AboutSliderPage from "../components/AboutSliderPage";
import AboutValuesPage from "../components/AboutValuesPage";
import AboutBioPage from "../components/AboutBioPage";

const AboutPage = () => {
  return (
    <motion.section
      initial={{ x: "-200vw" }}
      animate={{ x: 0 }}
      transition={{ duration: 1 }}
      className="hide-scroll lg:h-[calc(100vh-81px)] lg:snap-y lg:snap-mandatory lg:overflow-y-scroll"
    >
      <AboutBioPage />
      <AboutValuesPage />
      <AboutSliderPage />
    </motion.section>
  );
};
export default AboutPage;
