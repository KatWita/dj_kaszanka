import { AnimatePresence, motion } from "framer-motion";
import { Outlet, useLocation } from "react-router-dom";
import Nav from "../components/Nav/Nav";

const ScreenTransition = () => {
  const { pathname } = useLocation();
  const path =
    pathname.substring(1).charAt(0).toUpperCase() + pathname.substring(2);

  return (
    <AnimatePresence mode="wait">
      <div key={pathname}>
        <motion.div
          className="fixed z-50 flex h-screen w-screen items-center justify-center bg-main-r"
          animate={{ x: "-100%" }}
          exit={{ x: 0 }}
          transition={{ delay: 0.2, duration: 0.5, ease: "easeOut" }}
        >
          <motion.h1
            className="text-6xl text-white sm:text-8xl"
            initial={{ opacity: 1 }}
            animate={{ opacity: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            {path}
          </motion.h1>
        </motion.div>
        <motion.div
          className="fixed z-40 h-screen w-screen bg-main-b"
          animate={{ x: "-100%" }}
          exit={{ x: 0 }}
          transition={{ delay: 0.3, duration: 0.5, ease: "easeOut" }}
        />
        <motion.div
          className="fixed z-30 h-screen w-screen bg-main-p"
          animate={{ x: "-100%" }}
          exit={{ x: 0 }}
          transition={{ delay: 0.35, duration: 0.5, ease: "easeOut" }}
        />
        <Nav />
        <main className="text-white">
          <Outlet />
        </main>
      </div>
    </AnimatePresence>
  );
};
export default ScreenTransition;
