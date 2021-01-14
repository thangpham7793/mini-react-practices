import React from "react";
import styled from "styled-components";
import { QuestionItem } from "../../types";
import Owner from "../Owner/Owner";

const CardWrapper = styled.div`
  text-align: left;
  padding: 1%;
  background: lightGray;
  border-radius: 5px;
  margin-bottom: 2%;
`;

const Title = styled.h2`
  width: 100%;
  padding-bottom: 10px;
  text-align: center;
  border-bottom: 1px solid darkGray;
`;

const Meta = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin: 0 2%;
`;

const Count = styled.div`
  flex-basis: 80%;
`;

interface CardProps {
  question: QuestionItem;
}

const Card = ({ question }: CardProps) => (
  <CardWrapper>
    <Title>{question.title}</Title>
    <Meta>
      <Count>
        {`Views: ${question.view_count} | Answers: ${question.answer_count}`}
      </Count>
      <Owner owner={question.owner} />
    </Meta>
  </CardWrapper>
);

export default Card;
