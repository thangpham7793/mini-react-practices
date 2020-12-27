import React from "react";
import { Link } from "../Link/Link";
import styled from "styled-components";

const ListWrapper = styled.ul`
  list-style: none;
  padding: 0;
  text-align: left;
`;

const ListItem = styled.li`
  display: flex;
  justify-content: space-between;
`;

// simple interface Array<Item>
type Label = string;
type Value = string | number;
type Item = [Label, Value];
type LinkProps = { items: Array<Item> };

// NOTE: logics still tied to component (essentially like a factory for different list items), but this is display logic, so maybe it should live in the displaying component?
// Different types of lists: text, url, special, imageUrl
// the question is what is your most atomic components?

export const List: React.FC<LinkProps> = ({ items }) => {
  return (
    <ListWrapper>
      {items.map(([field, value]) => {
        switch (field) {
          case "githubUrl":
            return (
              <ListItem key={value}>
                <Link title="GitHub Profile" url={value as string} />
              </ListItem>
            );
          case "linkedInUrl":
            return (
              <ListItem key={value}>
                <Link title="LinkedIn" url={value as string} />
              </ListItem>
            );
          case "hireable":
            return (
              <ListItem key={value}>
                <strong>Looking for Teammates!</strong>
              </ListItem>
            );
          case "avatarUrl":
            return null;
          case "repoNameAndUrl":
            const [name, url] = (value as string).split("|");
            return (
              <ListItem key={value}>
                <Link url={url} title={name} />
              </ListItem>
            );
          default:
            return (
              <ListItem key={value}>
                <strong>{`${field}: `}</strong>
                {`${value}`}
              </ListItem>
            );
        }
      })}
    </ListWrapper>
  );
};
