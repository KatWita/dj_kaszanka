import { useState } from "react";
import Logo from "../Logo";
import NavLeftLinks from "./NavLeftLinks";
import NavRightLinks from "./NavRightLinks";
import HamburgerBtn from "./HamburgerBtn";

const Nav = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav
      className={`px-page ${isOpen ? "sticky" : "relative"} top-0 z-10 flex items-center justify-between bg-transparent py-2`}
    >
      <div
        className={`absolute top-0 z-0 min-h-screen w-screen bg-mobile-nav lg:hidden ${
          isOpen ? "left-0" : "left-[-100vw]"
        } transition-all duration-300`}
      ></div>
      <NavLeftLinks isOpen={isOpen} setIsOpen={setIsOpen} />
      <Logo wide="w-[170px] lg:w-[190px] xl:w-[237px]" />
      <NavRightLinks isOpen={isOpen} setIsOpen={setIsOpen} />
      <HamburgerBtn isOpen={isOpen} setIsOpen={setIsOpen} />
    </nav>
  );
};
export default Nav;
