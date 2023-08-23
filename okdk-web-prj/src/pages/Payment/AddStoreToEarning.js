import React, { useEffect, useState } from "react";
import styled from "styled-components";
import Modal from "../../components/Modal";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import TopNavigation from "../../components/TopNavigation";
import { FiSearch } from "react-icons/fi";
export const SearchInputWrap = styled.div`
  width: 17.5rem;
  height: 1.875rem;
  border: none;
  border-bottom: 1px solid #a4a4a4;
  display: flex;
  justify-content: flex-end;
  align-items: center;
`;

export const SearchInput = styled.input`
  flex: 1;
  height: 100%;
  border: none;
  outline: none;
`;

export const SearchButton = styled.button`
  background-color: transparent;
  border: none;
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
  // state management-----------------------------
  const [membershipBrand, setMembershipBrand] = useState([]);

  useEffect(() => {
    async function fetchData() {
      const accessToken = localStorage.getItem("access"); //access Token
      const config = {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
        params: {
          brand: "OKDK",
        },
      };
      try {
        const membershipBrandData = await axios.get(
          "/payment/membership/",
          config
        );

        console.log(membershipBrandData);

        setMembershipBrand(membershipBrandData.data);
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
    <>
      <TopNavigation />
      <Modal
        title={"멤버십을 적립할\n 브랜드를 선택해주세요"}
        basicButtonName="확인"
        basicButtonOnClick={() => navigation(-1)}
      >
        <SearchInputWrap>
          <SearchInput />
          <SearchButton>
            <FiSearch size={"1.25rem"} />
          </SearchButton>
        </SearchInputWrap>
        <BrandComponentWrap>
          {membershipBrand.map((data, index) => (
            <BrandComponent key={index}>{data.name}</BrandComponent>
          ))}
        </BrandComponentWrap>
      </Modal>
    </>
  );
}
