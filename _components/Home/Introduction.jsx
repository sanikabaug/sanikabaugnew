"use client";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Milestone, SendHorizontal } from "lucide-react";
import IMAGES from '@/public';
import Link from "next/link";
import { today, getLocalTimeZone } from "@internationalized/date";
import Image from "next/image";
import { Button } from "@nextui-org/react"

const Introduction = () => {
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

  const villas = [
    {
      name: "Natural Escape",
      image: IMAGES[30],
      features: [
        "14 Bedrooms with AC, Toilet, Batroom, Shower and Geaser",
        "2 Common Toilet Bathroom",
        "Balconies",
        "Inverter for Power Backup",
        "Housekeeping Team",
        "Breafast, Lunch and Dinner incl. in the package",
        "Indoor and Outdoor games",
        "3 Gardens, Dining Hall",
        "Turf, DJ and Watercraft",
      ]
    },
    {
      name: "Swimming Pool",
      image: IMAGES[43],
      features: [
        "14 Bedrooms with AC, Toilet, Batroom, Shower and Geaser",
        "2 Common Toilet Bathroom",
        "Balconies",
        "Inverter for Power Backup",
        "Housekeeping Team",
        "Breafast, Lunch and Dinner incl. in the package",
        "Indoor and Outdoor games",
        "3 Gardens, Dining Hall",
        "Turf, DJ and Watercraft",
      ]
    },
    {
      name: "Rain Dance",
      image: IMAGES[2],
      features: [
        "14 Bedrooms with AC, Toilet, Batroom, Shower and Geaser",
        "2 Common Toilet Bathroom",
        "Balconies",
        "Inverter for Power Backup",
        "Housekeeping Team",
        "Breafast, Lunch and Dinner incl. in the package",
        "Indoor and Outdoor games",
        "3 Gardens, Dining Hall",
        "Turf, DJ and Watercraft",
      ]
    }
  ];

  return (
    <div className="w-full h-full">
      <div className="w-full h-full">
        <section className="pt-36 bg-white text-center flex flex-col">
          <div className="w-full lg:w-[90%] mx-auto px-4 z-20">
            <p className="mb-2 uppercase tracking-widest text-gray-500 font-semibold">agri tourism center & resort presents</p>
            <h2 className="font-serif text-5xl mb-12 mt-4 drop-shadow-xl">Sanika Baug in Karjat</h2>
            <div className="grid md:grid-cols-3 gap-8">
              {villas.map((villa, index) => (
                <div key={index} className="w-full flex flex-col justify-center items-center">
                  <div className="relative w-full flex justify-center items-center">
                    <div className="flex justify-center items-center text-center">
                      <img
                        src={villa.image}
                        alt={villa.name}
                        className="absolute w-full h-64 object-cover p-4 px-6 top-0 drop-shadow-md"
                      />
                    </div>
                  </div>
                  <div className=" bg-white shadow-xl overflow-hidden mt-36 w-full">
                    <div className="p-6 pt-28">
                      <h3 className="text-2xl text-gray-800 mb-4 font-serif">{villa.name}</h3>
                      <ul className="text-gray-600 text-md space-y-1">
                        {villa.features.map((feature, i) => (
                          <li key={i}>{feature}</li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="w-full h-full flex justify-end items-end">
            <div className="bg-gray-100 absolute w-full h-36 self-end justify-end z-0"></div>
          </div>
        </section>
        <div className="w-full h-full bg-gray-100 flex justify-center items-center pt-8">
          <div className="flex flex-col lg:flex-row w-full lg:w-[92%] py-32">
            <div className="w-full lg:w-[50%] px-4">
              <Image
                src={IMAGES[35]}
                alt="image"
                width={800}
                height={800}
                className="object-cover w-full h-full"
              />
            </div>
            <div className="w-full px-5 lg:px-0 lg:w-[50%]">
              <div className="w-full lg:pl-10 mt-8">
                <p className="uppercase tracking-widest">
                  About Sanika Baug
                </p>
                <p className="flex flex-col text-4xl lg:text-5xl font-serif gap-2 mt-2">
                  <span>Luxury Farmstay</span>
                  <span>in The Heart of</span>
                  <span>Karjat</span>
                </p>
                <p className="flex flex-col gap-1 mt-4">
                  <span className="leading-loose">Nestled in the scenic landscapes of Karjat, Sanika Baug is a charming farmstay offering a peaceful retreat surrounded by nature. Designed to provide comfort with a rustic touch, this tranquil escape blends traditional countryside charm with modern amenities — making it an ideal getaway for families, friends, and group retreats.</span>
                  <span className="leading-loose">Surrounded by lush greenery and breathtaking natural beauty, Sanika Baug offers a serene and private escape while being conveniently close to Karjat&apos;s popular attractions. Whether you&apos;re relaxing amidst the peaceful farm surroundings, enjoying a cozy evening with loved ones, or exploring the nearby hills and rivers, Sanika Baug ensures a memorable and rejuvenating experience.
                    Experience the perfect harmony of nature and comfort at Sanika Baug — your idyllic farmstay retreat in Karjat!</span>
                </p>
                <Button className="mt-8 rounded-none p-8 bg-gray-700 text-gray-100"><span className="py-8 uppercase">Discover More</span></Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Introduction;
