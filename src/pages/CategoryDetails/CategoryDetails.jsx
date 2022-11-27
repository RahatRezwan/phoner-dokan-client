import React, { useState } from "react";
import { useLoaderData } from "react-router-dom";
import BookingModal from "../../components/Modals/BookingModal";

import ProductCard from "../shared/ProductCard/ProductCard";

const CategoryDetails = () => {
   const products = useLoaderData();
   const [product, setProduct] = useState(null);

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
