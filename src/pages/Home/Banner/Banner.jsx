import React from "react";
import banner from "../../../assets/Banner.jpg";

const Banner = () => {
   return (
      <div
         className="bg-cover bg-center bg-no-repeat h-[450px] w-full flex justify-start items-center"
         style={{
            backgroundImage: `linear-gradient(90deg, rgba(0, 0, 0, 0.96) 0%, rgba(0, 0, 0, 0.67) 48%, rgba(238, 130, 238, 0) 100%), url(${banner})`,
         }}
      >
         <div className="max-w-[1350px] w-[90%] mx-auto">
            <h1 className="text-6xl font-extrabold text-white mb-4">Buy, Sell, Wow!</h1>
            <p className="text-white text-lg font-semibold mb-4">
               Biggest online market of second hand smartphones.
            </p>
            <div className="flex gap-4">
               <button to="/categories" className="btn bg-white text-black hover:btn-primary">
                  Buy Phones
               </button>
               <button to="/login" className="btn bg-white text-black hover:btn-primary">
                  Sell Phones
               </button>
            </div>
         </div>
      </div>
   );
};

export default Banner;
