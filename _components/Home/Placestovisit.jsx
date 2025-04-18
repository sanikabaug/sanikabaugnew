"use client";
import React, { useState } from "react";
import { Button } from "@nextui-org/react";
import { PhoneForwarded } from "lucide-react";
import IMAGES from '@/public';
import Image from "next/image";
import { Clock, MapPin } from "lucide-react";
import { Dish } from "./icons";

const Placestovisit = () => {

  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    message: '',
    termsAccepted: false,
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Submitted data:', formData);

    let sendEmail = async (formData) => {
      const payload = {
        operation: "sendcontactmail",
        formData: formData,
      }

      const emailresponse = await fetch(`/api/send-email`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload)
      });
      const emailresult = await emailresponse.json();

      alert("Request sent successfully!")

    }

    sendEmail(formData)
    setFormData({
      name: '',
      email: '',
      phone: '',
      message: ''
    })
  };


  return (
    <section className="bg-[#fdf7f4] px-4 lg:px-6  py-32  relative overflow-hidden">
      <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-16 items-center relative z-10">
        {/* Left Side */}
        <div className="flex flex-col justify-start items-start w-full h-full">
          <p className="text-[#c47a5a] uppercase tracking-[0.2em] font-semibold mb-4">Contact Us</p>
          <div className="text-[#1e1e2f] text-4xl md:text-5xl font-serif  flex flex-col gap-1">
            <p>If You Wish To</p>
            <p>Learn More Ask Before</p>
            <p>Booking.</p>
          </div>
        </div>

        {/* Right Side - Form */}
        <div className="bg-white p-10 rounded-lg shadow-md relative z-20">
          <form className="space-y-6" onSubmit={handleSubmit}>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Your Name"
              className="w-full border-b border-gray-300 focus:outline-none py-2 placeholder:text-gray-500"
            />
            <input
              type="tel"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              placeholder="Phone"
              className="w-full border-b border-gray-300 focus:outline-none py-2 placeholder:text-gray-500"
            />
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Your Email"
              className="w-full border-b border-gray-300 focus:outline-none py-2 placeholder:text-gray-500"
            />
            <textarea
              name="message"
              value={formData.message}
              onChange={handleChange}
              placeholder="Message"
              className="w-full border-b border-gray-300 focus:outline-none py-2 placeholder:text-gray-500 resize-none"
              rows="4"
            ></textarea>

            <div className="flex items-center space-x-2">
              <input
                type="checkbox"
                name="termsAccepted"
                checked={formData.termsAccepted}
                onChange={handleChange}
                id="terms"
                className="accent-[#c47a5a]"
              />
              <label htmlFor="terms" className="text-sm text-gray-600">
                I agree to the terms & conditions
              </label>
            </div>

            <button
              type="submit"
              className="bg-gray-700 hover:bg-gray-600 text-white font-semibold py-3 px-8 rounded-md transition-all duration-300"
            >
              SUBMIT NOW
            </button>
          </form>
        </div>
      </div>

      {/* Dotted background behind form */}
      <div className="absolute right-[42%] bottom-[6%] z-0 hidden md:block rounded-full">
        <div className="w-40 h-40 bg-[radial-gradient(circle,#c47a5a_2px,transparent_2px)] bg-[length:12px_12px] opacity-20 rounded-full"></div>
      </div>
    </section>
  );
};

export default Placestovisit;