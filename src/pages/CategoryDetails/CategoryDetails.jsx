import React, { useContext, useState } from "react";
import { Link, useLoaderData } from "react-router-dom";
import HomeSpinner from "../../components/HomeSpinner/HomeSpinner";
import BookingModal from "../../components/Modals/BookingModal";
import { AuthContext } from "../../contexts/AuthProvider/AuthProvider";
import useAdmin from "../../hooks/useAdmin";
import useSeller from "../../hooks/useSeller";

import ProductCard from "../shared/ProductCard/ProductCard";

const CategoryDetails = () => {
   const products = useLoaderData();
   const { user, loading } = useContext(AuthContext);
   const [product, setProduct] = useState(null);
   const [isAdmin, isAdminLoading] = useAdmin(user?.email);
   const [isSeller, isSellerLoading] = useSeller(user?.email);

   if (isAdminLoading || isSellerLoading || loading) {
      return <HomeSpinner />;
   }

   if (isAdmin || isSeller) {
      return (
         <div className=" my-52 flex justify-center items-center">
            <div className="text-center">
               <h1 className="text-4xl font-bold text-error capitalize">
                  Please Create a buyer account to buy or book any product
               </h1>
               <p className="text-xl font-bold mt-4">
                  Go to{" "}
                  <strong>
                     <Link to="/dashboard" className="text-blue-600 link link-hover">
                        Dashboard
                     </Link>
                  </strong>
               </p>
            </div>
         </div>
      );
   }

   return (
      <div className="max-w-[1300px] w-[95%] mx-auto my-10">
         <h3 className="text-3xl font-bold mb-4">All Products</h3>

         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-7">
            {products.map((product) => (
               <ProductCard key={product._id} product={product} setProduct={setProduct} />
            ))}
         </div>
         {product ? <BookingModal product={product} setProduct={setProduct} /> : null}
      </div>
   );
};

export default CategoryDetails;
