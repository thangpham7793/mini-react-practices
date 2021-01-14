import React from "react";
import styled from "styled-components";
import Card from "../components/Card/Card";
import { QuestionItem } from "../types";
import { Link, RouteComponentProps } from "react-router-dom";
import withDataFetching from "../withDataFetching";
import { PaginationBar } from "../components/PaginationBar/PaginationBar";
import { Helmet } from "react-helmet";

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

interface FeedProps extends RouteComponentProps {
  data: CardData;
  loading: boolean;
  error: string;
  loadingMessage: string;
  page: number;
}

type CardData = {
  has_more: boolean;
  items: QuestionItem[];
};

const Feed = ({
  data,
  loading,
  error,
  loadingMessage,
  page,
  match,
}: FeedProps) => {
  if (loading || error) {
    return (
      <>
        <Helmet>
          <title>Q&A StackOverflow Feed - Questions</title>
        </Helmet>
        <Alert>{loading ? loadingMessage : error}</Alert>
      </>
    );
  }

  return (
    <>
      <Helmet>
        <title>Q&A StackOverflow Feed - Questions</title>
      </Helmet>
      <FeedWrapper>
        {data.items.map((item: QuestionItem) => (
          <CardLink
            key={item.question_id}
            to={`/questions/${item.question_id}`}
          >
            <Card key={item.question_id} question={item} />
          </CardLink>
        ))}
        <PaginationBar url={match.url} hasMore={data.has_more} page={page} />
      </FeedWrapper>
    </>
  );
};

export default withDataFetching(Feed);
