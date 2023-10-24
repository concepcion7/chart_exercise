import { useCallback, useEffect, useState } from "react";
import dayjs from "dayjs";

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

export const fetchBuckets = async (buckets: Bucket[], bucketType: string) => {
  try {
    const urls: string[] = [];
    for (const bucket of buckets) {
      urls.push(buildBucketFetchURL(bucket));
    }

    // console.log("urls", urls);

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
    // const bucketsData: BucketData[] = [];

    // for (let index = 0; index < data.length; index++) {
    //   const fromDate = buckets[index]?.from;
    //   bucketsData.push({
    //     value: data[index]?.total_count || 0,
    //     label: buildBucketLabel(fromDate, bucketType),
    //   });
    // }

    // console.log("bucketsData", bucketsData);

    // const sleep = new Promise((resolve) => {
    //   setTimeout(resolve, 1000);
    // });

    // await sleep;

    return (bucketsData = []);
    // return mock;
  } catch (error) {
    throw error;
  }
};

export const useChart = () => {
  const [fromDate, setFromDate] = useState<Moment>(ONE_YEAR_AGO);
  const [toDate, setToDate] = useState<Moment>(TODAY);
  const [bucketType, setBucketType] = useState<string>(BUCKET_TYPES[1].id);

  const [data, setData] = useState<BucketData[] | undefined>(
    [] as BucketData[]
  );
  const [isLoading, setIsLoading] = useState(true);
  const [_, setError] = useState(false);

  const fetchData = useCallback(async () => {
    try {
      setIsLoading(true);
      const buckets = buildBuckets(fromDate, toDate, bucketType);
      //   console.log("buckets", buckets, fromDate, toDate);

      const data = await fetchBuckets(buckets, bucketType);
      setIsLoading(false);
      setData(data);
    } catch (error) {
      setError(!!error);
    } finally {
      setIsLoading(false);
    }
  }, [fromDate, toDate, bucketType]);

  const handleChangeFromDate = useCallback(
    (_: any, date: Date | undefined) => {
      const dateMoment = dayjs(date);
      setFromDate(dateMoment);
    },
    [setFromDate]
  );

  const handleChangeToDate = useCallback(
    (_: any, date: Date | undefined) => {
      const dateMoment = dayjs(date);
      setToDate(dateMoment);
    },
    [setToDate]
  );

  const handlePressBucketType = useCallback(
    (bucketType: string) => {
      setBucketType(bucketType);
    },
    [setBucketType]
  );

  const handlePressSearch = useCallback(() => {
    fetchData();
  }, [fetchData]);

  useEffect(() => {
    fetchData();
  }, []);

  return {
    fromDate,
    toDate,
    bucketType,
    data,
    isLoading,
    handleChangeFromDate,
    handleChangeToDate,
    handlePressSearch,
    handlePressBucketType,
  };
};
