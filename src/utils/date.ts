import moment from "moment";

export const normalizeDate = (date: string | number) =>
  date.toString().padStart(2, "0");

export const daysInYear = (year: number) =>
  (year % 4 === 0 && year % 100 > 0) || year % 400 == 0 ? 366 : 365;

export const weeksInYear = (year: number) =>
  moment().year(year).isoWeeksInYear();
