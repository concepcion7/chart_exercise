import { Button, Dimensions, SafeAreaView, Text } from "react-native";
import { BarChart } from "react-native-gifted-charts";
import DateTimePicker from "@react-native-community/datetimepicker";
import Spinner from "react-native-loading-spinner-overlay";
import { RadioGroup } from "react-native-radio-buttons-group";

import { BUCKET_TYPES } from "../utils/constants";
import {
  Container,
  DateRange,
  Header,
  MiniDatePickerContainer,
  Row,
  SelectedBucketContainer,
} from "./styles";
import { useChart } from "./hooks";
import { MiniDatePickerProps } from "../utils/types";

const MiniDatePicker = ({ label, date, handlePress }: MiniDatePickerProps) => {
  return (
    <MiniDatePickerContainer>
      <Text>
        {label}: {date.format("YYYY-MM-DD")}
      </Text>
      <Button title={`Set ${label} date`} onPress={handlePress} />
    </MiniDatePickerContainer>
  );
};

export default function Main() {
  const {
    fromDate,
    toDate,
    data,
    bucketType,
    isLoading,
    selectedBucket,
    showDatePickerFrom,
    showDatePickerTo,
    handleChangeDateFrom,
    handleChangeDateTo,
    handlePressSearch,
    handlePressBucketType,
    handleSelectBucket,
    handlePressShowDatePickerFrom,
    handlePressShowDatePickerTo,
  } = useChart();
  const fromDateObj = fromDate.toDate();
  const toDateObj = toDate.toDate();

  // if (error) return null;

  const dimensions = Dimensions.get("window");

  return (
    <SafeAreaView>
      <Container>
        <Spinner visible={isLoading} textContent={"Loading..."} />
        <Header>
          <DateRange>
            <Row>
              {showDatePickerFrom ? (
                <DateTimePicker
                  value={fromDateObj}
                  onChange={handleChangeDateFrom}
                  maximumDate={toDateObj}
                />
              ) : (
                <MiniDatePicker
                  label="from"
                  date={fromDate}
                  handlePress={handlePressShowDatePickerFrom}
                />
              )}
              {showDatePickerTo ? (
                <DateTimePicker
                  value={toDateObj}
                  onChange={handleChangeDateTo}
                  minimumDate={fromDateObj}
                />
              ) : (
                <MiniDatePicker
                  label="to"
                  date={toDate}
                  handlePress={handlePressShowDatePickerTo}
                />
              )}
            </Row>
            <Row>
              <RadioGroup
                radioButtons={BUCKET_TYPES}
                selectedId={bucketType}
                onPress={handlePressBucketType}
                layout="row"
              />
            </Row>
          </DateRange>
          <Row>
            <SelectedBucketContainer>
              <Text>Label: {selectedBucket ? selectedBucket.label : " "}</Text>
              <Text>Value: {selectedBucket ? selectedBucket.value : " "}</Text>
            </SelectedBucketContainer>
            <Button onPress={handlePressSearch} title="Search" />
          </Row>
        </Header>
        <BarChart
          width={dimensions.width}
          height={dimensions.height - 250}
          data={data}
          spacing={0}
          initialSpacing={15}
          frontColor={"#1B6BB0"}
          onPress={handleSelectBucket}
          rotateLabel
          isAnimated
        />
      </Container>
    </SafeAreaView>
  );
}
