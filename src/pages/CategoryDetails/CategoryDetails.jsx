import React from "react";
import { useLoaderData } from "react-router-dom";

const CategoryDetails = () => {
   const products = useLoaderData();
   console.log(products);
   return (
      <div>
         <h1>All Products</h1>
      </div>
   );
};

export default CategoryDetails;
