import React from "react";
import styled from "styled-components";
import Card from "../components/Card/Card";
import { QuestionItem } from "../types";
import { Link } from "react-router-dom";
import withDataFetching from "../withDataFetching";

const FeedWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  flex-direction: column;
  margin: 5%;
`;

const Alert = styled.div`
  text-align: center;
`;

const CardLink = styled(Link)`
  text-decoration: none;
  color: inherit;
`;

interface FeedProps {
  data: CardData;
  loading: boolean;
  error: string;
  loadingMessage: string;
}

type CardData = {
  items: QuestionItem[];
};

const Feed = ({ data, loading, error, loadingMessage }: FeedProps) => {
  if (loading || error) {
    return <Alert>{loading ? loadingMessage : error}</Alert>;
  }

  return (
    <FeedWrapper>
      {data.items.map((item: QuestionItem) => (
        <CardLink key={item.question_id} to={`/questions/${item.question_id}`}>
          <Card key={item.question_id} data={item} />
        </CardLink>
      ))}
    </FeedWrapper>
  );
};

export default withDataFetching(Feed);
