import React from "react";
import { useQuery } from "@tanstack/react-query";
import { toast } from "react-toastify";
import HomeSpinner from "../../../components/HomeSpinner/HomeSpinner";

const ManageSellers = () => {
   /* Load data using react/tanStack query */
   const {
      data: sellers = [],
      refetch,
      isLoading,
   } = useQuery({
      queryKey: ["sellers"],
      queryFn: () => fetch(`http://localhost:5000/users/sellers`).then((res) => res.json()),
   });

   const handleVerify = (seller) => {
      fetch(`http://localhost:5000/users/sellers/${seller._id}`, {
         method: "PUT",
         /* headers: {
            authorization: `bearer ${localStorage.getItem("accessToken")}`,
         }, */
      })
         .then((res) => res.json())
         .then((data) => {
            if (data.matchedCount > 0) {
               toast.success(`${seller.name} is selected as Verified`);
               refetch();
            }
         });
   };

   if (isLoading) {
      return <HomeSpinner />;
   }

   return (
      <div>
         <h2 className="text-3xl mb-3">Manage Sellers</h2>

         <div className="overflow-x-auto">
            <table className="table w-[95%]">
               <thead>
                  <tr>
                     <th></th>
                     <th>Name</th>
                     <th>Email</th>
                     <th>Verify</th>
                     <th>Delete</th>
                  </tr>
               </thead>
               <tbody>
                  {sellers.map((seller, i) => (
                     <tr key={seller._id} className="hover">
                        <th>{i + 1}</th>
                        <td>
                           {seller.name}{" "}
                           {seller?.verified && (
                              <div className="badge badge-success badge-sm text-white font-bold">
                                 Verified
                              </div>
                           )}
                        </td>
                        <td>{seller.email}</td>
                        <td>
                           {!seller?.verified && (
                              <button
                                 onClick={() => handleVerify(seller)}
                                 className="btn btn-primary btn-xs text-white"
                              >
                                 Verify Seller
                              </button>
                           )}
                        </td>
                        <td>
                           <button className="btn btn-error btn-xs text-white">Delete</button>
                        </td>
                     </tr>
                  ))}
               </tbody>
            </table>
         </div>
      </div>
   );
};

export default ManageSellers;