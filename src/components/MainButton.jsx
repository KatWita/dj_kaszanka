import { Link } from "react-router-dom";

const MainButton = ({ type, content, to, classnames, fnc }) => {
  return (
    <button
      onClick={fnc}
      type={type}
      className={`encode-sans main-btn md:text-md relative inline-block px-10 py-3 text-center text-xs duration-300 hover:text-main-p min-[412px]:px-12 min-[412px]:text-sm lg:text-sm ${classnames}`}
    >
      <Link to={to}>
        {content}
        <span className="absolute bottom-0 left-0 h-[60%] w-[2px] bg-gradient-to-t from-main-b to-main-p"></span>
        <span className="absolute bottom-0 left-0 h-[2px] w-[82%] bg-gradient-to-r from-main-b to-main-p"></span>
        <span className="absolute right-0 top-0 h-[60%] w-[2px] bg-gradient-to-t from-main-p to-main-b"></span>
        <span className="absolute right-0 top-0 h-[2px] w-[82%] bg-gradient-to-r from-main-p to-main-b"></span>
      </Link>
    </button>
  );
};
export default MainButton;
