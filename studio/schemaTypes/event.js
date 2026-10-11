import { defineField, defineType } from "sanity";

export default defineType({
  name: "event",
  title: "Event",
  type: "document",
  fields: [
    defineField({
      name: "title",
      title: "Event name",
      type: "string",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "date",
      title: "Date & time",
      type: "datetime",
      options: { dateFormat: "DD.MM.YYYY", timeFormat: "HH:mm" },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "description",
      title: "Description",
      type: "text",
      rows: 3,
    }),
    defineField({
      name: "venue",
      title: "Venue",
      type: "string",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "place",
      title: "City (Country)",
      type: "string",
      description: "e.g. London (England)",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "ticketPrice",
      title: "Ticket price ($)",
      type: "number",
      validation: (rule) => rule.min(0),
    }),
    defineField({
      name: "ticketUrl",
      title: "Ticket link",
      type: "url",
      description: "Optional — where the BUY TICKET button leads",
    }),
  ],
  orderings: [
    { title: "Date (soonest first)", name: "dateAsc", by: [{ field: "date", direction: "asc" }] },
  ],
  preview: {
    select: { title: "title", date: "date", venue: "venue" },
    prepare: ({ title, date, venue }) => ({
      title,
      subtitle: [date && new Date(date).toLocaleDateString("en-GB"), venue].filter(Boolean).join(" · "),
    }),
  },
});
