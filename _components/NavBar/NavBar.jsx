"use client";
import IMAGES from "@/public";
import { Button } from "@nextui-org/react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React, { useState, useEffect } from "react";
import {
  Menu, X, ChevronUp, ChevronDown, Facebook,
  Instagram
} from "lucide-react";
import { motion } from "framer-motion";
import { Phone, Mail } from "lucide-react";
import { today, getLocalTimeZone } from "@internationalized/date";
import { Spinner } from "@nextui-org/react";
import { useDispatch } from "react-redux";
import { handleLocateUsFxn, handleTouristSpotsFxn, handlePartnersClickFxn, handleRajdhaniRestaurantFxn } from "@/app/redux/slices/navSlice";

const NavBar = () => {
  const dispatch = useDispatch();
  let defaultDate = today(getLocalTimeZone());
  const nextDay = defaultDate.add({ days: 1 });

  const pathname = usePathname();

  const lastPart = pathname.split('/').filter(Boolean).pop();

  const [isLoading, setIsLoading] = useState(true);

  const formatDate = (date) => {
    const day = String(date.day).padStart(2, "0");
    const month = String(date.month).padStart(2, "0");
    const year = String(date.year);
    return `${day}-${month}-${year}`;
  };

  const [checkindate, setCheckindate] = useState(formatDate(defaultDate));
  const [checkoutdate, setCheckoutdate] = useState(formatDate(nextDay));
  const [roomsData, setRoomsData] = useState([]);
  const [activeDropdown, setActiveDropdown] = useState(null);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeMobileDropdown, setActiveMobileDropdown] = useState(null);

  const formatRoomNameToUrl = (roomName) => {
    return roomName.toLowerCase().replace(/\s+/g, "-").replace(/[^a-z0-9\-]/g, "");
  };

  const sublinks = roomsData.map((item) => ({
    name: item.room_name,
    url: `/rooms/${formatRoomNameToUrl(item.room_name)}`,
  }));



  const links = [
    { name: "Home", url: "/" },
    { name: "About", url: "/aboutus" },
    { name: "Gallery", url: "/gallery" },
    { name: "Testimonials", url: "/testimonials" },
    { name: "Blogs", url: "/blog" },
    { name: "Contact", url: "/contact" },
  ];

  const handleMouseEnter = (index) => setActiveDropdown(index);
  const handleMouseLeave = () => setActiveDropdown(null);

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  const toggleMobileDropdown = (index) => {
    setActiveMobileDropdown((prev) => (prev === index ? null : index));
  };

  const isLinkActive = (link) => {
    if (link.sublinks) {
      return link.sublinks.some((sublink) => pathname === sublink.url);
    }
    return pathname === link.url;
  };

  const handleLinkClick = () => {
    setIsMenuOpen(false);
  };

  const initialFxn = async () => {
    try {
      const response = await fetch(`/api/admin/property_master/room_details?hotelId=123456`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
      const result = await response.json();

      const allRoomInform = result.dataAllActive;

      setRoomsData(allRoomInform);
    } catch (error) {
      console.log("Abc::::::::::>", error);
    } finally {
      setIsLoading(false)
    }
  };

  useEffect(() => {
    initialFxn();
  }, []);

  const handleLocateus = () => {
    dispatch(handleLocateUsFxn(true))
  }

  const handleTouristSpot = () => {
    dispatch(handleTouristSpotsFxn(true))
  }

  const handleRajdhaniRestaurant = () => {
    dispatch(handleRajdhaniRestaurantFxn(true))
  }

  const handlePartnersClick = () => {
    dispatch(handlePartnersClickFxn(true))
  }

  useEffect(() => {
    if (isMenuOpen) {
      document.body.classList.add('overflow-hidden');
    } else {
      document.body.classList.remove('overflow-hidden');
    }

    return () => {
      document.body.classList.remove('overflow-hidden');
    };
  }, [isMenuOpen]);

  return (
    <div className="h-auto lg:sticky top-0 bg-white z-50 border-b shadow-md">

      <div className="hidden lg:block">
        <div className="w-[95%] mx-auto py-4 flex justify-between items-center">
          <div
            onClick={() => (window.location.href = '/')}
            className="flex items-center cursor-pointer"
          >
            <img
              src={IMAGES.mainLogo}
              alt="hotelrajdhanilogo"
              className="w-40 lg:w-60 h-16 object-contain"
            />
          </div>


          <div className="hidden lg:flex space-x-6">
            {links.map((link, index) => {

              if (link.name === "Companies Corporate Stays") {

                return (
                  <div
                    key={index}
                    className="relative"
                    onMouseEnter={() => handleMouseEnter(index)}
                    onMouseLeave={handleMouseLeave}
                  >
                    <div
                      onClick={() => (window.location.href = link.url || "#")}
                      className={`p-2 ${isLinkActive(link)
                        ? "text-black font-bold"
                        : "text-gray-500 hover:text-black cursor-pointer"
                        }`}
                    >
                      {link.name}
                    </div>

                    {link.sublinks && activeDropdown === index && (
                      <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="absolute w-[300px] h-[275px] overflow-y-auto left-0 bg-white shadow-md px-3 rounded-md"
                      >
                        {(
                          link.sublinks.map((sublink, subIndex) => (
                            <div
                              key={subIndex}
                              onClick={() => handlePartnersClick()}
                              className="flex items-center p-2 text-gray-500 hover:text-black cursor-pointer gap-2"
                            >
                              <img
                                src={sublink.logo}
                                alt={sublink.name}
                                className="w-12 h-12 rounded-full object-fill border border-gray-300"
                              />
                              <p className="text-gray-600 hover:text-black font-medium">{sublink.name}</p>
                            </div>
                          ))
                        )}
                      </motion.div>
                    )}
                  </div>
                )

              } else {

                return (
                  <div
                    key={index}
                    className="relative"
                    onMouseEnter={() => handleMouseEnter(index)}
                    onMouseLeave={handleMouseLeave}
                  >
                    <div
                      onClick={() => (window.location.href = link.url || "#")}
                      className={`p-2 ${isLinkActive(link)
                        ? "text-black font-bold"
                        : "text-gray-500 hover:text-black cursor-pointer"
                        }`}
                    >
                      {link.name}
                    </div>

                    {link.sublinks && activeDropdown === index && (
                      <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="absolute w-[270px] left-0 bg-white shadow-md px-3 rounded-md"
                      >
                        {isLoading ? (
                          <div className="flex justify-center items-center h-32">
                            <Spinner size="lg" color="danger" />
                          </div>
                        ) : (
                          link.sublinks.map((sublink, subIndex) => (
                            <div
                              key={subIndex}
                              onClick={() => (window.location.href = sublink.url)}
                              className="block p-2 text-gray-500 hover:text-black cursor-pointer"
                            >
                              {sublink.name}
                            </div>
                          ))
                        )}
                      </motion.div>
                    )}
                  </div>
                )
              }
            }
            )}
          </div>



          {/* Book Now Button */}
          <Link
            href={`/filterpage?checkindate=${checkindate}&checkoutdate=${checkoutdate}&adultsSelect=1&childSelect=0`}
            className="hidden lg:flex"
          >
            <Button
              className="bg-gray-600 text-gray-100 font-semibold px-8 rounded-none"
            >
              Book Your Stay
            </Button>
          </Link>
        </div>
      </div>

      <div className="block lg:hidden">
        <div className="w-[95%] mx-auto py-4 grid grid-cols-12 justify-center items-center">
          {/* Logo */}
          <div
            onClick={() => (window.location.href = '/')}
            className="flex items-start col-span-11 place-content-start cursor-pointer"
          >
            <img
              src={IMAGES.mainLogo}
              alt="sanikalogo"
              className="w-28 h-auto object-contain"
            />
          </div>

          {/* Hamburger icon */}
          <div className="self-center text-center z-50">
            <button onClick={toggleMenu} className="text-black text-2xl">
              {isMenuOpen ? <X /> : <Menu />}
            </button>
          </div>

          {/* Mobile Menu */}
          {isMenuOpen && (
            <div className="lg:hidden fixed top-0 left-0 w-full h-[100vh] bg-slate-200 z-40 flex flex-col space-y-4 p-6 overflow-y-auto">
              {/* Logo inside mobile menu */}
              <div
                onClick={() => (window.location.href = '/')}
                className="flex items-start cursor-pointer"
              >
                <img
                  src={IMAGES.mainLogo}
                  alt="sanikalogo"
                  className="w-32 h-auto object-contain"
                />
              </div>

              {/* Navigation Links */}
              <div className="h-96 w-full flex flex-col justify-center items-start uppercase">
                {links.map((link, index) => {
                  if (link.name === "Companies Corporate Stays") return null;

                  return (
                    <div key={index} className="relative w-full">
                      {link.sublinks ? (
                        <button
                          onClick={() => toggleMobileDropdown(index)}
                          className="flex justify-between w-full p-2 text-gray-500 hover:text-black"
                        >
                          {link.name}
                          {activeMobileDropdown === index ? <ChevronUp /> : <ChevronDown />}
                        </button>
                      ) : (
                        <a
                          href="#"
                          onClick={(e) => {
                            e.preventDefault();
                            window.location.href = link.url;
                          }}
                          className="block px-2 py-3 text-gray-500 hover:text-black w-full"
                        >
                          {link.name}
                        </a>
                      )}

                      {/* Dropdown Sublinks */}
                      {link.sublinks && activeMobileDropdown === index && (
                        <div className="flex flex-col max-h-[217px] mt-2 bg-gray-100 rounded-xl py-2 overflow-y-auto">
                          {isLoading ? (
                            <div className="flex justify-center items-center h-32">
                              <Spinner size="lg" color="danger" />
                            </div>
                          ) : (
                            link.sublinks.map((sublink, subIndex) => (
                              <a
                                key={subIndex}
                                href="#"
                                onClick={(e) => {
                                  e.preventDefault();
                                  window.location.href = sublink.url;
                                }}
                                className="block p-2 pl-4 text-gray-500 hover:text-black"
                              >
                                {sublink.name}
                              </a>
                            ))
                          )}
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>

              {/* Social Icons */}
              <div className="flex space-x-4 w-full justify-center items-center">
                <a href="#" className="hover:text-[#c47a5a]">
                  <Facebook />
                </a>
                <a href="#" className="hover:text-[#c47a5a]">
                  <Instagram />
                </a>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default NavBar;
