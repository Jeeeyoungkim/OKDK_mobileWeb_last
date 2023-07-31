import React from "react";
import styled from "styled-components";

import BasicButton from "./Button";

const ListBoxContainer = styled.div`
  width: 20rem;
  min-height: 9rem;
  height: fit-content;
  border-radius: 1.25rem;
  background: linear-gradient(180deg, #fff 0%, rgba(255, 255, 255, 0.25) 100%);
  border-radius: 1.25rem;
  border: 1px solid #96b3d9;
  box-shadow: 0px 4px 4px 0px #96b3d9;
  // filter: blur(5px);
  margin-bottom: 1.5rem;
`;

const TitleText = styled.p`
  margin: 0;
  color: #000;
  font-size: 1.125rem;
  font-style: normal;
  font-weight: 700;
  line-height: normal;
`;

const TitleContainer = styled.div`
  margin: 0.5rem 1rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const ChildrenContainer = styled.div`
  padding: 0px 10px 10px 5px;
  box-sizing: border-box;
`;
const ListBox = ({ listTitle, children, handleShowMore }) => {
  return (
    <ListBoxContainer>
      <TitleContainer>
        <TitleText>{listTitle}</TitleText>
        <BasicButton
          btnName="더보기"
          onClick={handleShowMore}
          width="4.1rem"
          height="1.8rem"
          backgroundColor="#056CF2"
          borderRadius="1.25rem"
          fontSize="1rem"
          color="#FFF"
          fontFamily="Pretendard"
          fontWeight="bold"
        />
      </TitleContainer>
      <ChildrenContainer>{children}</ChildrenContainer>
    </ListBoxContainer>
  );
};

export default ListBox;
