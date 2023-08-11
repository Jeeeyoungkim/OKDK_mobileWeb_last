import React from "react";
import axios from "axios";
import Logo from "../assets/images/OKDKLogo.png";
import styled from "styled-components";

import BasicButton from "../components/Button";

export default function Login() {
  const handleOK = () => {
    console.log("hi");
  };

  // const handleKakaoLogin = () => {
  //   window.location.replace("http://3.38.180.187/account/kakao/");
  // };

  const handleKakaoLogin = async () => {
    try {
      const Rest_api_key = "1def2aa86fd42c81904840220886ac54"; //REST API KEY
      const redirect_uri = "http://127.0.0.1:3000/kakao/callback/"; //Redirect URI
      // oauth 요청 URL
      const kakaoURL = `https://kauth.kakao.com/oauth/authorize?client_id=${Rest_api_key}&redirect_uri=${redirect_uri}&response_type=code`;

      window.location.replace(kakaoURL);

      //const tokenData = await axios.get("/account/kakao/");

      //console.log("tokenData: " + tokenData.data);
    } catch (error) {
      console.error("에러 발생:", error);
    }
  };

  const handleGoogleLogin = async () => {
    try {
      const client_id =
        "37407377499-cbdeh927g2njp0nd6ibdp6iei8eus727.apps.googleusercontent.com";
      const client_secret = "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";
      const grant_type = "authorization_code";
      const redirection_uri = "http://127.0.0.1:3000/google/callback/";
      const state = "random_string";

      // const googleURL = `https://accounts.google.com/o/oauth2/v2/auth?client_id=${app_key}&response_type=code&redirect_uri=${redirect_uri}&scope=${scope}`;

      const googleURL =
        "https://accounts.google.com/o/oauth2/auth?client_id=" +
        client_id +
        "&redirect_uri=" +
        redirection_uri +
        "&scope=https://www.googleapis.com/auth/userinfo.email https://www.googleapis.com/auth/userinfo.profile" +
        "&response_type=token" +
        "&include_granted_scopes=true";

      window.location.replace(googleURL);
    } catch (error) {
      console.error("에러 발생:", error);
    }
  };

  const handleNaverLogin = async () => {
    try {
      const client_id = "oRQ7F4q_jX8AvonjIVNf";
      const response_type = "code";
      const uri = "http://127.0.0.1:3000/naver/callback/";
      const state = "false";
      // oauth 요청 URL

      const naverURL = `https://nid.naver.com/oauth2.0/authorize?response_type=${response_type}&client_id=${client_id}&redirect_uri=${uri}&state=${state}'
       `;
      window.open(naverURL);

      //const tokenData = await axios.get("/account/kakao/");

      //console.log("tokenData: " + tokenData.data);
    } catch (error) {
      console.error("에러 발생:", error);
    }
  };

  return (
    <div
      style={{ width: "360px", height: "800px", backgroundColor: "#F5F7FB" }}
    >
      <LogoContainer>
        <LoginLogo src={Logo} alt="로고" />
      </LogoContainer>
      <BasicButton
        btnName="카카오로 시작하기"
        onClick={() => handleKakaoLogin()}
        width="16.8rem"
        height="3rem"
        backgroundColor="#FBE300"
        borderRadius="1.875rem"
        fontSize="1rem"
        color="black"
        fontFamily="Pretendard"
        fontWeight="bold"
        imguri="https://play-lh.googleusercontent.com/Ob9Ys8yKMeyKzZvl3cB9JNSTui1lJwjSKD60IVYnlvU2DsahysGENJE-txiRIW9_72Vd"
      />
      <BasicButton
        btnName="네이버로 시작하기"
        onClick={() => handleNaverLogin()}
        width="16.8rem"
        height="3rem"
        backgroundColor="#00C300"
        borderRadius="1.875rem"
        fontSize="1rem"
        color="black"
        fontFamily="Pretendard"
        fontWeight="bold"
        imguri="https://user-images.githubusercontent.com/91887888/145205204-8041d35b-ee54-48f9-9c0d-32a5e01d2ac7.png"
      />
      <BasicButton
        btnName="구글로 시작하기"
        onClick={() => handleGoogleLogin()}
        width="16.8rem"
        height="3rem"
        backgroundColor="#FFF"
        borderRadius="1.875rem"
        fontSize="1rem"
        color="black"
        fontFamily="Pretendard"
        fontWeight="bold"
        imguri="https://freesvg.org/img/1534129544.png"
      />
    </div>
  );
}

const LogoContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  padding-top: 10rem;
`;

const LoginLogo = styled.img`
  width: 11.4375rem;
  height: 5.875rem;
`;
