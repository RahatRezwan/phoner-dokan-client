import { Children } from "react";
import { createBrowserRouter } from "react-router-dom";
import Main from "../../layouts/Main";
import { Home } from "../../pages";

export const router = createBrowserRouter([
   {
      path: "/",
      element: <Main />,
      Children: [
         {
            path: "/",
            element: <Home />,
         },
      ],
   },
]);
