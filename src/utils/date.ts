import dayjs from "dayjs";
const isoWeeksInYear = require("dayjs/plugin/isoWeeksInYear");
const isLeapYear = require("dayjs/plugin/isLeapYear"); // dependent on isLeapYear plugin
dayjs.extend(isoWeeksInYear);
dayjs.extend(isLeapYear);

export const normalizeDate = (date: string | number) =>
  date.toString().padStart(2, "0");

export const daysInYear = (year: number) =>
  (year % 4 === 0 && year % 100 > 0) || year % 400 == 0 ? 366 : 365;

export const weeksInYear = (year: number) =>
  dayjs().year(year).isoWeeksInYear();
