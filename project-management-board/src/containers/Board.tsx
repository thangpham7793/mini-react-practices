import React from "react";
import styled from "styled-components";
import { Lane } from "../components/Lane/Lane";
import { LaneType } from "../components/types";
import { useTickets } from "../contexts/TicketContextProvider";

const BoardWrapper = styled.div`
  justify-content: space-evenly;
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

export const Board = () => {
  const { error, tickets } = useTickets();

  const lanes = [
    { id: 1, title: LaneType.TODO },
    { id: 2, title: LaneType.IN_PROGRES },
    { id: 3, title: LaneType.REVIEW },
    { id: 4, title: LaneType.DONE },
  ];

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
          />
        ))
      )}
    </BoardWrapper>
  );
};
