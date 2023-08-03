import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { FiSearch } from "react-icons/fi";

import styled from "styled-components";
import Modal from "../../components/Modal";
import TopNavigation from "../../components/TopNavigation";
import CoffeeComponent from "../../components/CoffeeComponent";

import menuListData from "../../mock/menuList";

export default function AddFavoriteMenu() {
  const navigation = useNavigate();
  const accessToken = localStorage.getItem("access"); //access Token

  const [selectedItems, setSelectedItems] = useState([]); //선택한 아이템 배열

  const handleSelect = (id) => {
    console.log("Selected : " + id);
    setSelectedItems((prevItems) => {
      if (prevItems.includes(id)) {
        return prevItems.filter((item) => item !== id); // 있으면 해당 항목을 배열에서 제거
      } else {
        return [...prevItems, id]; // 없으면 해당 항목을 배열에 추가
      }
    });
  };

  //   useEffect(() => {
  //     const config = {
  //       headers: {
  //         Authorization: `Bearer ${accessToken}`,
  //       },
  //       params: {
  //         brand: "OKDK",
  //       },
  //     };
  //     async function fetchData() {
  //       try {
  //         const membershipBrandData = await axios.get(
  //           "/payment/membership/",
  //           config
  //         );

  //         console.log(membershipBrandData.data);

  //         setMembershipBrand(membershipBrandData.data);
  //       } catch (error) {
  //         console.error("에러 발생:", error);
  //       }
  //     }
  //     fetchData();
  //   }, []);

  return (
    <>
      <TopNavigation />
      <Modal
        title={"스타벅스 상명대점의\n즐겨찾는 메뉴를 선택해주세요"}
        basicButtonName="확인"
        basicButtonOnClick={() => console.log(selectedItems)}
      >
        <MenuContainer>
          {menuListData && menuListData.length > 0
            ? menuListData.map((item, index) => {
                return (
                  <CoffeeComponent
                    id={index}
                    imgURI={require("../../assets/images/sampleCoffee.png")}
                    first_description={item.name}
                    second_description={`${item.price}원`}
                    background={
                      selectedItems.includes(index) ? "#0583F2" : "#D9D9D9"
                    }
                    onClick={() => handleSelect(index)}
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
