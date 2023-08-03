import React from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";

import BasicButton from "../components/Button";

const WarnMsg = styled.div`
  height: 3.4rem;
  display: flex;
  justify-content: center;

  color: #000;
  text-align: center;
  font-family: Pretendard;
  font-size: 1.5rem;
  font-style: normal;
  font-weight: 600;
  line-height: normal;

  margin-top: 15rem;
  margin-bottom: 1.5rem;
`;

export default function Warning() {
  const handleOK = () => {
    console.log("hi");
  };

  return (
    <div>
      <WarnMsg>
        얼굴을 등록하지 않으면
        <br />
        서비스 이용이 불가능합니다.
      </WarnMsg>
      <BasicButton
        btnName="확인"
        onClick={() => console.log("ok")}
        width="15rem"
        height="4rem"
        backgroundColor="#056CF2"
        borderRadius="1.875rem"
        fontSize="1.5rem"
        color="white"
        fontFamily="Pretendard"
        fontWeight="bold"
      />
    </div>
  );
}
