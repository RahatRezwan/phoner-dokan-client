import { loadStripe } from "@stripe/stripe-js";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import React, { useContext, useState } from "react";
import HomeSpinner from "../../../components/HomeSpinner/HomeSpinner";
import { AuthContext } from "../../../contexts/AuthProvider/AuthProvider";
import Payment from "../Payment/Payment";

const stripePromise = loadStripe(process.env.REACT_APP_Stripe_Pk);

const MyOrders = () => {
   const { user } = useContext(AuthContext);
   const [currentOrder, setCurrentOrder] = useState(null);

   const {
      data: orders = [],
      isLoading,
      fetch,
   } = useQuery({
      queryKey: ["orders"],
      queryFn: () =>
         axios(`http://localhost:5000/bookItems/${user?.email}`).then((response) => response.data),
   });

   if (isLoading) {
      return <HomeSpinner />;
   }

   return (
      <div>
         <h2 className="text-3xl">My Orders {orders.length}</h2>

         <div className="overflow-x-auto mt-4">
            <table className="table w-[95%]">
               <thead>
                  <tr>
                     <th></th>
                     <th>Photo</th>
                     <th>Product Name</th>
                     <th>Price</th>
                     <th>Product Status</th>
                     <th>Payment Status</th>
                  </tr>
               </thead>
               <tbody>
                  {orders.map((order, i) => (
                     <tr key={order._id} className="hover">
                        <th>{i + 1}</th>
                        <td>
                           <div className="avatar">
                              <div className="w-12">
                                 <img src={order.product.image} alt="" />
                              </div>
                           </div>
                        </td>
                        <td>{order.product.name}</td>
                        <td>${order.product.price}</td>
                        <td>{order.product.quantity ? "Available" : "Purchased"}</td>
                        <td>
                           <label
                              onClick={() => setCurrentOrder(order)}
                              htmlFor="payment-modal"
                              className="btn btn-sm text-white"
                           >
                              pay
                           </label>
                        </td>
                     </tr>
                  ))}
               </tbody>
            </table>
         </div>

         {currentOrder ? (
            <Payment
               currentOrder={currentOrder}
               setCurrentOrder={setCurrentOrder}
               fetch={fetch}
               stripePromise={stripePromise}
            />
         ) : null}
      </div>
   );
};

export default MyOrders;
