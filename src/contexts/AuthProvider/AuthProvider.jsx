import React, { createContext, useEffect, useState } from "react";
import app from "../../firebase/firebase.config";
import {
   createUserWithEmailAndPassword,
   getAuth,
   onAuthStateChanged,
   signInWithEmailAndPassword,
   signOut,
   updateProfile,
} from "firebase/auth";

export const AuthContext = createContext();
const auth = getAuth(app);

const AuthProvider = ({ children }) => {
   const [user, setUser] = useState(null);
   const [loading, setLoading] = useState(true);
   const [homeSpinner, setHomeSpinner] = useState(false);

   /* Create a new user */
   const createAUser = (email, password) => {
      setLoading(true);
      return createUserWithEmailAndPassword(auth, email, password);
   };

   /* Sign in a user */
   const loginAUser = (email, password) => {
      setLoading(true);
      return signInWithEmailAndPassword(auth, email, password);
   };

   /* update a user profile */
   const updateAUser = (name, photoURL) => {
      setLoading(true);
      return updateProfile(auth.currentUser, {
         displayName: name,
         photoURL: photoURL,
      });
   };

   /* Log out a user */
   const logoutAUser = () => {
      setLoading(true);
      return signOut(auth);
   };
   /* get current user */
   useEffect(() => {
      const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
         setUser(currentUser);
         setLoading(false);
         console.log("current user: ", currentUser);
      });
      return () => unsubscribe();
   }, []);

   const authInfo = {
      user,
      loading,
      setLoading,
      createAUser,
      loginAUser,
      updateAUser,
      logoutAUser,
      homeSpinner,
      setHomeSpinner,
   };
   return <AuthContext.Provider value={authInfo}>{children}</AuthContext.Provider>;
};

export default AuthProvider;
