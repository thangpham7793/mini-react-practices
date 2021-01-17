import React from "react";
import { RouteComponentProps } from "react-router-dom";
import styled from "styled-components";
import { SubHeader } from "../components/Header/SubHeader";
import { ListItem } from "../components/ListItem/ListItem";
import { ItemsContext } from "../contexts/ItemContextProvider";
import { ListsContext } from "../contexts/ListsContextProvider";
import { Item, ItemRouteParams } from "../types";

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

type ListProps = RouteComponentProps<ItemRouteParams>;

const List = ({ match, history }: ListProps) => {
  const { getItems, deleteItem, data, loading, error } = React.useContext(
    ItemsContext
  );

  const lists = React.useContext(ListsContext).data;

  const items = (data as Item[]).filter(
    ({ listId }) => listId === parseInt(match.params.id)
  );

  React.useEffect(() => {
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
            openForm={() => history.push(`${match.params.id}/new`)}
          />
        )}
        <ListItemWrapper>
          {items &&
            items.map((item) => (
              <ListItem deleteItem={deleteItem} key={item.id} item={item} />
            ))}
        </ListItemWrapper>
      </>
    );

  return <Alert>{loading ? "Loading..." : error}</Alert>;
};

export default List;
