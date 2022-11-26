import React, { useContext, useState } from "react";
import { FiLogOut } from "react-icons/fi";
import { Link, Outlet } from "react-router-dom";
import { toast } from "react-toastify";
import { FaUserAlt, FaHome } from "react-icons/fa";
import { AuthContext } from "../contexts/AuthProvider/AuthProvider";
import { RiMenuUnfoldLine } from "react-icons/ri";

const adminMenus = [
   { id: "01", name: "All Buyers", route: "/dashboard/manage-buyers" },
   { id: "02", name: "All Sellers", route: "/dashboard/manage-sellers" },
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
   const [show, setShow] = useState(true);

   const handleLogout = () => {
      logoutAUser()
         .then(() => {
            toast.success("Successfully Logout");
         })
         .catch((err) => console.log(err));
   };
   return (
      <div className="flex flex-col md:flex-row min-h-screen max-w-[1440px]">
         <div className="min-h-full p-5 shadow-md flex flex-row md:flex-col items-center justify-center md:justify-start gap-10 md:mt-7">
            <button
               htmlFor="dashboard-drawer"
               onClick={() => setShow(!show)}
               className="drawer-button cursor-pointer tooltip tooltip-bottom md:tooltip-right"
               data-tip="Open/Close SideBar"
            >
               <RiMenuUnfoldLine className="text-3xl" />
            </button>
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
               onClick={handleLogout}
               className="text-3xl tooltip tooltip-bottom md:tooltip-right"
               data-tip="Logout"
            >
               <FiLogOut />
            </Link>
         </div>
         <div className="flex gap-5 w-full">
            <div className={show ? "block  min-h-screen w-[40%] lg:w-[20%]" : "hidden"}>
               <label htmlFor="dashboard-drawer" className="drawer-overlay"></label>
               <ul className="menu p-4 bg-base-100 text-base-content pt-10 w-full h-full">
                  <li>
                     <Link to="/">Go to Home</Link>
                  </li>
                  <li>
                     <Link to="/dashboard">Dashboard</Link>
                  </li>
                  <li>
                     <Link to="/dashboard/my-orders">My Orders</Link>
                  </li>
                  <li>
                     <Link to="/dashboard/my-wishlist">My Wishlist</Link>
                  </li>

                  {/* Admin Route */}
                  {adminMenus.map((menu) => (
                     <li key={menu.id}>
                        <Link to={menu.route}>{menu.name}</Link>
                     </li>
                  ))}

                  {/* Seller Routes */}
                  {sellerMenus.map((menu) => (
                     <li key={menu.id}>
                        <Link to={menu.route}>{menu.name}</Link>
                     </li>
                  ))}
                  <li>
                     <Link onClick={handleLogout}>
                        Logout <FiLogOut />
                     </Link>
                  </li>
               </ul>
            </div>
            <div className="drawer-content py-10 px-5 w-full">
               <Outlet />
            </div>
         </div>
      </div>
   );
};

export default DashboardLayout;
