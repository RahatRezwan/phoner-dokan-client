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
      refetch,
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
                     <th>TnxID</th>
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
                                 <img src={order.productImage} alt="" />
                              </div>
                           </div>
                        </td>
                        <td>{order.productName}</td>
                        <td>${order.productPrice}</td>
                        <td>{order.productQuantity ? "Available" : "Purchased"}</td>
                        <td>{order.transactionId}</td>
                        <td>
                           {order.paymentStatus === "Paid" ? (
                              <p className="text-green-600 font-bold uppercase">Paid</p>
                           ) : (
                              <label
                                 onClick={() => setCurrentOrder(order)}
                                 htmlFor="payment-modal"
                                 disabled={!order.productQuantity}
                                 className="btn btn-sm text-white"
                              >
                                 pay
                              </label>
                           )}
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
               refetch={refetch}
               stripePromise={stripePromise}
            />
         ) : null}
      </div>
   );
};

export default MyOrders;
