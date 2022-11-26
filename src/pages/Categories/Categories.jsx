import React from "react";
import { Link, useLoaderData } from "react-router-dom";

const Categories = () => {
   const categories = useLoaderData();
   return (
      <div className="max-w-[1300px] w-[95%] mx-auto my-10">
         <h1 className="text-3xl font-bold my-5">All Brands</h1>
         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {categories.map((category) => (
               <Link
                  to={`/categories/${category._id}`}
                  key={category._id}
                  className="border rounded-lg shadow-md cursor-pointer text-center"
               >
                  <div className="w-full">
                     <img src={category.logo} alt="" className="p-4" />
                  </div>
                  <div className="pb-3">
                     <h5 className="text-2xl font-bold">{category.name}</h5>
                  </div>
               </Link>
            ))}
         </div>
      </div>
   );
};

export default Categories;
