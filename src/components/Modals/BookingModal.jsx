import axios from "axios";
import React, { useContext, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { AuthContext } from "../../contexts/AuthProvider/AuthProvider";
import SmallSpinner from "../SmallSpinner/SmallSpinner";

const BookingModal = ({ product, setProduct }) => {
   const { register, handleSubmit } = useForm();
   const { user } = useContext(AuthContext);
   const { _id, name, image, price, location, sellerEmail, quantity } = product;
   const [loader, setLoader] = useState(false);

   const handleBooking = (data, event) => {
      const form = event.target;
      setLoader(true);
      const item = {
         productId: _id,
         productName: name,
         productQuantity: quantity,
         productImage: image,
         productPrice: price,
         customerName: user.displayName,
         customerEmail: user.email,
         customerPhone: data.phoneNumber,
         sellerEmail,
         location: data.location,
         bookedDate: new Date(),
      };
      axios
         .post("https://phoner-dokan-server.vercel.app/bookItem", item, {
            headers: { authorization: `bearer ${localStorage.getItem("accessToken")}` },
         })
         .then((response) => {
            if (response.data.acknowledged) {
               toast.success("Product Booked Successfully");
               setLoader(false);
               form.reset();
               setProduct(null);
            }
            toast.error(response.data.message);
            setLoader(false);
            form.reset();
            setProduct(null);
         });
   };

   return (
      <div>
         <input type="checkbox" id="booking-modal" className="modal-toggle" />
         <div className="modal">
            <div className="modal-box relative">
               <label
                  htmlFor="booking-modal"
                  className="btn btn-primary btn-sm btn-circle absolute right-2 top-2"
               >
                  ✕
               </label>
               <h3 className="text-lg font-bold">Book {name}</h3>

               <form onSubmit={handleSubmit(handleBooking)} className="">
                  <div className="form-control">
                     <label className="label">
                        <span className="label-text">Customer Name</span>
                     </label>
                     <input
                        type="text"
                        className="input input-bordered"
                        disabled
                        defaultValue={user?.displayName}
                        {...register("userName")}
                     />
                  </div>

                  <div className="form-control">
                     <label className="label">
                        <span className="label-text">Customer Email</span>
                     </label>
                     <input
                        type="text"
                        className="input input-bordered"
                        disabled
                        defaultValue={user?.email}
                        {...register("userEmail")}
                     />
                  </div>

                  <div className="form-control">
                     <label className="label">
                        <span className="label-text">Item Name</span>
                     </label>
                     <input
                        type="text"
                        className="input input-bordered"
                        disabled
                        defaultValue={name}
                        {...register("itemName")}
                     />
                  </div>

                  <div className="form-control">
                     <label className="label">
                        <span className="label-text">Item Price</span>
                     </label>
                     <input
                        type="text"
                        className="input input-bordered"
                        disabled
                        defaultValue={price}
                        {...register("itemPrice")}
                     />
                  </div>

                  <div className="form-control">
                     <label className="label">
                        <span className="label-text">Phone Number</span>
                     </label>
                     <input
                        type="text"
                        placeholder="Phone Number"
                        className="input input-bordered"
                        {...register("phoneNumber")}
                     />
                  </div>

                  <div className="form-control">
                     <label className="label">
                        <span className="label-text">Meeting Location</span>
                     </label>
                     <input
                        type="text"
                        placeholder="Location"
                        defaultValue={location}
                        className="input input-bordered"
                        {...register("location")}
                     />
                  </div>

                  <button type="submit" className="btn btn-primary w-full mt-2">
                     {loader ? <SmallSpinner /> : "Book Now"}
                  </button>
               </form>
            </div>
         </div>
      </div>
   );
};

export default BookingModal;
