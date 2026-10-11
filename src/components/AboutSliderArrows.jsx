const arrowBase =
  "group absolute top-1/2 z-10 inline-block -translate-y-[56px] px-3 max-[350px]:hidden";

export function NextArrow({ onClick }) {
  return (
    <button
      type="button"
      aria-label="Next slides"
      className={`${arrowBase} -right-8 xl:-right-16`}
      onClick={onClick}
    >
      <div className="h-5 w-1 skew-x-20 bg-main-b-h duration-300 group-hover:bg-main-b"></div>
      <div className="h-5 w-1 skew-x-[-20deg] bg-main-b-h duration-300 group-hover:bg-main-b"></div>
    </button>
  );
}

export function PrevArrow({ onClick }) {
  return (
    <button
      type="button"
      aria-label="Previous slides"
      className={`${arrowBase} -left-8 xl:-left-16`}
      onClick={onClick}
    >
      <div className="h-5 w-1 skew-x-[-20deg] bg-main-b-h duration-300 group-hover:bg-main-b"></div>
      <div className="h-5 w-1 skew-x-20 bg-main-b-h duration-300 group-hover:bg-main-b"></div>
    </button>
  );
}
