import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import TopNavigation from "../../components/TopNavigation";
import PaymentTitle from "../../components/PaymentTitle";
import ListBox from "../../components/ListBox";
import barcodeData from "../../mock/barcode.json";
import Barcode from "../../components/Barcode";
import BasicButton from "../../components/Button";
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

export default function Payment() {
  //variable management---------------------------
  const navigation = useNavigate();
  const accessToken = localStorage.getItem("access"); //access Token

  const [user, setUser] = useState({});
  const [barcode, setBarcode] = useState([]);

  useEffect(() => {
    const config = {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    };
    async function fetchData() {
      try {
        const userData = await axios.get("/account/user/", config);

        const barcodeData = await axios.get(
          "/payment/membership/list/",
          config
        );

        console.log(userData.data);
        console.log(barcodeData.data);

        setUser(userData.data);
        setBarcode(barcodeData.data);
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
          describe={"적립정보를 관리합니다"}
        />

        {barcodeData.barcode.map((data, index) => (
          <ListBox
            listTitle={data.barcodename}
            handleShowMore={() => navigation("/DetailEarningInfomation")}
          >
            <div
              key={index}
              style={{
                width: "100%",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Barcode
                width={"9.31331rem"}
                height={"5.5rem"}
                img={data.barcodeimg}
              />
              <p>{data.barcodeNum}</p>
            </div>
          </ListBox>
        ))}
        {barcode.map((data, index) => (
          <ListBox
            listTitle={data.brand}
            handleShowMore={() => navigation("/DetailEarningInfomation")}
          >
            <div
              key={index}
              style={{
                width: "100%",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Barcode
                width={"9.31331rem"}
                height={"5.5rem"}
                img={data.barcodeimg}
              />
              <p>{data.serial_num}</p>
            </div>
          </ListBox>
        ))}
        <BasicButton
          btnName="매장추가하기"
          onClick={() => navigation("/AddStoreToEarning")}
        />
      </ScrollWrap>
    </Body>
  );
}
