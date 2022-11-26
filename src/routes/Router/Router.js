import { createBrowserRouter } from "react-router-dom";
import DashboardLayout from "../../layouts/DashboardLayout";
import Main from "../../layouts/Main";
import { Blogs, Categories, Dashboard, Home, Login, Register } from "../../pages";
import {
   AddCategories,
   AddProduct,
   ManageBuyers,
   ManageSellers,
   MyBuyers,
   MyOrders,
   MyProducts,
   MyWishlist,
   ReportedItems,
} from "../../pages/Dashboard";
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
         {
            path: "/dashboard/my-orders",
            element: <MyOrders />,
         },
         {
            path: "/dashboard/my-wishlist",
            element: <MyWishlist />,
         },
         {
            path: "/dashboard/manage-buyers",
            element: <ManageBuyers />,
         },
         {
            path: "/dashboard/manage-sellers",
            element: <ManageSellers />,
         },
         {
            path: "/dashboard/add-categories",
            element: <AddCategories />,
         },
         {
            path: "/dashboard/reported-items",
            element: <ReportedItems />,
         },
         {
            path: "/dashboard/add-product",
            element: <AddProduct />,
         },
         {
            path: "/dashboard/my-products",
            element: <MyProducts />,
         },
         {
            path: "/dashboard/my-buyers",
            element: <MyBuyers />,
         },
      ],
   },
]);
