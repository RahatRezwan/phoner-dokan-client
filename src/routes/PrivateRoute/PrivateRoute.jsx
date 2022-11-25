import React, { useContext } from "react";
import { Navigate, useLocation } from "react-router-dom";
import HomeSpinner from "../../components/HomeSpinner/HomeSpinner";
import { AuthContext } from "../../contexts/AuthProvider/AuthProvider";

const PrivateRoute = ({ children }) => {
   const { user, loading } = useContext(AuthContext);
   const location = useLocation();

   if (loading) {
      return <HomeSpinner />;
   }

   if (user) {
      return children;
   }

   return <Navigate to="/login" state={{ from: location }} replace></Navigate>;
};

export default PrivateRoute;
