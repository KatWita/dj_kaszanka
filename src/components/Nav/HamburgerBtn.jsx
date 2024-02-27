const HamburgerBtn = ({ isOpen, setIsOpen }) => {
  return (
    <button
      className="flex w-[36px] flex-col justify-center gap-y-[5px] lg:hidden"
      onClick={() => {
        setIsOpen((prev) => !prev);
      }}
    >
      <span
        className={`h-[3px] w-full bg-white ${
          isOpen ? "translate-y-2 rotate-45" : "translate-y-0 rotate-0"
        } transition-all duration-300`}
      ></span>
      <span
        className={`h-[3px] w-full bg-white ${isOpen ? "opacity-0" : "opacity-100"} transition-opacity duration-300`}
      ></span>
      <span
        className={`h-[3px] w-full bg-white ${
          isOpen ? "-translate-y-2 -rotate-45" : "translate-y-0 rotate-0"
        } transition-all duration-300`}
      ></span>
    </button>
  );
};
export default HamburgerBtn;
