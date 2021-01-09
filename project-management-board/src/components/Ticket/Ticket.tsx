import React from "react";
import styled from "styled-components";

const TicketWrapper = styled.div`
  background: darkGray;
  padding: 20px;
  margin: 5%;
  border-radius: 20px;
`;

const TicketTitle = styled.h3``;

const TicketBody = styled.p`
  width: 100%;
`;

interface TicketProps {
  title: string;
  body: string;
}

export const Ticket = ({ title, body }: TicketProps) => {
  return (
    <TicketWrapper>
      <TicketTitle>{title}</TicketTitle>
      <TicketBody>{body}</TicketBody>
    </TicketWrapper>
  );
};
