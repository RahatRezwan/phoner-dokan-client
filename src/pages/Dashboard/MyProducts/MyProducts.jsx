import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import React, { useContext } from "react";
import { toast } from "react-toastify";
import HomeSpinner from "../../../components/HomeSpinner/HomeSpinner";
import { AuthContext } from "../../../contexts/AuthProvider/AuthProvider";

const MyProducts = () => {
   const { user, loading } = useContext(AuthContext);

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
      const item = {
         productId: product._id,
         productName: product.name,
         productImage: product.image,
         quantity: product.quantity,
      };
      axios
         .post("http://localhost:5000/advertisements", item, {
            headers: {
               authorization: `bearer ${localStorage.getItem("accessToken")}`,
            },
         })
         .then((response) => {
            if (response.data.acknowledged) {
               toast.success("Advertised Successfully");
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
                        <td>
                           {!product?.advertise && product.quantity ? (
                              <button
                                 onClick={() => handleAdvertise(product)}
                                 className="btn btn-primary btn-xs text-white"
                              >
                                 Advertise Product
                              </button>
                           ) : (
                              <button className="btn btn-xs text-gray-500 btn-disabled">
                                 Advertise Product
                              </button>
                           )}
                        </td>
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

export default MyProducts;
