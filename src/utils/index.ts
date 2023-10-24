import moment from "moment";
import { buildBucketsArray } from "./buildBuckets";

const GITHUB_TOKEN =
  "Bearer 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";

export const normalizeDate = (date: string | number) =>
  date.toString().padStart(2, "0");

export interface Bucket {
  from: string;
  to: string;
  month?: number;
  //   year?: number;
}

export interface BucketData {
  value: number;
  label: string;
}

export const daysInYear = (year: number) =>
  (year % 4 === 0 && year % 100 > 0) || year % 400 == 0 ? 366 : 365;

export const weeksInYear = (year: number) =>
  moment().year(year).isoWeeksInYear();

export const buildRangeBuckets = (
  from: string,
  to: string,
  bucketType: string
): Bucket[] => {
  const fromDate = new Date(from);
  const toDate = new Date(to);

  return buildBucketsArray(
    {
      fromDate: moment(fromDate),
      toDate: moment(toDate),
    },
    bucketType
  );
};

export const buildBucketFetchURL = ({ from, to }: Bucket) =>
  `https://api.github.com/search/issues?q=repo:apple/swift+is:pr+is:merged%20updated:${from}..${to}`;

const buildBucketLabel = (date: string, bucketType: string) => {
  if (bucketType === "1") return date;
  if (bucketType === "2") return moment(date, "YYYY-MM-DD").week().toString();
  if (bucketType === "3") return moment(date, "YYYY-MM-DD").format("mm");
  return "";
};

export const fetchBuckets = async (buckets: Bucket[], bucketType: string) => {
  try {
    const urls: string[] = [];
    for (const bucket of buckets) {
      urls.push(buildBucketFetchURL(bucket));
    }

    console.log("buckets", buckets);

    // const requests = urls.map((url) =>
    //   fetch(url, {
    //     method: "GET",
    //     headers: {
    //       Accept: "application/vnd.github.v3+json",
    //       Authorization: GITHUB_TOKEN,
    //     },
    //   })
    // );
    // const responses = await Promise.all(requests);

    // const json = responses.map((response) => response.json());
    // const data = await Promise.all(json);
    // console.log("data", data);
    // const bucketsData: BucketData[] = [];

    // let index = 0;
    // for (const element of data) {
    //   const fromDate = buckets[index]?.from;
    //   bucketsData.push({
    //     value: element.total_count || 0,
    //     label: buildBucketLabel(fromDate, bucketType),
    //   });
    //   index++;
    // }
    const mock = [
      { from: "2022-10-23", month: 10, to: "2022-10-31", value: 105 },
      { from: "2022-11-01", month: 11, to: "2022-11-30", value: 336 },
      { from: "2022-12-01", month: 12, to: "2022-12-31", value: 282 },
      { from: "2023-01-01", month: 1, to: "2023-01-31", value: 1294 },
      { from: "2023-02-01", month: 2, to: "2023-02-28", value: 521 },
      { from: "2023-03-01", month: 3, to: "2023-03-31", value: 598 },
      { from: "2023-04-01", month: 4, to: "2023-04-30", value: 405 },
      { from: "2023-05-01", month: 5, to: "2023-05-31", value: 823 },
      { from: "2023-06-01", month: 6, to: "2023-06-30", value: 813 },
      { from: "2023-07-01", month: 7, to: "2023-07-31", value: 562 },
      { from: "2023-08-01", month: 8, to: "2023-08-31", value: 453 },
      { from: "2023-09-01", month: 9, to: "2023-09-30", value: 476 },
      { from: "2023-10-01", month: 10, to: "2023-10-23", value: 329 },
      { from: "2023-10-01", month: 11, to: "2023-10-23", value: 329 },
      { from: "2023-10-01", month: 12, to: "2023-10-23", value: 329 },
      { from: "2023-10-01", month: 1, to: "2023-10-23", value: 329 },
      { from: "2023-10-01", month: 1, to: "2023-10-23", value: 329 },
      { from: "2023-10-01", month: 10, to: "2023-10-23", value: 329 },
    ];
    // console.log("bucketsData", bucketsData);

    mock.forEach((element) => {
      element.label = new Date(element.from).toLocaleString("default", {
        month: "short",
      });
    });

    const sleep = new Promise((resolve) => {
      setTimeout(resolve, 1000);
    });

    await sleep;
    // console.log("bucketsData", bucketsData);

    // return bucketsData;
    return mock;
  } catch (error) {
    throw error;
  }
};
