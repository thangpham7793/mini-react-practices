import React from "react";
import styled from "styled-components";
import Card from "../components/Card/Card";
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
  data: any;
  loading: boolean;
  error: string;
  loadingMessage: string;
}

const Question = ({ data, loading, error, loadingMessage }: QuestionProps) => {
  if (loading || error)
    return <Alert>{loading ? loadingMessage : error}</Alert>;
  return (
    <QuestionWrapper>
      <Card data={data.items[0]} />
    </QuestionWrapper>
  );
};

export default withDataFetching(Question);
