import { useCallback, useState } from "react";
import { isIOS } from "../utils/platform";
import dayjs, { Dayjs } from "dayjs";

export const useDatePicker = (value: Dayjs) => {
  const [date, setDate] = useState<Dayjs>(value);
  const [showDatePicker, setShowDatePicker] = useState(isIOS ? true : false);

  const handlePressShowDatePicker = () => {
    setShowDatePicker(true);
  };

  const handleChangeDate = useCallback(
    (_: any, date: Date | undefined) => {
      const dateDayjs = dayjs(date);
      if (!isIOS) setShowDatePicker(false);
      setDate(dateDayjs);
    },
    [setShowDatePicker, setDate]
  );

  return {
    date,
    showDatePicker,
    setShowDatePicker,
    handlePressShowDatePicker,
    handleChangeDate,
  };
};
