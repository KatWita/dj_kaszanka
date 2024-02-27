import { FaItunes, FaSpotify, FaYoutube } from "react-icons/fa6";
import { Link } from "react-router-dom";

const MusicSitesIcons = () => {
  return (
    <div className="flex items-center gap-6">
      <Link to="https://itunes.com" target="_blank" rel="noopener noreferrer">
        <FaItunes size={32} className="duration-300 hover:fill-main-r" />
      </Link>
      <Link to="https://spotify.com" target="_blank" rel="noopener noreferrer">
        <FaSpotify size={30} className="duration-300 hover:fill-main-r" />
      </Link>
      <Link to="https://youtube.com" target="_blank" rel="noopener noreferrer">
        <FaYoutube size={36} className="duration-300 hover:fill-main-r" />
      </Link>
    </div>
  );
};
export default MusicSitesIcons;
