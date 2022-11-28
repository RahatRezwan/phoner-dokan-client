import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import SmallSpinner from "../../components/SmallSpinner/SmallSpinner";
import { AuthContext } from "../../contexts/AuthProvider/AuthProvider";
import useToken from "../../hooks/useToken";

const SocialLogin = () => {
   const { googleLogin, setHomeSpinner, user } = useContext(AuthContext);
   const [loader, setLoader] = useState(false);

   const navigate = useNavigate();
   const location = useLocation();
   const from = location.state?.from?.pathname || "/";

   const [token] = useToken(user?.email);

   useEffect(() => {
      if (token) {
         toast.success("Login successfully");
         navigate(from, { replace: true });
      }
   }, [from, navigate, token]);

   const handleGoogleLogin = () => {
      setLoader(true);
      googleLogin()
         .then((result) => {
            setHomeSpinner(true);
            const googleUser = result.user;
            const newUser = {
               profilePic: googleUser?.displayImage,
               name: googleUser.displayName,
               email: googleUser.email,
               role: "Buyer",
            };
            const userEmail = googleUser.email;
            console.log(userEmail);
            axios.post("https://phoner-dokan-server.vercel.app/users", newUser).then((response) => {
               setLoader(false);
               setHomeSpinner(false);
            });
         })
         .catch((error) => console.log(error));
   };

   return (
      <>
         <div className="divider">OR</div>
         <button onClick={handleGoogleLogin} className="btn btn-outline btn-primary w-full">
            {loader ? <SmallSpinner /> : "Login with google"}
         </button>
      </>
   );
};

export default SocialLogin;
