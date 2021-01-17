import React from "react";
import styled from "styled-components";

const HeaderWrapper = styled.div`
  background-color: orange;
  height: 100%;
  display: flex;
  justify-content: center;
  font-size: calc(10px + 2vmin);
  color: white;
`;

const Title = styled.h1`
  pointer-events: none;
`;

export const Header = () => {
  return (
    <HeaderWrapper>
      <Title>Personal Shopping Lists</Title>
    </HeaderWrapper>
  );
};
