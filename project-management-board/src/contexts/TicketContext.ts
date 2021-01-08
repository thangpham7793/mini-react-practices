import { SingleTicket } from "../components/types";
import React from "react";

interface TicketContext {
  tickets: SingleTicket[];
  error: Error | null;
}

export default React.createContext<TicketContext>({
  tickets: [],
  error: null,
});
