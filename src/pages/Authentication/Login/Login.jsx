import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
const Login = () => {
   const {
      register,
      handleSubmit,
      formState: { errors },
   } = useForm();

   const [loginError, setLoginError] = useState("");

   const handleLogin = (data) => {
      setLoginError("");
      console.log(data);
   };
   return (
      <div className="w-[85%] md:w-[50%] xl:w-[30%] mx-auto border border-primary rounded-md p-7 my-16">
         <h1 className="text-4xl mb-4 text-center font-bold">Login</h1>
         <form onSubmit={handleSubmit(handleLogin)} className="">
            <div className="form-control">
               <label className="label">
                  <span className="label-text">Email</span>
               </label>
               <input
                  type="email"
                  placeholder="Email"
                  className={`input input-bordered ${errors?.email && "input-error"}`}
                  {...register("email", { required: "Valid email is required" })}
               />
               <p className="text-red-500">{errors.email?.message}</p>
            </div>

            <div className="form-control">
               <label className="label">
                  <span className="label-text">Password</span>
               </label>
               <input
                  type="password"
                  placeholder="Password"
                  className={`input input-bordered ${errors?.password && "input-error"}`}
                  {...register("password", { required: "Password is required" })}
               />
               <p className="text-red-500">{errors.password?.message}</p>
            </div>
            <div className="form-control mt-6"></div>
            {loginError && <p className="text-red-500 font-semibold">{loginError}</p>}
            <input type="submit" className="btn btn-primary w-full" value="Login" />
         </form>
         <p className="text-center my-3">
            New to this website?{" "}
            <Link to={"/register"} className="text-primary">
               Register
            </Link>
         </p>
         <div className="divider">OR</div>
         <button className="btn btn-outline btn-primary w-full">Login with google</button>
      </div>
   );
};

export default Login;
