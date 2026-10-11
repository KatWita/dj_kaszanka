import { motion } from "motion/react";
import MainButton from "./MainButton";

const formatDay = (iso) => new Date(iso).toLocaleDateString("en-GB", { day: "numeric" });
// "NOV 2026": 3-letter months always fit the date column (and avoid en-GB's "Sept")
const MONTHS = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
const formatMonthYear = (iso) => {
  const d = new Date(iso);
  return `${MONTHS[d.getMonth()]} ${d.getFullYear()}`;
};

const TourRow = ({ tour }) => (
  <motion.div
    initial={{ opacity: 0, y: 24 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.4, ease: "easeOut" }}
    className="relative w-full lg:flex lg:justify-between"
  >
    <div className="flex flex-col items-center border-t-2 border-main-r px-6 pt-4 text-center lg:min-w-[180px] lg:border-t-0 lg:border-l-2 lg:pt-0">
      <time dateTime={tour.date} className="contents">
        <p className="font-bruno-ace text-[3.25rem] leading-none">{formatDay(tour.date)}</p>
        <p className="font-bruno-ace text-[1.063rem] whitespace-nowrap uppercase lg:mt-1">
          {formatMonthYear(tour.date)}
        </p>
      </time>
    </div>
    <div className="mt-6 text-center lg:mt-0 lg:pr-4 lg:text-left xl:pr-6 xl:pl-6 2xl:pr-6 2xl:pl-12">
      <p className="font-bold text-main-r uppercase">{tour.title}</p>
      {tour.description && <p className="mt-3 text-[0.938rem]">{tour.description}</p>}
    </div>
    <div className="mt-6 border-y border-border-tours py-4 text-center lg:mt-0 lg:min-w-[160px] lg:border-x lg:border-y-0 lg:px-6 lg:py-0 lg:text-left min-[72.5rem]:min-w-[220px] xl:min-w-[220px] 2xl:min-w-[240px]">
      <p className="uppercase lg:text-[0.875rem]">venue</p>
      <p className="mt-3 font-bold text-main-r uppercase">{tour.venue}</p>
      <p className="text-[0.7rem] text-white uppercase lg:text-[0.65rem]">{tour.place}</p>
    </div>
    <div className="pt-4 text-center lg:flex lg:gap-8 lg:pt-0 lg:pl-4 lg:text-left xl:gap-10 xl:pl-6 2xl:pl-8">
      <div>
        <p className="uppercase lg:text-[0.875rem]">tickets</p>
        <p className="mt-3 font-bruno-ace text-3xl">
          {tour.ticketPrice != null ? `${tour.ticketPrice}$` : "TBA"}
        </p>
      </div>
      <MainButton
        content="BUY TICKET"
        href={tour.ticketUrl || undefined}
        aria-label={`Buy ticket for ${tour.title}`}
        classnames="lg:self-center lg:w-[180px] mt-3 lg:mt-0"
      />
    </div>
    <div className="absolute bottom-[-15px] left-1/2 h-px w-[98%] -translate-x-1/2 bg-border-tours"></div>
  </motion.div>
);

// Placeholder rows shown while the first page loads
const SkeletonRow = () => (
  <div className="w-full animate-pulse lg:flex lg:items-center lg:gap-8" aria-hidden="true">
    <div className="mx-auto h-20 w-36 border-t-2 border-main-r/40 bg-white/5 lg:mx-0 lg:border-t-0 lg:border-l-2" />
    <div className="mt-6 flex-1 space-y-3 lg:mt-0">
      <div className="mx-auto h-4 w-1/2 bg-white/10 lg:mx-0" />
      <div className="h-3 w-full bg-white/5" />
      <div className="h-3 w-4/5 bg-white/5" />
    </div>
    <div className="mx-auto mt-6 h-16 w-48 bg-white/5 lg:mt-0" />
  </div>
);

const Tours = ({ tours, total, status, isFetchingMore, hasMore, onLoadMore, onRetry }) => {
  if (status === "pending") {
    return (
      <div className="mt-12 mb-14 flex w-full flex-col gap-20 lg:gap-8" role="status">
        <span className="sr-only">Loading upcoming dates…</span>
        <SkeletonRow />
        <SkeletonRow />
        <SkeletonRow />
      </div>
    );
  }

  if (status === "error") {
    return (
      <div className="mt-12 mb-14 flex flex-col items-center gap-6 text-center" role="alert">
        <p>Couldn&apos;t load the dates. Check your connection and try again.</p>
        <MainButton content="TRY AGAIN" onClick={onRetry} classnames="lg:w-[200px]" />
      </div>
    );
  }

  if (tours.length === 0) {
    return (
      <p className="mt-12 mb-14 text-center text-white/70">
        No upcoming dates yet. Check back soon!
      </p>
    );
  }

  return (
    <div className="mt-12 mb-14 flex w-full flex-col gap-20 lg:gap-8">
      {tours.map((tour) => (
        <TourRow key={tour._id} tour={tour} />
      ))}
      {hasMore && (
        <MainButton
          content={isFetchingMore ? "LOADING…" : "LOAD MORE"}
          onClick={onLoadMore}
          disabled={isFetchingMore}
          aria-label={`Load more dates (${tours.length} of ${total} shown)`}
          classnames="mt-8 mb-6 lg:mb-0 w-full lg:w-[200px] lg:mx-auto disabled:opacity-60"
        />
      )}
    </div>
  );
};
export default Tours;
