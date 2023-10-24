import moment, { Moment } from "moment";
import { Bucket, daysInYear, normalizeDate, weeksInYear } from ".";

interface DatesData {
  fromDate: Moment;
  toDate: Moment;
}
export const buildDayBucketsArray = ({ fromDate, toDate }: DatesData) => {
  const numberOfDays = toDate.diff(fromDate, "days");

  const buckets = [];

  let currentYear = fromDate.year();

  let currentDay = fromDate.dayOfYear();

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
  const buckets = [];

  let currentYear = fromDate.year();
  let currentWeek = fromDate.week();

  console.log("currentYear", currentYear);

  for (let index = 0; index <= numberOfWeeks; index++) {
    let startOfWeek = moment()
      .year(currentYear)
      .week(currentWeek)
      .startOf("isoWeek");
    let endOfWeek = moment()
      .year(currentYear)
      .week(currentWeek)
      .endOf("isoWeek");

    console.log("index", index, startOfWeek);
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

  const buckets = [];

  let currentYear = fromDate.year();
  let currentMonth = fromDate.month();

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

export const buildBucketsArray = (
  datesData: DatesData,
  bucketType: number
): Bucket[] => {
  if (bucketType === 1) {
    return buildDayBucketsArray(datesData);
  } else if (bucketType === 2) {
    return buildWeekBucketsArray(datesData);
  } else if (bucketType === 3) {
    return buildMonthBucketsArray(datesData);
  }
  return [] as Bucket[];
};
