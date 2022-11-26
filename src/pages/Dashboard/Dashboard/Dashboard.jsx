import React, { useContext } from "react";
import { AuthContext } from "../../../contexts/AuthProvider/AuthProvider";

const Dashboard = () => {
   const { user } = useContext(AuthContext);
   return (
      <div>
         <h1 className="text-4xl mb-5 text-center mt-11">User Dashboard</h1>
         <div className="bg-base-100 shadow-xl flex flex-col lg:flex-row gap-10 items-center justify-center w-[85%] md:w-[50%] mx-auto p-5 border rounded-md">
            <div className="avatar">
               <div className="w-48 rounded-full">
                  <img src={user?.photoURL} alt="" />
               </div>
            </div>
            <div className="">
               <label className="label">
                  <span className="label-text text-xl font-semibold">Name</span>
               </label>
               <input
                  type="text"
                  defaultValue={user?.displayName}
                  className="input input-bordered w-full mb-3 pointer-events-none"
               />
               <label className="label">
                  <span className="label-text text-xl font-semibold">Email</span>
               </label>
               <input
                  type="text"
                  defaultValue={user?.email}
                  className="input input-bordered w-full mb-3 pointer-events-none"
               />
            </div>
         </div>
      </div>
   );
};

export default Dashboard;
