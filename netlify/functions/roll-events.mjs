import { createClient } from "@sanity/client";
import { planRollover } from "../lib/rollover.js";

/**
 * Scheduled function (daily): events whose date has passed are moved to the
 * end of the schedule, so Tours always shows upcoming dates.
 * Needs SANITY_WRITE_TOKEN (an Editor token) in Netlify environment variables.
 */
export default async () => {
  const token = process.env.SANITY_WRITE_TOKEN;
  if (!token) {
    console.error("roll-events: SANITY_WRITE_TOKEN is not set");
    return new Response("Missing SANITY_WRITE_TOKEN", { status: 500 });
  }

  const sanity = createClient({
    projectId: process.env.SANITY_PROJECT_ID ?? "ilsbdrk7",
    dataset: process.env.SANITY_DATASET ?? "production",
    apiVersion: "2026-10-01",
    token,
    useCdn: false, // always read the latest data before writing
  });

  // published events only (drafts are left alone)
  const events = await sanity.fetch(`*[_type == "event" && !(_id in path("drafts.**"))]{ _id, date }`);
  const plan = planRollover(events, new Date());

  if (plan.length === 0) {
    console.log("roll-events: nothing to move");
    return new Response("Nothing to move");
  }

  const tx = sanity.transaction();
  for (const { _id, to } of plan) tx.patch(_id, { set: { date: to } });
  await tx.commit();

  for (const { _id, from, to } of plan) console.log(`roll-events: ${_id} ${from} -> ${to}`);
  return new Response(`Moved ${plan.length} event(s)`);
};

export const config = {
  schedule: "@daily", // 00:00 UTC every day
};
