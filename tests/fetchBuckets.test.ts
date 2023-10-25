import {
  ONE_YEAR_AGO_1_MONTH,
  ONE_YEAR_AGO_1_MONTH_URLS,
  THREE_MONTHS_AGO_1_MONTH,
  THREE_MONTHS_AGO_1_MONTH_RESULT_BUCKETS,
  THREE_MONTHS_AGO_1_MONTH_URLS,
  TOTAL_VALUE,
} from "./mocks";
import { BUCKET_TYPES } from "../src/utils/constants";
import { buildBucketFetchURLs, fetchBuckets } from "../src/utils/buckets/fetch";

global.fetch = jest.fn((mock) =>
  Promise.resolve({
    json: () => Promise.resolve({ total_count: TOTAL_VALUE }),
  })
);

describe("Executing request/s from a array of URLs. BUCKET TYPE: 1 MONTH", () => {
  describe("Creating the array of URLS", () => {
    it("should build correctly. ONE YEAR", () => {
      expect(buildBucketFetchURLs(ONE_YEAR_AGO_1_MONTH)).toEqual(
        ONE_YEAR_AGO_1_MONTH_URLS
      );
    });
    it("should build correctly. THREE MONTHS", () => {
      expect(buildBucketFetchURLs(THREE_MONTHS_AGO_1_MONTH)).toEqual(
        THREE_MONTHS_AGO_1_MONTH_URLS
      );
    });
  });
  it("should fetch and build an array with the correct length && labes", async () => {
    const bucketsData = await fetchBuckets(
      THREE_MONTHS_AGO_1_MONTH,
      BUCKET_TYPES[2].id
    );
    expect(bucketsData).toEqual(THREE_MONTHS_AGO_1_MONTH_RESULT_BUCKETS);
  });
});
