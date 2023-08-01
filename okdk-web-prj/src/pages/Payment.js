import React from "react";
import styled from "styled-components";

import Modal from "../components/Modal";
import TopNavigation from "../components/TopNavigation";
import { useNavigate } from "react-router-dom";
import ListBox from "../components/ListBox";
import BasicButton from "../components/Button";
import Card from "../components/Card";
import PaymentTitle from "../components/PaymentTitle";
import payment_main from "../mock/payment_main.json";
import Barcode from "../components/Barcode";
import MonthlyPayment from "../components/MonthlyPayment";
export const Body = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  position: relative;
  align-items: center;
  background-color: #f5f7fb;
`;

export const ScrollWrap = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export default function Payment() {
  const navigation = useNavigate();
  const handleOK = () => {
    console.log("hi");
  };
  return (
    <Body>
      <TopNavigation navigation={navigation} />
      <ScrollWrap>
        <PaymentTitle
          name={payment_main.username}
          describe={"적립 관리 화면입니다."}
        />
        <ListBox listTitle={"결제 카드"}>
          <div
            style={{
              width: "100%",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            {payment_main.card.map((data, index) => (
              <>
                <Card
                  imguri={data.cardimg}
                  width={"6.333331rem"}
                  height={"4rem"}
                />
                <text>
                  {data.cardname}({data.cardnumber})
                </text>
              </>
            ))}
          </div>
        </ListBox>
        <ListBox listTitle={"적립 바코드"}>
          <div
            style={{
              width: "100%",
              display: "flex",
              alignItems: "center",
              overflowX: "auto",
            }}
          >
            {payment_main.barcode.map((data, index) => (
              <Barcode
                img={data.barcodeimg}
                num={data.barcodenum}
                name={data.barcodename}
              />
            ))}
          </div>
        </ListBox>
        <ListBox listTitle={"이번달 결제 내역"}>
          <div
            style={{
              textAlign: "center",
              fontSize: "2rem",
              fontWeight: 700,
              fontStyle: "normal",
              fontFamily: "Pretendard",
            }}
          >
            총 {payment_main.totalpayment}원
          </div>
        </ListBox>
        <ListBox listTitle={"월별 결제 내역"}>
          <MonthlyPayment monthlypayment={payment_main.monthlypayment} />
        </ListBox>
      </ScrollWrap>

      {/* <Modal title={"멤버십을 적립할\n매장을 설정해주세요"}>
        <BasicButton
          btnName="확인"
          onClick={handleOK}
          width="320px"
          height="64px"
          backgroundColor="white"
          borderRadius="30px"
          font-size="24px"
          color="white"
          font-family="Pretendard"
          font-weight="bold"
        />
      </Modal> */}
    </Body>
  );
}
