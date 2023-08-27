import React, { useEffect, useState } from "react";
import styled from "styled-components";
import axios from "axios";
import TopNavigation from "../../components/TopNavigation";
import { useNavigate } from "react-router-dom";
import ListBox from "../../components/ListBox";
import Card from "../../components/Card";
import PaymentTitle from "../../components/PaymentTitle";
import payment_main from "../../mock/payment_main.json";
import Barcode from "../../components/Barcode";
import MonthlyPayment from "../../components/MonthlyPayment";

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

export const UndefinedText = styled.p`
  color: #aaaaaa;
`;

export default function Payment() {
  //variable management---------------------------
  const navigation = useNavigate();

  //state management------------------------------
  const [user, setUser] = useState(null);
  const [card, setCard] = useState(null);
  const [barcode, setBarcode] = useState([]);
  const [monthlyPayment, setMonthlyPayment] = useState(null);
  const [monthKey, setMonthKey] = useState([]);
  //Randering management--------------------------
  //axios function
  useEffect(() => {
    async function fetchData(retry = true) {
      const accessToken = localStorage.getItem("access"); //access Token
      const config = {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      };
      try {
        const userData = await axios.get("/account/user/", config);
        const basicCardData = await axios.get(
          "/account/user/default/card/",
          config
        );
        const barcodeData = await axios.get(
          "/payment/membership/list/",
          config
        );
        const monthlyData = await axios.get("/order/month/", config);

        // console.log(userData.data);
        // console.log(basicCardData.data);
        // console.log(barcodeData.data);
        console.log(basicCardData.data);
        setUser(userData.data.user);
        setCard(basicCardData.data);
        setBarcode(barcodeData.data);
        setMonthlyPayment(monthlyData.data);
        setMonthKey(Object.keys(monthlyData.data).sort()); //object 접근을 위한 key 배열
      } catch (error) {
        console.error("fetchData 함수 에러 발생:", error);
        if (error.response && error.response.status === 401) {
          try {
            await refreshAccessToken();
            console.log("fetchData 재시도");
            await fetchData(false);
          } catch (refreshError) {
            console.error("토큰 갱신 중 오류:", refreshError);
            // 추가적인 오류 처리 로직 필요 (예: 사용자를 로그인 페이지로 리다이렉트)
          }
        }
      }
    }
    fetchData();
  }, []);

  const refreshAccessToken = async () => {
    const body = {
      refresh: localStorage.getItem("refresh"),
    };

    try {
      const response = await axios.post(
        "/account/refresh/access_token/",
        body,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      const access = response.data.access;
      const refresh = response.data.refresh;

      localStorage.setItem("access", access);
      localStorage.setItem("refresh", refresh);
      console.log("success : refresh Access Token");
    } catch (error) {
      console.error("Error refreshing access token:", error);
      throw error; // 함수를 호출하는 곳에서 오류를 처리할 수 있도록 오류를 다시 던집니다.
    }
  };

  return (
    <Body>
      <TopNavigation navigation={navigation} />
      <ScrollWrap>
        <PaymentTitle
          name={user ? user.nickname : "익명"}
          describe={"적립 관리 화면입니다."}
        />
        <ListBox
          listTitle={"결제 카드"}
          handleShowMore={() => {
            navigation("/morecards");
          }}
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
            {card ? (
              <>
                <Card
                  Width={"6.333331rem"}
                  Height={"4rem"}
                  imgWidth={"6.333331rem"}
                  imgHeight={"4rem"}
                />
                <p>{card.name}</p>
              </>
            ) : (
              <UndefinedText>결제 카드를 등록해 주세요</UndefinedText>
            )}
          </div>
        </ListBox>
        <ListBox
          listTitle={"적립 바코드"}
          handleShowMore={() => {
            navigation("/EarningInfomation");
          }}
        >
          {/* {payment_main.barcode.map((data, index) => (
              <Barcode
                img={data.barcodeimg}
                num={data.barcodenum}
                name={data.barcodename}
              />
            ))} */}

          {barcode.length > 0 ? (
            <div
              style={{
                width: "100%",
                display: "flex",
                alignItems: "center",
                overflowX: "auto",
              }}
            >
              {barcode.map((data, index) => (
                <Barcode
                  key={index}
                  img={data.image}
                  name={data.brand}
                  num={data.serial_num}
                />
              ))}
            </div>
          ) : (
            <UndefinedText>바코드를 등록해 주세요</UndefinedText>
          )}
        </ListBox>
        <ListBox
          listTitle={"이번달 결제 내역"}
          handleShowMore={() => {
            navigation("/PaymentDetail", {
              state: {
                month: monthKey
                  ? monthKey[monthKey.length - 1].slice(1, 2)
                  : null,
              },
            });
          }}
        >
          {monthKey.length > 0 ? (
            <div
              style={{
                textAlign: "center",
                fontSize: "2rem",
                fontWeight: 700,
                fontStyle: "normal",
                fontFamily: "Pretendard",
              }}
            >
              총 {monthlyPayment[[monthKey[monthKey.length - 1]]].total}원
            </div>
          ) : (
            <UndefinedText>이번달 결제 내역이 없어요.</UndefinedText>
          )}
        </ListBox>
        <ListBox listTitle={"월별 결제 내역"}>
          {/* {monthKey.map((data, index) => {
            console.log(monthlyPayment[data]);
          })} */}
          {/* <MonthlyPayment
            labels={monthKey}
            data={monthKey.map((data) => monthlyPayment[data].total)}
          />
          {/* <MonthlyPayment monthlypayment={payment_main.monthlypayment} /> */}
          {/* <UndefinedText>월별 결제 내역이 없어요.</UndefinedText> */}
          {monthKey.length > 0 ? (
            <>
              <MonthlyPayment
                navigation={navigation}
                labels={monthKey}
                data={monthKey.map((data) => monthlyPayment[data].total)}
              />
            </>
          ) : (
            <UndefinedText>월별 결제 내역이 없어요.</UndefinedText>
          )}
        </ListBox>
      </ScrollWrap>
    </Body>
  );
}
