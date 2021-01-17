import React from "react";
import { Item } from "../types";

const initialState = {
  data: [],
  loading: true,
  error: "",
  getItems: async () => {},
};

type FetchItemsState = {
  data: Item[];
  loading: boolean;
  error: string;
};

export type FetchItemsContextState = FetchItemsState & {
  getItems: () => Promise<void>;
};

export const ItemsContext = React.createContext<FetchItemsContextState>(
  initialState
);

interface ItemContextProviderProps {
  children: React.ReactNode;
}

type ItemAction = {
  type: "GET_ITEMS_SUCCESS" | "GET_ITEMS_ERROR";
  payload: FetchItemsState;
};

const itemsReducer = (value: FetchItemsState, action: ItemAction) => {
  switch (action.type) {
    case "GET_ITEMS_SUCCESS":
      return { ...value, ...action.payload };
    case "GET_ITEMS_ERROR":
      return { ...value, ...action.payload };
    default:
      return value;
  }
};

const dataSource =
  "https://my-json-server.typicode.com/PacktPublishing/React-Projects/items";

const fetchData = async (dataSource: string) => {
  try {
    const data: Item[] = await (await fetch(dataSource)).json();
    return data ? data : [];
  } catch (error) {
    return error.message;
  }
};

const ItemContextProvider = ({ children }: ItemContextProviderProps) => {
  const [state, dispatch] = React.useReducer(itemsReducer, initialState);

  // lazy-loading (command pattern, having action as callable)
  const getItems = async () => {
    const result = await fetchData(dataSource);

    if (result && result.length) {
      dispatch({
        type: "GET_ITEMS_SUCCESS",
        payload: { data: result, loading: false, error: "" },
      });
    } else {
      dispatch({
        type: "GET_ITEMS_ERROR",
        payload: { data: [], loading: false, error: result },
      });
    }
  };

  return (
    <ItemsContext.Provider value={{ ...state, getItems }}>
      {children}
    </ItemsContext.Provider>
  );
};

export default ItemContextProvider;
