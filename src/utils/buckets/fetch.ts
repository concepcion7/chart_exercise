import { buildBucketLabel } from "./buckets";
import { GITHUB_TOKEN } from "../constants";
import { Bucket, BucketData } from "../types";

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
      headers.Authorization = GITHUB_TOKEN;
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
    const bucketsData: BucketData[] = [];

    for (let index = 0; index < data.length; index++) {
      const fromDate = buckets[index]?.from;
      bucketsData.push({
        value: data[index]?.total_count || 0,
        label: buildBucketLabel(fromDate, bucketType),
      });
    }

    return bucketsData;
  } catch (error) {
    throw error;
  }
};
