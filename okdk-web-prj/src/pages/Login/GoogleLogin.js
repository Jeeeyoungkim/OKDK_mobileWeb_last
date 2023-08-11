import React from "react";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import axios from "axios";

const GoogleLogin = (props) => {
  const navigate = useNavigate();

  const code = new URL(window.location.href).searchParams.get("code");
  console.log(code);

  //인가코드 백으로 보내는 코드
  useEffect(() => {
    const googleLogin = async () => {
      try {
        const res = await axios({
          method: "GET",
          url: `/account/google/callback/?code=${code}`,
          headers: {
            "Content-Type": "application/json;charset=utf-8",
            "Access-Control-Allow-Origin": "*",
          },
        });

        console.log("받았따~");
        console.log(res);
        navigate("/");
      } catch (error) {
        console.log("Error:", error);
      }
    };

    googleLogin();
  }, []);

  return <div>GoogleLogin중입니다</div>;
};

export default GoogleLogin;
