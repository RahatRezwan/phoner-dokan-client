import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import React from "react";
import HomeSpinner from "../../../components/HomeSpinner/HomeSpinner";

const ReportedItems = () => {
   const {
      data: products = [],
      isLoading,
      refetch,
   } = useQuery({
      queryKey: ["products"],
      queryFn: () =>
         axios(`http://localhost:5000/reported-items`, {
            headers: {
               authorization: `bearer ${localStorage.getItem("accessToken")}`,
            },
         }).then((res) => res.data),
   });

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

export default ReportedItems;
