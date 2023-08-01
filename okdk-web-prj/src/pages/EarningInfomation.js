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
  height: fit-content;
  min-height: 100vh;
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
        <PaymentTitle name={"이거바꿔라"} describe={"적립정보를 관리합니다"} />

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
              <Barcode
                width={"9.31331rem"}
                height={"5.5rem"}
                img={data.barcodeimg}
              />
              <text>{data.barcodeNum}</text>
            </div>
          </ListBox>
        ))}
        <BasicButton
          btnName="매장추가하기"
          onClick={() => navigation.navigate("AddStoreToEarning")}
        />
      </ScrollWrap>
    </Body>
  );
}
