import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import { AuthContext } from "../../contexts/AuthProvider/AuthProvider";
import logo from "../../logo.png";
import MobileMenu from "./MobileMenu";
import { FiLogOut } from "react-icons/fi";

const menuItems = [
   { id: "01", name: "Home", route: "/" },
   { id: "02", name: "Categories", route: "/categories" },
   { id: "03", name: "Blogs", route: "/blogs" },
];
const Navbar = () => {
   const { user, logoutAUser } = useContext(AuthContext);

   const handleLogout = () => {
      logoutAUser()
         .then(() => {
            toast.success("Successfully Logout");
         })
         .catch((err) => console.log(err));
   };

   return (
      <div className="bg-base-100 shadow-md">
         <div className="navbar bg-transparent max-w-[1350px] mx-auto flex justify-between items-center">
            <div className="">
               <Link className="w-[150px] md:w-[200px] lg:w-[250px]">
                  <img src={logo} alt="" />
               </Link>
            </div>
            <div className="flex-none hidden lg:block">
               <ul className="menu menu-horizontal p-0">
                  {menuItems.map((menu) => (
                     <li key={menu.id}>
                        <Link to={menu.route} className="btn btn-ghost">
                           {menu.name}
                        </Link>
                     </li>
                  ))}

                  {user?.displayName ? (
                     <>
                        {/* user */}
                        <div className="dropdown dropdown-end">
                           <div>
                              <label tabIndex={0} className="btn btn-ghost btn-circle avatar">
                                 <div className="w-10 rounded-full ">
                                    <img src={user?.photoURL} alt="" />
                                 </div>
                              </label>
                           </div>

                           <ul
                              tabIndex={0}
                              className="mt-3 p-2 shadow menu menu-compact dropdown-content bg-base-100 rounded-box w-52"
                           >
                              <li>
                                 <Link to="/dashboard" className="justify-between">
                                    Dashboard
                                 </Link>
                              </li>
                              <li>
                                 <Link onClick={handleLogout}>Logout</Link>
                              </li>
                           </ul>
                        </div>
                        <button
                           onClick={handleLogout}
                           className="ml-3 tooltip tooltip-bottom"
                           data-tip="Logout"
                        >
                           <FiLogOut className="text-2xl" />
                        </button>
                     </>
                  ) : (
                     <>
                        <li>
                           <Link to="/login" className="btn btn-primary btn-outline">
                              Login
                           </Link>
                        </li>
                     </>
                  )}
               </ul>
            </div>

            {/* mobile menu */}
            <MobileMenu menuItems={menuItems} />
         </div>
      </div>
   );
};

export default Navbar;
