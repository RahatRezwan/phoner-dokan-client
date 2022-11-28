import { CardElement, PaymentElement, useElements, useStripe } from "@stripe/react-stripe-js";
import React, { useEffect, useState } from "react";
import HomeSpinner from "../../../components/HomeSpinner/HomeSpinner";

const CheckoutForm = ({ order }) => {
   const stripe = useStripe();
   const elements = useElements();
   const [cardError, setCardError] = useState([]);
   const [loading, setLoading] = useState(true);
   const [clientSecret, setClientSecret] = useState("");

   console.log(order);
   useEffect(() => {
      const product = order.product;
      // Create PaymentIntent as soon as the page loads
      fetch("http://localhost:5000/create-payment-intent", {
         method: "POST",
         headers: {
            "Content-Type": "application/json",
            authorization: `bearer ${localStorage.getItem("accessToken")}`,
         },
         body: JSON.stringify(product),
      })
         .then((res) => res.json())
         .then((data) => {
            setClientSecret(data.clientSecret);
            setLoading(false);
         });
   }, [order.product]);

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
         setLoading(false);
      } else {
         setCardError("");
      }

      const { paymentIntent, error: confirmError } = await stripe.confirmCardPayment(clientSecret, {
         payment_method: {
            card: card,
            billing_details: {
               name: order.customerName,
               email: order.customerEmail,
            },
         },
      });
      if (confirmError) {
         setCardError(confirmError.message);
         return;
      }
      console.log("paymentIntent: ", paymentIntent);
   };

   if (loading) {
      return <HomeSpinner />;
   }
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
            disabled={!stripe || !clientSecret}
            className="btn btn-primary btn-md mt-3 text-white"
         >
            Pay ${order.product.price}
         </button>
      </form>
   );
};

export default CheckoutForm;
