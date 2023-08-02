import React, { useEffect, useState } from "react";
import styled from "styled-components";
import Modal from "../../components/Modal";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import TopNavigation from "../../components/TopNavigation";

export const SearchInput = styled.input`
  width: 17.5rem;
  height: 1.875rem;
  border: none;
  border-bottom: 1px solid #a4a4a4;
  /* background-image: url("../assets/images/OKDKLogo.png");
  background-repeat: no-repeat;
  background-image: 10px; */
`;

export const BrandComponentWrap = styled.div`
  width: 100%;
  display: grid;
  grid-template-columns: repeat(3, 1fr); /* 3열의 그리드로 설정 */
  gap: 0.75rem; /* 컴포넌트 사이의 간격 */
  box-sizing: border-box;
  padding: 1.25rem 0rem;
  overflow-y: auto;
`;

export const BrandComponent = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 100%;
  border: 1px solid #a4a4a4;
  background-color: #d9d9d9;
  color: white;
  width: 5.25em;
  height: 5.25rem;
`;

export default function AddStoreToEarning() {
  //variable management---------------------------
  const navigation = useNavigate();
  const accessToken = localStorage.getItem("access"); //access Token

  // state management-----------------------------
  const [membershipBrand, setMembershipBrand] = useState([]);

  useEffect(() => {
    const config = {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
      params: {
        brand: "OKDK",
      },
    };
    async function fetchData() {
      try {
        const membershipBrandData = await axios.get(
          "/payment/membership/",
          config
        );

        console.log(membershipBrandData.data);

        setMembershipBrand(membershipBrandData.data);
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
        title={"멤버십을 적립할\n 브랜드를 선택해주세요"}
        basicButtonName="확인"
        basicButtonOnClick={() => navigation(-1)}
      >
        <SearchInput />
        <BrandComponentWrap>
          {membershipBrand.map((data, index) => (
            <BrandComponent key={index}>{data.name}</BrandComponent>
          ))}
        </BrandComponentWrap>
      </Modal>
    </>
  );
}
