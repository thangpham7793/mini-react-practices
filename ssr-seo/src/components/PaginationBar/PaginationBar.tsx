import React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";

const PaginationWrapper = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-around;
`;

const PaginationLink = styled(Link)`
  padding: 1%;
  background: lightBlue;
  color: white;
  text-decoration: none;
  border-radius: 5px;
`;

interface PaginationBarProps {
  hasMore: boolean;
  url: string;
  page: number;
}

export const PaginationBar = ({ hasMore, url, page }: PaginationBarProps) => {
  return (
    <PaginationWrapper>
      {page > 1 && (
        <PaginationLink to={`${url}?page=${page - 1}`}>Prev</PaginationLink>
      )}
      {hasMore && (
        <PaginationLink to={`${url}?page=${page + 1}`}>Next</PaginationLink>
      )}
    </PaginationWrapper>
  );
};
