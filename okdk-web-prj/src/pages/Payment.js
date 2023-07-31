import React from "react";
import Modal from "../components/Modal";
import TopNavigation from "../components/TopNavigation";
export default function Payment() {
  return (
    <>
      <TopNavigation />
      <Modal title={"멤버십을 적립할\n매장을 설정해주세요"}></Modal>
    </>
  );
}
