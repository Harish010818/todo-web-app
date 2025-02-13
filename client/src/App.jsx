import React, { useState } from "react";
import { Home } from "../pages/home/Home";
import { Login } from "../pages/Login/Login";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { Signup } from "../pages/register/Signup";

function App() {
  const [userState, setUserState] = useState(false); 

  const appRouter = createBrowserRouter([
    {
      path: "/",
      element: <Home setUserState={setUserState} userState={userState}/>,
    },
    {
      path: "/:_id",
      element: <Home setUserState={setUserState} userState={userState}/>,
    },
    {
      path: "/login",
      element: <Login setUserState={setUserState}/>,
    },
    {
      path: "/register",
      element: <Signup setUserState={setUserState}/>,
    },
  ]);

 return <RouterProvider router={appRouter} />;
}

export default App;
