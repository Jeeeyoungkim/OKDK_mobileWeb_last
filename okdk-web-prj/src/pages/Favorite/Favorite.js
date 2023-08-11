import React, { useEffect, useState } from "react";
import axios from "axios";
import BasicButton from "../../components/Button";
import TopNavigation from "../../components/TopNavigation";
import styled from "styled-components";
import PaymentTitle from "../../components/PaymentTitle";
import ListBox from "../../components/ListBox";
import CoffeeComponent from "../../components/CoffeeComponent";

//import favoriteList from "../../mock/favoriteList.json"; //mock

import { useNavigate } from "react-router-dom";

export default function Favorite() {
  const navigation = useNavigate();
  const accessToken = localStorage.getItem("access"); //access Token
  const [user, setUser] = useState(null);
  const [favoriteList, setFavoriteList] = useState({});

  const handleOK = () => {
    console.log("hi");
  };

  useEffect(() => {
    const config = {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    };
    async function fetchData() {
      try {
        const userData = await axios.get("/account/user/", config);
        const favoriteList = await axios.get("/order/favorite/", config);

        setUser(userData.data);
        setFavoriteList(favoriteList.data);
      } catch (error) {
        console.error("에러 발생:", error);
      }
    }
    fetchData();
    console.log(favoriteList);
  }, []);

  return (
    <Body>
      <TopNavigation navigation={navigation} />
      <ScrollWrap>
        <PaymentTitle
          name={user ? user.nickname : "익명"}
          describe={"즐겨찾는 메뉴입니다"}
        />
        {favoriteList && Object.keys(favoriteList).length > 0
          ? Object.keys(favoriteList).map((item, index) => {
              const value = favoriteList[item];
              return (
                <ListBox
                  listTitle={item}
                  btnName={"수정하기"}
                  handleShowMore={() => console.log("click")}
                >
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "flex-start",
                      marginLeft: "0.5rem",
                    }}
                  >
                    {value.map((valueItem, valueIndex) => {
                      return (
                        <CoffeeComponent
                          imgURI={valueItem?.menu?.image}
                          first_description={valueItem?.menu?.name}
                          second_description={`${valueItem?.menu?.price}원`}
                          background="#0583F2"
                        ></CoffeeComponent>
                      );
                    })}
                  </div>
                </ListBox>
              );
            })
          : "즐겨찾는 매장이 없습니다."}

        <BasicButton
          btnName="매장 추가 하기"
          onClick={() => {
            navigation("/AddStoreToFavorite");
          }}
          width="20rem"
          height="4rem"
          backgroundColor="#056CF2;"
          borderRadius="1.875rem"
          fontSize="1.5rem"
          color="white"
          fontFamily="Pretendard"
          fontWeight="bold"
        />
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
