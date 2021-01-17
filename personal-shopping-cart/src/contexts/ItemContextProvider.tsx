import React from "react";
import { DataFetchingState, withDataFetching } from "../withDataFetching";

const initialState = { data: [], loading: false, error: "" };

export const ItemContext = React.createContext<DataFetchingState>(initialState);

interface ItemContextProviderProps extends DataFetchingState {
  children: React.ReactNode;
}

const ItemContextProvider = ({
  children,
  ...props
}: ItemContextProviderProps) => (
  <ItemContext.Provider value={props}>{children}</ItemContext.Provider>
);

const dataSource =
  "https://my-json-server.typicode.com/PacktPublishing/React-Projects/items";

export default withDataFetching({ dataSource })(ItemContextProvider);
