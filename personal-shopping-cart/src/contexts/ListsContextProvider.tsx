import React from "react";
import { DataFetchingState, withDataFetching } from "../withDataFetching";

const initialState = { data: [], loading: false, error: "" };

export const ListsContext = React.createContext<DataFetchingState>(
  initialState
);

interface ListsContextProviderProps extends DataFetchingState {
  children: React.ReactNode;
}

const ListsContextProvider = ({
  children,
  ...props
}: ListsContextProviderProps) => (
  <ListsContext.Provider value={props}>{children}</ListsContext.Provider>
);

const dataSource =
  "https://my-json-server.typicode.com/PacktPublishing/React-Projects/lists";

export default withDataFetching({ dataSource })(ListsContextProvider);
