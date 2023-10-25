import dayjs from "dayjs";

export const GITHUB_TOKEN = null; // FILL TO INCREASE RATE LIMIT

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
