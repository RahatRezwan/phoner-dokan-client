import React from "react";
import Advertisement from "../Advertisement/Advertisement";
import Banner from "../Banner/Banner";
import HomeCategory from "../HomeCategory/HomeCategory";

const Home = () => {
   return (
      <div>
         <Banner />
         <Advertisement />
         <HomeCategory />
      </div>
   );
};

export default Home;
