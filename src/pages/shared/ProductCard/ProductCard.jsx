import React from "react";
import { FaArrowRight } from "react-icons/fa";
import { BsPatchCheckFill } from "react-icons/bs";
import { Link } from "react-router-dom";

const ProductCard = ({ product, setProduct }) => {
   const { image, name, price, originalPrice, location, purchaseYear, data, sellerInfo } = product;
   const currentYear = new Date().getFullYear();
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
                  onClick={setProduct(product)}
                  htmlFor="booking-modal"
                  className="btn btn-primary"
               >
                  Book Now
               </label>
               <Link className="flex gap-2 items-center text-primary">
                  See Details <FaArrowRight />
               </Link>
            </div>
         </div>
      </div>
   );
};

export default ProductCard;
