import React from "react";
import { Elements } from "@stripe/react-stripe-js";
import CheckoutForm from "./CheckoutForm";

const Payment = ({ currentOrder, stripePromise }) => {
   return (
      <div>
         <input type="checkbox" id="payment-modal" className="modal-toggle" />
         <div className="modal">
            <div className="modal-box relative">
               <label
                  htmlFor="payment-modal"
                  className="btn btn-sm btn-circle absolute right-2 top-2"
               >
                  ✕
               </label>
               <div className="text-center">
                  <h3 className="text-lg font-bold">Payment for {currentOrder.product.name}</h3>
               </div>
               <div className="my-5 w-96 mx-auto">
                  <Elements stripe={stripePromise} options={{ theme: "stripe" }}>
                     <CheckoutForm order={currentOrder} />
                  </Elements>
               </div>
            </div>
         </div>
      </div>
   );
};

export default Payment;
