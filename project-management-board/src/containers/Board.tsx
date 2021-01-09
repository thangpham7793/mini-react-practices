import React, { DragEventHandler } from "react";
import styled from "styled-components";
import { Lane } from "../components/Lane/Lane";
import { LaneConfig, LaneType } from "../types";
import {
  TicketActionType,
  useTicketContext,
  useTicketContextDispatch,
} from "../contexts/TicketContextProvider";

const BoardWrapper = styled.div`
  justify-content: space-around;
  display: flex;
  flex-direction: row;
  margin: 1rem 1rem 0 1rem;

  @media (max-width: 768px) {
    flex-direction: column;
  }
`;

const Alert = styled.div`
  text-align: center;
`;

interface BoardProps {
  lanes: LaneConfig[];
}

export const Board = ({ lanes }: BoardProps) => {
  const { error, tickets, loading } = useTicketContext();
  const ticketDispatch = useTicketContextDispatch();

  const onDragOver: DragEventHandler = (event) => {
    if (event.dataTransfer.types.includes("text/html")) {
      event.preventDefault();
    }
  };
  // factoryFunction for onDrop since it needs the title of the target lane
  const createOnDrop = (title: LaneType): DragEventHandler => {
    return (event) => {
      const droppedTicketId = event.dataTransfer.getData("text/html");
      ticketDispatch({
        type: TicketActionType.TICKET_MOVED_TO_NEW_LANE,
        payload: {
          ticketId: droppedTicketId,
          newLane: title,
        },
      });
    };
  };

  return (
    <BoardWrapper>
      {error ? (
        <Alert>{error.message}</Alert>
      ) : (
        lanes.map(({ id, title }) => (
          <Lane
            tickets={tickets.filter((t) => t.lane === title)}
            key={id}
            title={title}
            loading={loading}
            dragHandlers={{
              onDragOver,
              onDrop: createOnDrop(title),
            }}
          />
        ))
      )}
    </BoardWrapper>
  );
};
