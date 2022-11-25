import React, { useContext } from "react";
import { AuthContext } from "../../../contexts/AuthProvider/AuthProvider";

const Dashboard = () => {
   const { user } = useContext(AuthContext);
   return (
      <div>
         <h1 className="text-4xl mb-5 text-center mt-11">User Dashboard</h1>
         <div className="bg-base-100 shadow-xl flex flex-col lg:flex-row gap-10 items-center justify-center w-[85%] md:w-[50%] xl:w-[40%] mx-auto p-5 border rounded-md">
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
                  className="input input-bordered w-full max-w-xs mb-3"
               />
               <label className="label">
                  <span className="label-text text-xl font-semibold">Email</span>
               </label>
               <input
                  type="text"
                  defaultValue={user?.email}
                  className="input input-bordered w-full max-w-xs mb-3"
               />
            </div>
         </div>
      </div>
   );
};

export default Dashboard;
