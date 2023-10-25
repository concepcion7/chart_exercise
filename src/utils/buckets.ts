import dayjs, { Dayjs } from "dayjs";
import { daysInYear, normalizeDate, weeksInYear } from "./date";
import { DatesData, Bucket } from "./types";

import en from "dayjs/locale/en";
dayjs.locale({
  ...en,
  weekStart: 1,
});
const weekOfYear = require("dayjs/plugin/weekOfYear");
dayjs.extend(weekOfYear);
const dayOfYear = require("dayjs/plugin/dayOfYear");
dayjs.extend(dayOfYear);

export const buildDayBucketsArray = ({ fromDate, toDate }: DatesData) => {
  const numberOfDays = toDate.diff(fromDate, "days");

  let currentYear = fromDate.year();
  let currentDay = fromDate.dayOfYear();

  const buckets: Bucket[] = [];

  for (let index = 0; index <= numberOfDays; index++) {
    const currentDate = dayjs()
      .year(currentYear)
      .dayOfYear(currentDay)
      .format("YYYY-MM-DD");

    buckets.push({
      from: currentDate,
      to: currentDate,
    });

    currentDay += 1;
    if (currentDay === daysInYear(currentYear) + 1) {
      currentDay = 1;
      currentYear += 1;
    }
  }

  return buckets;
};

export const buildWeekBucketsArray = ({ fromDate, toDate }: DatesData) => {
  const fromDateWeekStart = fromDate.startOf("week");
  const toDateWeekStart = toDate.endOf("week");

  const numberOfWeeks = toDateWeekStart.diff(fromDateWeekStart, "weeks");

  let currentYear = fromDate.year();
  let currentWeek = fromDate.week();

  const buckets: Bucket[] = [];

  for (let index = 0; index <= numberOfWeeks; index++) {
    const startOfWeek = dayjs()
      .year(currentYear)
      .week(currentWeek)
      .startOf("week");
    const endOfWeek = dayjs().year(currentYear).week(currentWeek).endOf("week");

    const bucket = {
      from: startOfWeek.format("YYYY-MM-DD"),
      to: endOfWeek.format("YYYY-MM-DD"),
    };

    buckets.push(bucket);

    currentWeek += 1;
    if (currentWeek === weeksInYear(currentYear)) {
      currentWeek = 0;
      currentYear += 1;
    }
  }

  return buckets;
};

export const buildMonthBucketsArray = ({ fromDate, toDate }: DatesData) => {
  const fromDateMonthStart = fromDate.startOf("month");
  const toDateMonthStart = toDate.startOf("month");

  const numberOfMonths = toDateMonthStart.diff(fromDateMonthStart, "months");

  let currentYear = fromDate.year();
  let currentMonth = fromDate.month();

  const buckets: Bucket[] = [];

  for (let index = 0; index <= numberOfMonths; index++) {
    const daysOfMonth = dayjs()
      .year(currentYear)
      .month(currentMonth)
      .daysInMonth();

    buckets.push({
      from: `${currentYear}-${normalizeDate(currentMonth + 1)}-${normalizeDate(
        1
      )}`,
      to: `${currentYear}-${normalizeDate(currentMonth + 1)}-${normalizeDate(
        daysOfMonth
      )}`,
    });

    currentMonth += 1;
    if (currentMonth === 12) {
      currentMonth = 0;
      currentYear += 1;
    }
  }
  return buckets;
};

export const buildBuckets = (
  from: Dayjs,
  to: Dayjs,
  bucketType: string
): Bucket[] => {
  const fromDate = from;
  const toDate = to;
  let buckets = [] as Bucket[];
  if (!fromDate.isValid() || !toDate.isValid()) return buckets;
  const datesData = { fromDate, toDate };
  if (bucketType === "1") {
    return buildDayBucketsArray(datesData);
  } else if (bucketType === "2") {
    return buildWeekBucketsArray(datesData);
  } else if (bucketType === "3") {
    return buildMonthBucketsArray(datesData);
  }
  return buckets;
};

export const buildBucketLabel = (date: string, bucketType: string) => {
  if (bucketType === "1") return date;
  if (bucketType === "2") return dayjs(date, "YYYY-MM-DD").week().toString();
  if (bucketType === "3") return dayjs(date, "YYYY-MM-DD").format("MMM");
  return "";
};
