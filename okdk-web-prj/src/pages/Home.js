import React, { useEffect, useState } from "react";
import axios from "axios";
import BasicButton from "../components/Button";
import TopNavigation from "../components/TopNavigation";
import styled from "styled-components";
import PaymentTitle from "../components/PaymentTitle";
import ListBox from "../components/ListBox";
import ChangeComponent from "../components/ChangeComponent";
import CoffeeComponent from "../components/CoffeeComponent";

import { useNavigate } from "react-router-dom";

export default function Home() {
  const navigation = useNavigate();
  const accessToken = localStorage.getItem("access"); //access Token
  const [user, setUser] = useState(null);
  const [favoriteList, setFavoriteList] = useState({});
  const [recents, setRecents] = useState([]);

  useEffect(() => {
    const config = {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("access")}`,
      },
    };
    async function fetchData(retry = true) {
      try {
        const userData = await axios.get("/account/user/", config);
        const recentData = await axios.get("/order/recents/", config);
        const favoriteList = await axios.get("/order/favorite/", config);

        setUser(userData.data);
        setRecents(recentData.data);
        setFavoriteList(favoriteList.data);

        console.log(userData.data);
        console.log(user);
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
    //console.log(favoriteList);
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

  //현재 날짜에 맞춰서 인삿말 바꿔주기
  const getTimeOfDay = () => {
    const currentHour = new Date().getHours();

    if (currentHour >= 5 && currentHour < 12) {
      return "좋은 아침입니다!";
    } else if (currentHour >= 12 && currentHour < 17) {
      return "즐거운 점심시간입니다!";
    } else if (currentHour >= 17 && currentHour < 21) {
      return "행복한 저녁시간입니다!";
    } else {
      return "편안한 밤입니다!";
    }
  };

  const changeMode = async () => {
    const config = {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("access")}`,
      },
    };

    const body = {
      username: user.username,
    };
    try {
      console.log(user.username);

      const response = await axios.put(
        "/account/user/mode/update/",
        body,
        config
      );
      console.log(response.data);
    } catch (error) {
      console.error("Error changing mode:", error);

      if (error.response && error.response.status === 401) {
        try {
          // refreshAccessToken 함수를 이용하여 토큰 갱신
          await refreshAccessToken();
          await changeMode();
        } catch (refreshError) {
          console.error("토큰 갱신 중 오류:", refreshError);
          // 추가적인 오류 처리 로직 필요 (예: 사용자를 로그인 페이지로 리다이렉트)
        }
      }
    }
  };

  return (
    <Body>
      <TopNavigation navigation={navigation} />
      <ScrollWrap>
        <PaymentTitle
          name={user ? user.nickname : "익명"}
          describe={getTimeOfDay()}
        />
        <ChangeComponent handleParentClick={changeMode} />
        <ListBox
          listTitle={"즐겨찾는 메뉴"}
          handleShowMore={() => navigation("/Favorite")}
        >
          <div
            style={{
              display: "flex",
              justifyContent: "flex-start",
              marginLeft: "0.5rem",
            }}
          >
            {favoriteList && Object.keys(favoriteList).length > 0
              ? Object.keys(favoriteList).map((item, index) => {
                  const value = favoriteList[item];
                  return (
                    <>
                      {value.map((valueItem, valueIndex) => {
                        return (
                          <CoffeeComponent
                            imgURI={valueItem?.menu?.image}
                            first_description={item}
                            second_description={valueItem?.menu?.name}
                            background="#0583F2"
                          />
                        );
                      })}
                    </>
                  );
                })
              : "즐겨찾는 메뉴가 없습니다."}
          </div>
        </ListBox>
        <ListBox
          listTitle={"최근 이용 내역"}
          handleShowMore={() => alert("어디로 가요?")}
        >
          <div
            style={{
              display: "flex",
              justifyContent: "flex-start",
              marginLeft: "0.5rem",
            }}
          >
            {recents && recents.length > 0
              ? recents.map((item, index) => {
                  return (
                    <CoffeeComponent
                      imgURI={item?.options[0]?.menu_image}
                      first_description={item?.brand}
                      second_description={item?.options[0]?.menu_name}
                      background="#0583F2"
                    />
                  );
                })
              : "최근 이용한 메뉴가 없습니다."}
          </div>
        </ListBox>
      </ScrollWrap>
    </Body>
  );
}

export const Body = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  position: relative;
  align-items: center;
  background-color: #f5f7fb;
`;

export const ScrollWrap = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
`;
