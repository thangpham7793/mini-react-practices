import React from "react";
import styled from "styled-components";
import { QuestionOwner } from "../../types";

const OwnerWrapper = styled.div`
  display: flex;
  flex-basis: 40%;
  align-items: center;
  justify-content: flex-end;
`;

const Avatar = styled.img`
  display: block;
  width: 32px;
  height: 32px;
  border-radius: 50%;
`;

const Name = styled.h3`
  margin-left: 5%;
`;

interface OwnerProps {
  owner: QuestionOwner;
}

const Owner = ({ owner }: OwnerProps) => (
  <OwnerWrapper>
    <Avatar src={owner.profile_image} />
    <Name>{owner.display_name}</Name>
  </OwnerWrapper>
);

export default Owner;
