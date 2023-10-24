import dayjs from "dayjs";

export const GITHUB_TOKEN =
  "Bearer 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";

export const TODAY = dayjs();

export const ONE_YEAR_AGO = dayjs();

export const BUCKET_TYPES = [
  {
    id: "1",
    label: "1D",
    value: "1D",
  },
  {
    id: "2",
    label: "1W",
    value: "1W",
  },
  {
    id: "3",
    label: "1M",
    value: "1M",
  },
];

const mock = [
  { from: "2022-10-23", to: "2022-10-31", value: 105, label: "1" },
  { from: "2022-11-01", to: "2022-11-30", value: 336, label: "1" },
  { from: "2022-12-01", to: "2022-12-31", value: 282, label: "1" },
  { from: "2023-01-01", to: "2023-01-31", value: 1294, label: "1" },
  { from: "2023-02-01", to: "2023-02-28", value: 521, label: "1" },
  { from: "2023-03-01", to: "2023-03-31", value: 598, label: "1" },
  { from: "2023-03-01", to: "2023-03-31", value: 598, label: "1" },
  { from: "2023-03-01", to: "2023-03-31", value: 598, label: "1" },
  { from: "2023-03-01", to: "2023-03-31", value: 598, label: "1" },
  { from: "2023-04-01", to: "2023-04-30", value: 405, label: "1" },
  { from: "2023-05-01", to: "2023-05-31", value: 823, label: "1" },
  { from: "2023-06-01", to: "2023-06-30", value: 813, label: "1" },
  { from: "2023-07-01", to: "2023-07-31", value: 562, label: "1" },
  { from: "2023-08-01", to: "2023-08-31", value: 453, label: "1" },
  { from: "2023-09-01", to: "2023-09-30", value: 476, label: "1" },
  { from: "2023-10-01", to: "2023-10-23", value: 329, label: "1" },
  { from: "2023-10-01", to: "2023-10-23", value: 329, label: "1" },
  { from: "2023-10-01", to: "2023-10-23", value: 329, label: "1" },
  { from: "2023-10-01", to: "2023-10-23", value: 329, label: "1" },
  { from: "2023-10-01", to: "2023-10-23", value: 329, label: "1" },
  { from: "2023-10-01", to: "2023-10-23", value: 329, label: "1" },
];
