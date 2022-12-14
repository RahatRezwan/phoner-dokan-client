import { createBrowserRouter } from "react-router-dom";
import ErrorPage from "../../components/ErrorPage/ErrorPage";
import DashboardLayout from "../../layouts/DashboardLayout";
import Main from "../../layouts/Main";
import { Blogs, Categories, Dashboard, Home, Login, Register } from "../../pages";
import CategoryDetails from "../../pages/CategoryDetails/CategoryDetails";
import {
   AddCategories,
   AddProduct,
   ManageBuyers,
   ManageSellers,
   MyOrders,
   MyProducts,
   MyWishlist,
   ReportedItems,
} from "../../pages/Dashboard";
import AddBlog from "../../pages/Dashboard/AddBlog/AddBlog";
import AdminRoute from "../AdminRoute/AdminRoute";
import PrivateRoute from "../PrivateRoute/PrivateRoute";
import SellerRoute from "../SellerRoute/SellerRoute";

export const router = createBrowserRouter([
   {
      path: "/",
      element: <Main />,
      errorElement: <ErrorPage />,
      children: [
         {
            path: "/",
            element: <Home />,
         },
         {
            path: "/categories",
            element: <Categories />,
            loader: () => fetch("https://phoner-dokan-server.vercel.app/categories"),
         },
         {
            path: "/category/:id",
            element: (
               <PrivateRoute>
                  <CategoryDetails />
               </PrivateRoute>
            ),
            loader: ({ params }) =>
               fetch(`https://phoner-dokan-server.vercel.app/categories/${params.id}`),
         },
         {
            path: "/blogs",
            element: <Blogs />,
            loader: () => fetch("https://phoner-dokan-server.vercel.app/blogs"),
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
            path: "/dashboard/add-blog",
            element: (
               <AdminRoute>
                  <AddBlog />
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
      ],
   },
]);
