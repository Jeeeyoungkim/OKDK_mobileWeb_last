import React from "react";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import axios from "axios";

const NaverLogin = (props) => {
  const navigate = useNavigate();

  const code = new URL(window.location.href).searchParams.get("code");
  console.log(code);

  //인가코드 백으로 보내는 코드
  useEffect(() => {
    const naverLogin = async () => {
      try {
        const res = await axios({
          method: "GET",
          url: `/account/naver/callback/?code=${code}`,
          headers: {
            "Content-Type": "application/json;charset=utf-8",
            "Access-Control-Allow-Origin": "*",
          },
        });

        if (window.ReactNativeWebView) {
          window.ReactNativeWebView.postMessage(
            JSON.stringify({ data: "성공" })
          );
        }
        const access_token = res.data["access"];
        const refresh_token = res.data["refresh"];

        //react-native에 메세지 전송
        if (window.ReactNativeWebView) {
          window.ReactNativeWebView.postMessage(
            JSON.stringify({
              status: "success",
              access_token: access_token,
              refresh_token: refresh_token,
            })
          );
        }

        localStorage.setItem("access", access_token);
        localStorage.setItem("refresh", refresh_token);
      } catch (error) {
        console.error("로그인 실패:", error);

        if (window.ReactNativeWebView) {
          window.ReactNativeWebView.postMessage(
            JSON.stringify({ status: "failed" })
          );
        }
      }
    };

    naverLogin();
  }, []);

  return <div>NaverLogin중입니다</div>;
};

export default NaverLogin;
