import React from "react";
import styled from "styled-components";

const ListBoxContainer = styled.div`
  width: 20rem;
  height: 9rem;
  border-radius: 1.25rem;
  background: linear-gradient(180deg, #fff 0%, rgba(255, 255, 255, 0.25) 100%);
  border-radius: 1.25rem;
  border: 1px solid #96b3d9;
  box-shadow: 0px 4px 4px 0px #96b3d9;
  // filter: blur(5px);
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
  margin: 1.19rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const ListBox = ({ listTitle, children }) => {
  return (
    <ListBoxContainer>
      <TitleContainer>
        <TitleText>{listTitle}</TitleText>
        <div>더보기</div>
      </TitleContainer>
      {children}
    </ListBoxContainer>
  );
};

export default ListBox;
