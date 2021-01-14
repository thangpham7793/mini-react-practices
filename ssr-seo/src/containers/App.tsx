import React from "react";
import styled, { createGlobalStyle } from "styled-components";
import {
  BrowserRouter as Router,
  Route,
  RouteComponentProps,
  Switch,
} from "react-router-dom";
import Header from "../components/Header/Header";
import Feed from "./Feed";
import Question from "./Question";
import queryString from "query-string";

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
  const renderFeed = ({ location, ...props }: RouteComponentProps) => {
    const query = queryString.parse(location.search);
    const page = query.page ? Number(query.page) : 1;
    return (
      <Feed
        dataSource={`${ROOT_API}questions?order=desc&sort=activity&tagged=reactjs&site=stackoverflow&page=${page}`}
        page={page}
        loadingMessage={"Loading ..."}
        {...props}
      />
    );
  };

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
        <Router>
          <Header />
          <Switch>
            <Route exact path="/" render={(props) => renderFeed(props)} />
            <Route
              exact
              path="/questions"
              render={(props) => renderFeed(props)}
            />
            <Route path="/questions/:id" render={renderQuestion} />
          </Switch>
        </Router>
      </AppWrapper>
    </>
  );
};

export default App;
