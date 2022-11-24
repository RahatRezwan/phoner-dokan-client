import React from "react";
import { Link } from "react-router-dom";
import logo from "../../logo.png";
import MobileMenu from "./MobileMenu";

const menuItems = [
   { id: "01", name: "Home", route: "/" },
   { id: "02", name: "Categories", route: "/categories" },
   { id: "03", name: "Blogs", route: "/blogs" },
];
const Navbar = () => {
   return (
      <div className="bg-base-100 shadow-md">
         <div className="navbar bg-transparent max-w-[1350px] mx-auto">
            <div className="flex-1">
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

                  <li>
                     <Link to="/login" className="btn btn-primary btn-outline">
                        Login
                     </Link>
                  </li>

                  {/* user */}
                  <div className="dropdown dropdown-end">
                     <label tabIndex={0} className="btn btn-ghost btn-circle avatar">
                        <div className="w-10 rounded-full">
                           <img src="https://placeimg.com/80/80/people" alt="" />
                        </div>
                     </label>
                     <ul
                        tabIndex={0}
                        className="mt-3 p-2 shadow menu menu-compact dropdown-content bg-base-100 rounded-box w-52"
                     >
                        <li>
                           <Link className="justify-between">Dashboard</Link>
                        </li>
                        <li>
                           <Link>Settings</Link>
                        </li>
                        <li>
                           <Link>Logout</Link>
                        </li>
                     </ul>
                  </div>
               </ul>
            </div>

            {/* mobile menu */}
            <MobileMenu menuItems={menuItems} />
         </div>
      </div>
   );
};

export default Navbar;
