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
  //state management------------------------------
  const [user, setUser] = useState(null);
  const [social, setSocial] = useState(null);
  useEffect(() => {
    async function fetchData() {
      const accessToken = localStorage.getItem("access"); //access Token
      const config = {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      };
      try {
        const userData = await axios.get("/account/user/", config);
        setUser(userData.data.user);
        setSocial(userData.data.social);
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
    fetchData();
  }, []);

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

  //로그아웃 함수들
  const KakaoLogout = async () => {
    console.log("카카오 로그아웃");
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

  const NaverLogout = () => {
    console.log("네이버 로그아웃");
    localStorage.clear();
  };

  const GoogleLogout = () => {
    console.log("구글 로그아웃");
    localStorage.clear();
  };

  const handleLogout = async (social) => {
    if (social === "카카오톡") {
      await KakaoLogout();
    }
    if (social === "구글") {
      GoogleLogout();
    }
    if (social === "네이버") {
      NaverLogout();
    }

    console.log("native asyncStorage 없애기");
    //react-native에 메세지 전송
    if (window.ReactNativeWebView) {
      window.ReactNativeWebView.postMessage(
        JSON.stringify({
          status: "logout",
        })
      );
    }
  };

  return (
    <Body>
      <TopNavigation navigation={navigation} />
      <ScrollWrap>
        <PaymentTitle
          name={user ? user.nickname : "익명"}
          describe={"설정화면 입니다."}
        />
        <ListBoxContainer
          onClick={() => {
            navigation("/FaceRegistration", {
              state: { user: user },
            });
          }}
          style={{
            marginTop: "7.3rem",
          }}
        >
          <BlurEffect>
            <ItemContainer>얼굴 데이터 관리</ItemContainer>
          </BlurEffect>
        </ListBoxContainer>
        <ListBoxContainer
          onClick={() => {
            navigation("/AccountOfficer", {
              state: { user: user, social: social },
            });
          }}
        >
          <BlurEffect>
            <ItemContainer>계정 관리</ItemContainer>
          </BlurEffect>
        </ListBoxContainer>
        <ListBoxContainer onClick={() => handleLogout(social)}>
          <BlurEffect>
            <ItemContainer>로그아웃</ItemContainer>
          </BlurEffect>
        </ListBoxContainer>

        {/* <ListBoxContainer
          onClick={() => {
            navigation("/ThemeSetting", {
              state: { user: user },
            });
          }}
        >
          <BlurEffect>
            <ItemContainer>테마 설정</ItemContainer>
          </BlurEffect>
        </ListBoxContainer> */}
      </ScrollWrap>
    </Body>
  );
}
