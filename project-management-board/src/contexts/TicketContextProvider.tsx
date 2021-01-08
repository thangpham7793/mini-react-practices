import { SingleTicket } from "../components/types";
import React, { FC, useEffect, useState } from "react";
import TicketContext from "./TicketContext";
import { getTickets } from "../services/api";

type Props = {
  children: React.ReactNode;
};

export const useTickets = () => React.useContext(TicketContext);

export const TicketContextProvider: FC<Props> = ({ children }) => {
  const [tickets, setTickets] = useState<SingleTicket[]>([]);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    getTickets()
      .then((tickets) => setTickets(tickets))
      .catch((error) => setError(error));
  }, []);

  return (
    <TicketContext.Provider value={{ tickets, error }}>
      {children}
    </TicketContext.Provider>
  );
};
