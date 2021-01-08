import React from "react";
import styled, { createGlobalStyle } from "styled-components";
import { Header } from "../components/Header/Header";
import { TicketContextProvider } from "../contexts/TicketContextProvider";
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
  return (
    <>
      <GlobalStyle />
      <AppWrapper>
        <TicketContextProvider>
          <Header />
          <Board />
        </TicketContextProvider>
      </AppWrapper>
    </>
  );
}

export default App;
