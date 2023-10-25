import { Dayjs } from "dayjs";

export type DatesData = {
  fromDate: Dayjs;
  toDate: Dayjs;
};

export type Bucket = {
  from: string;
  to: string;
};

export type BucketData = {
  value: number;
  label: string;
};

export interface MiniDatePickerProps {
  label: string;
  date: Dayjs;
  handlePress: () => void;
}
