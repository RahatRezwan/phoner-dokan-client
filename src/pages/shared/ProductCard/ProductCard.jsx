import React, { useContext } from "react";
import { FaHeart, FaBookmark } from "react-icons/fa";
import { BsPatchCheckFill } from "react-icons/bs";
import axios from "axios";
import { AuthContext } from "../../../contexts/AuthProvider/AuthProvider";
import { toast } from "react-toastify";

const ProductCard = ({ product, setProduct }) => {
   const { user } = useContext(AuthContext);
   const {
      _id,
      image,
      name,
      price,
      originalPrice,
      location,
      purchaseYear,
      data,
      sellerInfo,
      quantity,
   } = product;
   const currentYear = new Date().getFullYear();

   const handleAddWishlist = () => {
      const wishlist = {
         productId: _id,
         productImage: image,
         productName: name,
         productPrice: price,
         productQuantity: quantity,
         userEmail: user?.email,
      };
      axios
         .post(`http://localhost:5000/add-to-wishlist`, wishlist, {
            headers: { authorization: `bearer ${localStorage.getItem("accessToken")}` },
         })
         .then((response) => {
            if (response.data.acknowledged) {
               toast.success("Added to wishlist");
            }
            toast.error(response.data.message);
         });
   };

   const handleReport = () => {
      axios
         .put(`http://localhost:5000/report-product/${_id}`, {
            headers: { authorization: `bearer ${localStorage.getItem("accessToken")}` },
         })
         .then((response) => {
            console.log(response.data);
            toast.success("Reported successfully");
         });
   };

   return (
      <div className="bg-base-100 rounded-xl shadow-xl border">
         <figure className="p-5 flex justify-center items-center w-[70%] mx-auto">
            <img src={image} alt="Shoes" className="rounded-xl" />
         </figure>
         <div className="p-5">
            <h2 className="card-title mb-2">{name}</h2>
            <div className="flex gap-5 mb-2">
               <p className="font-bold text-blue-600">Resale Price: ${price}</p>
               <p className="font-bold">Original Price: ${originalPrice}</p>
            </div>
            <p className="mb-2">Location: {location}</p>
            <p className="mb-2">
               Year of use:{" "}
               {currentYear - parseInt(purchaseYear) === 0
                  ? "less than a year"
                  : currentYear - parseInt(purchaseYear)}
            </p>
            <p className="mb-2">Post Date: {data}</p>
            <div className="mb-2 flex items-center gap-1">
               <p>
                  Seller Name: <strong>{sellerInfo.name}</strong>
               </p>
               {sellerInfo.verified ? <BsPatchCheckFill className="text-blue-500" /> : null}
            </div>

            <div className="flex justify-between">
               {/* The button to open modal */}
               <label
                  onClick={() => setProduct(product)}
                  htmlFor="booking-modal"
                  disabled={!quantity}
                  className="btn btn-primary"
               >
                  {quantity ? "Book Now" : "Sold Out"}
               </label>
               <div className="flex items-center gap-5">
                  <button
                     onClick={handleAddWishlist}
                     className="tooltip tooltip-bottom"
                     disabled={!user}
                     data-tip="Add to wishlist"
                  >
                     <FaHeart className="text-xl" />
                  </button>
                  <button
                     onClick={handleReport}
                     disabled={!user}
                     className="tooltip tooltip-bottom"
                     data-tip="Report Item"
                  >
                     <FaBookmark className="text-xl" />
                  </button>
               </div>
            </div>
         </div>
      </div>
   );
};

export default ProductCard;
