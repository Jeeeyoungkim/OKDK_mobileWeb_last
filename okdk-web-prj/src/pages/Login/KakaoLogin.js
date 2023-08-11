import React from "react";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import axios from "axios";

const KakaoLogin = (props) => {
  const navigate = useNavigate();

  const code = new URL(window.location.href).searchParams.get("code");
  console.log(code);

  //인가코드 백으로 보내는 코드
  useEffect(() => {
    const kakaoLogin = async () => {
      try {
        const res = await axios({
          method: "GET",
          url: `/account/kakao/callback/?code=${code}`,
          headers: {
            "Content-Type": "application/json;charset=utf-8",
          },
        });
        console.log("받았따~");
        console.log(res);
        // const access_token = res.headers["Access-Token"];
        // localStorage.setItem("access_token", access_token);

        navigate("/");
      } catch (error) {
        console.error("로그인 실패:", error);
      }
    };
    kakaoLogin();
  }, []);

  return <div>KakaoLogin중입니다</div>;
};

export default KakaoLogin;
