import React from "react";
import { useQuery } from "@tanstack/react-query";
import { toast } from "react-toastify";
import HomeSpinner from "../../../components/HomeSpinner/HomeSpinner";
import axios from "axios";

const ManageUsers = () => {
   /* Load data using react/tanStack query */
   const {
      data: buyers = [],
      isLoading,
      refetch,
   } = useQuery({
      queryKey: ["buyers"],
      queryFn: () =>
         fetch(`http://localhost:5000/buyers`, {
            headers: {
               authorization: `bearer ${localStorage.getItem("accessToken")}`,
            },
         }).then((res) => res.json()),
   });

   const handleDelete = (_id) => {
      axios
         .delete(`http://localhost:5000/deleteUser/${_id}`, {
            headers: { authorization: `bearer ${localStorage.getItem("accessToken")}` },
         })
         .then((response) => {
            if (response.data.deletedCount > 0) {
               toast.success("Deleted Successfully");
               refetch();
            }
         });
   };

   if (isLoading) {
      return <HomeSpinner />;
   }

   return (
      <div>
         <h2 className="text-3xl mb-4">Manage Buyers</h2>

         <div className="overflow-x-auto">
            <table className="table w-[95%]">
               <thead>
                  <tr>
                     <th></th>
                     <th>Photo</th>
                     <th>Name</th>
                     <th>Email</th>
                     <th>Role</th>
                     <th>Delete</th>
                  </tr>
               </thead>
               <tbody>
                  {buyers.map((buyer, i) => (
                     <tr key={buyer._id} className="hover">
                        <th>{i + 1}</th>
                        <td>
                           <div className="avatar">
                              <div className="w-12 rounded-full">
                                 <img src={buyer.profilePic} alt="" />
                              </div>
                           </div>
                        </td>
                        <td>
                           {buyer.name}{" "}
                           {(buyer?.verified || buyer?.role === "Admin") && (
                              <div className="badge badge-success badge-sm text-white font-bold">
                                 {buyer?.verified ? "Verified Seller" : "Admin"}
                              </div>
                           )}
                        </td>
                        <td>{buyer?.email}</td>
                        <td>{buyer?.role}</td>
                        <td>
                           <button
                              onClick={() => handleDelete(buyer._id)}
                              className="btn btn-error btn-xs text-white"
                           >
                              Delete
                           </button>
                        </td>
                     </tr>
                  ))}
               </tbody>
            </table>
         </div>
      </div>
   );
};

export default ManageUsers;
