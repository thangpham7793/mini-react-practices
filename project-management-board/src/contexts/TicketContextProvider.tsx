import { SingleTicket } from "../types";
import React, { FC, useContext, useEffect, useReducer } from "react";
import { getTickets } from "../services/api";

type Props = {
  children: React.ReactNode;
};

type State = {
  tickets: SingleTicket[];
  error: Error | null;
};

type TicketAction = {
  type: string;
  data?: SingleTicket[] | Error;
};

const initialState: State = { tickets: [], error: null };
const ticketReducer = (state: any, action: TicketAction) => {
  switch (action.type) {
    case "init":
      return { ...state, tickets: action.data as SingleTicket[] };
    case "error":
      return { ...state, error: action.data as Error };
    default:
      return;
  }
};

const TicketContext = React.createContext<State>({
  tickets: [],
  error: null,
});
const TicketDispatchContext = React.createContext(ticketReducer);

export const useTicketContext = () => useContext(TicketContext);
export const useTicketContextDispatch = () => useContext(TicketDispatchContext);

export const TicketContextProvider: FC<Props> = ({ children }) => {
  const [state, dispatch] = useReducer(ticketReducer, initialState);
  useEffect(() => {
    getTickets()
      .then((tickets) => dispatch({ type: "init", data: tickets }))
      .catch((error) => dispatch({ type: "error", data: error }));
  }, []);

  return (
    <TicketDispatchContext.Provider value={dispatch}>
      <TicketContext.Provider value={state}>{children}</TicketContext.Provider>
    </TicketDispatchContext.Provider>
  );
};
