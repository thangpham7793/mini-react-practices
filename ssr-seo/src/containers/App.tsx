import React from "react";
import styled, { createGlobalStyle } from "styled-components";
import {
  BrowserRouter as Router,
  Route,
  RouteComponentProps,
} from "react-router-dom";
import Header from "../components/Header/Header";
import Feed from "./Feed";
import Question from "./Question";

const GlobalStyle = createGlobalStyle`
  body {
    margin: 0;
    padding: 0;
    font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", "Roboto", "Oxygen",
      "Ubuntu", "Cantarell", "Fira Sans", "Droid Sans", "Helvetica Neue",
      sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }
`;

const AppWrapper = styled.div`
  text-align: center;
`;

const ROOT_API = "https://api.stackexchange.com/2.2/";

const App = () => {
  const renderFeed = () => (
    <Feed
      dataSource={`${ROOT_API}questions?order=desc&sort=activity&tagged=reactjs&site=stackoverflow`}
      loadingMessage={"Loading ..."}
    />
  );

  const renderQuestion = ({ match }: RouteComponentProps<{ id: string }>) => (
    <Question
      dataSource={`${ROOT_API}questions/${match.params.id}?site=stackoverflow`}
      loadingMessage={`Loading Question ${match.params.id}`}
    />
  );

  return (
    <>
      <GlobalStyle />
      <AppWrapper>
        <Header />
        <Router>
          <Route exact path="/" render={renderFeed} />
          <Route path="/questions/:id" render={renderQuestion} />
        </Router>
      </AppWrapper>
    </>
  );
};

export default App;
