import { useState } from "react";
import Logo from "../Logo";
import NavLeftLinks from "./NavLeftLinks";
import NavRightLinks from "./NavRightLinks";
import HamburgerBtn from "./HamburgerBtn";

const Nav = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav
      className={`lg:px-22 ${isOpen ? "sticky" : "relative"} top-0 z-10 flex items-center justify-between bg-transparent px-10 py-2 max-[350px]:px-4 xl:px-24 2xl:px-44 min-[1700px]:px-[18rem]`}
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
