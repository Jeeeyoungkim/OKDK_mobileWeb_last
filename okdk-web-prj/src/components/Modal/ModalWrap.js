import React, { useState } from "react";
import styled from "styled-components";


const ModalWrapStyle = styled.div`
  width: 20rem;
  height: 35rem;
  background-color: white;
  border-radius: 1.25rem;
  box-sizing: border-box;
  padding: 1rem;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export const ModalWrap = () => {
  return (
    <>
      <ModalWrapStyle/>
    </>
  );
};
