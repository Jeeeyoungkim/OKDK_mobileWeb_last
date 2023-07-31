import React from "react";
import Modal, { ModalDocument, ModalTitle, Overlay } from "../components/Modal";
import TopNavigation from "../components/TopNavigation";
import { ModalWrap } from "../components/Modal/ModalWrap";
import Card from "../components/Card";
import styled from "styled-components";
import Directinput from "./DirectInput";
import BasicButton from "../components/Button";
export default function Morecards({ navigation }) {
  const Container = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
  `;

  const handleEnrollMove = () => {
    navigation.navigate('')
  }
  return (
    <div>
      <TopNavigation />
      <Modal title="결제카드">
        <Container>
          <section
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "flex-start",
            }}
          >
            <p style={{ fontSize: "1.25rem", fontWeight: "600" }}>결제카드</p>
            <p style={{ fontSize: "1rem", fontWeight: "500" }}>
              기본으로 결제할 카드를 설정해주세요
            </p>
          </section>
          <section style={{ padding: "80px" }}>
            <div>
              <Card />
              <div style={{display:'flex', flexDirection:'row', justifyContent:'center'}}>
                <input type="radio" />
                <p style={{ padding:'5px'}}>신한 (1234)</p>
              </div>
            </div>
            <div style={{ marginTop: "20px" }}>
              <Card />
              <div style={{display:'flex', flexDirection:'row', justifyContent:'center'}}>
                <input type="radio" />
                <p style={{ padding:'5px'}}>신한 (5678)</p>
              </div>
            </div>
          </section>
          <BasicButton
          btnName="카드 등록하기"
          onClick={handleEnrollMove}
          width="15rem"
          height="3.5rem"
          backgroundColor="#056CF2"
          borderRadius="30px"
          font-size="1.25rem"
          color="white"
          font-family="Pretendard"
          font-weight="bold"/>
        </Container>
      </Modal>
    </div>
  );
}
