import { useCallback, useState } from "react";

/**
 * Grid thumbnail: the box has the photo's proportions from the start (no layout
 * jump), shows a blurred tiny placeholder, and fades the real image in once loaded.
 */
const GalleryThumb = ({ photo, onOpen }) => {
  const [loaded, setLoaded] = useState(false);

  // images already in the browser cache fire `load` before React attaches the
  // handler, so also check `complete` when the element mounts
  const imgRef = useCallback((img) => {
    if (img?.complete && img.naturalWidth > 0) setLoaded(true);
  }, []);

  return (
    <button
      type="button"
      onClick={onOpen}
      aria-label={`Open photo: ${photo.alt}`}
      className="group relative block w-full overflow-hidden border border-main-b-h focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-main-r"
    >
      <span
        aria-hidden="true"
        className="absolute inset-0 scale-110 bg-cover bg-center blur-lg"
        style={{ backgroundImage: `url(${photo.placeholder})` }}
      />
      <img
        ref={imgRef}
        src={photo.thumb}
        alt=""
        width={640}
        height={Math.round((640 * photo.height) / photo.width)}
        loading="lazy"
        decoding="async"
        onLoad={() => setLoaded(true)}
        className={`relative block aspect-(--ar) w-full object-cover transition duration-500 md:aspect-[440/263] lg:group-hover:scale-[1.05] ${loaded ? "opacity-100" : "opacity-0"}`}
        style={{ "--ar": `${photo.width} / ${photo.height}` }}
      />
    </button>
  );
};

export default GalleryThumb;
