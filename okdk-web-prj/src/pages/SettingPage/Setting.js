import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import TopNavigation from "../../components/TopNavigation";
import PaymentTitle from "../../components/PaymentTitle";
import axios from "axios";

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

const ListBoxContainer = styled.div`
  width: 20rem;
  height: fit-content;
  border-radius: 1.25rem;
  //border: 1px solid #96b3d9;
  background: #fff;
  box-shadow: 0px 4px 4px 0px #96b3d9;
  margin-bottom: 2.25rem;
  /* backdrop-filter: blur(3px); */
  position: relative;
`;

const BlurEffect = styled.div`
  backdrop-filter: blur(3px);
  width: calc(100% + 5px);
  height: fit-content;
  border-radius: 1.25rem;
  position: relative;
  top: 3px;
  right: 3px;
  bottom: 10px;
  left: -3px;
`;
export const ItemContainer = styled.div`
  width: 20rem;
  height: 4rem;
  flex-shrink: 0;
  color: #000;
  text-align: center;
  font-family: Pretendard;
  font-size: 1.5rem;
  font-style: normal;
  font-weight: 700;
  line-height: normal;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export default function Setting() {
  const navigation = useNavigate();
  const accessToken = localStorage.getItem("access"); //access Token

  //state management------------------------------
  const [user, setUser] = useState(null);
  useEffect(() => {
    const config = {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    };
    async function fetchData() {
      try {
        const userData = await axios.get("/account/user/", config);
        setUser(userData.data);
      } catch (error) {
        console.error("에러 발생:", error);
      }
    }
    fetchData();
  }, []);
  return (
    <Body>
      <TopNavigation navigation={navigation} />
      <ScrollWrap>
        <PaymentTitle
          name={user.nickname || "익명"}
          describe={"설정화면 입니다."}
        />
        <ListBoxContainer
          onClick={() => console.log("click")}
          style={{
            marginTop: "7.3rem",
          }}
        >
          <BlurEffect>
            <ItemContainer>얼굴 데이터 관리</ItemContainer>
          </BlurEffect>
        </ListBoxContainer>
        <ListBoxContainer onClick={() => console.log("click")}>
          <BlurEffect>
            <ItemContainer>계정 관리</ItemContainer>
          </BlurEffect>
        </ListBoxContainer>
        <ListBoxContainer onClick={() => console.log("click")}>
          <BlurEffect>
            <ItemContainer>테마 설정</ItemContainer>
          </BlurEffect>
        </ListBoxContainer>
      </ScrollWrap>
    </Body>
  );
}
