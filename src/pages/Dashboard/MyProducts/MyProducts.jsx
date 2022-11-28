import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import React, { useContext, useState } from "react";
import { toast } from "react-toastify";
import HomeSpinner from "../../../components/HomeSpinner/HomeSpinner";
import SmallSpinner from "../../../components/SmallSpinner/SmallSpinner";
import { AuthContext } from "../../../contexts/AuthProvider/AuthProvider";

const MyProducts = () => {
   const { user, loading } = useContext(AuthContext);
   const [updateLoader, setUpdateLoader] = useState(false);
   /* get all products of the seller */
   const {
      data: products = [],
      isLoading,
      refetch,
   } = useQuery({
      queryKey: ["products"],
      queryFn: () =>
         axios(`http://localhost:5000/products/${user?.email}`, {
            headers: {
               authorization: `bearer ${localStorage.getItem("accessToken")}`,
            },
         }).then((res) => res.data),
   });

   const handleAdvertise = (product) => {
      setUpdateLoader(true);
      fetch(`http://localhost:5000/products/${product._id}`, {
         method: "PUT",
         headers: {
            authorization: `bearer ${localStorage.getItem("accessToken")}`,
         },
      })
         .then((res) => res.json())
         .then((data) => {
            if (data.matchedCount > 0) {
               setUpdateLoader(false);
               toast.success(`Advertised Successfully`);
               refetch();
            }
         });
   };

   if (isLoading || loading) {
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
         <h2 className="text-3xl mb-3">My Products</h2>

         <div className="overflow-x-auto">
            <table className="table w-[95%]">
               <thead>
                  <tr>
                     <th></th>
                     <th>Photo</th>
                     <th>Name</th>
                     <th>Category/Brand</th>
                     <th>Advertise</th>
                     <th>Status</th>
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
                        <td>
                           {!product?.advertise && product.quantity ? (
                              <button
                                 onClick={() => handleAdvertise(product)}
                                 className="btn btn-primary btn-xs text-white"
                              >
                                 {updateLoader ? <SmallSpinner /> : "Advertise"}
                              </button>
                           ) : (
                              <button className="btn btn-xs text-gray-500 btn-disabled">
                                 Advertise
                              </button>
                           )}
                        </td>
                        <td>{product.quantity ? "Available" : "Sold"}</td>
                     </tr>
                  ))}
               </tbody>
            </table>
         </div>
      </div>
   );
};

export default MyProducts;
