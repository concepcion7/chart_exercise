import dayjs from "dayjs";
import { buildBuckets } from "../src/utils/buckets";
import { BUCKET_TYPES } from "../src/utils/constants";

import { ONE_YEAR_AGO_1_MONTH } from "./mocks";
import { getRandomBetweenNumber } from "./utils";

describe("From 24/10/2022 - 24/10/2023. Bucket type: month", () => {
  let from = dayjs("2022-10-24");
  let to = dayjs("2023-10-24");

  let type = BUCKET_TYPES[2].id;

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

/*
  it("should return an array of buckets. From 24/04/2022 - 24/10/2023. Bucket type: month", () => {
    from = moment(to).subtract(0.5, "year");
    expect(buildBuckets(from, to, type)).toEqual(HALF_YEAR_AGO_1_MONTH);
  });
*/
