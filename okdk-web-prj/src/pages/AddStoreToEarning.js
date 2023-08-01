import React from "react";
import Modal from "../components/Modal";
import BasicButton from "../components/Button";

export default function AddStoreToEarning() {
  return (
    <Modal
      title={"멤버십을 적립할\n 매장을 설정해주세요"}
      basicButtonName="매장추가하기"
      basicButtonOnClick={() => console.log(2)}
    ></Modal>
  );
}
