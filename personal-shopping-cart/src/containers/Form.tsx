import React from "react";
import { RouteComponentProps } from "react-router-dom";
import styled from "styled-components";
import { Button } from "../components/Button/Button";
import { FormItem } from "../components/FormItem/FormItem";
import { SubHeader } from "../components/Header/SubHeader";
import { FetchItemsContextState } from "../contexts/ItemContextProvider";
import { ItemRouteParams } from "../types";

const FormWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  flex-direction: column;
  margin: 2% 5%;
`;

const SubmitButton = styled(Button)`
  background: blue;
  margin: 2% 0;
`;

type FormProps = RouteComponentProps<ItemRouteParams> &
  Pick<FetchItemsContextState, "postItem">;

export const Form = ({ match, history, postItem }: FormProps) => {
  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    postItem({
      title,
      quantity: Number(quantity),
      price: Number(price),
      listId: Number(match.params.id),
    });
  };

  const [title, setTitle] = React.useState("");
  const [quantity, setQuantity] = React.useState("");
  const [price, setPrice] = React.useState("");

  return (
    <>
      {history && (
        <SubHeader goBack={() => history.goBack()} title={`Add Item`} />
      )}
      <FormWrapper>
        <form onSubmit={onSubmit}>
          <FormItem
            id="title"
            label="Title"
            placeholder="Insert title"
            value={title}
            handleOnChange={setTitle}
          />
          <FormItem
            id="quantity"
            label="Quantity"
            type="number"
            placeholder="0"
            value={quantity}
            handleOnChange={setQuantity}
          />
          <FormItem
            id="price"
            label="Price"
            type="number"
            placeholder="0.00"
            value={price}
            handleOnChange={setPrice}
          />
          <SubmitButton>Add Item</SubmitButton>
        </form>
      </FormWrapper>
    </>
  );
};
