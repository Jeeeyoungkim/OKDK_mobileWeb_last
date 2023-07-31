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
import Home from "./pages/Home";
import Favorite from "./pages/Favorite";
import Payment from "./pages/Payment";
import Setting from "./pages/Setting";

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
]);

function App() {
  return (
    <div className="App">
      <RouterProvider router={router}/>
    </div>
  )
}
 

export default App;
