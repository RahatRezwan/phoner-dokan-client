import React from "react";
import Advertisement from "../Advertisement/Advertisement";
import Banner from "../Banner/Banner";
import HomeBlogs from "../HomeBlogs/HomeBlogs";
import HomeCategory from "../HomeCategory/HomeCategory";

const Home = () => {
   return (
      <div>
         <Banner />
         <Advertisement />
         <HomeCategory />
         <HomeBlogs />
      </div>
   );
};

export default Home;
