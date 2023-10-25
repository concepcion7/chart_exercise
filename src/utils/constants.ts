import dayjs from "dayjs";

export const GITHUB_TOKEN =
  "Bearer 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";

export const TODAY = dayjs();

export const ONE_YEAR_AGO = dayjs(TODAY).subtract(1, "year");

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
