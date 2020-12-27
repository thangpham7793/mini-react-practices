import React from "react";
import styled from "styled-components";

const InnerLink = styled.a`
  color: #61dafb;
`;

type LinkProps = { url: string; title: string };

export const Link: React.FC<LinkProps> = ({ url, title }) => {
  return (
    <InnerLink
      className="App-link"
      href={url}
      target="_blank"
      rel="noopener noreferrer"
    >
      {title}
    </InnerLink>
  );
};
