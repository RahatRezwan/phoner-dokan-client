import React, { useState } from "react";
import { useLoaderData } from "react-router-dom";
import BlogDetails from "./BlogDetails";

const Blogs = () => {
   const blogs = useLoaderData();
   const [blog, setBlog] = useState(null);
   return (
      <div className="max-w-[1300px] w-[90%] mx-auto my-24">
         <h1 className="text-3xl mb-5">All Blogs</h1>

         <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-7">
            {blogs.map((blog) => (
               <div className="card card-compact bg-base-100 shadow-xl" key={blog._id}>
                  <figure>
                     <img src={blog.coverPhoto} alt="Shoes" />
                  </figure>
                  <div className="card-body">
                     <h2 className="card-title">{blog.title}</h2>
                     <p>{blog.details.slice(0, 150) + "..."}</p>
                     <div className="card-actions">
                        <label onClick={() => setBlog(blog)} htmlFor="blog-details" className="btn">
                           Read More
                        </label>
                     </div>
                  </div>
               </div>
            ))}
         </div>
         {blog && <BlogDetails blog={blog} />}
      </div>
   );
};

export default Blogs;
