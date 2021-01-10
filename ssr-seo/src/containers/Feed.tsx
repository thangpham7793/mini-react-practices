import React from "react";
import styled from "styled-components";
import Card from "../components/Card/Card";
import { QuestionItem } from "../types";
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

interface FeedProps {
  data: CardData;
  loading: boolean;
  error: string;
}

type CardData = {
  items: QuestionItem[];
};

const Feed = ({ data, loading, error }: FeedProps) => {
  if (loading || error) {
    return <Alert>{loading ? "Loading..." : error}</Alert>;
  }

  return (
    <FeedWrapper>
      {data.items.map((item: QuestionItem) => (
        <Card key={item.question_id} data={item} />
      ))}
    </FeedWrapper>
  );
};

export default withDataFetching(Feed);
