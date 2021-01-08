import { SingleTicket } from "../types";
import React from "react";

export interface TicketContext {
  tickets: SingleTicket[];
  error: Error | null;
}

export default React.createContext<TicketContext>({
  tickets: [],
  error: null,
});
