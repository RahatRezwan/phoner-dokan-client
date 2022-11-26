import axios from "axios";
import React from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";

const AddCategories = () => {
   const { register, handleSubmit } = useForm();

   const imgHostKey = process.env.REACT_APP_imgbb_key;

   const handleCreate = (data, event) => {
      const form = event.target;
      const logo = data.logo[0];
      const formData = new FormData();
      formData.append("image", logo);

      /* Host Image to imgBB */
      axios
         .post(`https://api.imgbb.com/1/upload?key=${imgHostKey}`, formData)
         .then((imgResponse) => {
            const category = {
               logo: imgResponse.data.data.url,
               name: data.category,
            };
            axios.post("http://localhost:5000/categories", category).then((response) => {
               if (response.data.acknowledged) {
                  toast.success("Category Created Successfully");
                  form.reset();
               }
            });
         });
   };

   return (
      <div>
         <h2 className="text-3xl mb-5">Manage Categories</h2>

         <form onSubmit={handleSubmit(handleCreate)} className="max-w-[40%]">
            <div className="form-control">
               <label className="label">
                  <span className="label-text">Category/Brand Logo</span>
               </label>
               <input type="file" {...register("logo")} />
            </div>
            <div className="form-control">
               <label className="label">
                  <span className="label-text">Category/Brand Name</span>
               </label>
               <input
                  type="text"
                  placeholder="Brand/Category Name"
                  className={`input input-bordered mb-2`}
                  {...register("category")}
               />
            </div>
            <input type="submit" className="btn btn-primary w-full" value="Create" />
         </form>
      </div>
   );
};

export default AddCategories;
