import React from "react";
import { Link } from "react-router-dom";
import logo from "../../logo.png";
const Footer = () => {
   return (
      <div className="bg-gray-100">
         <footer className="footer p-10 text-base-content max-w-[1300px] w-[90%] mx-auto">
            <div>
               <img src={logo} alt="" className="w-[250px] mb-2" />
               <p>2022 © Phoner Dokan</p>
            </div>
            <div>
               <span className="footer-title">Categories</span>
               <Link className="link link-hover">Apple</Link>
               <Link className="link link-hover">Samsung</Link>
               <Link className="link link-hover">Xiaomi</Link>
               <Link className="link link-hover">Oneplus</Link>
            </div>
            <div>
               <span className="footer-title">Company</span>
               <Link className="link link-hover">About us</Link>
               <Link className="link link-hover">Contact</Link>
               <Link className="link link-hover">Jobs</Link>
               <Link className="link link-hover">Press kit</Link>
            </div>
            <div>
               <span className="footer-title">Legal</span>
               <Link className="link link-hover">Terms of use</Link>
               <Link className="link link-hover">Privacy policy</Link>
               <Link className="link link-hover">Cookie policy</Link>
            </div>
         </footer>
      </div>
   );
};

export default Footer;
