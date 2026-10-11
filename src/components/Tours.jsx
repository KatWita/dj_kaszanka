import { motion } from "motion/react";
import MainButton from "./MainButton";

const formatDay = (iso) => new Date(iso).toLocaleDateString("en-GB", { day: "numeric" });
// "NOV 2026": 3-letter months always fit the date column (and avoid en-GB's "Sept")
const MONTHS = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
const formatMonthYear = (iso) => {
  const d = new Date(iso);
  return `${MONTHS[d.getMonth()]} ${d.getFullYear()}`;
};

// Desktop: a grid with fixed column widths, so every row lines up the same
// no matter how long the title/description/venue is (only the info column flexes).
const ROW_GRID =
  "lg:grid lg:grid-cols-[180px_minmax(0,1fr)_160px_auto] min-[72.5rem]:grid-cols-[180px_minmax(0,1fr)_220px_auto] 2xl:grid-cols-[180px_minmax(0,1fr)_240px_auto]";

// Only rows added by "Load more" slide in; the first page arrives with the page itself.
const TourRow = ({ tour, animateIn }) => (
  <motion.div
    initial={animateIn ? { opacity: 0, y: 24 } : false}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.4, ease: "easeOut" }}
    className={`relative w-full ${ROW_GRID}`}
  >
    <div className="flex flex-col items-center border-t-2 border-main-r px-6 pt-4 text-center lg:border-t-0 lg:border-l-2 lg:pt-0">
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
    <div className="mt-6 min-w-0 border-y border-border-tours py-4 text-center break-words lg:mt-0 lg:border-x lg:border-y-0 lg:px-6 lg:py-0 lg:text-left">
      <p className="uppercase lg:text-[0.875rem]">venue</p>
      <p className="mt-3 font-bold text-main-r uppercase">{tour.venue}</p>
      <p className="text-[0.7rem] text-white uppercase lg:text-[0.65rem]">{tour.place}</p>
    </div>
    <div className="pt-4 text-center lg:flex lg:gap-8 lg:pt-0 lg:pl-4 lg:text-left xl:gap-10 xl:pl-6 2xl:pl-8">
      {/* fixed width, so "20$" and "149$" rows keep the button in the same place */}
      <div className="lg:w-24">
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

// Placeholder rows shown while the first page loads: the same grid, borders and
// separators as a real row, with thin sharp bars where the text will be.
const Bar = ({ className }) => <span className={`mx-auto block lg:mx-0 ${className}`} />;

const SkeletonRow = () => (
  <div className={`relative w-full animate-pulse ${ROW_GRID}`} aria-hidden="true">
    <div className="flex flex-col items-center gap-2 border-t-2 border-main-r px-6 pt-4 lg:border-t-0 lg:border-l-2 lg:pt-1">
      <Bar className="h-[52px] w-16 bg-white/15" />
      <Bar className="h-4 w-24 bg-white/10" />
    </div>
    <div className="mt-6 space-y-4 lg:mt-0 lg:pr-4 xl:pr-6 xl:pl-6 2xl:pr-6 2xl:pl-12">
      <Bar className="h-3.5 w-48 max-w-full bg-main-r/40" />
      <Bar className="h-2.5 w-full bg-white/10" />
      <Bar className="h-2.5 w-3/4 bg-white/10" />
    </div>
    <div className="mt-6 space-y-3 border-y border-border-tours py-4 lg:mt-0 lg:border-x lg:border-y-0 lg:px-6 lg:py-0">
      <Bar className="h-2.5 w-12 bg-white/15" />
      <Bar className="mt-5 h-3.5 w-28 bg-main-r/40" />
      <Bar className="h-2 w-20 bg-white/10" />
    </div>
    <div className="flex flex-col items-center gap-3 pt-4 lg:flex-row lg:gap-8 lg:pt-0 lg:pl-4 xl:gap-10 xl:pl-6 2xl:pl-8">
      <div className="space-y-3 lg:w-24">
        <Bar className="h-2.5 w-14 bg-white/15" />
        <Bar className="mt-5 h-7 w-14 bg-white/15" />
      </div>
      {/* the BUY TICKET button's corner lines, dimmed */}
      <span className="relative block h-[42px] w-[180px] opacity-40">
        <span className="absolute bottom-0 left-0 h-[60%] w-[2px] bg-linear-to-t from-main-b to-main-p" />
        <span className="absolute bottom-0 left-0 h-[2px] w-[82%] bg-linear-to-r from-main-b to-main-p" />
        <span className="absolute top-0 right-0 h-[60%] w-[2px] bg-linear-to-t from-main-p to-main-b" />
        <span className="absolute top-0 right-0 h-[2px] w-[82%] bg-linear-to-r from-main-p to-main-b" />
      </span>
    </div>
    <div className="absolute bottom-[-15px] left-1/2 h-px w-[98%] -translate-x-1/2 bg-border-tours"></div>
  </div>
);

const Tours = ({ tours, total, status, isFetchingMore, hasMore, onLoadMore, onRetry, firstPageSize = 3 }) => {
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
      {tours.map((tour, i) => (
        <TourRow key={tour._id} tour={tour} animateIn={i >= firstPageSize} />
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
