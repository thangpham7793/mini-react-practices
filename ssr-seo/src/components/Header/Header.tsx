import React from "react";
import { Helmet } from "react-helmet";
import { RouteComponentProps, withRouter } from "react-router-dom";
import styled from "styled-components";

const HeaderWrapper = styled.div`
  background-color: orange;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  font-size: calc(10px + 2vmin);
  color: white;
  ${(props) => (props.onClick ? "cursor: pointer;" : "pointer-events: none;")}
`;

const Title = styled.h1`
  pointer-events: none;
`;

interface HeaderProps extends RouteComponentProps {}

const Header = ({ location, history }: HeaderProps) => {
  const onClick = ["/questions", "/"].includes(location.pathname)
    ? undefined
    : () => {
        history.push("/questions");
      };

  return (
    <>
      <Helmet>
        <title>Q&A StackOverflow Feed</title>
        <meta name="description" content="React Community Feed Project" />
      </Helmet>
      <HeaderWrapper onClick={onClick}>
        <Title>Q&A Feed</Title>
      </HeaderWrapper>
    </>
  );
};
export default withRouter(Header);
