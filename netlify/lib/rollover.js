const DAY = 24 * 60 * 60 * 1000;

/**
 * Decide new dates for events that already happened.
 * Each past event goes to the back of the queue: `gapDays` after the latest
 * scheduled event (or after `now` if nothing is scheduled), keeping its
 * original time of day. Oldest past events are moved first, so their order
 * is preserved and the schedule keeps rolling forever.
 *
 * @param {{_id: string, date: string}[]} events
 * @returns {{_id: string, from: string, to: string}[]}
 */
export function planRollover(events, now = new Date(), gapDays = 7) {
  const withTime = events
    .filter((e) => e.date)
    .map((e) => ({ ...e, time: new Date(e.date).getTime() }))
    .sort((a, b) => a.time - b.time);

  const past = withTime.filter((e) => e.time < now.getTime());
  if (past.length === 0) return [];

  const latest = Math.max(now.getTime(), ...withTime.map((e) => e.time));
  let cursor = new Date(latest);

  return past.map((event) => {
    const original = new Date(event.time);
    const next = new Date(cursor.getTime() + gapDays * DAY);
    // keep the event's original time of day (UTC), e.g. 19:00
    next.setUTCHours(original.getUTCHours(), original.getUTCMinutes(), 0, 0);
    cursor = next;
    return { _id: event._id, from: event.date, to: next.toISOString() };
  });
}
