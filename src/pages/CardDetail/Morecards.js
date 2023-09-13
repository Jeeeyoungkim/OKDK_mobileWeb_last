import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import BasicButton from "../../components/Button";
import Modal from "../../components/Modal";
import TopNavigation from "../../components/TopNavigation";
import Card from "../../components/Card";
import { useLocation } from "react-router-dom";
import { authInstance } from "../../API/utils";

const Container = styled.div`
  height: "477px";
`;

export default function Morecards() {
  const [cards, setcards] = useState([]);
  const [selectedcard, setSelectedcard] = useState(null);

  const location = useLocation();
  const someProp = location.state?.someProp; // props에서 데이터 추출
  useEffect(() => {
    // console.log("Rerendering");
    // // window.location.reload();
  }, [someProp]);

  useEffect(() => {
    async function fetchData() {
      try {
        const cardlist = await authInstance.get("/payment/card/list/");
        console.log(cardlist.data);
        setcards(cardlist.data);
      } catch (error) {
        console.error("에러 발생:", error);
      }
    }
    fetchData();
  }, []);

  const navigation = useNavigate();

  const section = document.querySelector(".CardScrollContainer"); 
  if (section) {
    section.scrollTo(0, section.scrollTop); // 현재 스크롤 위치를 다시 설정하여 스크롤이 이동하지 않도록 합니다.
  }

  const handlecardChange = (card, event) => {
    console.log(card);
    setSelectedcard(card);
  };

  const handlecardDelete = async () => {
    if (!selectedcard) {
      alert("삭제할 카드를 선택해주세요");
    }

    for (const element of cards) {
      console.log(element, selectedcard);
      if (element.id === selectedcard && element.default) {
        alert("다른 카드를 기본카드로 선택후에 삭제해주세요.");
        return;
      }
    }
    console.log(selectedcard);

    try {
      const accessToken = localStorage.getItem("access");
      const requestData = {
        id: selectedcard,
      };

      const config = {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
        data: requestData, 
      };

      const response = await authInstance.delete(
        "/payment/card/create/",
        config
      );
      console.log(response);
      window.location.reload();
    } catch (error) {
      console.error("에러 발생:", error);
    }
  };

  const handleEnrollMove = () => {
    navigation("/CardEnroll");
  };

  const handleModfiyMove = () => {
    if (!selectedcard) {
      alert("수정할 카드를 선택해주세요");
      window.location.reload();
    } else {
      console.log(selectedcard);
      // 여기서 navigation을 이용하여 CardModify 컴포넌트로 이동하면서 선택한 카드 정보도 함께 전달합니다.
      navigation("/CardModify", { state: selectedcard });
    }
  };
  const handlePaymentMove = () => {
    navigation("/Payment");
  };

  const handleBackPage = () => {
    navigation("/Payment");
  };
  return (
    <div>
      <TopNavigation navigation={navigation} destination={"Home"} />
      <Modal
        title="결제카드"
        basicButtonName="확인"
        basicButtonOnClick={handlePaymentMove}
        backbasicButtonName="뒤로가기"
        backbasicButtonOnClick={handleBackPage}
      >
        <div style={{ textAlign: "left" }}>
          기본으로 결제할 카드를 설정해주세요
        </div>
        <Container>
          <section className="CardScrollContainer"
            style={{
              padding: "55px 0px",
              overflow: "auto",
              height: "10rem",
              marginBottom: "1rem",
            }}
          >
            {cards.map((card) => (
              <>
                <div>
                  <Card
                    imgWidth="9.89581rem"
                    imgHeight="6.25rem"
                    imguri={card.image}
                    imgBorderRadius="7px"
                  />
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "row",
                      justifyContent: "center",
                    }}
                  >
                    <input
                      type="radio"
                      value={card.id}
                      checked={selectedcard === card.id}
                      onChange={(event) => {
                        event.preventDefault(); // 브라우저의 기본 동작을 막음
                        handlecardChange(card.id, event);
                      }}
                    />
                    <p style={{ padding: "5px" }}>{card.name}</p>
                  </div>
                </div>
                <div style={{ marginTop: "20px" }}></div>
              </>
            ))}
          </section>
          <BasicButton
            btnName="카드 등록하기"
            onClick={handleEnrollMove}
            width="15rem"
            height="3rem"
            backgroundColor="#056CF2"
            borderRadius="30px"
            fontSize="1rem"
            color="white"
            font-family="Pretendard"
            font-weight="bold"
          />
          <BasicButton
            btnName="수정"
            onClick={handleModfiyMove}
            width="7rem"
            height="3rem"
            backgroundColor="#056CF2"
            borderRadius="30px"
            fontSize="1rem"
            color="white"
            font-family="Pretendard"
            font-weight="bold"
          />
          <BasicButton
            btnName="삭제"
            onClick={handlecardDelete}
            width="7rem"
            height="3rem"
            backgroundColor="#056CF2"
            borderRadius="30px"
            fontSize="1rem"
            color="white"
            font-family="Pretendard"
            font-weight="bold"
          />
        </Container>
      </Modal>
    </div>
  );
}
