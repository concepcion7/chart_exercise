import styled from "styled-components/native";
import Main from "./src/screens/Main";

const AppContainer = styled.View`
  flex: 1;
`;
export default function App() {
  return (
    <AppContainer>
      <Main />
    </AppContainer>
  );
}
