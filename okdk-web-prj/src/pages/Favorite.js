import React from "react";
import BasicButton from "../components/Button";
import TopNavigation from "../components/TopNavigation";
import styled from "styled-components";
import PaymentTitle from "../components/PaymentTitle";
import ListBox from "../components/ListBox";
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

export default function Favorite() {
  const navigation = useNavigate();

  const handleOK = () => {
    console.log("hi");
  };

  return (
    <Body>
      <TopNavigation navigation={navigation} />
      <ScrollWrap>
        <PaymentTitle name={"김지영"} describe={"즐겨찾는 메뉴입니다"} />
        <ListBox listTitle={"이디야 커피"} btnName={"수정하기"}>
          {" "}
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
        <ListBox listTitle={"스타벅스"} btnName={"수정하기"}>
          {" "}
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
              second_description="아이스 아메리카노"
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
        <BasicButton
          btnName="매장 추가 하기"
          onClick={handleOK}
          width="20rem"
          height="4rem"
          backgroundColor="#056CF2;"
          borderRadius="1.875rem"
          fontSize="1.5rem"
          color="white"
          fontFamily="Pretendard"
          fontWeight="bold"
        />
      </ScrollWrap>
    </Body>
  );
}
