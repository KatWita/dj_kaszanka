import { NavLink } from "react-router-dom";

const ToursFilterBtns = ({
  setMonth,
  currentItem,
  setCurrentItem,
  setToursCount,
  tours,
}) => {
  // const tours = useLoaderData();
  const monthBtns = [
    ...new Set(
      tours.map(
        (tour) =>
          tour.date.month.charAt(0).toUpperCase() + tour.date.month.slice(1),
      ),
    ),
  ];

  return (
    <div className="flex flex-col items-center justify-center border-y-2 border-main-b px-6 py-1.5">
      <div className="flex gap-6 sm:gap-12 md:gap-16 lg:gap-24">
        {monthBtns.map((btn, index) => {
          return (
            <NavLink
              key={index}
              to="#"
              className={`duration-300 hover:text-main-p ${currentItem === index ? "text-main-p" : "text-white"}`}
              onClick={() => {
                setCurrentItem(index);
                setMonth(btn.toLowerCase());
                setToursCount(3);
              }}
            >
              {btn}
            </NavLink>
          );
        })}
      </div>
    </div>
  );
};
export default ToursFilterBtns;
