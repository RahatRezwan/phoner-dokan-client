import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import React, { useState } from "react";

const CheckoutForm = ({ order }) => {
   const stripe = useStripe();
   const elements = useElements();
   const [cardError, setCardError] = useState([]);

   const handleSubmit = async (event) => {
      event.preventDefault();
      if (!stripe || !elements) {
         return;
      }
      const card = elements.getElement(CardElement);
      if (card == null) {
         return;
      }
      const { error, paymentMethod } = await stripe.createPaymentMethod({
         type: "card",
         card,
      });
      if (error) {
         setCardError(error.message);
      } else {
         setCardError("");
      }
   };
   return (
      <form onSubmit={handleSubmit} className="text-center">
         <h2 className="text-xl font-semibold mb-2 text-start">Enter Card Details</h2>
         <CardElement
            options={{
               style: {
                  base: {
                     fontSize: "16px",
                     color: "#424770",
                     "::placeholder": {
                        color: "#aab7c4",
                     },
                  },
                  invalid: {
                     color: "#9e2146",
                  },
               },
            }}
            className="border p-3 rounded-md"
         />
         <p className="text-center text-error font-semibold my-2">{cardError ? cardError : null}</p>
         <button
            type="submit"
            disabled={!stripe}
            className="btn btn-primary btn-md mt-3 text-white"
         >
            Pay ${order.product.price}
         </button>
      </form>
   );
};

export default CheckoutForm;
