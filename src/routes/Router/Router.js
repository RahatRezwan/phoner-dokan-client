import { createBrowserRouter } from "react-router-dom";
import DashboardLayout from "../../layouts/DashboardLayout";
import Main from "../../layouts/Main";
import { Blogs, Categories, Dashboard, Home, Login, Register } from "../../pages";
import PrivateRoute from "../PrivateRoute/PrivateRoute";

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
   {
      path: "/dashboard",
      element: (
         <PrivateRoute>
            <DashboardLayout />
         </PrivateRoute>
      ),
      children: [
         {
            path: "/dashboard",
            element: <Dashboard />,
         },
      ],
   },
]);
