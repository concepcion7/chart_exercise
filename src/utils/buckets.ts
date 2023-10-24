import moment, { Moment } from "moment";
import { daysInYear, normalizeDate, weeksInYear } from "./date";
import { DatesData, Bucket } from "./types";

export const buildDayBucketsArray = ({ fromDate, toDate }: DatesData) => {
  const numberOfDays = toDate.diff(fromDate, "days");

  let currentYear = fromDate.year();
  let currentDay = fromDate.dayOfYear();

  const buckets = [];

  for (let index = 0; index <= numberOfDays; index++) {
    const currentDate = moment()
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
  const fromDateWeekStart = fromDate.startOf("isoWeek");

  const toDateWeekStart = toDate.startOf("isoWeek");

  const numberOfWeeks = toDateWeekStart.diff(fromDateWeekStart, "weeks");

  let currentYear = fromDate.year();
  let currentWeek = fromDate.week();

  const buckets = [];

  for (let index = 0; index <= numberOfWeeks; index++) {
    let startOfWeek = moment()
      .year(currentYear)
      .week(currentWeek)
      .startOf("isoWeek");
    let endOfWeek = moment()
      .year(currentYear)
      .week(currentWeek)
      .endOf("isoWeek");

    buckets.push({
      from: startOfWeek.format("YYYY-MM-DD"),
      to: endOfWeek.format("YYYY-MM-DD"),
    });

    currentWeek += 1;
    if (currentWeek === weeksInYear(currentYear) + 1) {
      currentWeek = 1;
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

  const buckets = [];

  for (let index = 0; index <= numberOfMonths; index++) {
    const daysOfMonth = moment({
      year: currentYear,
      month: currentMonth,
    }).daysInMonth();

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
      currentMonth = 1;
      currentYear += 1;
    }
  }

  return buckets;
};

export const buildRangeBuckets = (
  fromDate: Moment,
  toDate: Moment,
  bucketType: string
): Bucket[] => {
  const datesData = { fromDate: moment(fromDate), toDate: moment(toDate) };
  if (bucketType === "1") {
    return buildDayBucketsArray(datesData);
  } else if (bucketType === "2") {
    return buildWeekBucketsArray(datesData);
  } else if (bucketType === "3") {
    return buildMonthBucketsArray(datesData);
  }
  return [] as Bucket[];
};

export const buildBucketLabel = (date: string, bucketType: string) => {
  if (bucketType === "1") return date;
  if (bucketType === "2") return moment(date, "YYYY-MM-DD").week().toString();
  if (bucketType === "3") return moment(date, "YYYY-MM-DD").format("MMM");
  return "";
};
