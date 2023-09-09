import React, { useEffect, useState } from "react";

import TopNavigation from "../components/TopNavigation";
import styled from "styled-components";
import PaymentTitle from "../components/PaymentTitle";
import ListBox from "../components/ListBox";
import ChangeComponent from "../components/ChangeComponent";
import CoffeeComponent from "../components/CoffeeComponent";
import axios from "axios";

import { useNavigate } from "react-router-dom";
import { authInstance } from "../API/utils";

export default function Home() {
  const navigation = useNavigate();

  const [user, setUser] = useState(null);
  const [favoriteList, setFavoriteList] = useState({});
  const [recents, setRecents] = useState([]);
  const [userMode, setUserMode] = useState(null);

  useEffect(() => {
    window.fetchData = fetchData();
    //리액트 네이티브에서 JS를 주입하기 위해 window 객체에 할당. -> 전역 범위에 정의

    fetchData();
    return () => {
      // cleanup: 컴포넌트가 unmount 될 때 함수를 제거합니다.
      delete window.fetchData;
    };
  }, []);

  async function fetchData() {
    try {
      const userData = await authInstance.get("/account/user/");
      const favoriteList = await authInstance.get("/order/favorite/");
      const recentData = await authInstance.get("/order/recents/");

      const sortedRecents = recentData.data.sort(
        (a, b) => new Date(b.created_at) - new Date(a.created_at)
      );
      const topFive = sortedRecents.slice(0, 4);

      setUser(userData.data.user);
      setUserMode(userData.data.user.mode);
      setFavoriteList(favoriteList.data);
      setRecents(topFive);
    } catch (error) {
      console.error("fetchData 함수 에러 발생:", error);
      if (window.ReactNativeWebView) {
        window.ReactNativeWebView.postMessage(
          JSON.stringify({
            status: "login",
          })
        );
      }
    }
  }

  const KakaoLogout = async () => {
    const accessToken = localStorage.getItem("googleAccessToken"); //access Token

    axios
      .post("https://oauth2.googleapis.com/revoke", null, {
        params: {
          token: accessToken,
        },
      })
      .then((response) => {
        console.log("토큰이 성공적으로 폐기되었습니다:", response);
      })
      .catch((error) => {
        console.error("토큰 폐기에 실패했습니다:", error);
      });

    console.log("구글 회원 탈퇴");

    //console.log("네이버 로그아웃");
    //const accessToken = localStorage.getItem("access"); //access Token
    // try {
    //   const response = await axios.post(
    //     `https://nid.naver.com/oauth2.0/token?grant_type=delete&client_id=oRQ7F4q_jX8AvonjIVNf&client_secret=jA2auTdVIo&access_token=${accessToken}`,
    //     {}
    //   );
    //   console.log(response);
    //   localStorage.clear();
    // } catch (error) {
    //   console.error("Error:", error);
    // }
  };

  const navigateWebView = (destination) => {
    console.log(destination);
    if (window.ReactNativeWebView) {
      window.ReactNativeWebView.postMessage(
        JSON.stringify({ status: `${destination}` })
      );
    }
  };

  //현재 시간에 맞춰서 인삿말 바꿔주기
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
    const body = {
      username: user.username,
    };
    try {
      console.log(user.username);

      const response = await authInstance.put(
        "/account/user/mode/update/",
        body
      );
      console.log(response.data);
    } catch (error) {
      console.error("Error changing mode:", error);
    }
  };

  return (
    <Body>
      <button onClick={KakaoLogout}>로그아웃</button>
      <TopNavigation navigation={navigation} destination={"Home"} />
      <ScrollWrap>
        <PaymentTitle name={user && user.nickname} describe={getTimeOfDay()} />
        <ChangeComponent handleParentClick={changeMode} userMode={userMode} />
        <ListBox
          listTitle={"즐겨찾는 메뉴"}
          handleShowMore={() => navigateWebView("Favorite")}
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
          handleShowMore={() => navigateWebView("Payment")}
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
                  const firstOption = item?.options?.[0];
                  const menuImage = firstOption?.menu?.image;
                  const menuName = firstOption?.menu?.name;

                  return (
                    <CoffeeComponent
                      imgURI={menuImage}
                      first_description={item?.brand}
                      second_description={menuName}
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
  height: fit-content;
  min-height: 100vh;
  background-color: #f5f7fb;
  overflow: hidden;
`;

export const ScrollWrap = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
`;
