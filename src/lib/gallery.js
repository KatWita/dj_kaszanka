import manifest from "../assets/gallery/photos.json";

// Vite turns every image into a hashed, cached URL
const thumbs = import.meta.glob("../assets/gallery/photos/*-640.webp", { eager: true, import: "default" });
const large = import.meta.glob("../assets/gallery/photos/*-1280.webp", { eager: true, import: "default" });

/** Gallery photos in display order: { name, alt, width, height, placeholder, thumb, large } */
export const photos = manifest.map((photo) => ({
  ...photo,
  thumb: thumbs[`../assets/gallery/photos/${photo.name}-640.webp`],
  large: large[`../assets/gallery/photos/${photo.name}-1280.webp`],
}));
