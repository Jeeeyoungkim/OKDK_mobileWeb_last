import React, { useEffect, useState } from "react";
import styled from "styled-components";
import Modal from "../../components/Modal";
import { useLocation, useNavigate } from "react-router-dom";
import TopNavigation from "../../components/TopNavigation";
import { authInstance } from "../../API/utils";
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
  background-color: #056cf2;
  border: none;
  color: white;
  padding: 0 1rem;
  border-radius: 1rem;
`;

export default function BarcodeRegistration() {
  //variable management---------------------------
  const navigation = useNavigate();

  // parameter management--------------------------------
  const location = useLocation();
  const brand = location.state && location.state.brand;

  const [inputValue, setInputValue] = useState("");

  const handleInputChange = (e) => {
    setInputValue(e.target.value); // 입력값을 state 변수에 저장
  };

  const handleAddBrand = () => {
    async function fetchAccumulateData() {
      const requestData = {
        brand: brand,
        serial_num: inputValue,
      };
      try {
        const accumulateData = await authInstance.post(
          "/payment/membership/create/",
          requestData
        );
        navigation("/EarningInfomation", { replace: true });
      } catch (error) {
        console.error("fetchData 함수 에러 발생:", error);
      }
    }
    fetchAccumulateData();
  };

  return (
    <>
      <TopNavigation navigation={navigation} destination={"Home"} />
      <Modal
        title={"멤버십 번호를\n 입력해주세요"}
        basicButtonName="확인"
        basicButtonOnClick={() => navigation(-1)}
      >
        <SearchInputWrap>
          <SearchInput value={inputValue} onChange={handleInputChange} />{" "}
          <SearchButton
            onClick={() => {
              handleAddBrand();
            }}
          >
            OK
          </SearchButton>
        </SearchInputWrap>
      </Modal>
    </>
  );
}
