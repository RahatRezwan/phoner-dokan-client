import React from "react";

import { useQuery } from "@tanstack/react-query";
import { toast } from "react-toastify";
import HomeSpinner from "../../../components/HomeSpinner/HomeSpinner";

const ManageUsers = () => {
   /* Load data using react/tanStack query */
   const { data: users = [], isLoading } = useQuery({
      queryKey: ["sellers"],
      queryFn: () => fetch(`http://localhost:5000/users`).then((res) => res.json()),
   });

   return (
      <div>
         <h2 className="text-3xl mb-4">Manage Users</h2>

         <div className="overflow-x-auto">
            <table className="table w-[95%]">
               <thead>
                  <tr>
                     <th></th>
                     <th>Photo</th>
                     <th>Name</th>
                     <th>Email</th>
                     <th>Role</th>
                  </tr>
               </thead>
               <tbody>
                  {users.map((user, i) => (
                     <tr key={user._id} className="hover">
                        <th>{i + 1}</th>
                        <td>
                           <div className="avatar">
                              <div className="w-12 rounded-full">
                                 <img src={user.profilePic} alt="" />
                              </div>
                           </div>
                        </td>
                        <td>
                           {user.name}{" "}
                           {(user?.verified || user?.role === "Admin") && (
                              <div className="badge badge-success badge-sm text-white font-bold">
                                 {user?.verified ? "Verified Seller" : "Admin"}
                              </div>
                           )}
                        </td>
                        <td>{user?.email}</td>
                        <td>{user?.role}</td>
                     </tr>
                  ))}
               </tbody>
            </table>
         </div>
      </div>
   );
};

export default ManageUsers;
