import { sanity } from "./sanity";

const UPCOMING = `_type == "event" && dateTime(date) >= dateTime(now())`;

const monthKey = (d) => `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}`;

/** Months that have upcoming events, e.g. [{ key: "2026-11", from, to, label, short }] */
export async function fetchEventMonths() {
  const dates = await sanity.fetch(`*[${UPCOMING}] | order(date asc).date`);
  const months = new Map();
  for (const iso of dates) {
    const d = new Date(iso);
    const key = monthKey(d);
    if (months.has(key)) continue;
    const from = new Date(d.getFullYear(), d.getMonth(), 1);
    const to = new Date(d.getFullYear(), d.getMonth() + 1, 1);
    months.set(key, {
      key,
      from: from.toISOString(),
      to: to.toISOString(),
      label: from.toLocaleDateString("en-GB", { month: "long" }),
      short: from.toLocaleDateString("en-GB", { month: "short" }),
    });
  }
  return [...months.values()];
}

const PAGE_FIELDS = `{ _id, title, date, description, venue, place, ticketPrice, ticketUrl }`;

/** One page of upcoming events in a month, plus how many there are in total. */
export async function fetchEventsPage({ from, to, start, size }) {
  const filter = `${UPCOMING} && dateTime(date) >= dateTime($from) && dateTime(date) < dateTime($to)`;
  return sanity.fetch(
    `{
      "items": *[${filter}] | order(date asc) [$start...$end] ${PAGE_FIELDS},
      "total": count(*[${filter}])
    }`,
    { from, to, start, end: start + size },
  );
}
