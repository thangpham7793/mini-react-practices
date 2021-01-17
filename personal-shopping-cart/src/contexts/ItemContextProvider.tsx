import React from "react";
import { Item, PostItemDTO } from "../types";

const initialState = {
  data: [],
  loading: true,
  error: "",
  getItems: async () => {},
  postItem: async (item: PostItemDTO) => {},
  deleteItem: async (id: number) => {},
};

type FetchItemsState = {
  data: Item[];
  loading: boolean;
  error: string;
};

export type FetchItemsContextState = FetchItemsState & {
  getItems: () => Promise<void>;
  postItem: (item: PostItemDTO) => Promise<void>;
  deleteItem: (id: number) => Promise<void>;
};

export const ItemsContext = React.createContext<FetchItemsContextState>(
  initialState
);

interface ItemContextProviderProps {
  children: React.ReactNode;
}

type ItemAction = {
  type:
    | "GET_ITEMS_SUCCESS"
    | "GET_ITEMS_ERROR"
    | "ADD_ITEM_SUCCESS"
    | "ADD_ITEMS_ERROR"
    | "DELETE_ITEM_SUCCESS";
  payload: Partial<FetchItemsState>;
};

const itemsReducer = (prevState: FetchItemsState, action: ItemAction) => {
  switch (action.type) {
    case "GET_ITEMS_SUCCESS":
    case "GET_ITEMS_ERROR":
    case "ADD_ITEM_SUCCESS":
    case "ADD_ITEMS_ERROR":
    case "DELETE_ITEM_SUCCESS":
      return { ...prevState, ...action.payload };
    default:
      return prevState;
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

const postData = async (dataSource: string, item: PostItemDTO) => {
  try {
    const data = await fetch(dataSource, {
      method: "POST",
      body: JSON.stringify(item),
    });
    const dataJSON = await data.json();
    return dataJSON ? dataJSON : null;
  } catch (error) {
    console.log(error);
    return error.message;
  }
};

const deleteData = async (dataSource: string, id: number): Promise<boolean> => {
  try {
    const { status } = await fetch(`${dataSource}/${id}`, {
      method: "DELETE",
    });
    return status === 200;
  } catch (error) {
    console.log(error);
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
        payload: { loading: false, error: result },
      });
    }
  };

  const postItem = async (item: PostItemDTO) => {
    const result = await postData(dataSource, item);
    if (result && result.id) {
      dispatch({
        type: "ADD_ITEM_SUCCESS",
        payload: {
          data: [...state.data, { ...item, id: result.id }],
          loading: false,
          error: "",
        },
      });
    } else {
      dispatch({
        type: "ADD_ITEMS_ERROR",
        payload: { loading: false, error: result },
      });
    }
  };

  const removeAtIndex = (arr: any[], index: number) => {
    return [...arr.slice(0, index), ...arr.slice(index + 1)];
  };

  const deleteItem = async (id: number) => {
    const index = state.data.findIndex((item) => item.id === id);
    const deleted = await deleteData(dataSource, id);
    deleted &&
      dispatch({
        type: "DELETE_ITEM_SUCCESS",
        payload: {
          data: removeAtIndex(state.data, index), //should probably turn this into a class
          loading: false,
          error: "",
        },
      });
  };

  return (
    <ItemsContext.Provider value={{ ...state, getItems, postItem, deleteItem }}>
      {children}
    </ItemsContext.Provider>
  );
};

export default ItemContextProvider;
