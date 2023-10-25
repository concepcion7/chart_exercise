import { Button, Dimensions, SafeAreaView, Text } from "react-native";
import { BarChart } from "react-native-gifted-charts";
import DateTimePicker from "@react-native-community/datetimepicker";
import Spinner from "react-native-loading-spinner-overlay";
import { RadioGroup } from "react-native-radio-buttons-group";

import { BUCKET_TYPES } from "../utils/constants";
import { Container, Header, Row, SelectedBucketContainer } from "./styles";
import { useChart } from "./hooks";

export default function Main() {
  const {
    fromDate,
    toDate,
    data,
    bucketType,
    isLoading,
    selectedBucket,
    handleChangeFromDate,
    handleChangeToDate,
    handlePressSearch,
    handlePressBucketType,
    handleSelectBucket,
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
          <>
            <Row>
              <DateTimePicker
                value={fromDateObj}
                onChange={handleChangeFromDate}
                maximumDate={toDateObj}
              />
              <DateTimePicker
                value={toDateObj}
                onChange={handleChangeToDate}
                minimumDate={fromDateObj}
              />
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
          height={dimensions.height - 300}
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
