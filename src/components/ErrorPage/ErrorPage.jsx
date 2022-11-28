import React from "react";
import { Link } from "react-router-dom";
import errorImg from "../../assets/404.png";

const ErrorPage = () => {
   return (
      <div className="min-h-screen flex justify-center items-center">
         <div className="text-center">
            <img src={errorImg} alt="" className="mb-5 w-[70%] mx-auto" />
            <h1 className="text-4xl font-bold mb-5">Sorry! Something Went Wrong</h1>
            <p className="text-2xl font-bold">
               Go to{" "}
               <Link to="/" className="font-bold text-blue-600 text-xl">
                  Home Page
               </Link>
            </p>
         </div>
      </div>
   );
};

export default ErrorPage;
