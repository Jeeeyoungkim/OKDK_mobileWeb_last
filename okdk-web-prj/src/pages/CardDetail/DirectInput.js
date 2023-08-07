// directInput

import React, { useState } from "react";
import Modal from "../../components/Modal";
import TopNavigation from "../../components/TopNavigation";
import Card from "../../components/Card";
import styled from "styled-components";
import BasicButton from "../../components/Button";
import { useNavigate } from "react-router-dom";


const Container = styled.div`
display: flex;
flex-direction: column;
align-items: center;
margin-top: 1rem;
`;
const BigInput = styled.input`
width: 17.53125rem;
height: 2.25rem;
border-radius: 0.625rem;
background-color: #d9d9d9;
border: none;
`;

const SmallInput = styled.input`
width: 8.0625rem;
height: 2.25rem;
border-radius: 0.625rem;
background-color: #d9d9d9;
border: none;
`;

const Text = styled.p`
color: #000;
text-align: center;
font-family: Pretendard;
font-size: 1.125rem;
font-style: normal;
font-weight: 600;
line-height: normal;
text-align: start;
margin-bottom: 0.75rem;
`;
export default function DirectInput() {
  const [cardNumber, setCardNumber] = useState("");
  const [expiration, setExpiration] = useState("");
  const [cvc, setCVC] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();
    // 폼 데이터를 백엔드로 전송하는 로직을 작성합니다.
    // 예를 들어, fetch API를 사용하여 백엔드로 데이터를 전송할 수 있습니다.
    // fetch('/api/submit', {
    //   method: 'POST',
    //   body: JSON.stringify({ cardNumber, expiration, cvc, password }),
    //   headers: {
    //     'Content-Type': 'application/json'
    //   }
    // })
    // .then(response => response.json())
    // .then(data => {
    //   // 백엔드에서 받은 응답을 처리하는 로직
    // });
  };
  const navigation = useNavigate();

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
        title="직접 입력"
        basicButtonName="확인"
        basicButtonOnClick={handleSubmit}
      >
        <Container>
          <Card
            width="11.875rem"
            height="7.5rem"
            imgWidth="11.875rem"
            imgHeight="7.5rem"
            imgBorderRadius="0.4375rem"
            backgroundColor="#D9D9D9"
            borderRadius="0.4375rem"
            // imguri="../assets/images/Shinhan.jpg"
          />
          <section>
            <form onSubmit={handleSubmit}>
              <div style={{ marginTop: "3rem" }}>
                <Text>카드번호</Text>
                <BigInput
                  type="text"
                  value={cardNumber}
                  onChange={(e) => setCardNumber(e.target.value)}
                />
              </div>
              <div style={{ display: "flex", justifyContent: "space-between" }}>
                <span style={{ marginTop: "1rem" }}>
                  <Text>유효기간</Text>
                  <SmallInput
                    type="text"
                    value={expiration}
                    onChange={(e) => setExpiration(e.target.value)}
                  />
                </span>
                <span style={{ marginTop: "1rem" }}>
                  <Text>CVC</Text>
                  <SmallInput
                    type="text"
                    value={cvc}
                    onChange={(e) => setCVC(e.target.value)}
                  />
                </span>
              </div>
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "flex-start",
                  marginTop: "1rem",
                }}
              >
                <Text>비밀번호 앞 2자리</Text>
                <SmallInput
                  type="text"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
            </form>
          </section>
        </Container>
      </Modal>
    </div>
  );
}
