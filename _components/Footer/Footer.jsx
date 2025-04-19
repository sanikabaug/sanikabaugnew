"use client";
import React, { useState } from "react";
import { Button, Divider } from "@nextui-org/react";
import { siteConfig } from "@/config/siteConfig";
import Link from 'next/link';

import { usePathname } from "next/navigation";

import { today, getLocalTimeZone } from "@internationalized/date";
import {
  Facebook,
  Instagram
} from "lucide-react";

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
            <span className="font-bold">Phone:</span> +91 70831 66888
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
            <li><a href="/aboutus" className="hover:text-[#c47a5a]">About Us</a></li>
            <li><a href="/gallery" className="hover:text-[#c47a5a]">Gallery</a></li>
            <li><a href="/testimonials" className="hover:text-[#c47a5a]">Testimonials</a></li>
            <li><Link href="/blog" className="">
              <span>Blog</span>
            </Link></li>
            <li><a href="/contactus" className="hover:text-[#c47a5a]">Contact Us</a></li>
          </ul>
        </div>

        {/* Booking Hours */}
        <div>
          <h3 className="text-xl  mb-4 font-serif">Booking Hours</h3>
          <p className="text-sm">Mon – Sun: 12:00 AM – 11:59 PM</p>
        </div>

        {/* Newsletter */}
        <div>
          <h3 className="text-xl  mb-4 font-serif">Map</h3>
          <div>
            <iframe
              title="Sanika Baug Map"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d943.4127593488273!2d73.33927972620255!3d18.946834205848546!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3be7fb8e775a93c1%3A0x58b38e567d801307!2sSanika%20Baug!5e0!3m2!1sen!2sin!4v1744714682230!5m2!1sen!2sin"
              width="100%"
              height="200"
              style={{ border: 0 }}
              allowFullScreen=""
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              className="shadow-lg"
            ></iframe>
          </div>
        </div>
      </div>

      {/* Bottom Footer */}
      <div className="border-t border-gray-700 mt-10 py-4 text-center text-sm text-gray-400 px-6">
        Copyright 2025 by <span className="text-white">Prospera Hospitality Pvt. Ltd.</span>. All Right Reserved.
      </div>


    </footer>
  );
}