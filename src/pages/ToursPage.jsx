import { motion } from "motion/react";
import SectionTitle from "../components/SectionTitle";
import triangle from "../assets/triangle-contact.svg";
import { redPattern, bluePattern, purplePattern } from "../assets/tours";
import ToursFilterBtns from "../components/ToursFilterBtns";
import Tours from "../components/Tours";
import { useState } from "react";
import { useInfiniteQuery, useQuery } from "@tanstack/react-query";
import { fetchEventMonths, fetchEventsPage } from "../lib/events";

const PAGE_SIZE = 3;

const ToursPage = () => {
  const monthsQuery = useQuery({ queryKey: ["event-months"], queryFn: fetchEventMonths });
  const months = monthsQuery.data ?? [];
  const [selectedKey, setSelectedKey] = useState(null);
  // default to the first month that has events
  const month = months.find((m) => m.key === selectedKey) ?? months[0];

  const eventsQuery = useInfiniteQuery({
    queryKey: ["events", month?.key],
    enabled: Boolean(month),
    initialPageParam: 0,
    queryFn: ({ pageParam }) =>
      fetchEventsPage({ from: month.from, to: month.to, start: pageParam, size: PAGE_SIZE }),
    // next page starts where the loaded ones end, until we have them all
    getNextPageParam: (lastPage, pages) => {
      const loaded = pages.reduce((n, page) => n + page.items.length, 0);
      return loaded < lastPage.total ? loaded : undefined;
    },
  });

  const tours = eventsQuery.data?.pages.flatMap((page) => page.items) ?? [];
  const total = eventsQuery.data?.pages[0]?.total ?? 0;
  // one combined status for the list: months request first, then events
  const status =
    monthsQuery.isError || eventsQuery.isError
      ? "error"
      : monthsQuery.isPending || (month && eventsQuery.isPending)
        ? "pending"
        : "success";

  return (
    <motion.section
      initial={{ x: "-200vw" }}
      animate={{ x: 0 }}
      transition={{ duration: 1 }}
      className="pb-player px-page relative overflow-hidden lg:flex lg:min-h-[calc(100vh-81px)]"
    >
      <div className="mt-16 w-full lg:mt-[114px]">
        <SectionTitle
          text="Upcoming"
          redText="dates"
          triangle={triangle}
          twoPart={true}
        />
        <div className="mt-6 flex w-full flex-col items-center justify-center">
          {months.length > 0 && (
            <ToursFilterBtns months={months} selectedKey={month?.key} onSelect={setSelectedKey} />
          )}
          <Tours
            tours={tours}
            total={total}
            status={status}
            hasMore={eventsQuery.hasNextPage}
            isFetchingMore={eventsQuery.isFetchingNextPage}
            onLoadMore={() => eventsQuery.fetchNextPage()}
            onRetry={() => (monthsQuery.isError ? monthsQuery.refetch() : eventsQuery.refetch())}
          />
        </div>
        <div className="absolute inset-0 z-[-1]">
          <img
            src={redPattern}
            className="absolute -left-12 top-124 z-[-1] w-20 max-[340px]:-left-14 lg:-left-40 lg:top-160 lg:w-36 xl:-left-20 xl:top-164 2xl:left-0 2xl:top-160 3xl:left-24"
          />
          <img
            src={bluePattern}
            className="absolute -right-12 top-0 z-[-1] w-24 max-[340px]:-right-12 md:right-20 md:top-10 lg:right-20 lg:top-10 lg:w-40 xl:right-40 2xl:right-56 3xl:right-88"
          />
          <img
            src={purplePattern}
            className="absolute -right-16 top-240 z-[-1] w-28 md:top-192 lg:-right-60 lg:top-144 lg:w-52 xl:-right-32 2xl:-right-12 3xl:right-16"
          />
        </div>
      </div>
    </motion.section>
  );
};
export default ToursPage;
