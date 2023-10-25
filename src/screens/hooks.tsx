import { useCallback, useEffect, useState } from "react";

import { BucketData } from "../utils/types";
import { BUCKET_TYPES, ONE_YEAR_AGO, TODAY } from "../utils/constants";
import { buildBuckets } from "../utils/buckets/buckets";

import { useDatePicker } from "../hooks/datepicker";
import { fetchBuckets } from "../utils/buckets/fetch";

const INITIAL_SELECTED_BUCKET = null;

export const useChart = () => {
  const [bucketType, setBucketType] = useState<string>(BUCKET_TYPES[2].id);

  const {
    date: fromDate,
    showDatePicker: showDatePickerFrom,
    handlePressShowDatePicker: handlePressShowDatePickerFrom,
    handleChangeDate: handleChangeDateFrom,
  } = useDatePicker(ONE_YEAR_AGO);
  const {
    date: toDate,
    showDatePicker: showDatePickerTo,
    handlePressShowDatePicker: handlePressShowDatePickerTo,
    handleChangeDate: handleChangeDateTo,
  } = useDatePicker(TODAY);

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

      // taking the fetch with the previous calculations out of the main stack of the event loop (to its own, macrotask, queue)
      // to not freeze the UI, like the loading false-> true
      // that is one of the reasons of using redux.
      // It takes care with actions to not stop the main thread using async functions
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
    showDatePickerFrom,
    showDatePickerTo,
    handleSelectBucket,
    handleChangeDateFrom,
    handleChangeDateTo,
    handlePressSearch,
    handlePressBucketType,
    handlePressShowDatePickerFrom,
    handlePressShowDatePickerTo,
  };
};
