const GITHUB_TOKEN =
  "Bearer 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";

export const normalizeDate = (date: string | number) =>
  date.toString().padStart(2, "0");

export const formatDate = (date: Date): string => {
  const day = normalizeDate(date.getDate());
  const month = normalizeDate(date.getMonth() + 1);
  const year = date.getFullYear();
  return `${year}-${month}-${day}`;
};

export interface Bucket {
  from: string;
  to: string;
  month?: number;
  //   year?: number;
}

export interface BucketData extends Bucket {
  total: number;
  label: string;
}

const getDayOfYear = (date) =>
  Math.floor((date - new Date(date.getFullYear(), 0, 0)) / 1000 / 60 / 60 / 24);

const daysInYear = (year) =>
  (year % 4 === 0 && year % 100 > 0) || year % 400 == 0 ? 366 : 365;

export const buildRangeBuckets = (
  from: string,
  to: string,
  bucketType: string
): Bucket[] => {
  const fromDate = new Date(from);
  const toDate = new Date(to);

  const fromDay = fromDate.getDate();
  const fromDayOfYear = getDayOfYear(fromDate);
  const fromMonth = fromDate.getMonth();
  const fromYear = fromDate.getFullYear();

  const toDay = toDate.getDate();
  const toDayOfYear = getDayOfYear(toDate);
  const toMonth = toDate.getMonth();
  const toYear = toDate.getFullYear();

  const buckets = [];
  const numberOfMonths = toMonth - fromMonth + 12 * (toYear - fromYear);

  const numberOfDays = toDayOfYear - fromDayOfYear + 365 * (toYear - fromYear);

  let currentYear = fromYear;
  let currentMonth = fromMonth;
  let currentDay = fromDayOfYear;

  if (bucketType === "1") {
    for (let index = 0; index <= numberOfDays; index++) {
      currentDay += 1;
      if (currentDay === daysInYear(currentYear) + 1) {
        currentDay = 1;
        currentYear += 1;
      }

      const startOfYear = new Date(currentYear, 0);
      const currentDate = new Date(startOfYear.setDate(currentDay)); // add the number of days

      buckets.push({
        from: formatDate(currentDate),
        to: formatDate(currentDate),
        month: currentMonth,
      });
    }
  } else if (bucketType === "3") {
    for (let index = 0; index <= numberOfMonths; index++) {
      currentMonth += 1;
      if (currentMonth === 13) {
        currentMonth = 1;
        currentYear += 1;
      }
      const daysOfMonth = new Date(currentYear, currentMonth, 0).getDate();

      // console.log("daysOfMonth", daysOfMonth, currentYear, currentMonth);

      let bucketFromDay = 1;
      let bucketToDay = daysOfMonth;
      if (index === 0) {
        bucketFromDay = fromDay;
      } else if (index === numberOfMonths) {
        bucketToDay = toDay;
      }

      buckets.push({
        from: `${currentYear}-${normalizeDate(currentMonth)}-${normalizeDate(
          bucketFromDay
        )}`,
        to: `${currentYear}-${normalizeDate(currentMonth)}-${normalizeDate(
          bucketToDay
        )}`,
        month: currentMonth,
      });
    }
  }
  return buckets;
};

export const buildBucketFetchURL = ({ from, to }: Bucket) =>
  `https://api.github.com/search/issues?q=repo:apple/swift+is:pr+is:merged%20updated:${from}..${to}`;

export const fetchBuckets = async (buckets: Bucket[], bucketType: string) => {
  try {
    const urls: string[] = [];
    for (const bucket of buckets) {
      urls.push(buildBucketFetchURL(bucket));
    }

    console.log("urls", urls);

    const requests = urls.map((url) =>
      fetch(url, {
        method: "GET",
        headers: {
          Accept: "application/vnd.github.v3+json",
          Authorization: GITHUB_TOKEN,
        },
      })
    );
    const responses = await Promise.all(requests);

    const json = responses.map((response) => response.json());
    const data = await Promise.all(json);
    console.log("data", data);
    const bucketsData: BucketData[] = [];

    let index = 0;
    for (const element of data) {
      //   bucketsData[index].from = buckets[index].from;
      //   bucketsData[index].to = buckets[index].to;
      bucketsData.push({
        value: element.total_count || 0,
        from: buckets[index]?.from,
        to: buckets[index]?.to,
        label:
          bucketType === "1"
            ? buckets[index]?.from
            : new Date(buckets[index]?.from).toLocaleString("default", {
                month: "short",
              }),
      });
      index++;
    }
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

    console.log("bucketsData", bucketsData);
    await sleep;
    return bucketsData;
    return mock;
  } catch (error) {
    throw error;
  }
};
