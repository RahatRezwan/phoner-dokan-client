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
import AdminRoute from "../AdminRoute/AdminRoute";
import PrivateRoute from "../PrivateRoute/PrivateRoute";
import SellerRoute from "../SellerRoute/SellerRoute";

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
            element: (
               <AdminRoute>
                  <ManageBuyers />
               </AdminRoute>
            ),
         },
         {
            path: "/dashboard/manage-sellers",
            element: (
               <AdminRoute>
                  <ManageSellers />
               </AdminRoute>
            ),
         },
         {
            path: "/dashboard/add-categories",
            element: (
               <AdminRoute>
                  <AddCategories />
               </AdminRoute>
            ),
         },
         {
            path: "/dashboard/reported-items",
            element: (
               <AdminRoute>
                  <ReportedItems />
               </AdminRoute>
            ),
         },
         {
            path: "/dashboard/add-product",
            element: (
               <SellerRoute>
                  <AddProduct />
               </SellerRoute>
            ),
         },
         {
            path: "/dashboard/my-products",
            element: (
               <SellerRoute>
                  <MyProducts />
               </SellerRoute>
            ),
         },
         {
            path: "/dashboard/my-buyers",
            element: (
               <SellerRoute>
                  <MyBuyers />
               </SellerRoute>
            ),
         },
      ],
   },
]);
