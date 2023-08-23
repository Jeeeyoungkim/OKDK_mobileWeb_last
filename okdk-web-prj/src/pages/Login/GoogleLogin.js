import React from "react";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import axios from "axios";

const GoogleLogin = (props) => {
  const navigate = useNavigate();

  const parsedHash = new URLSearchParams(window.location.hash.substring(1));
  const accessToken = parsedHash.get("access_token");

  //어세스토큰 백으로 보내는 코드
  useEffect(() => {
    console.log(accessToken);
    const googleLogin = async () => {
      try {
        const res = await axios({
          method: "GET",
          url: `/account/google/callback/?access_token=${accessToken}`,
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

    googleLogin();
  }, []);

  return <div>GoogleLogin중입니다</div>;
};

export default GoogleLogin;
