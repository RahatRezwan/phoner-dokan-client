import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { AuthContext } from "../../../contexts/AuthProvider/AuthProvider";

const AddProduct = () => {
   const { user } = useContext(AuthContext);
   const { register, handleSubmit } = useForm();
   const [categories, setCategories] = useState([]);
   const [currentSeller, setCurrentSeller] = useState(null);
   const imgHostKey = process.env.REACT_APP_imgbb_key;

   /* get current user */
   useEffect(() => {
      if (user) {
         axios(`http://localhost:5000/users/seller/${user?.email}`, {
            headers: { authorization: `bearer ${localStorage.getItem("accessToken")}` },
         }).then((response) => {
            setCurrentSeller(response.data.seller);
         });
      }
   }, [user, user?.email]);

   /* get all categories */
   useEffect(() => {
      axios("http://localhost:5000/categories").then((response) => setCategories(response.data));
   }, []);

   const handleAddProduct = (data, event) => {
      const form = event.target;
      console.log(data);
      const image = data.productImage[0];
      const formData = new FormData();
      formData.append("image", image);

      /* Host Image to imgBB */
      axios
         .post(`https://api.imgbb.com/1/upload?key=${imgHostKey}`, formData)
         .then((imgResponse) => {
            const product = {
               image: imgResponse.data.data.url,
               name: data.name,
               condition: data.condition,
               price: data.price,
               purchaseYear: data.purchaseYear,
               location: data.location,
               contact: data.mobile,
               details: data.description,
               category: data.category,
               quantity: 1,
               data: new Date(),
               sellerId: currentSeller._id,
               sellerName: currentSeller.name,
               sellerEmail: currentSeller.email,
            };
            axios
               .post("http://localhost:5000/products", product, {
                  headers: { authorization: `bearer ${localStorage.getItem("accessToken")}` },
               })
               .then((response) => {
                  if (response.data.acknowledged) {
                     toast.success("Product Added Successfully");
                     form.reset();
                  }
               });
         });
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
