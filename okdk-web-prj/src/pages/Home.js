import React from "react";
import BasicButton from "../components/Button";
import TopNavigation from "../components/TopNavigation";
import styled from "styled-components";
import PaymentTitle from "../components/PaymentTitle";
import ListBox from "../components/ListBox";
import ChangeComponent from "../components/ChangeComponent";
import CoffeeComponent from "../components/CoffeeComponent";

import { useNavigate } from "react-router-dom";

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

export default function Home() {
  const navigation = useNavigate();

  const handleOK = () => {
    console.log("hi");
  };

  return (
    <Body>
      <TopNavigation navigation={navigation} />
      <ScrollWrap>
        <PaymentTitle name={"김지영"} describe={"좋은 아침입니다!"} />
        <ChangeComponent />
        <ListBox listTitle={"즐겨찾는 메뉴"}>
          <div
            style={{
              display: "flex",
              justifyContent: "flex-start",
              marginLeft: "0.5rem",
            }}
          >
            <CoffeeComponent
              imgURI={require("../assets/images/sampleCoffee.png")}
              first_description="스타벅스"
              second_description="아메리카노"
              background="#0583F2"
            ></CoffeeComponent>
            <CoffeeComponent
              imgURI={require("../assets/images/sampleCoffee.png")}
              first_description="이디야"
              second_description="토피넛 라떼"
              background="#F29B0C"
            ></CoffeeComponent>
            <CoffeeComponent
              imgURI={require("../assets/images/sampleCoffee.png")}
              first_description="스타벅스"
              second_description="카페 라뗴"
              background="#0583F2"
            ></CoffeeComponent>
          </div>
        </ListBox>
        <ListBox listTitle={"최근 이용 내역"}>
          <div
            style={{
              display: "flex",
              justifyContent: "flex-start",
              marginLeft: "0.5rem",
            }}
          >
            <CoffeeComponent
              imgURI={require("../assets/images/sampleCoffee.png")}
              first_description="스타벅스"
              second_description="아메리카노"
              background="#0583F2"
            ></CoffeeComponent>
            <CoffeeComponent
              imgURI={require("../assets/images/sampleCoffee.png")}
              first_description="이디야"
              second_description="토피넛 라떼"
              background="#F29B0C"
            ></CoffeeComponent>
            <CoffeeComponent
              imgURI={require("../assets/images/sampleCoffee.png")}
              first_description="스타벅스"
              second_description="카페 라뗴"
              background="#0583F2"
            ></CoffeeComponent>
          </div>
        </ListBox>
      </ScrollWrap>
    </Body>
  );
}
