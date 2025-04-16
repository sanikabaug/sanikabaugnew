"use client";
import React, { useState } from "react";
import { Button, Divider } from "@nextui-org/react";
import { siteConfig } from "@/config/siteConfig";
import { Link } from "@nextui-org/link";

import { usePathname } from "next/navigation";

import { today, getLocalTimeZone } from "@internationalized/date";
import { Facebook,
  Instagram } from "lucide-react";

export default function Footer() {
  const pathname = usePathname();

  let defaultDate = today(getLocalTimeZone());
  const nextDay = defaultDate.add({ days: 1 });

  const formatDateee = (date) => {
    const day = String(date.day).padStart(2, "0");
    const month = String(date.month).padStart(2, "0");
    const year = String(date.year);
    return `${day}-${month}-${year}`;
  };

  const [checkindate, setCheckindate] = useState(formatDateee(defaultDate));
  const [checkoutdate, setCheckoutdate] = useState(formatDateee(nextDay));

  const itemClasses = {
    base: "w-full",
    title: "text-base xl:text-2xl text-black/60",
    trigger:
      "px-2 py-0 data-[hover=true]:bg-primary-100 rounded-lg h-14 2xl:h-20 flex items-center",
    indicator: "text-small xl:text-large text-black/60",
    content: "text-small xl:text-medium px-2",
  };

  const getCurrentDate = () => {
    const date = new Date();
    const day = String(date.getDate()).padStart(2, "0");
    const month = String(date.getMonth() + 1).padStart(2, "0"); // Months are zero-indexed
    const year = date.getFullYear();

    return `${day}-${month}-${year}`;
  };

  const currentDate = getCurrentDate();
  const hotelName = "Ocean's Pearl Resort";

  const addOneDay = (dateString) => {
    const [day, month, year] = dateString.split("-").map(Number);
    const date = new Date(year, month - 1, day);
    date.setDate(date.getDate() + 1);
    return formatDate(date);
  };

  // Function to format the date as "DD-MM-YYYY"
  const formatDate = (date) => {
    const day = String(date.getDate()).padStart(2, "0");
    const month = String(date.getMonth() + 1).padStart(2, "0"); // Months are 0-based
    const year = date.getFullYear();
    return `${day}-${month}-${year}`;
  };

  const checkoutDate = addOneDay(currentDate);

  return (
    <footer className="bg-[#1f2033] text-white pt-16">
    <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-4 gap-10">
      {/* Contact Info */}
      <div>
        <h3 className="text-xl  mb-4 font-serif">Contact Us</h3>
        <p className="text-sm mb-2">
          <span className="font-bold">Add:</span> At.bendesa, post, Posri road, tal, Tiware, Karjat, Maharashtra 410201
        </p>
        <p className="text-sm mb-2">
          <span className="font-bold">Email:</span> sanikabag1701@gmail.com
        </p>
        <p className="text-sm mb-4">
          <span className="font-bold">Phone:</span> +91 82374 16879
        </p>
        <div className="flex space-x-4">
          <a href="#" className="hover:text-[#c47a5a]"><Facebook /></a>
          <a href="#" className="hover:text-[#c47a5a]"><Instagram /></a>
        </div>
      </div>

      {/* Links */}
      <div>
        <h3 className="text-xl  mb-4 font-serif">Links</h3>
        <ul className="space-y-2 text-sm">
          <li><a href="#" className="hover:text-[#c47a5a]">About Us</a></li>
          <li><a href="#" className="hover:text-[#c47a5a]">Gallery</a></li>
          <li><a href="#" className="hover:text-[#c47a5a]">Villas</a></li>
          <li><a href="#" className="hover:text-[#c47a5a]">Contact Us</a></li>
        </ul>
      </div>

      {/* Booking Hours */}
      <div>
        <h3 className="text-xl  mb-4 font-serif">Booking Hours</h3>
        <p className="text-sm">Mon – Sun: 10:00 AM – 07:00 PM</p>
      </div>

      {/* Newsletter */}
      <div>
        <h3 className="text-xl  mb-4 font-serif">Newsletter</h3>
        <form className="flex">
          <input
            type="email"
            placeholder="Email address"
            className="w-full px-4 py-2 text-sm bg-transparent border border-gray-500 placeholder:text-gray-400 focus:outline-none"
          />
          <button
            type="submit"
            className="bg-[#c47a5a] text-white  px-6 py-2 text-sm"
          >
            SUBSCRIBE
          </button>
        </form>
      </div>
    </div>

    {/* Bottom Footer */}
    <div className="border-t border-gray-700 mt-10 py-4 text-center text-sm text-gray-400 px-6">
      Copyright 2025 by <span className="text-white">Prospera Hospitality Pvt. Ltd.</span>. All Right Reserved.
    </div>

    
  </footer>
  );
}