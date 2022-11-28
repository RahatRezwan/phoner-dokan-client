import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import React, { useContext, useState } from "react";
import SmallSpinner from "../../../components/SmallSpinner/SmallSpinner";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import BookingModal from "../../../components/Modals/BookingModal";
import { AuthContext } from "../../../contexts/AuthProvider/AuthProvider";
import useAdmin from "../../../hooks/useAdmin";
import useSeller from "../../../hooks/useSeller";

const Advertisement = () => {
   const { user } = useContext(AuthContext);
   const [isAdmin] = useAdmin(user?.email);
   const [isSeller] = useSeller(user?.email);
   const [product, setProduct] = useState(null);
   const { data: advertisements = [], isLoading } = useQuery({
      queryKey: ["advertisements"],
      queryFn: () =>
         axios("https://phoner-dokan-server.vercel.app/advertisedProducts").then(
            (response) => response.data,
         ),
   });

   if (isLoading) {
      return <SmallSpinner />;
   }
   if (!advertisements.length) {
      return;
   }

   return (
      <div className="max-w-[1200px] w-[95%] mx-auto my-5">
         <h4 className="text-xl font-bold text-center mb-5">Advertisement</h4>
         <Swiper
            spaceBetween={30}
            slidesPerView={1}
            autoplay={{
               delay: 2000,
               disableOnInteraction: false,
               pauseOnMouseEnter: true,
            }}
            breakpoints={{
               640: {
                  slidesPerView: 1,
                  spaceBetween: 10,
               },
               768: {
                  slidesPerView: 2,
                  spaceBetween: 20,
               },
               1024: {
                  slidesPerView: 3,
                  spaceBetween: 30,
               },
            }}
            centeredSlides={true}
            loop={true}
            modules={[Autoplay]}
         >
            {advertisements.map((advertisement, index) => (
               <SwiperSlide key={advertisement._id + index}>
                  <div className="flex items-center justify-between p-5 border rounded-md shadow-md bg-white">
                     <div className="flex items-center">
                        <div className="w-24 h-24">
                           <img src={advertisement.image} alt="" />
                        </div>
                        <div>
                           <h3 className="text-sm md:text-md font-bold">{advertisement.name}</h3>
                           <p className="text-xs md:text-sm font-bold text-error">
                              Price: ${advertisement.price}
                           </p>
                        </div>
                     </div>
                     <div>
                        <label
                           onClick={() => setProduct(advertisement)}
                           htmlFor="booking-modal"
                           disabled={!user || isAdmin || isSeller}
                           className="btn btn-primary btn-xs tooltip tooltip-top"
                           data-tip={
                              isAdmin || isSeller ? "Please Use Buyer Account" : "Book this product"
                           }
                        >
                           Book Now
                        </label>
                     </div>
                  </div>
               </SwiperSlide>
            ))}
         </Swiper>
         {product ? <BookingModal product={product} setProduct={setProduct} /> : null}
      </div>
   );
};

export default Advertisement;
