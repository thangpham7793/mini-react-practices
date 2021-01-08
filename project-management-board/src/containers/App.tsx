import React from "react";
import styled, { createGlobalStyle } from "styled-components";
import { Header } from "../components/Header/Header";
import { TicketContextProvider } from "../contexts/TicketContextProvider";
import { LaneType } from "../types";
import { Board } from "./Board";

const GlobalStyle = createGlobalStyle`
  body {
    margin: 0;
    padding: 0;
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen',
    'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue',
    sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }
`;

const AppWrapper = styled.div`
  text-align: center;
`;

function App() {
  const lanes = [
    { id: 1, title: LaneType.TODO },
    { id: 2, title: LaneType.IN_PROGRES },
    { id: 3, title: LaneType.REVIEW },
    { id: 4, title: LaneType.DONE },
  ];

  return (
    <>
      <GlobalStyle />
      <AppWrapper>
        <TicketContextProvider>
          <Header />
          <Board lanes={lanes} />
          <Board />
        </TicketContextProvider>
      </AppWrapper>
    </>
  );
}

export default App;
