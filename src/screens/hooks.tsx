import { useCallback, useEffect, useState } from "react";
import dayjs, { Dayjs } from "dayjs";

import { Bucket, BucketData } from "../utils/types";
import {
  GITHUB_TOKEN,
  BUCKET_TYPES,
  ONE_YEAR_AGO,
  TODAY,
} from "../utils/constants";
import { buildBucketLabel, buildBuckets } from "../utils/buckets";
const buildBucketFetchURL = ({ from, to }: Bucket) =>
  `https://api.github.com/search/issues?q=repo:apple/swift+is:pr+is:merged%20updated:${from}..${to}`;

export const buildBucketFetchURLs = (buckets: Bucket[]) => {
  const urls: string[] = [];
  for (const bucket of buckets) {
    urls.push(buildBucketFetchURL(bucket));
  }
  return urls;
};

export const fetchBuckets = async (buckets: Bucket[], bucketType: string) => {
  try {
    const urls = buildBucketFetchURLs(buckets);
    const headers = {
      Accept: "application/vnd.github.v3+json",
    };
    if (GITHUB_TOKEN) {
      headers.Authorization = "1234123423";
    }
    const requests = urls.map((url) =>
      fetch(url, {
        method: "GET",
        headers,
      })
    );
    const responses = await Promise.all(requests);

    const json = responses.map((response) => response.json());
    const data = await Promise.all(json);
    console.log("data", data);
    const bucketsData: BucketData[] = [];

    for (let index = 0; index < data.length; index++) {
      const fromDate = buckets[index]?.from;
      bucketsData.push({
        value: data[index]?.total_count || 0,
        label: buildBucketLabel(fromDate, bucketType),
      });
    }

    return bucketsData;
    // return mock;
  } catch (error) {
    throw error;
  }
};

const INITIAL_SELECTED_BUCKET = null;

export const useChart = () => {
  const [fromDate, setFromDate] = useState<Dayjs>(ONE_YEAR_AGO);
  const [toDate, setToDate] = useState<Dayjs>(TODAY);
  const [bucketType, setBucketType] = useState<string>(BUCKET_TYPES[1].id);

  const [selectedBucket, setSelectedBucket] = useState<BucketData | null>(
    INITIAL_SELECTED_BUCKET
  );

  const [data, setData] = useState<BucketData[] | undefined>(
    [] as BucketData[]
  );
  const [isLoading, setIsLoading] = useState(true);
  const [_, setError] = useState(false);

  const fetchData = useCallback(async () => {
    try {
      setIsLoading(true);
      setSelectedBucket(INITIAL_SELECTED_BUCKET);

      // taking the fetch with the calculations out of the event loop (to its own, macrotask, queue) to not freeze the UI, like the loading false-> true
      // that is one of the reasons of using redux. It takes care with actions to not stop the main thread using async functions
      setTimeout(async () => {
        const buckets = buildBuckets(fromDate, toDate, bucketType);
        const data = await fetchBuckets(buckets, bucketType);
        setData(data);
        setIsLoading(false);
      }, 0);
    } catch (error) {
      setError(!!error);
      setIsLoading(false);
    }
  }, [fromDate, toDate, bucketType, setIsLoading]);

  const handleChangeFromDate = useCallback(
    (_: any, date: Date | undefined) => {
      const dateDayjs = dayjs(date);
      setFromDate(dateDayjs);
    },
    [setFromDate]
  );

  const handleChangeToDate = useCallback(
    (_: any, date: Date | undefined) => {
      const dateDayjs = dayjs(date);
      setToDate(dateDayjs);
    },
    [setToDate]
  );

  const handlePressBucketType = (bucketType: string) => {
    setBucketType(bucketType);
  };

  const handlePressSearch = useCallback(() => {
    fetchData();
  }, [fetchData]);

  const handleSelectBucket = (bucket: BucketData) => setSelectedBucket(bucket);

  useEffect(() => {
    fetchData();
  }, []);

  return {
    fromDate,
    toDate,
    bucketType,
    data,
    isLoading,
    selectedBucket,
    handleSelectBucket,
    handleChangeFromDate,
    handleChangeToDate,
    handlePressSearch,
    handlePressBucketType,
  };
};
