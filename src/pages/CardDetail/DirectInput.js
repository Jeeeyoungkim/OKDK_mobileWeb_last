// directInput

import React, { useEffect, useState } from "react";
import Modal from "../../components/Modal";
import TopNavigation from "../../components/TopNavigation";
import Card from "../../components/Card";
import styled from "styled-components";
import BasicButton from "../../components/Button";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import { DatasetController } from "chart.js";
import { authInstance } from "../../API/utils";

import yellowcard from "../../assets/images/yellowcard.png";
import skybluecard from "../../assets/images/skybluecard.png";
import redcard from "../../assets/images/redcard.png";
import pupplecard from "../../assets/images/pupplecard.png";
import pinkcard from "../../assets/images/pinkcard.png";
import orangecard from "../../assets/images/orangecard.png";
import greencard from "../../assets/images/greencard.png";
import bluecard from "../../assets/images/bluecard.png";
import blackcard from "../../assets/images/blackcard.png";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 1rem;
`;
const BigInput = styled.input`
  padding-left: 0.625rem;
  width: 17.53125rem;
  height: 2.25rem;
  border-radius: 0.625rem;
  background-color: #d9d9d9;
  border: none;
`;

const SmallInput = styled.input`
  padding-left: 0.625rem;
  width: 8.0625rem;
  height: 2.25rem;
  border-radius: 0.625rem;
  background-color: #d9d9d9;
  border: none;
`;

const Text = styled.p`
  color: #000;
  text-align: center;
  font-family: Pretendard;
  font-size: 1.125rem;
  font-style: normal;
  font-weight: 600;
  line-height: normal;
  text-align: start;
  margin-bottom: 0.75rem;
`;

const ImageFicker = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 11.875rem;
  border-radius: 20px;
  height: 7.5rem;
  flex-shrink: 0;
  border: 2px solid #ccc;
  overflow: hidden;
`;
const ImagePreview = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
  position: relative;
