import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import BlogDetails from "../../Blogs/BlogDetails";

const HomeBlogs = () => {
   const [blogs, setBlogs] = useState([]);
   const [blog, setBlog] = useState(null);

   useEffect(() => {
      axios("http://localhost:5000/blogs?limit=4").then((response) => setBlogs(response.data));
   }, []);

   return (
      <div className="max-w-[1300px] w-[90%] mx-auto my-24">
         <div className="text-center">
            <h4 className="text-4xl font-bold uppercase mb-4">Latest Blogs</h4>
            <p className="capitalize w-[50%] mx-auto text-slate-500 mb-10">
               Check Our Latest Articles. Every week we published latest article to increase peoples
               knowledge. you can check those
            </p>
         </div>

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
         <Link to="/blogs" className="flex justify-center">
            <button className="btn my-5">See All Blogs</button>
         </Link>
         {blog && <BlogDetails blog={blog} />}
      </div>
   );
};

export default HomeBlogs;
