import React from "react";
import Logo from "../assets/images/OKDKLogo.png";
import styled from "styled-components";

import BasicButton from "../components/Button";
import ListBox from "../components/ListBox";

const LogoContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 19.12rem;
`;

const LoginLogo = styled.img`
  width: 11.4375rem;
  height: 5.875rem;
`;

export default function Login() {
  const handleOK = () => {
    console.log("hi");
  };

  return (
    <>
      <LogoContainer>
        <LoginLogo src={Logo} alt="로고" />
      </LogoContainer>
      <BasicButton
        btnName="카카오로 시작하기"
        onClick={handleOK}
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
        onClick={handleOK}
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
        onClick={handleOK}
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
    </>
  );
}
