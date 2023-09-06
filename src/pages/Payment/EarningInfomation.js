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
import { authInstance } from "../../API/utils";
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

export default function EarningInfomation() {
  //variable management---------------------------
  const navigation = useNavigate();

  const [user, setUser] = useState({});
  const [barcode, setBarcode] = useState([]);

  useEffect(() => {
    async function fetchData() {
      try {
        const userData = await authInstance.get("/account/user/");
        const barcodeData = await authInstance.get("/payment/membership/list/");
        setUser(userData.data.user);
        setBarcode(barcodeData.data);
      } catch (error) {
        console.error("fetchData 함수 에러 발생:", error);
      }
    }
    fetchData();
  }, []);

  const handleDeleteBrand = (brand) => {
    async function fetchAccumulateData() {
      const requestData = {
        brand: brand,
      };
      try {
        const response = await authInstance.post(
          "/payment/membership/",
          requestData
        );
        console.log(brand);
        console.log(response.message);
        // navigation("/Payment");
      } catch (error) {
        console.error("fetchData 함수 에러 발생:", error);
      }
    }
    fetchAccumulateData();
  };

  return (
    <Body>
      <TopNavigation navigation={navigation} destination={"Home"} />
      <ScrollWrap>
        <PaymentTitle
          name={user.nickname || "익명"}
          describe={"적립정보를 관리합니다"}
        />

        {barcode.map((data, index) => (
          <ListBox
            handleDelete={() => handleDeleteBrand(data.brand)}
            key={index}
            listTitle={data.brand}
            handleShowMore={() =>
              navigation("/DetailEarningInfomation", {
                state: { brand: data.brand },
              })
            }
          >
            <div
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
                img={data.image}
              />
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
