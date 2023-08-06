import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate, useLocation } from "react-router-dom";
import { FiSearch } from "react-icons/fi";

import styled from "styled-components";
import Modal from "../../components/Modal";
import TopNavigation from "../../components/TopNavigation";
import CoffeeComponent from "../../components/CoffeeComponent";

export default function AddFavoriteMenu() {
  const navigation = useNavigate();
  const location = useLocation();

  const accessToken = localStorage.getItem("access"); //access Token

  const selectedStore = location.state.selectedStore;
  const selectedStoreName = localStorage.getItem("StoreName");

  const [menuListData, setMenuListData] = useState([]); //전체 아이템
  const [selectedItems, setSelectedItems] = useState([]); //선택한 아이템 배열

  const handleSelect = (id) => {
    setSelectedItems((prevItems) => {
      if (prevItems.includes(id)) {
        return prevItems.filter((item) => item !== id); // 있으면 해당 항목을 배열에서 제거
      } else {
        return [...prevItems, id]; // 없으면 해당 항목을 배열에 추가
      }
    });
  };

  const handleButtonClick = () => {
    const FavoriteItems = menuListData.filter((item) =>
      selectedItems.includes(item.id)
    );
    console.log("0단계", selectedItems);
    console.log("1단계", FavoriteItems);
    navigation("/AddFavoriteMenuOption", {
      state: { FavoriteItems: FavoriteItems },
    });
  };

  useEffect(() => {
    const config = {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    };
    async function fetchData() {
      try {
        const menuListData = await axios.get(
          `/coffee/brand/${selectedStore}/menu/list/`,
          config
        );

        setMenuListData(menuListData.data);
      } catch (error) {
        console.error("에러 발생:", error);
      }
    }
    fetchData();
  }, []);

  return (
    <>
      <TopNavigation />
      <Modal
        title={`${
          selectedStoreName ? selectedStoreName : "undefined"
        }의\n 즐겨찾는 메뉴를 선택해주세요`}
        basicButtonName="확인"
        basicButtonOnClick={() => handleButtonClick()}
        buttonDisable={selectedItems.length === 0}
      >
        <MenuContainer>
          {menuListData && menuListData.length > 0
            ? menuListData.map((item, index) => {
                return (
                  <CoffeeComponent
                    id={index}
                    imgURI={item.image}
                    first_description={item.name}
                    second_description={`${item.price}원`}
                    background={
                      selectedItems.includes(item.id) ? "#0583F2" : "#D9D9D9"
                    }
                    onClick={() => handleSelect(item.id)}
                  />
                );
              })
            : "메뉴 데이터를 읽어올 수 없습니다"}
        </MenuContainer>
      </Modal>
    </>
  );
}

const MenuContainer = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr;
  padding: 1rem;
  margin-top: 0.5rem;
  overflow: auto;
`;
