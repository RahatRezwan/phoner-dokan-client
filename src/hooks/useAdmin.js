import axios from "axios";
import { useEffect, useState } from "react";

const useAdmin = (email) => {
   const [isAdmin, setIsAdmin] = useState(false);
   const [isAdminLoading, setIsAdminLoading] = useState(true);
   useEffect(() => {
      if (email) {
         axios(`http://localhost:5000/users/admin/${email}`).then((response) => {
            setIsAdmin(response.data.isAdmin);
            setIsAdminLoading(false);
         });
      }
   }, [email]);
   return [isAdmin, isAdminLoading];
};

export default useAdmin;
