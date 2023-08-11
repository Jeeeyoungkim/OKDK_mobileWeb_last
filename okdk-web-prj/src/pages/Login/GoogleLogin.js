import React from "react";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import axios from "axios";

const GoogleLogin = (props) => {
  const navigate = useNavigate();

  const parsedHash = new URLSearchParams(window.location.hash.substring(1));
  const accessToken = parsedHash.get("access_token");

  //어세스토큰 백으로 보내는 코드
  useEffect(() => {
    console.log(accessToken);
    const googleLogin = async () => {
      try {
        const res = await axios({
          method: "GET",
          url: `/account/google/callback/?access_token=${accessToken}`,
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
