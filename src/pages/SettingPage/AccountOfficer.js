import React from "react";
import styled from "styled-components";
import TopNavigation from "../../components/TopNavigation";
import PaymentTitle from "../../components/PaymentTitle";
import { useNavigate, useLocation } from "react-router-dom";
import axios from "axios";
import { authInstance } from "../../API/utils";

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

  const KakaoDelete = async () => {
    console.log("카카오 탈퇴");
    const kakaoAccessToken = localStorage.getItem("kakaoAccessToken"); //access Token
    try {
      const response = await axios.post(
        "https://kapi.kakao.com/v1/user/unlink",
        {},
        {
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
            Authorization: `Bearer ${kakaoAccessToken}`,
          },
        }
      );
      console.log(response);
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const GoogleDelete = async () => {
    console.log("구글 탈퇴");
    const accessToken = localStorage.getItem("access"); //access Token
    try {
      const response = await axios.post(
        "https://kapi.kakao.com/v1/user/logout",
        {},
        {
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );
      console.log(response);
      localStorage.clear();
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const NaverDelete = async () => {
    console.log("네이버 탈퇴");
    const accessToken = localStorage.getItem("access"); //access Token
    try {
      const response = await axios.post(
        `https://nid.naver.com/oauth2.0/token?grant_type=delete&client_id=oRQ7F4q_jX8AvonjIVNf&client_secret=jA2auTdVIo&access_token=${accessToken}`,
        {}
      );
      console.log(response);
      localStorage.clear();
    } catch (error) {
      console.error("Error:", error);
    }
  };

  async function handleDelete(social) {
    try {
      if (social === "구글") {
        GoogleDelete();
      }

      if (social === "카카오톡") {
        KakaoDelete();
      }

      if (social === "네이버") {
        NaverDelete();
      }

      const data = await authInstance.delete("/account/user/");
      // 백엔드 통신 성공 후 RN 앱으로 메시지 전송
      window.ReactNativeWebView.postMessage(
        JSON.stringify({ status: "DeleteAccount" })
      );
      localStorage.clear();
    } catch (error) {
      console.error("fetchData 함수 에러 발생:", error);
    }
  }

  return (
    <Body>
      <TopNavigation navigation={navigation} destination={"Home"} />
      <ScrollWrap>
        <PaymentTitle
          name={user ? user.nickname : ""}
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
                  handleDelete(social);
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
