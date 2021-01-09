import React from "react";
import styled from "styled-components";
import { Ticket } from "../Ticket/Ticket";
import { LaneType, SingleTicket } from "../../types";
import {
  TicketActionType,
  useTicketContextDispatch,
} from "../../contexts/TicketContextProvider";

const LaneWrapper = styled.div`
  list-style: none;
  text-align: left;
  padding: 0;
  &:not(:last-child) {
    margin-right: 1rem;
  }
  background: lightgray;
  border-radius: 20px;
  min-height: 50vh;
  min-width: 20vw;

  @media (max-width: 768px) {
    &:not(:last-child) {
      margin-bottom: 1rem;
      margin-right: 0;
    }
  }
`;

const LaneTitle = styled.h2`
  width: 100%;
  text-align: center;
  border-bottom: 1px solid darkGray;
  padding-bottom: 10px;
`;

interface LaneProps {
  title: LaneType;
  tickets: SingleTicket[];
  loading: boolean;
}

export const Lane = ({ title, tickets, loading }: LaneProps) => {
  const ticketDispatch = useTicketContextDispatch();

  const onDragOver = (event: React.DragEvent<HTMLDivElement>) => {
    if (event.dataTransfer.types.includes("text/html")) {
      event.preventDefault();
    }
  };

  const onDrop = (event: React.DragEvent<HTMLDivElement>) => {
    const droppedTicket = JSON.parse(event.dataTransfer.getData("text/html"));
    console.log("Ticket received!", droppedTicket);
    ticketDispatch({
      type: TicketActionType.TICKET_MOVED_TO_NEW_LANE,
      payload: {
        ticketToUpdate: droppedTicket as SingleTicket,
        newLane: title,
      },
    });
  };

  return (
    <LaneWrapper onDragOver={onDragOver} onDrop={onDrop}>
      <LaneTitle>{title}</LaneTitle>
      {loading
        ? "Fetching Tickets"
        : tickets.map((ticket) => <Ticket key={ticket.title} {...ticket} />)}
      {tickets.length === 0 ? "Add A Task" : null}
    </LaneWrapper>
  );
};
