import styled from "styled-components/native";
import { isIOS } from "../utils/platform";
export const Container = styled.View`
  height: 100%;
`;
export const Header = styled.View`
  align-items: center;
  justify-content: center;
  margin-top: ${isIOS ? 0 : 40}px;
  column-gap: 10px;
`;

export const Row = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: center;
  column-gap: 10px;
`;

export const SelectedBucketContainer = styled.View`
  flex-direction: row;
  column-gap: 10px;
`;

export const MiniDatePickerContainer = styled.View`
  flex-direction: column;
`;

export const DateRange = styled.View`
  column-gap: 10px;
`;
