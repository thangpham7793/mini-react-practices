import React from "react";
import styled from "styled-components";
import { Lane } from "../components/Lane/Lane";
import { LaneConfig } from "../types";
import { useTicketContext } from "../contexts/TicketContextProvider";

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
          />
        ))
      )}
    </BoardWrapper>
  );
};
