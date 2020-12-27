import React from "react";
import { Link } from "../Link/Link";
import styled from "styled-components";

const HeaderWrapper = styled.div`
  background-color: #282c34;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  font-size: calc(10px + 2vmin);
  color: white;
`;

const Logo = styled.img`
  height: 64px;
  pointer-events: none;
`;

export const Header = ({ logo }: { logo: string }) => {
  return (
    <HeaderWrapper>
      <Logo src={logo} className="App-log" alt="GitHub logo" />
      <h1>
        <Link
          url={"https://github.com/thangpham7793"}
          title="My Git At A Glance"
        />
      </h1>
    </HeaderWrapper>
  );
};
