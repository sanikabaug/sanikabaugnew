"use client";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Milestone, SendHorizontal } from "lucide-react";
import IMAGES from '@/public';
import Link from "next/link";
import { today, getLocalTimeZone } from "@internationalized/date";

const AboutUs = () => {
  const [scrollY, setScrollY] = useState(0);

  const handleScroll = () => {
    setScrollY(window.scrollY);
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);


  let defaultDate = today(getLocalTimeZone());
  const nextDay = defaultDate.add({ days: 1 });

  const formatDate = (date) => {
    const day = String(date.day).padStart(2, "0");
    const month = String(date.month).padStart(2, "0");
    const year = String(date.year);
    return `${day}-${month}-${year}`;
  };

  const [checkindate, setCheckindate] = useState(formatDate(defaultDate));
  const [checkoutdate, setCheckoutdate] = useState(formatDate(nextDay));

  // Set a maximum value for the Y axis movement (e.g., 100 pixels)
  const maxY = 100;

  // Add maxY to restrict how far the card can move
  const limitY = (animateY) => Math.min(Math.max(animateY, -maxY), maxY);

  return (
    <div className="flex flex-col gap-20 py-32">
      <div className="h-full  w-[90%] mx-auto flex justify-center items-center flex-col lg:flex-row gap-5 ">
        <div className="flex flex-col w-full lg:w-[50%] justify-center h-full items-center gap-2 ">
          <p className="flex justify-start w-full text-[#333333] text-lg tracking-widest leading-relaxed font-semibold uppercase"
           
          >
            About Sanika Baug
          </p>
          <div className="flex justify-start w-full ">
            <div className="text-2xl lg:text-6xl text-black font-serif lg:block hidden">
              <p>Serene Farmstay</p>
              <p>in The Heart of</p>
              <p>Karjat</p>
            </div>
            <div className="text-3xl lg:text-6xl text-black font-serif lg:hidden block">
              <p>Serene Farmstay in The Heart of Karjat</p>
            </div>
          </div>
          <div className="flex flex-col gap-0">

            <p className="mt-6 text-justify text-gray-800 leading-relaxed space-y-8">
            Tucked away in the scenic charm of Karjat, Sanika Baug Farmstay offers a luxurious escape infused with rustic tranquility and modern comfort. Designed for families, couples, and group retreats, this lush haven is where nature meets elegance.
            </p>
            <p className=" text-justify text-gray-800 leading-relaxed space-y-8">
            Surrounded by vibrant greenery, open lawns, and the soothing sounds of nature, Sanika Baug is more than just a place to stay—it&apos;s an experience. Whether you&apos;re unwinding in the gazebo, taking a dip in the pool, or simply enjoying the peaceful atmosphere, every corner of this farmstay invites relaxation.

Reconnect with nature, celebrate special moments, or just take a break from the city—Sanika Baug Farmstay is your perfect countryside getaway in Karjat.
            </p>

              <button className="bg-gray-800 text-gray-100 px-6  py-3 rounded-full flex-1 font-semibold mt-16 w-36" onClick={(e) => window.location.href='/contactus'}>
                Book Now
              </button>
      


          </div>
        </div>


        <div className="lg:flex w-full lg:w-[50%] h-full  justify-center items-center relative mt-24 lg:my-0 hidden">
          <div className="flex justify-center items-center h-full w-full translate-x-2 lg:translate-x-16 z-10 mx-auto">
            <motion.div
              className="w-full h-full  text-white flex items-center justify-center "
              initial={{ y: 0 }}
              animate={{ y: limitY(-scrollY / 20) }}
              transition={{ type: "spring", stiffness: 100, damping: 20 }}
            >
              <img
                src={IMAGES[81]}
                alt="abc"
                className="w-full h-full object-contain shadow-xl"
              />
            </motion.div>
          </div>
          <div className="flex justify-center items-center h-full w-full -translate-x-2 lg:translate-x-12 z-20 mx-auto mt-72">
            <motion.div
              className="w-80 h-full  text-white flex items-center justify-center "
              initial={{ y: 0 }}
              animate={{ y: limitY(scrollY / 30) }}
              transition={{ type: "spring", stiffness: 100, damping: 20 }}
            >
              <img
                src={IMAGES[80]}
                alt="xyz"
                className="w-72 h-72 object-contain "
              />
            </motion.div>
          </div>
        </div>

        <div className="flex w-full lg:w-[50%] h-full  justify-center items-center relative mt-24 lg:my-0 lg:hidden">
          <div className="flex justify-center items-center h-full w-full translate-x-2 lg:translate-x-16 z-10 mx-auto">
            <motion.div
              className="w-full h-full  text-white flex items-center justify-center "
              initial={{ y: 0 }}
              animate={{ y: limitY(-scrollY / 20) }}
              transition={{ type: "spring", stiffness: 100, damping: 20 }}
            >
              <img
                src={IMAGES[81]}
                alt="abc"
                className="w-full h-full object-contain shadow-xl"
              />
            </motion.div>
          </div>
          <div className="flex justify-center items-center h-full w-full -translate-x-2 lg:-translate-x-16 z-20 mx-auto">
            <motion.div
              className="w-full h-full  text-white flex items-center justify-center "
              initial={{ y: 0 }}
              animate={{ y: limitY(scrollY / 30) }}
              transition={{ type: "spring", stiffness: 100, damping: 20 }}
            >
              <img
                src={IMAGES[80]}
                alt="xyz"
                className="w-full h-full object-contain shadow-xl"
              />
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutUs;
