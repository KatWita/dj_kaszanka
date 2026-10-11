import { Link } from "react-router";

// Renders a router <Link> when `to` is given (navigation),
// otherwise a real <button> (actions like "load more" or form submit).
const MainButton = ({
  to,
  content,
  classnames = "",
  type = "button",
  onClick,
  ...rest
}) => {
  const className = `main-btn relative inline-block px-10 py-3 text-center text-xs duration-300 hover:text-main-p min-[412px]:px-12 min-[412px]:text-sm ${classnames}`;

  const inner = (
    <>
      {content}
      <span className="absolute bottom-0 left-0 h-[60%] w-[2px] bg-linear-to-t from-main-b to-main-p"></span>
      <span className="absolute bottom-0 left-0 h-[2px] w-[82%] bg-linear-to-r from-main-b to-main-p"></span>
      <span className="absolute top-0 right-0 h-[60%] w-[2px] bg-linear-to-t from-main-p to-main-b"></span>
      <span className="absolute top-0 right-0 h-[2px] w-[82%] bg-linear-to-r from-main-p to-main-b"></span>
    </>
  );

  if (to) {
    return (
      <Link to={to} className={className} onClick={onClick} {...rest}>
        {inner}
      </Link>
    );
  }

  return (
    <button type={type} className={className} onClick={onClick} {...rest}>
      {inner}
    </button>
  );
};
export default MainButton;
