import { Link } from "react-router-dom";
import { FaInstagram, FaFacebookSquare } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";

const SocialIcons = ({ classnames, cl }) => {
  return (
    <div className={`flex ${classnames}`}>
      <Link to="https://facebook.com" target="_blank" rel="noopener noreferrer">
        <FaFacebookSquare
          size={32}
          className={`duration-300 hover:fill-main-r`}
        />
      </Link>
      <Link to="https://twitter.com" target="_blank" rel="noopener noreferrer">
        <FaXTwitter size={32} className={`duration-300 hover:fill-main-r`} />
      </Link>
      <Link
        to="https://instagram.com"
        target="_blank"
        rel="noopener noreferrer"
      >
        <FaInstagram size={32} className={`duration-300 hover:fill-main-r`} />
      </Link>
    </div>
  );
};
export default SocialIcons;
