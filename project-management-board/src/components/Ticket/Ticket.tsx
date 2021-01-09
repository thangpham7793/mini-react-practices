import React from "react";
import styled from "styled-components";
import { SingleTicket } from "../../types";

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

export const Ticket = ({ title, body, id, lane }: SingleTicket) => {
  const onTicketDrag = (event: React.DragEvent) => {
    event.dataTransfer.setData(
      "text/html",
      JSON.stringify({ id, title, body, lane })
    );
  };

  return (
    <TicketWrapper draggable={true} onDragStart={onTicketDrag}>
      <TicketTitle>{title}</TicketTitle>
      <TicketBody>{body}</TicketBody>
    </TicketWrapper>
  );
};
