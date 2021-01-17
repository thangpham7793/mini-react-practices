import React from "react";
import styled from "styled-components";
import { Link, RouteComponentProps } from "react-router-dom";
import { DataFetchingState, withDataFetching } from "../withDataFetching";
import { SubHeader } from "../components/Header/SubHeader";
import { List } from "../types";

const ListWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  flex-direction: column;
  margin: 5%;
`;

const ListLink = styled(Link)`
  text-decoration: none;
  display: flex;
  text-align: left;
  background: lightGray;
  border-radius: 5px;
  padding: 10px;
  margin-bottom: 2%;
  color: black;
`;

const Title = styled.h3`
  flex-basis: 80%;
`;

const Alert = styled.span`
  width: 100%;
  text-align: center;
`;

interface ListsProps extends DataFetchingState, RouteComponentProps {}

const Lists = ({ data, loading, error, history }: ListsProps) => {
  if (!loading && !error)
    return (
      <>
        {history && <SubHeader title="Your Lists" />}
        <ListWrapper>
          {data &&
            (data as List[]).map((list) => (
              <ListLink key={list.id} to={`list/${list.id}`}>
                <Title>{list.title}</Title>
              </ListLink>
            ))}
        </ListWrapper>
      </>
    );

  return <Alert>{loading ? "Loading..." : error}</Alert>;
};

const dataSource =
  "https://my-json-server.typicode.com/PacktPublishing/React-Projects/lists";

export default withDataFetching({ dataSource })(Lists);
