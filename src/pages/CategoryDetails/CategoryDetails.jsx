import React from "react";
import { Link, useLoaderData } from "react-router-dom";
import { FaArrowRight } from "react-icons/fa";
import { BsPatchCheckFill } from "react-icons/bs";

const CategoryDetails = () => {
   const products = useLoaderData();
   console.log(products);
   const currentYear = new Date().getFullYear();
   return (
      <div className="max-w-[1300px] w-[95%] mx-auto my-10">
         <h3 className="text-3xl font-bold mb-4">All Products</h3>

         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-7">
            {products.map((product) => (
               <div className="bg-base-100 rounded-xl shadow-xl border">
                  <figure className="p-5 flex justify-center items-center w-[70%] mx-auto">
                     <img src={product.image} alt="Shoes" className="rounded-xl" />
                  </figure>
                  <div className="p-5">
                     <h2 className="card-title mb-2">{product.name}</h2>
                     <div className="flex gap-5 mb-2">
                        <p className="font-bold text-blue-600">Resale Price: ${product.price}</p>
                        <p className="font-bold">Original Price: ${product.originalPrice}</p>
                     </div>
                     <p className="mb-2">Location: {product.location}</p>
                     <p className="mb-2">
                        Year of use:{" "}
                        {currentYear - parseInt(product.purchaseYear) === 0
                           ? "less than a year"
                           : currentYear - parseInt(product.purchaseYear)}
                     </p>
                     <p className="mb-2">Post Date: {product.data}</p>
                     <div className="mb-2 flex items-center gap-1">
                        <p>
                           Seller Name: <strong>{product.sellerInfo.name}</strong>
                        </p>
                        {product.sellerInfo.verified ? (
                           <BsPatchCheckFill className="text-blue-500" />
                        ) : null}
                     </div>

                     <div className="flex justify-between">
                        <button className="btn btn-primary">Book Now</button>
                        <Link className="flex gap-2 items-center text-primary">
                           See Details <FaArrowRight />
                        </Link>
                     </div>
                  </div>
               </div>
            ))}
         </div>
      </div>
   );
};

export default CategoryDetails;
