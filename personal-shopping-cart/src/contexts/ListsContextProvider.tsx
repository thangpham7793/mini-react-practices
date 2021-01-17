import React from "react";
import { ShoppingList } from "../types";
import { DataFetchingState } from "../withDataFetching";

const initialState = { data: [], loading: true, error: "" };

export const ListsContext = React.createContext<DataFetchingState>(
  initialState
);

interface ListsContextProviderProps {
  children: React.ReactNode;
}

const dataSource =
  "https://my-json-server.typicode.com/PacktPublishing/React-Projects/lists";

const fetchData = async (dataSource: string) => {
  try {
    const data: ShoppingList[] = await (await fetch(dataSource)).json();
    if (data) {
      return { data, loading: false, error: "" };
    }
    return { data: [], loading: false, error: "" };
  } catch (error) {
    return { data: [], loading: false, error: error.message };
  }
};

const ListsContextProvider = ({ children }: ListsContextProviderProps) => {
  const [state, setState] = React.useState<DataFetchingState>(initialState);

  React.useEffect(() => {
    const fetchLists = async (dataSource: string) => {
      const newState = await fetchData(dataSource);
      setState(newState);
    };
    fetchLists(dataSource);
  }, [setState]);

  return (
    <ListsContext.Provider value={state}>{children}</ListsContext.Provider>
  );
};

export default ListsContextProvider;
