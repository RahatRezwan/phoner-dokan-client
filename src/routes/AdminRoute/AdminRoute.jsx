import React, { useContext } from "react";
import { Navigate, useLocation } from "react-router-dom";
import HomeSpinner from "../../components/HomeSpinner/HomeSpinner";
import { AuthContext } from "../../contexts/AuthProvider/AuthProvider";
import useAdmin from "../../hooks/useAdmin";

const AdminRoute = ({ children }) => {
   const { loading, user } = useContext(AuthContext);
   const [isAdmin, isAdminLoading] = useAdmin(user?.email);
   const location = useLocation();
   if (loading || isAdminLoading) {
      return <HomeSpinner />;
   }
   if (user && isAdmin) {
      return children;
   }
   return <Navigate to="/dashboard" state={{ from: location }} replace></Navigate>;
};

export default AdminRoute;
