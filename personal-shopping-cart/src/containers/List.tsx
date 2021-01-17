import React from "react";
import { RouteComponentProps } from "react-router-dom";
import styled from "styled-components";
import { SubHeader } from "../components/Header/SubHeader";
import { ListItem } from "../components/ListItem/ListItem";
import { Item, ItemRouteParams } from "../types";
import { DataFetchingState, withDataFetching } from "../withDataFetching";

const ListItemWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  flex-direction: column;
  margin: 2% 5%;
`;

const Alert = styled.span`
  width: 100%;
  text-align: center;
`;

interface ListProps
  extends DataFetchingState,
    RouteComponentProps<ItemRouteParams> {}

const List = ({ data, loading, error, match, history }: ListProps) => {
  const items =
    data &&
    (data as Item[]).filter(
      ({ listId }) => listId === parseInt(match.params.id)
    );

  if (!loading && !error)
    return (
      <>
        {history && (
          <SubHeader
            goBack={() => history.goBack()}
            openForm={() => history.push(`${match}/new`)}
          />
        )}
        <ListItemWrapper>
          {items && items.map((item) => <ListItem key={item.id} item={item} />)}
        </ListItemWrapper>
      </>
    );

  return <Alert>{loading ? "Loading..." : error}</Alert>;
};

const dataSource =
  "https://my-json-server.typicode.com/pranayfpackt/-React-Projects/items";

export default withDataFetching({ dataSource })(List);
