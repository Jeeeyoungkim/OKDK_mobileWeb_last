import React, { useEffect, useState } from "react";
import styled from "styled-components";
import TopNavigation from "../../components/TopNavigation";
import { useNavigate, useLocation } from "react-router-dom";
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

export const PaymentWrap = styled.div`
  width: 90%;
  min-height: 32.5rem;
  border-radius: 1.25rem;
  background: #fff;
  padding: 1.25rem;
  box-sizing: border-box;
  margin-bottom: 1.56rem;
`;

export const PaymentSubTitle = styled.p`
  text-align: start;
  color: #000;
  font-family: Pretendard;
  font-size: 1rem;
  font-style: normal;
  font-weight: 500;
  line-height: normal;
`;

export const PaymentTotalPrice = styled.div`
  margin-top: 0.84rem;
  color: #000;
  text-align: center;
  font-family: Pretendard;
  font-size: 2.5rem;
  font-style: normal;
  font-weight: 700;
  line-height: normal;
`;

export const SubTitle = styled.div`
  margin-top: 3rem;
  text-align: start;
  width: 100%;
  color: #000;
  font-family: Pretendard;
  font-size: 1rem;
  font-style: normal;
  font-weight: 500;
  line-height: normal;
`;

export const CreatedAtWrap = styled.p`
  padding-bottom: 0.5rem;
  margin-top: 0.75rem;
  margin-left: 0.5rem;
  text-align: start;
  color: #595959;
  font-family: Pretendard;
  font-size: 0.9375rem;
  font-style: normal;
  font-weight: 600;
  line-height: normal;
  border-bottom: 1px solid #a4a4a4;
  box-sizing: border-box;
`;

export const TimeWrap = styled.div`
  margin-top: 0.87rem;
  padding: 0 0.5rem 0 0.5rem;
  color: #000;
  font-family: Pretendard;
  font-size: 0.8125rem;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
  display: flex;
  justify-content: space-between;
`;

export const MenuWrap = styled.div`
  width: 100%;
  display: flex;
  padding: 0 0.5rem 0 0.5rem;
  color: #000;
  font-family: Pretendard;
  font-size: 1.25rem;
  font-style: normal;
  font-weight: 500;
  line-height: normal;
`;

export const PriceWrap = styled.p`
  color: #0583f2;
  text-align: right;
  font-family: Pretendard;
  font-size: 1.25rem;
  font-style: normal;
  font-weight: 600;
  line-height: normal;
  color: #0583f2;
  text-align: end;
`;

export default function PaymentDetail() {
  // parameter management--------------------------------
  const location = useLocation();
  const month = location.state && location.state.month;

  const navigation = useNavigate();
  const [user, setUser] = useState({});
  const [payment, SetPayment] = useState([]);

  useEffect(() => {
    async function fetchData() {
      const accessToken = localStorage.getItem("access"); //access Token
      const config = {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      };
      try {
        const userData = await axios.get("/account/user/", config);

        const paymentData = await axios.get("/order/recents/", config);

        // console.log(userData.data);
        console.log(paymentData.data);

        setUser(userData.data.user);
        SetPayment(paymentData.data);
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

  // 날짜별로 history 분할하는 함수------------------------
  const groupDataByDate = (data) => {
    const groupedData = {};

    data.forEach((item) => {
      const date = item.created_at.slice(0, 10); // "YYYY-MM-DD" 형식의 날짜 추출
      if (month && date.slice(6, 7) != month) {
        return;
      }
      if (!groupedData[date]) {
        groupedData[date] = [];
      }
      groupedData[date].push(item);
    });
    return groupedData;
  };

  return (
    <Body>
      <TopNavigation navigation={navigation} />
      <ScrollWrap>
        <PaymentTitle
          name={user.nickname || "익명"}
          describe={"결제내역 입니다."}
        />
        <PaymentWrap>
          {payment.length > 0 ? (
            <>
              <PaymentSubTitle>
                {month ? month : payment[0].created_at.slice(6, 7)}월 사용내역
              </PaymentSubTitle>
              <PaymentTotalPrice>
                {payment.reduce((acc, item) => acc + item.totalPrice, 0)}원
              </PaymentTotalPrice>
            </>
          ) : null}
          <SubTitle>결제 내역</SubTitle>
          {payment.length > 0 ? (
            Object.entries(groupDataByDate(payment)).map(
              ([date, dataByDate], index) => (
                <div key={index}>
                  <CreatedAtWrap>{date}</CreatedAtWrap>
                  {dataByDate.map((data, dataIndex) => (
                    <div
                      key={dataIndex}
                      style={{
                        paddingBottom: "1.17rem",
                        borderBottomColor: "#E0E0E0",
                        borderBottomStyle: "solid",
                        borderBottomWidth: "1px",
                      }}
                      onClick={() => {
                        navigation("/PaymentHistoryReceipt", {
                          state: { payment: data, user: user.nickname },
                        });
                      }}
                    >
                      <TimeWrap>
                        <p>{data.created_at.slice(11, 19)}</p>
                      </TimeWrap>
                      <MenuWrap>
                        <p>
                          {data.options.length > 1
                            ? data.options[0].menu.name +
                              " 외 " +
                              (data.options.length - 1) +
                              "건"
                            : data.options[0].menu.name}
                        </p>
                      </MenuWrap>
                      <PriceWrap>- {data.totalPrice}원</PriceWrap>
                    </div>
                  ))}
                </div>
              )
            )
          ) : (
            <div
              style={{
                width: "100%",
                padding: "1rem",
                boxSizing: "border-box",
              }}
            >
              적립 정보가 없습니다
            </div>
          )}
        </PaymentWrap>
      </ScrollWrap>
    </Body>
  );
}
