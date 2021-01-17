import React from "react";
import { RouteComponentProps } from "react-router-dom";
import styled from "styled-components";
import { SubHeader } from "../components/Header/SubHeader";
import { ListItem } from "../components/ListItem/ListItem";
import { FetchItemsContextState } from "../contexts/ItemContextProvider";
import { Item, ItemRouteParams, ShoppingList } from "../types";

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
  extends FetchItemsContextState,
    RouteComponentProps<ItemRouteParams> {
  lists: ShoppingList[];
}

const List = ({
  data,
  loading,
  error,
  getItems,
  match,
  history,
  lists,
}: ListProps) => {
  const items = (data as Item[]).filter(
    ({ listId }) => listId === parseInt(match.params.id)
  );

  React.useEffect(() => {
    console.log(data);
    if (!data.length) {
      getItems();
    }
  }, [data, getItems]);

  const parentList =
    lists && lists.find(({ id }) => id === parseInt(match.params.id));

  if (!loading && !error)
    return (
      <>
        {history && (
          <SubHeader
            title={parentList?.title}
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

export default List;
