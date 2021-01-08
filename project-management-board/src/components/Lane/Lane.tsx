import React from "react";
import styled from "styled-components";
import { Ticket } from "../Ticket/Ticket";
import { LaneType, SingleTicket } from "../types";

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
    }
  }
`;

const LaneTitle = styled.h2`
  width: 100%;
  text-align: center;
  border-bottom: 1px solid darkGray;
  padding-bottom: 10px;
`;

const TicketsWrapper = styled.div`
  padding: 5%;
`;

interface LaneProps {
  title: LaneType;
  tickets: SingleTicket[];
}

export const Lane = ({ title, tickets }: LaneProps) => {
  return (
    <LaneWrapper>
      <LaneTitle>{title}</LaneTitle>
      <TicketsWrapper>
        {tickets.length > 0
          ? tickets.map((t) => (
              <Ticket key={t.title} title={t.title} body={t.body} />
            ))
          : "Fetching Tickets"}
      </TicketsWrapper>
    </LaneWrapper>
  );
};
