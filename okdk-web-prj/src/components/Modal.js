import React, { useState } from "react";
import styled from "styled-components";

export const Overlay = styled.section`
  z-index: 1;
  width: 100%;
  height: 100%;
  position: fixed;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-color: rgba(0, 0, 0, 0.4);
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
`;

export const ModalWrap = styled.div`
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

export const ModalTitle = styled.span`
  color: black;
  width: 100%;
  color: #000;
  font-family: Pretendard;
  font-size: 1.25rem;
  font-style: normal;
  font-weight: 500;
  line-height: normal;
  white-space: pre-line;
`;

export const ModalDocument = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
`;

export default function Modal({ children, title }) {

  return (
    <>
        <Overlay>
          <ModalWrap onClick={(e) => e.stopPropagation()}>
            <ModalDocument>{children}</ModalDocument>
          </ModalWrap>
        </Overlay>
    </>
  );
}
