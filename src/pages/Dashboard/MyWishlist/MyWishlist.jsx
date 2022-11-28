import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import React, { useContext } from "react";
import HomeSpinner from "../../../components/HomeSpinner/HomeSpinner";
import { AuthContext } from "../../../contexts/AuthProvider/AuthProvider";

const MyWishlist = () => {
   const { user } = useContext(AuthContext);
   const { data: wishlist = [], isLoading } = useQuery({
      queryKey: ["wishlist"],
      queryFn: () =>
         axios(`http://localhost:5000/wishList/${user.email}`, {
            headers: { authorization: `bearer ${localStorage.getItem("accessToken")}` },
         }).then((response) => response.data),
   });

   if (isLoading) {
      return <HomeSpinner />;
   }
   return (
      <div>
         <h2 className="text-3xl">My Wishlist</h2>

         <div className="overflow-x-auto mt-4">
            <table className="table w-[95%]">
               <thead>
                  <tr>
                     <th></th>
                     <th>Photo</th>
                     <th>Product Name</th>
                     <th>Price</th>
                     <th>Product Status</th>
                     <th>Payment</th>
                  </tr>
               </thead>
               <tbody>
                  {wishlist.map((item, i) => (
                     <tr key={item._id} className="hover">
                        <th>{i + 1}</th>
                        <td>
                           <div className="avatar">
                              <div className="w-12">
                                 <img src={item.productImage} alt="" />
                              </div>
                           </div>
                        </td>
                        <td>{item.productName}</td>
                        <td>${item.productPrice}</td>
                        <td>{item.productQuantity ? "Available" : "Purchased"}</td>

                        <td>
                           {item.paymentStatus === "Paid" ? (
                              <p className="text-green-600 font-bold uppercase">Paid</p>
                           ) : (
                              <button
                                 disabled={!item.productQuantity}
                                 className="btn btn-sm text-white"
                              >
                                 pay
                              </button>
                           )}
                        </td>
                     </tr>
                  ))}
               </tbody>
            </table>
         </div>
      </div>
   );
};

export default MyWishlist;
