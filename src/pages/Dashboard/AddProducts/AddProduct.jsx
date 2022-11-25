import axios from "axios";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";

const AddProduct = () => {
   const { register, handleSubmit } = useForm();
   const [categories, setCategories] = useState([]);

   useEffect(() => {
      axios("http://localhost:5000/categories").then((response) => setCategories(response.data));
   }, []);

   const handleAddProduct = (data, event) => {
      const form = event.target;
   };
   return (
      <div className="max-w-[80%] mx-auto">
         <h2 className="text-3xl mb-4">Add New Product</h2>

         <form onSubmit={handleSubmit(handleAddProduct)} className=" border rounded-lg p-4">
            <div className="form-control">
               <label className="label">
                  <span className="label-text text-md font-semibold">Product Image</span>
               </label>
               <input type="file" {...register("productImage")} className="mb-2" />
            </div>

            <div className="grid gird-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 items-start w-full">
               <div className="form-control">
                  <label className="label">
                     <span className="label-text text-md font-semibold">Product Model Name</span>
                  </label>
                  <input
                     type="text"
                     placeholder="Product Model Name"
                     className={`input input-bordered mb-2`}
                     {...register("name")}
                  />
               </div>

               <div className="form-control">
                  <label className="label">
                     <span className="label-text text-md font-semibold">Price</span>
                  </label>
                  <input
                     type="text"
                     placeholder="Product Price"
                     className={`input input-bordered mb-2`}
                     {...register("price")}
                  />
               </div>

               <div className="form-control">
                  <label className="label">
                     <span className="label-text text-md font-semibold">Year of purchase</span>
                  </label>
                  <input
                     type="text"
                     placeholder="Purchase Year"
                     className={`input input-bordered mb-2`}
                     {...register("purchaseYear")}
                  />
               </div>
            </div>
            <div className="grid gird-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5 items-start w-full">
               <div className="form-control">
                  <label className="label">
                     <span className="label-text text-md font-semibold">Product Condition</span>
                  </label>
                  <select
                     defaultValue="Excellent"
                     className="select select-bordered w-full mb-2"
                     {...register("condition")}
                  >
                     <option>Excellent</option>
                     <option>Good</option>
                     <option>Fair</option>
                  </select>
               </div>

               <div className="form-control">
                  <label className="label">
                     <span className="label-text text-md font-semibold">Category/Brand Name</span>
                  </label>
                  <select className="select select-bordered w-full mb-2" {...register("category")}>
                     {categories.map((category) => (
                        <option key={category._id}>{category.name}</option>
                     ))}
                  </select>
               </div>

               <div className="form-control">
                  <label className="label">
                     <span className="label-text text-md font-semibold">Mobile Number</span>
                  </label>
                  <input
                     type="text"
                     placeholder="Mobile Number"
                     className={`input input-bordered mb-2`}
                     {...register("mobile")}
                  />
               </div>

               <div className="form-control">
                  <label className="label">
                     <span className="label-text text-md font-semibold">Location</span>
                  </label>
                  <input
                     type="text"
                     placeholder="Location"
                     className={`input input-bordered mb-2`}
                     {...register("location")}
                  />
               </div>
            </div>

            <div className="form-control">
               <label className="label">
                  <span className="label-text text-md font-semibold">Product Description</span>
               </label>
               <textarea
                  className="textarea textarea-bordered mb-2 w-full"
                  placeholder="Product Details"
                  {...register("description")}
               ></textarea>
            </div>

            <input type="submit" className="btn btn-primary w-full" value="Add Product" />
         </form>
      </div>
   );
};

export default AddProduct;
