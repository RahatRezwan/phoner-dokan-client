import React from "react";
import { Link } from "react-router-dom";
import logo from "../../logo.png";
import FooterCategory from "./FooterCategory";
const Footer = () => {
   return (
      <div className="bg-gray-100">
         <footer className="footer p-10 text-base-content max-w-[1300px] w-[90%] mx-auto">
            <div>
               <Link to="/">
                  <img src={logo} alt="" className="w-[250px] mb-2" />
               </Link>
               <p>2022 © Phoner Dokan</p>
            </div>
            <div>
               <span className="footer-title">Categories</span>
               <FooterCategory />
            </div>
            <div>
               <span className="footer-title">Admin</span>
               <Link to="/dashboard/manage-sellers" className="link link-hover">
                  Manage Seller
               </Link>
               <Link to="/dashboard/add-blog" className="link link-hover">
                  Add Blog
               </Link>
               <Link to="/dashboard/add-categories" className="link link-hover">
                  Add Categories
               </Link>
               <Link to="/dashboard/reported-items" className="link link-hover">
                  Reported Items
               </Link>
            </div>
            <div>
               <span className="footer-title">Seller</span>
               <Link to="/dashboard/add-product" className="link link-hover">
                  Add a Product
               </Link>
               <Link to="/dashboard/my-products" className="link link-hover">
                  My Products
               </Link>
            </div>
         </footer>
      </div>
   );
};

export default Footer;
