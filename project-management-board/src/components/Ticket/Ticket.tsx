import React, { DragEventHandler } from "react";
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

export const Ticket = ({ title, body, id }: SingleTicket) => {
  const onTicketDrag: DragEventHandler = (event) => {
    // text/plain is treated like a link
    event.dataTransfer.setData("text/html", id);
  };

  return (
    <TicketWrapper draggable={true} onDragStart={onTicketDrag}>
      <TicketTitle>{title}</TicketTitle>
      <TicketBody>{body}</TicketBody>
    </TicketWrapper>
  );
};
