import { createBrowserRouter } from "react-router-dom";
import Main from "../../layouts/Main";
import { Blogs, Categories, Home, Login, Register } from "../../pages";

export const router = createBrowserRouter([
   {
      path: "/",
      element: <Main />,
      children: [
         {
            path: "/",
            element: <Home />,
         },
         {
            path: "/categories",
            element: <Categories />,
         },
         {
            path: "/blogs",
            element: <Blogs />,
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
