export function NextArrow({ style, onClick }) {
  return (
    <div
      className="group absolute -right-8 top-1/2 -translate-y-[calc(56px)] px-3 lg:cursor-pointer xl:-right-16 z-10"
      style={{ ...style, display: "inline-block" }}
      onClick={onClick}
    >
      <div className="bg-main-b-h h-5 w-1 skew-x-[20deg] duration-300 group-hover:bg-main-b"></div>
      <div className="bg-main-b-h h-5 w-1 -skew-x-[20deg] duration-300 group-hover:bg-main-b"></div>
    </div>
  );
}

export function PrevArrow({ style, onClick }) {
  return (
    <div
      className="group absolute -left-8 top-1/2 -translate-y-[calc(56px)] px-3 lg:cursor-pointer xl:-left-16 z-10"
      style={{ ...style, display: "inline-block" }}
      onClick={onClick}
    >
      <div className="bg-main-b-h h-5 w-1 -skew-x-[20deg] duration-300 group-hover:bg-main-b"></div>
      <div className="bg-main-b-h h-5 w-1 skew-x-[20deg] duration-300 group-hover:bg-main-b"></div>
    </div>
  );
}
