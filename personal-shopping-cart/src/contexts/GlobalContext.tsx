import React from "react";
import ItemContextProvider from "./ItemContextProvider";
import ListsContextProvider from "./ListsContextProvider";

export const GlobalContext = ({ children }: { children: React.ReactNode }) => {
  return (
    <ListsContextProvider>
      <ItemContextProvider>{children}</ItemContextProvider>
    </ListsContextProvider>
  );
};
