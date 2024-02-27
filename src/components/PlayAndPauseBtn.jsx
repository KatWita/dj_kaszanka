import { FaRegCirclePlay, FaRegCirclePause } from "react-icons/fa6";

const PlayAndPauseBtn = ({ size, classnames, isPlaying, setIsPlaying }) => {
  return (
    <div className={classnames}>
      {isPlaying ? (
        <FaRegCirclePause
          size={size}
          className="cursor-pointer duration-300 hover:fill-main-r"
          onClick={() => setIsPlaying((prev) => !prev)}
        />
      ) : (
        <FaRegCirclePlay
          size={size}
          className="cursor-pointer duration-300 hover:fill-main-r"
          onClick={() => setIsPlaying((prev) => !prev)}
        />
      )}
    </div>
  );
};
export default PlayAndPauseBtn;
