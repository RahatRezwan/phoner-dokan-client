import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const FooterCategory = () => {
   const [categories, setCategories] = useState([]);

   useEffect(() => {
      axios("https://phoner-dokan-server.vercel.app/categories?limit=4").then((response) =>
         setCategories(response.data),
      );
   }, []);
   return (
      <>
         {categories.map((category) => (
            <Link to={`/category/${category._id}`} key={category._id} className="link link-hover">
               {category.name}
            </Link>
         ))}
      </>
   );
};

export default FooterCategory;
