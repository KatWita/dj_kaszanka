import { FaRegCirclePlay, FaRegCirclePause } from "react-icons/fa6";

const PlayAndPauseBtn = ({
  size,
  classnames,
  isPlaying,
  setIsPlaying,
  currentAudio,
  setCurrentAudio,
  index,
}) => {
  return (
    <div className={classnames}>
      {isPlaying ? (
        <FaRegCirclePause
          size={size}
          className="cursor-pointer duration-300 hover:fill-main-r"
          onClick={() => {
            setIsPlaying((prev) => !prev);
          }}
        />
      ) : (
        <FaRegCirclePlay
          size={size}
          className="cursor-pointer duration-300 hover:fill-main-r"
          onClick={() => {
            setIsPlaying((prev) => !prev);
            setCurrentAudio(index)
            console.log(currentAudio);
            console.log(index);

          }}
        />
      )}
    </div>
  );
};
export default PlayAndPauseBtn;
