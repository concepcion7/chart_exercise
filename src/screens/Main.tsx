import { Button, Dimensions, SafeAreaView } from "react-native";
import { BarChart } from "react-native-gifted-charts";
import DateTimePicker from "@react-native-community/datetimepicker";
import Spinner from "react-native-loading-spinner-overlay";
import { RadioGroup } from "react-native-radio-buttons-group";

import { BUCKET_TYPES } from "../utils/constants";
import { Header, Row } from "./styles";
import { useChart } from "./hooks";

export default function Main() {
  const {
    fromDate,
    toDate,
    data,
    bucketType,
    isLoading,
    handleChangeFromDate,
    handleChangeToDate,
    handlePressSearch,
    handlePressBucketType,
  } = useChart();
  const fromDateObj = fromDate.toDate();
  const toDateObj = toDate.toDate();

  // if (error) return null;
  return (
    <SafeAreaView>
      <Spinner visible={isLoading} textContent={"Loading..."} />
      <Header>
        <>
          <Row>
            <DateTimePicker
              value={fromDateObj}
              onChange={handleChangeFromDate}
            />
            <DateTimePicker value={toDateObj} onChange={handleChangeToDate} />
          </Row>
          <Row>
            <RadioGroup
              radioButtons={BUCKET_TYPES}
              selectedId={bucketType}
              onPress={handlePressBucketType}
              layout="row"
            />
          </Row>
        </>
        <Button onPress={handlePressSearch} title="Search" />
      </Header>
      <BarChart
        width={Dimensions.get("window").width}
        height={Dimensions.get("window").height - 300}
        data={data}
        spacing={0}
        initialSpacing={15}
        frontColor={"#1B6BB0"}
        isAnimated
      />
    </SafeAreaView>
  );
}
