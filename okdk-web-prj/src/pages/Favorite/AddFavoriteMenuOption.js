import React, { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { FiSearch } from "react-icons/fi";
import axios from "axios";

import styled from "styled-components";
import Modal from "../../components/Modal";
import TopNavigation from "../../components/TopNavigation";
import CoffeeComponent from "../../components/CoffeeComponent";
import BasicButton from "../../components/Button";

export default function AddFavoriteMenuOption() {
  const navigation = useNavigate();
  const location = useLocation();
  const accessToken = localStorage.getItem("access"); //access Token

  const FavoriteItems = location.state.FavoriteItems;
  const storeId = localStorage.getItem("StoreId");

  const [temperatureList, setTemperatureList] = useState([]);
  const [sizeList, setSizeList] = useState([]);
  const [FavoriteItemsOption, setFavoriteItemsOption] = useState([]); //최종 즐겨찾는 아이템 with 옵션

  useEffect(() => {
    const config = {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("access")}`,
      },
    };
    async function fetchData() {
      try {
        const temperatureListData = await axios.get(
          `/coffee/brand/${storeId}/temperature/list/`,
          config
        );

        const sizeListData = await axios.get(
          `/coffee/brand/${storeId}/size/list/`,
          config
        );

        console.log(FavoriteItems);
        setTemperatureList(temperatureListData.data);
        setSizeList(sizeListData.data);
      } catch (error) {
        console.error("에러 발생:", error);
      }
    }
    fetchData(); //get 요청
    setFavoriteItemsOption(initFavoriteArray(FavoriteItems)); // 즐겨찾는 아이템들 초기화
  }, []);

  const sendData = async (FavoriteItemsOption) => {
    const config = {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    };
    const data = {
      brand: `${localStorage.getItem("StoreName")}`,
      favorites: FavoriteItemsOption,
    };
    console.log(data);

    try {
      const response = await axios.post("/order/favorite/", data, config);
      console.log(response);
    } catch (error) {
      console.error("Error:", error);
    }
  };

  //즐겨찾는 아이템들 기본 온도와 사이즈로 설정하여 초기값 설정
  const initFavoriteArray = (array) => {
    return array.map((item, index) => {
      return { menu: item.id, temperature: 1, size: 1 };
    });
  };

  //size버튼 클릭하면 즐겨찾는 메뉴 옵션에 상태 업데이트
  const handleSizeButton = (menuId, sizeId) => {
    setFavoriteItemsOption((prevState) =>
      prevState.map((item) =>
        item.menu === menuId ? { ...item, size: sizeId } : item
      )
    );
  };

  //temperature버튼 클릭하면 즐겨찾는 메뉴 옵션에 상태 업데이트
  const handleTemperatureButton = (menuId, tempId) => {
    setFavoriteItemsOption((prevState) =>
      prevState.map((item) =>
        item.menu === menuId ? { ...item, temperature: tempId } : item
      )
    );
  };

  const handleModalButton = () => {
    navigation("/Favorite");
    sendData(FavoriteItemsOption); //post 요청

    localStorage.removeItem("StoreId"); // 로컬스토리지에 스토어 정보 삭제
    localStorage.removeItem("StoreName");
  };

  return (
    <>
      <TopNavigation />
      <Modal
        title={"선택한 메뉴의\n옵션을 추가해주세요"}
        basicButtonName="확인"
        basicButtonOnClick={() => handleModalButton(FavoriteItemsOption)}
      >
        <MenuContainer>
          {FavoriteItems && FavoriteItems.length > 0
            ? FavoriteItems.map((item, index) => {
                return (
                  <Menu>
                    <CoffeeComponent
                      imgURI={item.image}
                      first_description={item.name}
                      background="#0583F2"
                    />
                    <MenuDescription>
                      <div
                        style={{
                          display: "flex",
                          alignItems: "center",
                          marginBottom: "0.5rem",
                        }}
                      >
                        <OptionName>온도</OptionName>
                        {temperatureList && temperatureList.length > 0
                          ? temperatureList.map((tempItem, tempIndex) => {
                              const currentTempId = FavoriteItemsOption.find(
                                (option) => option.menu === item.id
                              )?.temperature;

                              return (
                                <BasicButton
                                  btnName={
                                    tempItem.name === "hot"
                                      ? "뜨겁게"
                                      : tempItem.name === "ice"
                                      ? "차갑게"
                                      : tempItem.name
                                  }
                                  onClick={() =>
                                    handleTemperatureButton(
                                      item.id,
                                      tempItem.id
                                    )
                                  }
                                  width="3.875rem"
                                  height="1.25rem"
                                  backgroundColor={
                                    tempItem.name === "hot"
                                      ? "#F25D07"
                                      : tempItem.name === "ice"
                                      ? "#0583F2"
                                      : "#F25D07"
                                  }
                                  borderRadius="1.875rem"
                                  fontSize="0.75rem"
                                  color={
                                    tempItem.id === currentTempId
                                      ? "black"
                                      : "white"
                                  }
                                  fontFamily="Pretendard"
                                  fontWeight="normal"
                                  margin="0.2rem"
                                />
                              );
                            })
                          : "데이터 불러오기 실패"}
                      </div>
                      <div style={{ display: "flex", alignItems: "center" }}>
                        <OptionName>사이즈</OptionName>
                        {sizeList && sizeList.length > 0
                          ? sizeList.map((sizeItem, sizeIndex) => {
                              const currentSizeId = FavoriteItemsOption.find(
                                (option) => option.menu === item.id
                              )?.size;

                              return (
                                <BasicButton
                                  btnName={
                                    sizeItem.name === "tall"
                                      ? "톨"
                                      : sizeItem.name === "grande"
                                      ? "그란데"
                                      : sizeItem.name === "venti"
                                      ? "벤티"
                                      : sizeItem.name
                                  }
                                  onClick={() =>
                                    handleSizeButton(item.id, sizeItem.id)
                                  }
                                  width={
                                    sizeItem.name === "tall"
                                      ? "1.9rem"
                                      : sizeItem.name === "grande"
                                      ? "3.875rem"
                                      : sizeItem.name === "venti"
                                      ? "2.5rem"
                                      : "3.875rem"
                                  }
                                  height="1.25rem"
                                  backgroundColor="#6D6D6D"
                                  borderRadius="1.875rem"
                                  fontSize="0.75rem"
                                  color={
                                    sizeItem.id === currentSizeId
                                      ? "black"
                                      : "white"
                                  }
                                  fontFamily="Pretendard"
                                  fontWeight="normal"
                                  margin="0.2rem"
                                />
                              );
                            })
                          : "데이터 불러오기 실패"}
                      </div>
                    </MenuDescription>
                  </Menu>
                );
              })
            : "즐겨찾기한 메뉴가 없습니다."}
        </MenuContainer>
      </Modal>
    </>
  );
}

const MenuContainer = styled.div`
  padding: 1rem;
  margin-top: 0.5rem;
  overflow: auto;
`;

const Menu = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const MenuDescription = styled.div`
  display: flex;
  align-items: flex-start;
  flex-direction: column;
  width: 12rem;

  margin-left: 0.75rem;
`;

const OptionName = styled.p`
  color: #000;
  font-family: Pretendard;
  font-size: 0.9375rem;
  font-style: normal;
  font-weight: 600;
  line-height: normal;
  text-align: left;
  white-space: nowrap;

  margin-right: 0.62rem;
`;
