import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import HomeSpinner from "../../../components/HomeSpinner/HomeSpinner";
import SmallSpinner from "../../../components/SmallSpinner/SmallSpinner";

const CheckoutForm = ({ currentOrder, setCurrentOrder, refetch }) => {
   const stripe = useStripe();
   const elements = useElements();
   const [cardError, setCardError] = useState("");
   const [loading, setLoading] = useState(true);
   const [processing, setProcessing] = useState(false);
   const [clientSecret, setClientSecret] = useState("");

   const { productPrice } = currentOrder;
   console.log(currentOrder);
   useEffect(() => {
      fetch("http://localhost:5000/create-payment-intent", {
         method: "POST",
         headers: {
            "Content-Type": "application/json",
            authorization: `bearer ${localStorage.getItem("accessToken")}`,
         },
         body: JSON.stringify({ productPrice }),
      })
         .then((res) => res.json())
         .then((data) => {
            setClientSecret(data.clientSecret);
            setLoading(false);
         });
   }, [productPrice]);

   const handleSubmit = async (event) => {
      event.preventDefault();
      if (!stripe || !elements) {
         return;
      }
      const card = elements.getElement(CardElement);
      if (card == null) {
         return;
      }
      const { error } = await stripe.createPaymentMethod({
         type: "card",
         card,
      });
      if (error) {
         setCardError(error.message);
         setLoading(false);
      } else {
         setCardError("");
      }

      setProcessing(true);
      const { paymentIntent, error: confirmError } = await stripe.confirmCardPayment(clientSecret, {
         payment_method: {
            card: card,
            billing_details: {
               name: currentOrder.customerName,
               email: currentOrder.customerEmail,
            },
         },
      });
      if (confirmError) {
         setCardError(confirmError.message);
         setProcessing(false);
         return;
      }
      if (paymentIntent.status === "succeeded") {
         setProcessing(false);
         const payment = {
            transactionId: paymentIntent.id,
            customerEmail: currentOrder.customerEmail,
            price: currentOrder.productPrice,
            bookingId: currentOrder._id,
            productId: currentOrder.productId,
            sellerEmail: currentOrder.sellerEmail,
         };

         axios
            .post("http://localhost:5000/payments", payment, {
               headers: { authorization: `bearer ${localStorage.getItem("accessToken")}` },
            })
            .then((response) => {
               setCurrentOrder(null);
               toast.success("Payment Done Successfully!");
               refetch();
               console.log(response.data);
            });
      }
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
            disabled={!stripe || !clientSecret || processing}
            className="btn btn-primary btn-md mt-3 text-white"
         >
            {processing ? <SmallSpinner /> : `Pay $${currentOrder.productPrice}`}
         </button>
      </form>
   );
};

export default CheckoutForm;
