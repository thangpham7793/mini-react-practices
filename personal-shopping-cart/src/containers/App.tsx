import React from "react";
import styled, { createGlobalStyle } from "styled-components";
import { Route, Switch } from "react-router-dom";
import { Header } from "../components/Header/Header";
import Lists from "./Lists";
import List from "./List";
import { Form } from "./Form";
import ListsContextProvider, {
  ListsContext,
} from "../contexts/ListsContextProvider";
import ItemContextProvider, {
  ItemContext,
} from "../contexts/ItemContextProvider";

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

const App = () => {
  return (
    <>
      <GlobalStyle />
      <AppWrapper>
        <Header />
        <ListsContextProvider>
          <ItemContextProvider>
            <ListsContext.Consumer>
              {(listsContext) => (
                <ItemContext.Consumer>
                  {(itemContext) => (
                    <Switch>
                      <Route
                        exact
                        path="/"
                        render={(props) =>
                          listsContext.data && (
                            <Lists {...listsContext} {...props} />
                          )
                        }
                      />
                      <Route path="/list/:id/new" component={Form} />
                      <Route
                        path="/list/:id/"
                        render={(props) =>
                          listsContext.data &&
                          itemContext.data && (
                            <List
                              lists={listsContext.data}
                              {...itemContext}
                              {...props}
                            />
                          )
                        }
                      />
                    </Switch>
                  )}
                </ItemContext.Consumer>
              )}
            </ListsContext.Consumer>
          </ItemContextProvider>
        </ListsContextProvider>
      </AppWrapper>
    </>
  );
};

export default App;
