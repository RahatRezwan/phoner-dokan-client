import React, { useContext } from "react";
import { FiLogOut } from "react-icons/fi";
import { Link, Outlet } from "react-router-dom";
import { toast } from "react-toastify";
import { FaUserAlt, FaHome } from "react-icons/fa";
import { AuthContext } from "../contexts/AuthProvider/AuthProvider";
import { RiFileList3Fill, RiMenuUnfoldLine } from "react-icons/ri";

const adminMenus = [
   { id: "01", name: "Manage Users", route: "/dashboard/manage-users" },
   { id: "02", name: "Manage Sellers", route: "/dashboard/manage-sellers" },
   { id: "03", name: "Add Categories", route: "/dashboard/add-categories" },
   { id: "04", name: "Reported Items", route: "/dashboard/reported-items" },
];

const sellerMenus = [
   { id: "01", name: "Add A Product", route: "/dashboard/add-product" },
   { id: "02", name: "My Products", route: "/dashboard/my-products" },
   { id: "03", name: "My Buyers", route: "/dashboard/my-buyers" },
];

const DashboardLayout = () => {
   const { logoutAUser } = useContext(AuthContext);

   const handleLogout = () => {
      logoutAUser()
         .then(() => {
            toast.success("Successfully Logout");
         })
         .catch((err) => console.log(err));
   };
   return (
      <div className="flex flex-col md:flex-row">
         <div className="min-h-full p-5 shadow-md flex flex-row md:flex-col items-center justify-center md:justify-start gap-10 md:mt-7">
            <label
               htmlFor="dashboard-drawer"
               className="drawer-button cursor-pointer tooltip tooltip-bottom md:tooltip-right"
               data-tip="Open/Close SideBar"
            >
               <RiMenuUnfoldLine className="text-3xl" />
            </label>
            <Link
               to="/"
               className="text-3xl tooltip tooltip-bottom md:tooltip-right"
               data-tip="Go to Home"
            >
               <FaHome />
            </Link>
            <Link
               to="/dashboard"
               className="text-3xl tooltip tooltip-bottom md:tooltip-right"
               data-tip="Go to Dashboard"
            >
               <FaUserAlt />
            </Link>
            <Link
               to="/dashboard/my-orders"
               className="text-3xl tooltip tooltip-bottom md:tooltip-right"
               data-tip="My Orders"
            >
               <RiFileList3Fill />
            </Link>
            <Link
               onClick={handleLogout}
               className="text-3xl tooltip tooltip-bottom md:tooltip-right"
               data-tip="Logout"
            >
               <FiLogOut />
            </Link>
         </div>
         <div className="drawer">
            <input id="dashboard-drawer" type="checkbox" className="drawer-toggle" />
            <div className="drawer-content py-10 px-5">
               <Outlet />
            </div>
            <div className="drawer-side shadow-lg relative pt-5">
               <label htmlFor="dashboard-drawer" className="drawer-overlay"></label>
               <ul className="menu p-4 w-80 bg-base-100 text-base-content">
                  <li>
                     <Link to="/dashboard">Dashboard</Link>
                  </li>
                  <li>
                     <Link to="/dashboard/my-orders">My Orders</Link>
                  </li>
                  <li>
                     <Link to="/dashboard/my-wishlist">My Wishlist</Link>
                  </li>
                  <li>
                     <Link onClick={handleLogout}>
                        Logout <FiLogOut />
                     </Link>
                  </li>
               </ul>
            </div>
         </div>
      </div>
   );
};

export default DashboardLayout;
