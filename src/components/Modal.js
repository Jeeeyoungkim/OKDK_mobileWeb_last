import React from "react";
import styled from "styled-components";
import BasicButton from "./Button";
import ArrowBack from "../assets/images/arrowBack.svg";
import { useNavigate } from "react-router-dom";

const Overlay = styled.section`
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

const ModalWrap = styled.div`
  width: 20rem;
  height: 35rem;
  background-color: white;
  border-radius: 1.25rem;
  box-sizing: border-box;
  padding: 1rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  overflow: hidden;
  position: relative;
`;

const ModalTitle = styled.span`
  color: black;
  width: 100%;
  height: fit-content;
  color: #000;
  font-family: Pretendard;
  font-size: 1.25rem;
  font-style: normal;
  font-weight: 500;
  line-height: normal;
  white-space: pre-line;
  text-align: left;
`;

const ModalDocument = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-top: 2rem;
`;

export const ArrowBackImage = styled.img`
  width: 1.5rem;
  height: 1.5rem;
  position: absolute;
  left: 1rem;
`;

export default function Modal({
  children,
  title,
  basicButtonName,
  basicButtonOnClick,
  buttonDisable,
  // 석현 추가함
  backbasicButtonName,
  backbasicButtonOnClick,
}) {
  const navigation = useNavigate();
  return (
    <Overlay>
      <ModalWrap onClick={(e) => e.stopPropagation()}>
        <ArrowBackImage
          src={ArrowBack}
          onClick={() => {
            navigation(-1);
          }}
        />
        <ModalDocument>
          <ModalTitle>{title}</ModalTitle>
          {children}
        </ModalDocument>
      </ModalWrap>
      {basicButtonName && basicButtonOnClick ? (
        <div style={{ flexDirection: "row" }}>
          {backbasicButtonName && backbasicButtonOnClick && (
            <BasicButton
              btnName={backbasicButtonName}
              onClick={() => {
                if (!buttonDisable) {
                  backbasicButtonOnClick();
                }
              }}
              width="9rem"
              height="4rem"
              backgroundColor={buttonDisable ? "gray" : "#056CF2"}
              borderRadius="30px"
              fontSize="1.25rem"
              color="white"
              fontFamily="Pretendard"
              fontWeight="bold"
              disabled={buttonDisable}
            />
          )}
          {basicButtonName && basicButtonOnClick && (
            <BasicButton
              btnName={basicButtonName}
              onClick={() => {
                if (!buttonDisable) {
                  basicButtonOnClick();
                }
              }}
              width="9rem"
              height="4rem"
              backgroundColor={buttonDisable ? "gray" : "#056CF2"}
              borderRadius="30px"
              fontSize="1.25rem"
              color="white"
              fontFamily="Pretendard"
              fontWeight="bold"
              disabled={buttonDisable}
            />
          )}
        </div>
      ) : null}
    </Overlay>
  );
}
