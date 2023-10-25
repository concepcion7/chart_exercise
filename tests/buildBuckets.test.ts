import dayjs from "dayjs";
import { buildBuckets } from "../src/utils/buckets";
import { BUCKET_TYPES } from "../src/utils/constants";

import { ONE_YEAR_AGO_1_MONTH } from "./mocks";
import {
  getNumberOfMonthsBetweenRanges,
  getNumberOfWeeksBetweenRanges,
  getRandomDateBetweenRanges,
} from "./utils";

describe("Building array of intervals/buckets from two dates: from-to and a bucket type (1D, 1W, 1M)", () => {
  describe("From 24/10/2022 - 24/10/2023. Bucket type: month", () => {
    const from = dayjs("2022-10-24");
    const to = dayjs("2023-10-24");

    const type = BUCKET_TYPES[2].id;

    it("should return an array of buckets.", () => {
      expect(buildBuckets(from, to, type)).toEqual(ONE_YEAR_AGO_1_MONTH);
    });

    it("should have 13 elements.", () => {
      expect(buildBuckets(from, to, type).length).toBe(13);
    });

    it("should starts at day 1 of the first month/from date.", () => {
      const firstDay = `${from.format("YYYY-MM")}-01`;
      expect(buildBuckets(from, to, type)[0].from).toBe(firstDay);
    });

    it("should finishes at the last day of the last month/to date.", () => {
      const lastDay = to.daysInMonth();
      const lastDatDate = dayjs()
        .year(to.year())
        .month(to.month())
        .date(lastDay)
        .format("YYYY-MM-DD");
      const buckets = buildBuckets(from, to, type);
      expect(buckets[buckets.length - 1].to).toBe(lastDatDate);
    });
  });

  describe("Any couple of dates where From <= To. Bucket type: Month", () => {
    const from = dayjs(
      getRandomDateBetweenRanges(new Date("2015-01-01"), new Date("2018-01-01"))
    );
    const to = dayjs(
      getRandomDateBetweenRanges(from.toDate(), new Date("2030-01-01"))
    );

    const type = BUCKET_TYPES[2].id;
    it("should starts at day 1 of the first month/from date.", () => {
      const firstDay = `${from.format("YYYY-MM")}-01`;
      expect(buildBuckets(from, to, type)[0].from).toBe(firstDay);
    });

    it("should finishes at the last day of the last month/to date.", () => {
      const lastDay = to.daysInMonth();
      const lastDatDate = dayjs()
        .year(to.year())
        .month(to.month())
        .date(lastDay)
        .format("YYYY-MM-DD");
      const buckets = buildBuckets(from, to, type);

      expect(buckets[buckets.length - 1].to).toBe(lastDatDate);
    });

    it("should have as a length the number of months between From and To.", () => {
      const numberOfMonths =
        getNumberOfMonthsBetweenRanges(from.toDate(), to.toDate()) + 1;

      expect(buildBuckets(from, to, type).length).toBe(numberOfMonths);
    });
  });

  describe("Any couple of dates where From <= To. Bucket type: Week", () => {
    const from = dayjs(
      getRandomDateBetweenRanges(new Date("2017-01-01"), new Date("2018-01-01"))
    );
    const to = dayjs(
      getRandomDateBetweenRanges(from.toDate(), new Date("2020-01-01"))
    );

    const type = BUCKET_TYPES[1].id;

    it("should have as a length the number of weeks between From and To.", () => {
      const numberOfWeeks = getNumberOfWeeksBetweenRanges(from, to) + 1;

      expect(buildBuckets(from, to, type).length).toBe(numberOfWeeks);
    });
  });

  describe("First day of a year, both From and To. Bucket: Weeks", () => {
    const from = dayjs("2017-01-01");
    const to = dayjs("2017-01-01");

    const type = BUCKET_TYPES[1].id;

    it("should have length 1.", () => {
      expect(buildBuckets(from, to, type).length).toBe(1);
    });
  });

  describe("Last day of a year, day 15 of the next year. Bucket: Weeks", () => {
    const from = dayjs("2017-12-31");
    const to = dayjs("2018-01-15");

    const type = BUCKET_TYPES[1].id;

    it("should have length 4.", () => {
      // One from the last week (we including the whole week (M..S) in any day, regardless of its position (last, first...))
      // 2nd first week of January
      // 3rd second week of January
      // 4th, the week of January 15h that is Monday so it is a new whole week

      expect(buildBuckets(from, to, type).length).toBe(4);
    });
  });

  describe("From: First day of a year. To: 3 March. No lap-year. Bucket: days", () => {
    const from = dayjs("2017-01-01");
    const to = dayjs("2017-03-03");

    const type = BUCKET_TYPES[0].id;

    it("should have length 62.", () => {
      expect(buildBuckets(from, to, type).length).toBe(62);
    });
  });

  describe("From: First day of a year. To: 3 March. In a lap-year. Bucket: days", () => {
    const from = dayjs("2016-01-01");
    const to = dayjs("2016-03-03");

    const type = BUCKET_TYPES[0].id;

    it("should have length 63.", () => {
      expect(buildBuckets(from, to, type).length).toBe(63);
    });
  });
});
