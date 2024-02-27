import { NavLink } from "react-router-dom";
import { leftLinks } from "../../utils/navLinkData";

const NavLeftLinks = ({ isOpen, setIsOpen }) => {
  return (
    <div
      className={`absolute top-[24vh] flex flex-col items-center gap-10 lg:static lg:flex-row lg:gap-14 ${
        isOpen
          ? "left-[50%] translate-x-[-50%]"
          : "left-[-50%] translate-x-[-50%]"
      } transition-all duration-300 lg:w-1/3 lg:translate-x-0`}
    >
      {leftLinks.map((link) => {
        return (
          <NavLink
            key={link.title}
            to={link.path}
            className="music-wave text-2xl text-white duration-300 hover:text-main-p lg:text-base"
            onClick={() => setIsOpen(false)}
          >
            {link.title.toUpperCase()}
          </NavLink>
        );
      })}
    </div>
  );
};
export default NavLeftLinks;
