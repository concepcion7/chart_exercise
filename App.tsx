import { useCallback, useEffect, useMemo, useState } from "react";
import {
  Button,
  Dimensions,
  SafeAreaView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { BarChart } from "react-native-gifted-charts";
import DateTimePicker from "@react-native-community/datetimepicker";
import Spinner from "react-native-loading-spinner-overlay";
import {
  BucketData,
  buildRangeBuckets,
  fetchBuckets,
  formatDate,
} from "./src/utils";

import styled from "styled-components/native";
import { RadioGroup } from "react-native-radio-buttons-group";
/*
curl \
-H "Accept: application/vnd.github.v3+json" \
https://api.github.com/search/issues\?q\=repo:apple/swift+is:pr+is:merged%20updated:2023-10-05..2023-10-05

*/

/*
    Because the api limits and truncates the result to elements that fit into 100kb and since I only need the total_count in each request.
    I will do N requests. One request = one bucket (one division of the date range)
    In the base case I will do 12 requests => (product req: "per month for the past 1 year"). Division: month. Range: 1 Year. 12 months in 1 year.
    Types of buckets: 1d, 1w, 1m, 6m, 1y
    Other examples: 
    Type of bucket: 1d, Range: 1 Year. Number of buckets (requests): 365.
    Type of bucket: 1w: Range: 1 month. Buckets: 4.
*/

const Header = styled.View`
  align-items: center;
  justify-content: center;
`;

const Row = styled.View`
  flex-direction: row;
`;

const TODAY = formatDate(new Date());
const ONE_YEAR_AGO = formatDate(new Date(Date.now() - 2 * 24 * 60 * 60 * 1000));

const BUCKET_TYPES = [
  {
    id: "1",
    label: "1d",
    value: "1d",
  },
  {
    id: "2",
    label: "1w",
    value: "1w",
  },
  {
    id: "3",
    label: "1m",
    value: "1m",
  },
];

export default function App() {
  const [fromDate, setFromDate] = useState(ONE_YEAR_AGO);
  const [toDate, setToDate] = useState(TODAY);
  const [bucketType, setBucketType] = useState(BUCKET_TYPES[2].id);

  const [data, setData] = useState<BucketData[] | undefined>(
    [] as BucketData[]
  );
  const [searchTerm, setSearchTerm] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(false);

  const fetchData = useCallback(async () => {
    try {
      setIsLoading(true);
      const buckets = buildRangeBuckets(fromDate, toDate, bucketType);
      console.log("buckets", fromDate, toDate);

      const data = await fetchBuckets(buckets, bucketType);
      setIsLoading(false);
      setData(data);
    } catch (error) {
      setError(!!error);
    } finally {
      setIsLoading(false);
    }
  }, [fromDate, toDate, bucketType]);
  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {}, [fromDate]);

  const handleChangeFromDate = useCallback(
    (_, date) => {
      const dateFormat = formatDate(date);
      setFromDate(dateFormat);
    },
    [setFromDate]
  );

  const handleChangeToDate = useCallback(
    (_, date) => {
      const dateFormat = formatDate(date);
      setToDate(dateFormat);
    },
    [setToDate]
  );

  const handlePressDateRange = useCallback(() => {
    fetchData();
  }, [fetchData]);

  const handlePressBucketType = useCallback(
    (bucketType) => {
      setBucketType(bucketType);
    },
    [setBucketType]
  );
  const fromDateObj = new Date(fromDate);
  const toDateObj = new Date(toDate);

  // if (error) return null;
  return (
    <SafeAreaView style={styles.container}>
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
        <Button onPress={handlePressDateRange} title="Search" />
      </Header>
      <BarChart
        width={Dimensions.get("window").width}
        height={Dimensions.get("window").height - 300}
        data={data}
        spacing={0}
        frontColor={"#1B6BB0"}
        isAnimated
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
