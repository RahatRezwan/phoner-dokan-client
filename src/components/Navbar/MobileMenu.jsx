import React, { useContext, useState } from "react";
import { FiLogOut } from "react-icons/fi";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import { AuthContext } from "../../contexts/AuthProvider/AuthProvider";

const MobileMenu = ({ menuItems }) => {
   const [showMenu, setShowMenu] = useState(false);
   const { logoutAUser } = useContext(AuthContext);

   const handleLogout = () => {
      logoutAUser()
         .then(() => {
            toast.success("Successfully Logout");
         })
         .catch((err) => console.log(err));
   };
   return (
      <div className="relative lg:hidden">
         <div onClick={() => setShowMenu((prev) => !prev)}>
            {showMenu ? (
               <>
                  <svg
                     className="swap-on fill-current"
                     xmlns="http://www.w3.org/2000/svg"
                     width="32"
                     height="32"
                     viewBox="0 0 512 512"
                  >
                     <polygon points="400 145.49 366.51 112 256 222.51 145.49 112 112 145.49 222.51 256 112 366.51 145.49 400 256 289.49 366.51 400 400 366.51 289.49 256 400 145.49" />
                  </svg>
               </>
            ) : (
               <>
                  <svg
                     className="swap-off fill-current"
                     xmlns="http://www.w3.org/2000/svg"
                     width="32"
                     height="32"
                     viewBox="0 0 512 512"
                  >
                     <path d="M64,384H448V341.33H64Zm0-106.67H448V234.67H64ZM64,128v42.67H448V128Z" />
                  </svg>
               </>
            )}
         </div>

         {showMenu ? (
            <>
               <ul className="mt-3 p-2 shadow menu menu-compact dropdown-content bg-base-100 rounded-box w-52 absolute top-[130%] right-[10%]">
                  {menuItems.map((menu) => (
                     <li key={menu.id}>
                        <Link to={menu.route}>{menu.name}</Link>
                     </li>
                  ))}
                  <li>
                     <Link>Dashboard</Link>
                  </li>
                  <li>
                     <Link onClick={handleLogout}>
                        Logout <FiLogOut />
                     </Link>
                  </li>
               </ul>
            </>
         ) : null}
      </div>
   );
};

export default MobileMenu;
<div className="dropdown dropdown-end">
   <label className="btn btn-circle swap swap-rotate">
      <input type="checkbox" tabIndex={1} />

      <svg
         className="swap-off fill-current"
         xmlns="http://www.w3.org/2000/svg"
         width="32"
         height="32"
         viewBox="0 0 512 512"
      >
         <path d="M64,384H448V341.33H64Zm0-106.67H448V234.67H64ZM64,128v42.67H448V128Z" />
      </svg>

      <svg
         className="swap-on fill-current"
         xmlns="http://www.w3.org/2000/svg"
         width="32"
         height="32"
         viewBox="0 0 512 512"
      >
         <polygon points="400 145.49 366.51 112 256 222.51 145.49 112 112 145.49 222.51 256 112 366.51 145.49 400 256 289.49 366.51 400 400 366.51 289.49 256 400 145.49" />
      </svg>
   </label>
   <ul
      tabIndex={1}
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
</div>;
