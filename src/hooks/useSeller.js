import axios from "axios";
import { useEffect, useState } from "react";

const useSeller = (email) => {
   const [isSeller, setIsSeller] = useState(false);
   const [isSellerLoading, setIsSellerLoading] = useState(true);
   useEffect(() => {
      if (email) {
         axios(`http://localhost:5000/users/seller/${email}`, {
            headers: { authorization: `bearer ${localStorage.getItem("accessToken")}` },
         }).then((response) => {
            setIsSeller(response.data.isSeller);
            setIsSellerLoading(false);
         });
      }
   }, [email]);
   return [isSeller, isSellerLoading];
};

export default useSeller;
