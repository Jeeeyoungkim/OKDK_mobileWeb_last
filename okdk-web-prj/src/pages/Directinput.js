// directInput

import React from "react";
import Modal, { ModalDocument, ModalTitle, Overlay } from "../components/Modal";
import TopNavigation from "../components/TopNavigation";
import { ModalWrap } from "../components/Modal/ModalWrap";
import Card from "../components/Card";
import styled from "styled-components";
import Directinput from "./DirectInput";
import BasicButton from "../components/Button";
export default function DirectInput({ navigation }) {
  const Container = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
  `;
  return (
    <div>
      <TopNavigation />
      <Modal title="직접 입력">
        <Container>
          <section
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "flex-start",
            }}
          >
            <p style={{ fontSize: "1.25rem", fontWeight: "600" }}>직접 입력</p>
          </section>

          <div style={{ display:'flex', flexDirection:'column', height:'100%', justifyContent:'flex-end', marginBottom:'5px'}}>
            <BasicButton
              btnName="직접 입력"
              onClick={() => navigation.navigate("DirectInput")}
              width="15rem"
              height="3.5rem"
              backgroundColor="#056CF2"
              borderRadius="30px"
              font-size="1.25rem"
              color="white"
              font-family="Pretendard"
              font-weight="bold"
            />

            <BasicButton
              btnName="카메라 촬영"
              onClick={() => navigation.navigate("Camera")}
              width="15rem"
              height="3.5rem"
              backgroundColor="#056CF2"
              borderRadius="30px"
              font-size="1.25rem"
              color="white"
              font-family="Pretendard"
              font-weight="bold"
            />
          </div>
        </Container>
      </Modal>
      <div style={{ position: "absolute", top: "87%", left: "3%" }}>
        <BasicButton
          btnName="확인"
          onClick={() => navigation.navigate("Payment")}
          width="20rem"
          height="4rem"
          backgroundColor="#056CF2"
          borderRadius="30px"
          font-size="1.25rem"
          color="white"
          font-family="Pretendard"
          font-weight="bold"
        />
      </div>
    </div>
  );
}
