// Integration test
// Testing from dates && a bucket type to array with total value

import dayjs from "dayjs";
import { buildBuckets } from "../src/utils/buckets/buckets";
import { BUCKET_TYPES, ONE_YEAR_AGO, TODAY } from "../src/utils/constants";
import { TOTAL_VALUE } from "./mocks";
import { getRandomBetweenNumber } from "./utils";
import { Bucket, BucketData } from "../src/utils/types";
import { fetchBuckets } from "../src/utils/buckets/fetch";

global.fetch = jest.fn((mock) =>
  Promise.resolve({
    json: () => Promise.resolve({ total_count: TOTAL_VALUE }),
  })
);

// final array to be painted
describe("Building an array with data from two dates: from && to && a Bucket Type", () => {
  describe("Basic case. App just opened: from: JustNow - 1 Year .. JustNow", () => {
    const to = TODAY;
    const from = ONE_YEAR_AGO;

    const type = BUCKET_TYPES[2].id;

    it("should have length 13", async () => {
      const buckets = buildBuckets(from, to, type);

      const bucketsData = await fetchBuckets(buckets, type);
      expect(bucketsData.length).toBe(13);
    });

    it("should have first element of results = same month as From date month", async () => {
      const buckets = buildBuckets(from, to, type);

      const bucketsData = await fetchBuckets(buckets, type);

      expect(from.format("MMM")).toBe(bucketsData[0].label);
    });

    it("should have inner element of result with the month = same index at original buckets", async () => {
      const buckets: Bucket[] = buildBuckets(from, to, type);

      const bucketsData: BucketData[] = await fetchBuckets(buckets, type);
      const bucketsResultLength = bucketsData.length;
      const index = getRandomBetweenNumber(0, bucketsResultLength);

      const elementFromBuckets = dayjs(
        buckets[index].from,
        "YYYY-MM-DD"
      ).format("MMM");
      const elementFromBucketsData = bucketsData[index].label;
      expect(elementFromBucketsData).toBe(elementFromBuckets);
    });
  });
});
