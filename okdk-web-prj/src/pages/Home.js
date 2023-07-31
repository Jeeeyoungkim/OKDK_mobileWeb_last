import React from "react";
import BasicButton from "../components/Button";
import CardBtn from "../components/Card";

export default function Home() {
  const handleOK = () => {
    console.log("hi");
  };

  return (
    <div>
      <BasicButton
        btnName="확인"
        onClick={handleOK}
        width="320px"
        height="64px"
        backgroundColor="white"
        borderRadius="30px"
        font-size="24px"
        color="white"
        font-family="Pretendard"
        font-weight="bold"
      />
      <CardBtn
        width="9.89581rem"
        height="6.25rem"
        border-radius="0.4375"
        background-color="#D9D9D9"
      />
    </div>
  );
}
