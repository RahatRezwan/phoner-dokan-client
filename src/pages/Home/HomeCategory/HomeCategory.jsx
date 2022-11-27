import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const HomeCategory = () => {
   const [categories, setCategories] = useState([]);

   useEffect(() => {
      axios("http://localhost:5000/categories?limit=4").then((response) =>
         setCategories(response.data),
      );
   }, []);

   return (
      <div className="max-w-[1200px] w-[90%] mx-auto text-center my-16">
         <h4 className="text-4xl font-bold uppercase mb-4">Brands</h4>
         <p className="capitalize w-[50%] mx-auto text-slate-500 mb-10">
            There are more than 20 smartphone brands out there. We've selected almost all them. You
            can choose your favorite brand and buy your favorite phone.
         </p>
         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {categories.map((category) => (
               <Link
                  to={`/category/${category._id}`}
                  key={category._id}
                  className="border rounded-lg shadow-md cursor-pointer"
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
         <Link to="/categories">
            <button className="btn my-5">See All Brands</button>
         </Link>
      </div>
   );
};

export default HomeCategory;
