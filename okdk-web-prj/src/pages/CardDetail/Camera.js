//cardaEnroll
import React from "react";
import Modal from "../../components/Modal";
import TopNavigation from "../../components/TopNavigation";
import Card from "../../components/Card";
import styled from "styled-components";
import Directinput from "./DirectInput";
import BasicButton from "../../components/Button";
import { useNavigate } from "react-router-dom";
export default function Camera() {
    const navigation = useNavigate();
  const Container = styled.div`
    height: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: flex-end;
  `;

  const handlePaymentMove = () => {
    navigation("/Payment");
  };
  return (
    <div>
      <TopNavigation />
      <Modal
        title="카메라 촬영"
        basicButtonName="확인"
        basicButtonOnClick={handlePaymentMove}
      >
       
      </Modal>
    </div>
  );
}