`;

export default function DirectInput() {
  const [cardNumber, setCardNumber] = useState("");
  const [expiration, setExpiration] = useState("");
  const [cvc, setCVC] = useState("");
  const [password, setPassword] = useState("");
  const [isdefault, setIsDefault] = useState(false);
  const [cardImg, setCardImg] = useState("");
  const [selectedImage, setSelectedImage] = useState("");
  const [cardLength, setCardLength] = useState(null);
  const [cardLastId, setCardLastId] = useState(null);
  const [cardListData, setCardListData] = useState(null);

  const navigation = useNavigate();
  const location = useLocation();
  const CameraCardInfo = location?.state;
  console.log(CameraCardInfo);

  // 이미지 경로 배열

  // 이미지 객체를 만듦
  const cardImages = {
    yellowcard,
    skybluecard,
    redcard,
    pupplecard,
    pinkcard,
    orangecard,
    greencard,
    bluecard,
    blackcard,
  };
  const imagePaths = Object.keys(cardImages);
  useEffect(() => {
    async function fetchData() {
      try {
        const cardlist = await authInstance.get("/payment/card/list/");
        setCardListData(cardlist.data);
        setCardLength(cardlist.data.length);
        setCardLastId(cardlist.data[cardlist.data.length - 1].id);
      } catch (error) {
        console.error("에러 발생:", error);
      }
    }
    fetchData();
  }, []);
  useEffect(() => {
    let orderIndex = cardLength % 9;
    const selectedImagePath = cardImages[imagePaths[orderIndex]];
    console.log(imagePaths[orderIndex]);

    setSelectedImage(selectedImagePath);
  }, [cardLength]);

  const handleCompleteMove = () => {
    navigation("/EnrollComplete");
  };

  useEffect(() => {
    if (CameraCardInfo !== null) {
      const data = CameraCardInfo?.datas;
      setCardNumber(data?.card_number);
      setCVC(data?.cvc_number);
      setExpiration(data?.expiration_date);
    }
  }, []);
  // 월/년 유효기간 검증
  const checkExpiry = (month, year) => {
    const currentYear = new Date().getFullYear() % 100;
    const currentMonth = new Date().getMonth() + 1;

    if (
      parseInt(year, 10) < currentYear ||
      (parseInt(year, 10) === currentYear && parseInt(month, 10) < currentMonth)
    ) {
      alert("유효기간이 지났습니다.");
    }
  };

  function dataURItoBlob(dataURI) {
    // Base64 데이터를 분리하여 가져옵니다
    const parts = dataURI.split(";base64,");
    const contentType = parts[0].split(":")[1];
    const raw = window.atob(parts[1]);
    const rawLength = raw.length;
    const uint8Array = new Uint8Array(rawLength);

    // Uint8Array에 이미지 데이터를 쓰기
    for (let i = 0; i < rawLength; ++i) {
      uint8Array[i] = raw.charCodeAt(i);
    }

    // Blob을 생성하여 반환
    return new Blob([uint8Array], { type: contentType });
  }
  const handleSubmit = async () => {
    if (cardListData && cardListData.length > 0) {
      for (const element of cardListData) {
        console.log(cardNumber);
        console.log(element);
        if (element.serial_num === cardNumber) {
          alert("이미 결제카드에 존재하는 카드번호입니다.");
          return;
        }
      }
    }
    // 카드 번호 자릿수 검증
    if (
      cardNumber.replace(/\s+/g, "").length !== 16 ||
      !/^\d+$/.test(cardNumber.replace(/\s+/g, ""))
    ) {
      alert("카드 번호는 16자리 숫자로 입력해주세요.");
      return; // 요청 보내지 않고 함수 종료
    }

    // 유효기간 자릿수 검증
    console.log(expiration.length);
    console.log(expiration);
    if (expiration.length !== 5) {
      alert("유효기간은 MMYY 형식의 4자리 숫자로 입력해주세요.");
      return; // 요청 보내지 않고 함수 종료
    }

    // CVC 자릿수 검증
    if (cvc.length !== 3) {
      alert("CVC는 3자리를 입력해주세요.");
      return; // 요청 보내지 않고 함수 종료
    }

    // 비밀번호 자릿수 검증
    if (password.length !== 2) {
      alert("비밀번호는 2자리를 입력해주세요.");
      return; // 요청 보내지 않고 함수 종료
    }
    if (
      selectedImage &&
      cardNumber &&
      expiration &&
      cvc &&
      password &&
      isdefault !== null
    ) {
      // FormData 생성 및 파일 추가
      const formData = new FormData();
      const blobImage = dataURItoBlob(selectedImage);
      // Blob을 File 객체로 변환 (파일 이름을 지정할 수 있습니다)
      const imageFile = new File([blobImage], "image.png", {
        type: "image/png",
      });
      formData.append("image", imageFile);
      formData.append("serial_num", cardNumber);
      formData.append("expiry_date", expiration);
      formData.append("cvc", cvc);
      formData.append("password", password);
      formData.append("is_default", isdefault);
      try {
        // FormData 객체를 사용하여 POST 요청을 보냅니다.
        const response = await authInstance.post(
          "/payment/card/create/",
          formData
        );
        console.log(response.data);
        console.log("성공");
        handleCompleteMove();
      } catch (error) {
        console.error("에러 발생:", error);
      }
    } else {
      alert("값을 입력해주세요");
    }
  };
  const handleBackPage = () => {
    navigation(-1);
  };

  return (
    <div>
      <TopNavigation navigation={navigation} destination={"Home"} />
      <Modal
        title="직접 입력"
        basicButtonName="확인"
        basicButtonOnClick={handleSubmit}
        backbasicButtonName="뒤로가기"
        backbasicButtonOnClick={handleBackPage}
      >
        <Container>
          <ImageFicker>
            <label
              htmlFor="imageInput"
              style={{ cursor: "pointer", width: "12.5rem", height: "11.5rem" }}
            >
              {/* 파일 입력 대신 네모칸 역할을 하는 label */}
              <ImagePreview>
                <img
                  src={selectedImage}
                  alt="Selected"
                  style={{
                    maxWidth: "100%",
                    maxHeight: "100%",
                    objectFit: "cover",
                  }}
                />
              </ImagePreview>
            </label>
          </ImageFicker>
          <section>
            <form onSubmit={handleSubmit}>
              <div style={{ marginTop: "3rem" }}>
                <Text>카드번호</Text>
                <BigInput
                  type="text"
                  value={cardNumber}
                  placeholder="카드번호 16자리를 입력해주세요"
                  onChange={(e) => {
                    // 입력값에서 숫자만 추출하고 최대 16자리까지만 남기기
                    const inputCardNumber = e.target.value
                      .replace(/[^\d]/g, "")
                      .substring(0, 16);

                    // 4자리마다 공백을 추가하여 표시
                    let formattedCardNumber = "";
                    for (let i = 0; i < inputCardNumber.length; i += 4) {
                      const chunk = inputCardNumber.slice(i, i + 4);
                      formattedCardNumber += chunk;
                      if (i + 4 < inputCardNumber.length) {
                        formattedCardNumber += " ";
                      }
                    }

                    // 입력 값 업데이트
                    setCardNumber(formattedCardNumber);
                    console.log(cardNumber);
                  }}
                />
              </div>
              <div style={{ display: "flex", justifyContent: "space-between" }}>
                <span style={{ marginTop: "1rem" }}>
                  <Text>유효기간</Text>
                  <SmallInput
                    type="text"
                    placeholder="만료일(월/년) 4자리"
                    value={expiration}
                    onChange={(e) => {
                      const inputExpiration = e.target.value
                        .replace(/[^\d]/g, "")
                        .substring(0, 4);
                      setExpiration(inputExpiration);

                      if (inputExpiration[0] > 1 || inputExpiration[1] > 2) {
                        // alert("12월 안으로 다시 입력해주세요");
                      }
                      if (inputExpiration.length === 2) {
                        // 두 자리가 입력된 경우 1에서 12 사이의 값으로 제한
                        const month = parseInt(inputExpiration, 10);
                        if (month >= 1 && month <= 12) {
                          setExpiration(`${inputExpiration}/`);
                        }
                      } else if (inputExpiration.length === 4) {
                        // 월과 년이 모두 입력된 경우 유효기간 검사 수행
                        const expiryMonth = inputExpiration.substr(0, 2);
                        const expiryYear = inputExpiration.substr(2, 2);

                        checkExpiry(expiryMonth, expiryYear);
                        setExpiration(
                          inputExpiration.substr(0, 2) +
                            "/" +
                            inputExpiration.substr(2, 2)
                        );
                      }
                    }}
                  />
                </span>
                <span style={{ marginTop: "1rem" }}>
                  <Text>CVC</Text>
                  <SmallInput
                    type="text"
                    placeholder="뒷면 CVC 3자리"
                    value={cvc}
                    onChange={(e) => {
                      const inputCVC = e.target.value
                        .replace(/[^\d]/g, "")
                        .substring(0, 3);
                      setCVC(inputCVC);
                    }}
                  />
                </span>
              </div>
              <div
                style={{
                  display: "flex",
                  flexDirection: "row",
                  alignItems: "flex-start",
                  marginTop: "1rem",
                }}
              >
                <span>
                  <Text>비밀번호 앞 2자리</Text>
                  <SmallInput
                    type="text"
                    placeholder="**"
                    value={password}
                    onChange={(e) => {
                      const inputPassword = e.target.value.substring(0, 2);
                      setPassword(inputPassword);
                    }}
                  />
                </span>
                <span>
                  <Text>기본카드 설정</Text>
                  <SmallInput
                    type="checkbox"
                    checked={isdefault}
                    onChange={(e) => setIsDefault(e.target.checked)}
                  />
                </span>
              </div>
            </form>
          </section>
        </Container>
      </Modal>
    </div>
  );
}
