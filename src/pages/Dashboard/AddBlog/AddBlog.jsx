import axios from "axios";
import React from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";

const AddBlog = () => {
   const { register, handleSubmit } = useForm();

   const imgHostKey = process.env.REACT_APP_imgbb_key;

   const handleCreate = (data, event) => {
      const form = event.target;
      const coverPhoto = data.coverPhoto[0];
      const formData = new FormData();
      formData.append("image", coverPhoto);

      /* Host Image to imgBB */
      axios
         .post(`https://api.imgbb.com/1/upload?key=${imgHostKey}`, formData)
         .then((imgResponse) => {
            const blog = {
               coverPhoto: imgResponse.data.data.url,
               title: data.title,
               details: data.details,
            };
            axios
               .post("https://phoner-dokan-server.vercel.app/blogs", blog, {
                  headers: { authorization: `bearer ${localStorage.getItem("accessToken")}` },
               })
               .then((response) => {
                  if (response.data.acknowledged) {
                     toast.success("Blog Created Successfully");
                     form.reset();
                  }
               });
         });
   };
   return (
      <div>
         <h2 className="text-3xl mb-5">Create Blog</h2>

         <form onSubmit={handleSubmit(handleCreate)} className="max-w-[40%] border rounded-xl p-4">
            <div className="form-control">
               <label className="label">
                  <span className="label-text">Cover</span>
               </label>
               <input type="file" {...register("coverPhoto")} />
            </div>
            <div className="form-control">
               <label className="label">
                  <span className="label-text">Title</span>
               </label>
               <input
                  type="text"
                  placeholder="Title"
                  className={`input input-bordered mb-2`}
                  {...register("title")}
               />
            </div>
            <div className="form-control">
               <label className="label">
                  <span className="label-text">Details</span>
               </label>
               <textarea
                  {...register("details")}
                  className="textarea textarea-bordered"
                  placeholder="Details"
               ></textarea>
            </div>
            <input type="submit" className="btn btn-primary w-full mt-3" value="Create Blog" />
         </form>
      </div>
   );
};

export default AddBlog;
