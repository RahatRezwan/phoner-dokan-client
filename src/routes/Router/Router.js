import { createBrowserRouter } from "react-router-dom";
import Main from "../../layouts/Main";
import { Home, Login, Register } from "../../pages";

export const router = createBrowserRouter([
   {
      path: "/",
      element: <Main />,
      Children: [
         {
            path: "/",
            element: <Home />,
         },
         {
            path: "/login",
            element: <Login />,
         },
         {
            path: "/register",
            element: <Register />,
         },
      ],
   },
]);
