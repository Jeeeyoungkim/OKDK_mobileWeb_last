// App.js

import React from "react";
import {
  BrowserRouter as Routes,
  Route,
  Link,
  BrowserRouter,
  Router,
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import { createGlobalStyle } from "styled-components";
import Home from "./pages/Home";
import Favorite from "./pages/Favorite";
import Payment from "./pages/Payment";
import Setting from "./pages/Setting";
import Morecards from "./pages/Morecards";
import CardEnroll from "./pages/CardEnroll";
import CardSetting from "./pages/CardSetting";
import DirectInput from "./pages/DirectInput";

const GlobalStyle = createGlobalStyle`
 *{
      margin: 0;
      padding: 0;
      font-family: Pretendard, -apple-system, BlinkMacSystemFont, system-ui, Roboto, 'Helvetica Neue', 'Segoe UI', 'Apple SD Gothic Neo', 'Noto Sans KR', 'Malgun Gothic', sans-serif;
  }
  body {
    text-align: center;
    margin: 0 auto;
    max-width: 479px;
  }
  .hidden {height:100%; min-height:100%; overflow:hidden !important; touch-action:none;}
  .button {color: #056CF2; border-radius: 30px;}
`;

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/Home",
    element: <Home />,
  },

  {
    path: "/Favorite",
    element: <Favorite />,
  },

  {
    path: "/Payment",
    element: <Payment />,
  },
  {
    path: "/Setting",
    element: <Setting />,
  },
  {
    path : "/Morecards",
    element: <Morecards />,
  },
  {
    path : "/CardEnroll",
    element: <CardEnroll />,
  },
  {
    path : "/CardSetting",
    element: <CardSetting />,
  },
  {
    path : "/DirectInput",
    element: <DirectInput />,
  },
]);

function App() {
  return (
    <div className="App">
      <GlobalStyle />
      <RouterProvider router={router} />
    </div>
  );
}

export default App;
