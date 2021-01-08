import React from "react";
import styled from "styled-components";

const LaneWrapper = styled.div`
  list-style: none;
  text-align: left;
  padding: 0;
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

const Title = styled.h2`
  width: 100%;
  text-align: center;
  border-bottom: 1px solid darkGray;
  padding-bottom: 10px;
`;

interface LaneProps {
  title: string;
}

export const Lane = ({ title }: LaneProps) => {
  return (
    <LaneWrapper>
      <Title>{title}</Title>
    </LaneWrapper>
  );
};
