import React from "react";
import Modal from "../../components/Modal";
import { useNavigate } from "react-router-dom";
import TopNavigation from "../../components/TopNavigation";

export default function DetailEarningInfomation() {
  const navigation = useNavigate();
  return (
    <>
      <TopNavigation />
      <Modal
        title={"이디야커피"}
        basicButtonName="확인"
        basicButtonOnClick={() => navigation(-1)}
      ></Modal>
    </>
  );
}
