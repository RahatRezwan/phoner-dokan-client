import React from "react";

const BlogDetails = ({ blog }) => {
   return (
      <div>
         <input type="checkbox" id="blog-details" className="modal-toggle" />
         <div className="modal">
            <div className="modal-box w-[90%] lg:w-[60%] max-w-[90%] relative">
               <label
                  htmlFor="blog-details"
                  className="btn btn-sm btn-circle absolute right-2 top-2"
               >
                  ✕
               </label>
               <div className="w-full">
                  <img src={blog.coverPhoto} alt="" className="w-full" />
                  <h1 className="text-3xl font-bold my-4">{blog.title}</h1>
                  <p className="text-lg">{blog.details}</p>
               </div>
               <div>
                  <label htmlFor="blog-details" className="btn mt-4">
                     Close
                  </label>
               </div>
            </div>
         </div>
      </div>
   );
};

export default BlogDetails;
