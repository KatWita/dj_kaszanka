import triangle from "../assets/triangle-contact.svg";

const AlbumsCovers = ({ albums, setCurrentAlbum, currentAlbum }) => {
  return (
    <div className="flex flex-col items-center">
      <h3 className="relative mb-5">
        <img
          src={triangle}
          className="absolute -left-8 -top-4 -z-[1] w-10 lg:-top-4 xl:-left-12 xl:-top-8 xl:w-14"
        />
        Choose <span className="text-main-r">album</span>:
      </h3>
      <div className="flex gap-5 lg:flex-col">
        {albums.map(({ cover, name }, index) => {
          return (
            <button
              key={name}
              className="group block"
              onClick={() => {
                setCurrentAlbum(index);
              }}
            >
              <img
                src={cover}
                alt={`${name} album cover`}
                className={`border-[1px] lg:w-[160px] xl:w-[200px] ${currentAlbum === index ? "scale-105 border-main-r" : "border-white"} duration-300 group-hover:border-main-r`}
              />
            </button>
          );
        })}
      </div>
    </div>
  );
};
export default AlbumsCovers;
