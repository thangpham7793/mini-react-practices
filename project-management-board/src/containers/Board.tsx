import React from "react";
import styled from "styled-components";
import { Lane } from "../components/Lane/Lane";

const BoardWrapper = styled.div`
  justify-content: space-between;
  display: flex;
  flex-direction: row;
  margin: 5%;

  @media (max-width: 768px) {
    flex-direction: column;
  }
`;

export const Board = () => {
  const lanes = [
    { id: 1, title: "To Do" },
    { id: 2, title: "In Progress" },
    { id: 3, title: "Review" },
    { id: 4, title: "Done" },
  ];

  return (
    <BoardWrapper>
      {lanes.map(({ id, title }) => (
        <Lane key={id} title={title} />
      ))}
    </BoardWrapper>
  );
};
