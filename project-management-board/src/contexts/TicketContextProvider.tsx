import { SingleTicket } from "../types";
import React, { FC, useContext, useEffect, useReducer } from "react";
import { getTickets } from "../services/api";

export enum TicketActionType {
  FETCH_TICKET = "FETCH_TICKET",
  TICKET_MOVED_TO_NEW_LANE = "TICKET_MOVED_TO_NEW_LANE",
  ERROR = "ERROR",
}

type Props = {
  children: React.ReactNode;
};

type State = {
  tickets: SingleTicket[];
  error: Error | null;
};

type TicketAction = {
  type: TicketActionType;
  data?: SingleTicket[] | Error;
};

const initialState: State = { tickets: [], error: null };
const ticketReducer = (state: any, action: TicketAction) => {
  switch (action.type) {
    case TicketActionType.FETCH_TICKET:
      return { ...state, tickets: action.data as SingleTicket[] };
    case TicketActionType.TICKET_MOVED_TO_NEW_LANE:
      return {};
    case TicketActionType.ERROR:
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
      .then((tickets) =>
        dispatch({ type: TicketActionType.FETCH_TICKET, data: tickets })
      )
      .catch((error) =>
        dispatch({ type: TicketActionType.ERROR, data: error })
      );
  }, []);

  return (
    <TicketDispatchContext.Provider value={dispatch}>
      <TicketContext.Provider value={state}>{children}</TicketContext.Provider>
    </TicketDispatchContext.Provider>
  );
};
