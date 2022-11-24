import React from "react";
import { ImSpinner9 } from "react-icons/im";

const HomeSpinner = () => {
   return (
      <div className="my-16 w-full flex justify-center items-center">
         <ImSpinner9 className="text-6xl w-24 h-24 animate-spin" />
      </div>
   );
};

export default HomeSpinner;
