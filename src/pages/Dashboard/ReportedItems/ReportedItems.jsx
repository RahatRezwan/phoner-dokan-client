import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import React, { useState } from "react";
import { toast } from "react-toastify";
import HomeSpinner from "../../../components/HomeSpinner/HomeSpinner";
import SmallSpinner from "../../../components/SmallSpinner/SmallSpinner";

const ReportedItems = () => {
   const [loader, setLoader] = useState(false);
   const {
      data: products = [],
      isLoading,
      refetch,
   } = useQuery({
      queryKey: ["products"],
      queryFn: () =>
         axios(`https://phoner-dokan-server.vercel.app/reported-items`, {
            headers: {
               authorization: `bearer ${localStorage.getItem("accessToken")}`,
            },
         }).then((res) => res.data),
   });

   const deleteItem = (id) => {
      setLoader(true);
      axios
         .delete(`https://phoner-dokan-server.vercel.app/deleteproduct/${id}`, {
            headers: { authorization: `bearer ${localStorage.getItem("accessToken")}` },
         })
         .then((response) => {
            if (response.data.deletedCount > 0) {
               toast.success("Product Deleted Successfully");
               setLoader(false);
               refetch();
            }
         });
   };

   if (isLoading) {
      return <HomeSpinner />;
   }

   if (products.length === 0) {
      return (
         <div className="text center">
            <h2 className="text-3xl font-bold">No products found</h2>
         </div>
      );
   }

   return (
      <div>
         <h2 className="text-3xl mb-3">Reported Items</h2>

         <div className="overflow-x-auto">
            <table className="table w-[95%]">
               <thead>
                  <tr>
                     <th></th>
                     <th>Photo</th>
                     <th>Name</th>
                     <th>Category/Brand</th>
                     <th>Status</th>
                     <th>Delete</th>
                  </tr>
               </thead>
               <tbody>
                  {products.map((product, i) => (
                     <tr key={product._id} className="hover">
                        <th>{i + 1}</th>
                        <td>
                           <div className="avatar">
                              <div className="w-12">
                                 <img src={product.image} alt="" />
                              </div>
                           </div>
                        </td>
                        <td>{product.name}</td>
                        <td>{product.category}</td>
                        <td>{product.quantity ? "Available" : "Sold"}</td>
                        <td>
                           <button
                              onClick={() => deleteItem(product._id)}
                              className="btn btn-error btn-xs text-white"
                           >
                              {loader ? <SmallSpinner /> : "Delete"}
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

export default ReportedItems;
