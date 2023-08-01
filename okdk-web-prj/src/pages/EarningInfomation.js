import React from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import TopNavigation from "../components/TopNavigation";
import PaymentTitle from "../components/PaymentTitle";
import ListBox from "./../components/ListBox";
import barcodeData from "../mock/barcode.json";
import Card from "../components/Card";
import Barcode from "../components/Barcode";
import BasicButton from "../components/Button";
export const Body = styled.div`
  width: 100%;
  height: 100vh;
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

  return (
    <Body>
      <TopNavigation navigation={navigation} />
      <ScrollWrap>
        <PaymentTitle name={"이거바꿔라"} />

        {barcodeData.barcode.map((data, index) => (
          <ListBox listTitle={data.barcodename}>
            <div
              style={{
                width: "100%",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Barcode img={data.barcodeimg} num={data.barcodenum} />
              <text>{data.barcodeNum}</text>
            </div>
          </ListBox>
        ))}
        <BasicButton
          btnName="매장추가하기"
          // onClick={handleOK}
        />
      </ScrollWrap>
    </Body>
  );
}
