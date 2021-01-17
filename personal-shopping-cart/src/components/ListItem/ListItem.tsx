import React from "react";
import styled from "styled-components";
import { FetchItemsContextState } from "../../contexts/ItemContextProvider";
import { Item } from "../../types";

const ListItemWrapper = styled.div`
  display: flex;
  text-align: left;
  align-items: center;
  padding: 1%;
  background: lightGray;
  border-radius: 5px;
  padding: 10px;
  margin-bottom: 2%;
  text-decoration: none;
`;

const Title = styled.h3`
  flex-basis: 40%;
  @media screen and (max-width: 500px) {
    flex-basis: 30%;
  }
`;

const Quantity = styled.span`
  flex-basis: 30%;
  font-weight: bold;
  text-align: right;
  @media screen and (max-width: 500px) {
    flex-basis: 30%;
  }
`;

const Price = styled.span`
  flex-basis: 15%;
  font-weight: bold;
  text-align: right;
  @media screen and (max-width: 500px) {
    flex-basis: 30%;
  }
`;

const Delete = styled.button`
  flex-basis: 15%;
  @media screen and (max-width: 500px) {
    flex-basis: 10%;
  }
  margin-left: 2%;
`;

type ListItemProps = Pick<FetchItemsContextState, "deleteItem"> & {
  item: Item;
};

export const ListItem = ({
  item: { title, quantity, price, id },
  deleteItem,
}: ListItemProps) => (
  <ListItemWrapper>
    <Title>{title}</Title>
    <Quantity>{`Quantity: ${quantity}`}</Quantity>
    <Price>{`$ ${price}`}</Price>
    <Delete onClick={() => deleteItem(id)}>Delete</Delete>
  </ListItemWrapper>
);
