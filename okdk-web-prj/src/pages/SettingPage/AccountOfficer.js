import React from "react";
import styled from "styled-components";
import TopNavigation from "../../components/TopNavigation";
import PaymentTitle from "../../components/PaymentTitle";
import { useNavigate, useLocation } from "react-router-dom";
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

export const PaymentWrap = styled.div`
  width: 90%;
  min-height: 32.5rem;
  border-radius: 1.25rem;
  background: #fff;
  padding: 1.25rem;
  box-sizing: border-box;
  margin-bottom: 1.56rem;
  display: flex;
  flex-direction: column;
  align-items: start;
`;

export const Title = styled.div`
  color: #000;
  font-family: Pretendard;
  font-size: 1rem;
  font-style: normal;
  font-weight: 600;
  line-height: normal;
  padding-bottom: 0.5rem;
`;

export const UndefinedText = styled.p`
  color: #aaaaaa;
  width: 100%;
`;
export default function AccountOfficer() {
  // navigation management-----------------------------
  const navigation = useNavigate();
  // parameter management------------------------------
  const location = useLocation();
  const user = location.state && location.state.user;
  const social = location.state && location.state.social;

  async function fetchData() {
    const accessToken = localStorage.getItem("access"); //access Token
    const config = {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    };
    try {
      const data = await axios.delete("/account/user/", config);
      console.log(data);
    } catch (error) {
      console.error("fetchData 함수 에러 발생:", error);

      if (error.response && error.response.status === 401) {
        try {
          await refreshAccessToken();
          console.log("fetchData 재시도");
          await fetchData(false);
        } catch (refreshError) {
          console.error("토큰 갱신 중 오류:", refreshError);
          // 추가적인 오류 처리 로직 필요 (예: 사용자를 로그인 페이지로 리다이렉트)
        }
      }
    }
  }

  const refreshAccessToken = async () => {
    const body = {
      refresh: localStorage.getItem("refresh"),
    };

    try {
      const response = await axios.post(
        "/account/refresh/access_token/",
        body,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      const access = response.data.access;
      const refresh = response.data.refresh;

      localStorage.setItem("access", access);
      localStorage.setItem("refresh", refresh);
      console.log("success : refresh Access Token");
    } catch (error) {
      console.error("Error refreshing access token:", error);
      throw error; // 함수를 호출하는 곳에서 오류를 처리할 수 있도록 오류를 다시 던집니다.
    }
  };
  return (
    <Body>
      <TopNavigation navigation={navigation} />
      <ScrollWrap>
        <PaymentTitle
          name={user ? user.nickname : "익명"}
          describe={"계정을 관리합니다."}
        />
        <PaymentWrap>
          {user && social ? (
            <>
              <Title>로그인 정보</Title>
              <p
                style={{
                  width: "100%",
                  color: "#595959",
                  fontWeight: "600",
                  paddingBottom: 5,
                  textAlign: "start",
                  borderBottom: "1px solid #A4A4A4",
                }}
              >
                {social}
              </p>
              <Title
                style={{
                  marginTop: 10,
                }}
              >
                OKDK 서비스 이용
              </Title>
              <div
                style={{
                  textDecoration: "underline",
                  color: "#595959",
                }}
                onClick={() => {
                  fetchData();
                }}
              >
                계정 탈퇴하기
              </div>
            </>
          ) : (
            <UndefinedText>로그인을 먼저 하세요</UndefinedText>
          )}
        </PaymentWrap>
      </ScrollWrap>
    </Body>
  );
}
