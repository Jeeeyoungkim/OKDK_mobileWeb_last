// Morecards

import React from "react";
import Modal from "../../components/Modal";
import TopNavigation from "../../components/TopNavigation";
import Card from "../../components/Card";
import styled from "styled-components";
import DirectInput from "./DirectInput";
import BasicButton from "../../components/Button";
import { useNavigate } from "react-router-dom";
import cardList from "../../mock/Card_list.json";
export default function Morecards() {
  const navigation = useNavigate();
  const Container = styled.div`
    /* display: flex;
    flex-direction: column;
    align-items: center; */
  `;

  const handleEnrollMove = () => {
    navigation("/CardEnroll");
  };
  const handlePaymentMove = () => {
    navigation("/Payment");
  };
  return (
    <div>
      <TopNavigation />
      <Modal
        title="결제카드"
        basicButtonName="확인"
        basicButtonOnClick={handlePaymentMove}
      >
        <div style={{ textAlign: "left" }}>
          기본으로 결제할 카드를 설정해주세요
        </div>
        <Container>
          <section
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "flex-start",
            }}
          ></section>
          <section style={{ padding: "55px" }}>
            {cardList.card.map((card) => (
              <div>
                <Card 
                imgWidth="9.89581rem"
                imgHeight="6.25rem"
                imguri={card.cardimg}
                imgBorderRadius="7px"/>
                <div
                  style={{
                    display: "flex",
                    flexDirection: "row",
                    justifyContent: "center",
                  }}
                >
                  <input type="radio" />
                  <p style={{ padding: "5px" }}>{card.cardname} {(card.cardnumber)}</p>
                </div>
              </div>
            ))}
            {/* <div style={{ marginTop: "20px" }}>
              <Card />
              <div
                style={{
                  display: "flex",
                  flexDirection: "row",
                  justifyContent: "center",
                }}
              >
                <input type="radio" />
                <p style={{ padding: "5px" }}>신한 (5678)</p>
              </div>
            </div> */}
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
            font-weight="bold"
          />
        </Container>
      </Modal>
    </div>
  );
}
