// import { useLoaderData } from "react-router-dom";
import MainButton from "./MainButton";

const Tours = ({ month, toursCount, setToursCount, tours }) => {
  // const tours = useLoaderData();

  const handleClick = () => {
    setToursCount(toursCount + 2);
  };
  const filtered = tours.filter((tour) => tour.date.month === month);
  const filteredTours = tours
    .filter((tour) => tour.date.month === month)
    .slice(0, toursCount);

  return (
    <div className="mb-14 mt-12 flex flex-col gap-20 lg:gap-8">
      {filteredTours.map((tour) => {
        return (
          <div
            key={tour.id}
            className="relative w-full lg:flex lg:justify-between"
          >
            <div className=" flex flex-col items-center border-t-2  border-main-r px-6 pt-4 text-center lg:min-w-[180px] lg:border-l-2 lg:border-t-0 lg:pt-0">
              <p className="font-bruno-ace text-[3.25rem] leading-none">
                {tour.date.day}
              </p>
              <p className="font-bruno-ace text-[1.063rem] uppercase lg:mt-1">
                {`${tour.date.month} ${tour.date.year}`}
              </p>
            </div>
            <div className="mt-6 text-center lg:mt-0 lg:pr-4 lg:text-left xl:pl-6 xl:pr-6 2xl:pl-12 2xl:pr-6">
              <p className="font-bold uppercase text-main-r">{tour.event}</p>
              <p className="mt-3 text-[0.938rem]">{tour.info}</p>
            </div>
            <div className="mt-6 border-y-[1px] border-border-tours py-4 text-center lg:mt-0 lg:min-w-[160px] lg:border-x-[1px] lg:border-y-0 lg:px-6 lg:py-0 lg:text-left min-[1160px]:min-w-[220px] xl:min-w-[220px] 2xl:min-w-[240px]">
              <p className="uppercase lg:text-[0.875rem]">venue</p>
              <p className="mt-3 font-bold uppercase text-main-r">
                {tour.venue}
              </p>
              <p className="text-[0.7rem] uppercase text-white lg:text-[0.65rem]">
                {tour.place}
              </p>
            </div>
            <div className="pt-4 text-center lg:flex lg:gap-8 lg:pl-4 lg:pt-0 lg:text-left xl:gap-10 xl:pl-6 2xl:pl-8">
              <div className="">
                <p className="uppercase lg:text-[0.875rem]">tickets</p>
                <p className="mt-3 font-bruno-ace text-3xl">
                  {tour.ticketPrice}$
                </p>
              </div>
              <MainButton
                content="BUY TICKET"
                to="#"
                classnames="lg:self-center lg:w-[180px] mt-3 lg:mt-0"
              />
            </div>
            <div className="absolute -bottom-[15px] left-1/2 h-[1px] w-[98%] -translate-x-1/2 bg-border-tours"></div>
          </div>
        );
      })}
      {filteredTours.length === filtered.length || (
        <MainButton
          type="button"
          content="LOAD MORE"
          to="#"
          classnames="mt-8 mb-6 lg:mb-0 w-full lg:w-[200px] lg:mx-auto"
          fnc={handleClick}
        />
      )}
    </div>
  );
};
export default Tours;
