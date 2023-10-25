import dayjs, { Dayjs } from "dayjs";

import en from "dayjs/locale/en";
dayjs.locale({
  ...en,
  weekStart: 1,
});

export const getRandomBetweenNumber = (min: number, max: number): number =>
  Math.max(0, Math.floor(Math.random() * (max - min + 1)) + min - 1);

export const getRandomDateBetweenRanges = (start: Date, end: Date) =>
  new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime()));

export const getNumberOfMonthsBetweenRanges = (from: Date, to: Date) =>
  to.getMonth() -
  from.getMonth() +
  12 * (to.getFullYear() - from.getFullYear());

export const getNumberOfWeeksBetweenRanges = (from: Dayjs, to: Dayjs) => {
  const fromDateWeekStart = from.startOf("week");
  const toDateWeekStart = to.endOf("week");
  return toDateWeekStart.diff(fromDateWeekStart, "weeks");
};
