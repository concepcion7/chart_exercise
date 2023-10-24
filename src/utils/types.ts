import { Moment } from "moment";

export interface DatesData {
  fromDate: Moment;
  toDate: Moment;
}

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
