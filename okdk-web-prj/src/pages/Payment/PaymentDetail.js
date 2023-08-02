import React, { useEffect, useState } from "react";
import styled from "styled-components";
import TopNavigation from "../../components/TopNavigation";
import { useNavigate } from "react-router-dom";
import PaymentTitle from "../../components/PaymentTitle";
import axios from "axios";

export const Body = styled.div`
  width: 100%;
  height: fit-content;
  min-height: 100vh;
  background-color: #f5f7fb;
`;
export const ScrollWrap = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
`;
export default function PaymentDetail() {
  const accessToken = localStorage.getItem("access"); //access Token

  const navigation = useNavigate();
  const [user, setUser] = useState({});

  useEffect(() => {
    const config = {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    };
    async function fetchData() {
      try {
        const userData = await axios.get("/account/user/", config);

        // const barcodeData = await axios.get(
        //   "/payment/membership/list/",
        //   config
        // );

        console.log(userData.data);
        // console.log(barcodeData.data);

        setUser(userData.data);
        // setBarcode(barcodeData.data);
      } catch (error) {
        console.error("에러 발생:", error);
      }
    }
    fetchData();
  }, []);
  return (
    <Body>
      <TopNavigation navigation={navigation} />
      <ScrollWrap>
        <PaymentTitle
          name={user.nickname || "익명"}
          describe={"결제내역 입니다."}
        />
      </ScrollWrap>
    </Body>
  );
}
