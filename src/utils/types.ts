import { Dayjs } from "dayjs";

export interface DatesData {
  fromDate: Dayjs;
  toDate: Dayjs;
}

export interface Bucket {
  from: string;
  to: string;
}

export interface BucketData {
  value: number;
  label: string;
}
