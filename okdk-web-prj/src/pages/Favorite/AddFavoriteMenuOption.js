import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { FiSearch } from "react-icons/fi";

import styled from "styled-components";
import Modal from "../../components/Modal";
import TopNavigation from "../../components/TopNavigation";
import CoffeeComponent from "../../components/CoffeeComponent";
import BasicButton from "../../components/Button";

import menuListData from "../../mock/menuList";

export default function AddFavoriteMenuOption() {
  const navigation = useNavigate();
  const accessToken = localStorage.getItem("access"); //access Token

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
        title={"선택한 메뉴의\n옵션을 추가해주세요"}
        basicButtonName="확인"
        basicButtonOnClick={() => console.log("클릭")}
      >
        <MenuContainer>
          <Menu>
            <CoffeeComponent
              imgURI={require("../../assets/images/sampleCoffee.png")}
              first_description="스타벅스"
              second_description="아메리카노"
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
                <BasicButton
                  btnName="따뜻하게"
                  onClick={() => console.log("click")}
                  width="3.875rem"
                  height="1.25rem"
                  backgroundColor="#F25D07"
                  borderRadius="1.875rem"
                  fontSize="0.75rem"
                  color="white"
                  fontFamily="Pretendard"
                  fontWeight="normal"
                  margin="0.2rem"
                />
                <BasicButton
                  btnName="차갑게"
                  onClick={() => console.log("click")}
                  width="3.875rem"
                  height="1.25rem"
                  backgroundColor="#0583F2"
                  borderRadius="1.875rem"
                  fontSize="0.75rem"
                  color="white"
                  fontFamily="Pretendard"
                  fontWeight="normal"
                  margin="0.2rem"
                />
              </div>
              <div style={{ display: "flex", alignItems: "center" }}>
                <OptionName>사이즈</OptionName>
                <BasicButton
                  btnName="톨"
                  onClick={() => console.log("click")}
                  width="1.9rem"
                  height="1.25rem"
                  backgroundColor="#6D6D6D"
                  borderRadius="1.875rem"
                  fontSize="0.75rem"
                  color="white"
                  fontFamily="Pretendard"
                  fontWeight="normal"
                  margin="0.2rem"
                />
                <BasicButton
                  btnName="그란데"
                  onClick={() => console.log("click")}
                  width="3.875rem"
                  height="1.25rem"
                  backgroundColor="#6D6D6D"
                  borderRadius="1.875rem"
                  fontSize="0.75rem"
                  color="white"
                  fontFamily="Pretendard"
                  fontWeight="normal"
                  margin="0.2rem"
                />
                <BasicButton
                  btnName="벤티"
                  onClick={() => console.log("click")}
                  width="2.5rem"
                  height="1.25rem"
                  backgroundColor="#6D6D6D"
                  borderRadius="1.875rem"
                  fontSize="0.75rem"
                  color="white"
                  fontFamily="Pretendard"
                  fontWeight="normal"
                  margin="0.2rem"
                />
              </div>
            </MenuDescription>
          </Menu>
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
