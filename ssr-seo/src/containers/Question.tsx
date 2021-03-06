import React from "react";
import { Helmet } from "react-helmet";
import styled from "styled-components";
import Card from "../components/Card/Card";
import { QuestionItem } from "../types";
import withDataFetching from "../withDataFetching";

const QuestionWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  flex-direction: column;
  margin: 5%;
`;

const Alert = styled.div`
  text-align: center;
`;

interface QuestionProps {
  data: { has_more: boolean; items: QuestionItem[] };
  loading: boolean;
  error: string;
  loadingMessage: string;
}

const Question = ({ data, loading, error, loadingMessage }: QuestionProps) => {
  if (loading || error)
    return <Alert>{loading ? loadingMessage : error}</Alert>;
  return (
    <>
      <Helmet>
        <title>{`Q&A StackOverflow Feed - Question ${data.items[0].question_id}`}</title>
      </Helmet>
      <QuestionWrapper>
        <Card question={data.items[0]} />
      </QuestionWrapper>
    </>
  );
};

export default withDataFetching(Question);
