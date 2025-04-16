'use client'
import React, { useRef, useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/free-mode';
import 'swiper/css/navigation';
import 'swiper/css/thumbs';
import '@/app/styles/rooms.css';
import { FreeMode, Navigation, Thumbs } from 'swiper/modules';
import { CalendarRange, Search } from "lucide-react"
import Daterangepickerreact from "@/_components/Home/Daterangepickerreact"
import { PiUsersLight } from "react-icons/pi";
import RoomsAndGuests from '@/_components/Home/RoomsAndGuests'
import { Button, Card, CardHeader, CardBody, CardFooter } from '@nextui-org/react'
import { today, getLocalTimeZone } from "@internationalized/date";
import { AlarmClockCheck, Moon, BedDouble, CircleArrowRight, Clock, MapPin, Plane, IndianRupee, Wifi, Cctv, Droplets, CircleParking, Dish, GlassWater, UsersRound } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";


const SelectMonth = () => {
    let defaultDate = today(getLocalTimeZone());
    const nextDay = defaultDate.add({ days: 1 });

    console.log("Dates::::::::>", defaultDate, nextDay)

    const formatDate = (date) => {
        const day = String(date.day).padStart(2, "0");
        const month = String(date.month).padStart(2, "0");
        const year = String(date.year);
        return `${day}-${month}-${year}`;
    };

    const [searchedDate, setSearchedDate] = useState(formatDate(defaultDate));
    const [checkoutdate, setCheckoutdate] = useState(formatDate(nextDay));

    const [selectedDateRange, setSelectedDateRange] = useState(null);

    // const searchedDate = "25-11-2024";
    // const checkoutdate = "26-11-2024";

    const differenceInDays = (date1, date2) => (new Date(date2.split('-').reverse().join('-')) - new Date(date1.split('-').reverse().join('-'))) / (1000 * 3600 * 24);
    const [initialDate, setInitialDate] = useState(
        differenceInDays(searchedDate, checkoutdate)
    );

    const handleDateSelect = (val) => {

        setSelectedDateRange(val);
    };

    return (
        <div className="w-full rounded-xl shadow-xl bg-rose-50 border flex flex-col gap-5 h-[21rem] overflow-hidden">
            <div className="flex flex-col gap-2 w-full h-full">
                {/* Optional Header */}
                {/* <h2 className="text-base font-semibold">Tour Packages:</h2> */}

                <div className="w-full h-full lg:h-[60vh] flex flex-col lg:flex-col gap-5 hide-scrollbar">
                    <div className="flex flex-col gap-5 w-full">
                        <div className="my-4 w-full max-w-[35rem]">
                            <div className="flex flex-col w-full h-full gap-4 items-start m-auto text-black transition-all duration-200 ease-in-out">
                                <div className="flex flex-col w-full p-6 bg-rose-50 rounded-xl gap-6 backdrop-blur-sm">
                                    {/* Check-In Check-Out Section */}
                                    <div className="flex flex-col w-full gap-4">
                                        <p className="flex items-center justify-center gap-2 text-lg font-semibold">
                                            <CalendarRange className="size-8" />
                                            Check In - Check Out
                                        </p>
                                        <Daterangepickerreact
                                            className=""
                                            initialDate={initialDate}
                                            onDateValue={handleDateSelect}
                                            checkindate={searchedDate}
                                        />
                                    </div>

                                    {/* Guests Section */}
                                    <div className="flex flex-col lg:flex-row items-center justify-center w-full gap-6">
                                        <div className="w-full">
                                            <p className="flex items-center justify-center gap-2 text-lg font-semibold">
                                                <PiUsersLight className="size-8" />
                                                Guests
                                            </p>
                                            <RoomsAndGuests
                                                adultsSelectParam="2"
                                                childSelectParam="2"
                                                roomsSelectParam="2"
                                            />
                                        </div>
                                    </div>

                                    {/* Button Section */}
                                    <div className="flex items-center justify-center w-full">
                                        <Button
                                            isIconOnly
                                            size="lg"
                                            onClick={(e) => searchAction()}
                                            className="w-full p-4 bg-[#800000] hover:bg-red-700 transition-all duration-200 text-white rounded-lg flex items-center justify-center gap-2"
                                        >
                                            <Search className="text-white" />
                                            <span className="text-white">Check Availability</span>
                                        </Button>
                                    </div>
                                </div>
                            </div>







                        </div>


                    </div>
                </div>
            </div>
        </div>
    );
};

const Facilities = ({ roomservices }) => {
    return (
        <div className="flex justify-center items-center">
            <div className="w-[95%]">
                <div className="flex flex-col items-start justify-center gap-8">
                    <div className="text-3xl font-semibold">Room Services</div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 w-full mt-4">
                        {roomservices?.map((item, index) => (
                            <Card className="w-full h-full p-4" key={item.id || index}>
                                <div className="flex flex-col items-center justify-center gap-2 text-center">
                                    {item.icon}
                                    <div className="text-xl">{item.name}</div>
                                </div>
                            </Card>
                        ))}
                        {/* <Card className="w-full h-full p-4">
                            <div className="flex flex-col items-center justify-center gap-2 text-center">
                                <Wifi className="size-7" />
                                <div className="text-xl">Wifi</div>
                            </div>
                        </Card>
                        <Card className="w-full h-full p-4">
                            <div className="flex flex-col items-center justify-center gap-2 text-center">
                                <Cctv className="size-7" />
                                <div className="text-xl">CCTV Cameras</div>
                            </div>
                        </Card>
                        <Card className="w-full h-full p-4">
                            <div className="flex flex-col items-center justify-center gap-2 text-center">
                                <Droplets className="size-7" />
                                <div className="text-xl">Hot & Cold Water</div>
                            </div>
                        </Card>
                        <Card className="w-full h-full p-4">
                            <div className="flex flex-col items-center justify-center gap-2 text-center">
                                <CircleParking className="size-7" />
                                <div className="text-xl">Parking</div>
                            </div>
                        </Card>
                        <Card className="w-full h-full p-4">
                            <div className="flex flex-col items-center justify-center gap-2 text-center">
                                <GlassWater className="size-7" />
                                <div className="text-xl">Mineral Water</div>
                            </div>
                        </Card>
                        <Card className="w-full h-full p-4">
                            <div className="flex flex-col items-center justify-center gap-2 text-center">
                                <svg xmlns="http://www.w3.org/2000/svg" width="3em" height="3em" viewBox="0 0 640 512"><path fill="currentColor" d="M256 64H64C28.7 64 0 92.7 0 128v256c0 35.3 28.7 64 64 64h192zm32 384h288c35.3 0 64-28.7 64-64V128c0-35.3-28.7-64-64-64H288zM64 160c0-17.7 14.3-32 32-32h64c17.7 0 32 14.3 32 32v192c0 17.7-14.3 32-32 32H96c-17.7 0-32-14.3-32-32z"></path></svg>
                                <div className="text-xl">Extra Mattresses</div>
                            </div>
                        </Card> */}
                    </div>
                </div>
            </div>
        </div>
    )
}

const SimilarRooms = ({ similarrooms }) => {
    const [thumbsSwiper, setThumbsSwiper] = useState(null);

    return (
        <div className="flex justify-center items-center">
            <div className="w-[95%]">
                <div className="text-3xl mb-8 font-semibold">Similar Rooms</div>
                <Swiper
                    style={{
                        '--swiper-navigation-color': '#fff',
                        '--swiper-pagination-color': '#fff',
                    }}
                    loop={true}
                    spaceBetween={20}
                    slidesPerView={4}
                    navigation={true}
                    thumbs={{ swiper: thumbsSwiper }}
                    modules={[Navigation, Thumbs]}
                    className="mySwiper3"
                >
                    {similarrooms.map((item, index) => (
                        <SwiperSlide key={item.id || index}>
                            <Card className="min-h-[12rem] flex flex-col justify-between">
                                <div>
                                    <img
                                        src="https://swiperjs.com/demos/images/nature-1.jpg"
                                        className="w-full rounded-lg object-cover"
                                        alt="Room"
                                    />
                                </div>
                                <div className="p-2 flex flex-col text-start ">
                                    <div className="text-lg font-semibold">
                                        {item.roomname}
                                    </div>
                                    <div className="flex flex-col text-gray-600 text-wrap justify-end text-end items-end">
                                        <div className="text-sm">Starts from </div>
                                        <div className="inline-flex text-lg font-semibold">
                                            <IndianRupee /> {item.price} per night
                                        </div>
                                    </div>
                                </div>
                            </Card>
                        </SwiperSlide>
                    ))}

                    {/* <SwiperSlide>
                        <Card className="min-h-[12rem] flex flex-col justify-between">
                            <div>
                                <img
                                    src="https://swiperjs.com/demos/images/nature-1.jpg"
                                    className="w-full rounded-lg object-cover"
                                    alt="Room"
                                />
                            </div>
                            <div className="p-2 flex flex-col text-start ">
                                <div className="text-lg font-semibold">
                                    Double Bed Non AC Room
                                </div>
                                <div className="flex flex-col text-gray-600 text-wrap justify-end text-end items-end">
                                    <div className='text-sm'>Starts from </div>
                                    <div className='inline-flex text-lg font-semibold'><IndianRupee /> 1,299 per night</div>
                                </div>
                            </div>
                        </Card>
                    </SwiperSlide>
                    <SwiperSlide>
                        <Card className="min-h-[12rem] flex flex-col justify-between">
                            <div>
                                <img
                                    src="https://swiperjs.com/demos/images/nature-1.jpg"
                                    className="w-full rounded-lg object-cover"
                                    alt="Room"
                                />
                            </div>
                            <div className="p-2 flex flex-col text-start ">
                                <div className="text-lg font-semibold">
                                    Double Bed Non AC Room
                                </div>
                                <div className="flex flex-col text-gray-600 text-wrap justify-end text-end items-end">
                                    <div className='text-sm'>Starts from </div>
                                    <div className='inline-flex text-lg font-semibold'><IndianRupee /> 1,299 per night</div>
                                </div>
                            </div>
                        </Card>
                    </SwiperSlide>
                    <SwiperSlide>
                        <Card className="min-h-[12rem] flex flex-col justify-between">
                            <div>
                                <img
                                    src="https://swiperjs.com/demos/images/nature-1.jpg"
                                    className="w-full rounded-lg object-cover"
                                    alt="Room"
                                />
                            </div>
                            <div className="p-2 flex flex-col text-start ">
                                <div className="text-lg font-semibold">
                                    Double Bed Non AC Room
                                </div>
                                <div className="flex flex-col text-gray-600 text-wrap justify-end text-end items-end">
                                    <div className='text-sm'>Starts from </div>
                                    <div className='inline-flex text-lg font-semibold'><IndianRupee /> 1,299 per night</div>
                                </div>
                            </div>
                        </Card>
                    </SwiperSlide>
                    <SwiperSlide>
                        <Card className="min-h-[12rem] flex flex-col justify-between">
                            <div>
                                <img
                                    src="https://swiperjs.com/demos/images/nature-1.jpg"
                                    className="w-full rounded-lg object-cover"
                                    alt="Room"
                                />
                            </div>
                            <div className="p-2 flex flex-col text-start ">
                                <div className="text-lg font-semibold">
                                    Double Bed Non AC Room
                                </div>
                                <div className="flex flex-col text-gray-600 text-wrap justify-end text-end items-end">
                                    <div className='text-sm'>Starts from </div>
                                    <div className='inline-flex text-lg font-semibold'><IndianRupee /> 1,299 per night</div>
                                </div>
                            </div>
                        </Card>
                    </SwiperSlide> */}
                </Swiper>
            </div>
        </div>
    );
};


const BookingProcess = () => {
    const sectionVariants = {
        hidden: { opacity: 0, y: 30 },
        visible: {
            opacity: 1,
            y: 0,
            transition: { duration: 1, ease: "easeInOut" },
        },
    };

    const bookingProcess = [
        {
            id: "1",
            title: "Search & Select",
            description:
                "Use our search bar to explore available rooms. Filter by location, room type, and price, then select your favorite option from our curated listings.",
        },
        {
            id: "2",
            title: "Enter Details",
            description:
                "Provide the necessary booking details, including guest information, stay duration, and any special requests, in our easy-to-use booking form.",
        },
        {
            id: "3",
            title: "Safe Checkout",
            // description:
            //     "Review your selection and proceed to checkout. Complete your booking securely using your preferred payment method, such as credit/debit cards or UPI.",
            description:
                "Review your selection and submit your booking request. Our team will contact you to confirm the details and arrange for payment securely.",
        },
        {
            id: "4",
            title: "Confirmation",
            description:
                "Receive an instant confirmation email with your booking details. Get ready for a comfortable and hassle-free stay.",
        },
    ];

    return (
        <div className="flex justify-center items-center">
            <div className="w-[95%]">

                <div className="flex flex-col gap-16 justify-center items-center">
                    <h2 className="flex font-semibold text-3xl text-start self-start w-[95%]">
                        Booking Process
                    </h2>

                    <motion.div
                        key="booking-process-motion"
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: false }}
                        variants={sectionVariants}
                        className="grid grid-cols-1 lg:grid-cols-4 w-full lg:border-x-0 border-y-0"
                    >
                        <div className="border-y lg:border-y-0 lg:border-x lg:border-l-0 relative px-5 py-10">
                            <div className="flex flex-col gap-8">
                                <h2 className="text-xl text-center font-semibold text-gray-600">
                                    SEARCH & SELECT <span className="text-7xl text-themeColor">1</span>
                                </h2>
                                <p className="px-5 text-gray-500 text-center lg:text-start">
                                    Use our search bar to explore available rooms. Filter by location, room type, and price, then select your favorite option from our curated listings.
                                </p>
                            </div>
                            <div
                                className={`absolute w-8 h-8 transform rotate-45 bg-red-700 
                lg:top-[40%] left-[40%] md:left-[45%] lg:left-auto lg:right-0 translate-x-1/2  lg:translate-x-[55%] 
                bottom-0  translate-y-1/2 z-10 `}
                            ></div>
                            <div
                                className={`absolute w-8 h-8 transform rotate-45 bg-white 
                lg:top-[40%] left-[40%] md:left-[45%] lg:left-auto lg:right-0 translate-x-1/2  lg:translate-x-[30%] 
                bottom-0  translate-y-[30%] lg:translate-y-1/2 z-10 `}
                            ></div>
                        </div>
                        <div className="border-y lg:border-y-0 lg:border-x relative px-5 py-10">
                            <div className="flex flex-col gap-8">
                                <h2 className="text-xl text-center font-semibold text-gray-600">
                                    ENTER DETAILS <span className="text-7xl text-themeColor">2</span>
                                </h2>
                                <p className="px-5 text-gray-500 text-center lg:text-start">
                                    Provide the necessary booking details, including guest information, stay duration, and any special requests, in our easy-to-use booking form.
                                </p>
                            </div>
                            <div
                                className={`absolute w-8 h-8 transform rotate-45 bg-red-700 
                lg:top-[40%] left-[40%] md:left-[45%] lg:left-auto lg:right-0 translate-x-1/2  lg:translate-x-[55%] 
                bottom-0  translate-y-1/2 z-10`}
                            ></div>
                            <div
                                className={`absolute w-8 h-8 transform rotate-45 bg-white 
                lg:top-[40%] left-[40%] md:left-[45%] lg:left-auto lg:right-0 translate-x-1/2  lg:translate-x-[30%] 
                bottom-0  translate-y-[30%] lg:translate-y-1/2 z-10`}
                            ></div>
                        </div>
                        <div className="border-y lg:border-y-0 lg:border-x relative px-5 py-10">
                            <div className="flex flex-col gap-8">
                                <h2 className="text-xl text-center font-semibold text-gray-600">
                                    SAFE CHECKOUT <span className="text-7xl text-themeColor">3</span>
                                </h2>
                                <p className="px-5 text-gray-500 text-center lg:text-start">
                                    Review your selection and submit your booking request. Our team will contact you to confirm the details and arrange for payment securely.
                                </p>
                            </div>
                            <div
                                className={`absolute w-8 h-8 transform rotate-45 bg-red-700 
                lg:top-[40%] left-[40%] md:left-[45%] lg:left-auto lg:right-0 translate-x-1/2  lg:translate-x-[55%] 
                bottom-0  translate-y-1/2 z-10`}
                            ></div>
                            <div
                                className={`absolute w-8 h-8 transform rotate-45 bg-white 
                lg:top-[40%] left-[40%] md:left-[45%] lg:left-auto lg:right-0 translate-x-1/2  lg:translate-x-[30%] 
                bottom-0  translate-y-[30%] lg:translate-y-1/2 z-10`}
                            ></div>
                        </div>
                        <div className="border-y lg:border-y-0 lg:border-x lg:border-r-0 relative px-5 py-10 w-[106%]">
                            <div className="flex flex-col gap-8">
                                <h2 className="text-xl text-center font-semibold text-gray-600">
                                    CONFIRMATION <span className="text-7xl text-themeColor">4</span>
                                </h2>
                                <p className="px-5 text-gray-500 text-center lg:text-start">
                                    Receive an instant confirmation email with your booking details. Get ready for a comfortable and hassle-free stay.
                                </p>
                            </div>
                        </div>
                    </motion.div>
                </div>

            </div>
        </div>

    );
}



const RoomsTemplate = (props) => {

    const [thumbsSwiper, setThumbsSwiper] = useState(null);

    const roomDetails = props.content;

    return (
        <div className='w-full'>
            <div className="w-full flex flex-row justify-center items-center h-[10rem] bg-rose-50 mb-16">
                <div className='w-[80%] flex flex-col justify-center items-center'>
                    <div className=" px-8 font-semibold text-4xl w-full">
                        {roomDetails.roomname}
                    </div>
                    <div className=" px-8 pt-4 text-md w-full">
                        Home / Rooms / {roomDetails.roomname}
                    </div>
                </div>
                <div className='flex flex-col w-[20%]'>
                    <div className='flex gap-2'>
                        <div className='flex justify-end text-end self-end'>starts from</div>
                        <div className='text-3xl inline-flex  font-bold text-gray-600'><IndianRupee className='flex justify-center text-center self-center' />{roomDetails.price}</div>
                    </div>
                    <div className='flex w-[65%] justify-end '>per night</div>
                </div>
            </div>

            <div className='w-full grid grid-cols-12 gap-2'>
                <div className='col-span-9'>
                    <Swiper
                        style={{
                            '--swiper-navigation-color': '#fff',
                            '--swiper-pagination-color': '#fff',
                        }}
                        loop={true}
                        spaceBetween={10}
                        navigation={true}
                        thumbs={{ swiper: thumbsSwiper }}
                        modules={[FreeMode, Navigation, Thumbs]}
                        className="mySwiper2"
                    >
                        <SwiperSlide>
                            <img src={roomDetails.images.room1} />
                        </SwiperSlide>
                        <SwiperSlide>
                            <img src={roomDetails.images.room2} />
                        </SwiperSlide>
                        <SwiperSlide>
                            <img src={roomDetails.images.room1} />
                        </SwiperSlide>
                        <SwiperSlide>
                            <img src={roomDetails.images.room1} />
                        </SwiperSlide>
                        <SwiperSlide>
                            <img src="https://swiperjs.com/demos/images/nature-5.jpg" />
                        </SwiperSlide>
                        <SwiperSlide>
                            <img src="https://swiperjs.com/demos/images/nature-6.jpg" />
                        </SwiperSlide>
                        <SwiperSlide>
                            <img src="https://swiperjs.com/demos/images/nature-7.jpg" />
                        </SwiperSlide>
                        <SwiperSlide>
                            <img src="https://swiperjs.com/demos/images/nature-8.jpg" />
                        </SwiperSlide>
                        <SwiperSlide>
                            <img src="https://swiperjs.com/demos/images/nature-9.jpg" />
                        </SwiperSlide>
                        <SwiperSlide>
                            <img src="https://swiperjs.com/demos/images/nature-10.jpg" />
                        </SwiperSlide>
                    </Swiper>
                    <Swiper
                        onSwiper={setThumbsSwiper}
                        loop={true}
                        spaceBetween={10}
                        slidesPerView={4}
                        freeMode={true}
                        watchSlidesProgress={true}
                        modules={[FreeMode, Navigation, Thumbs]}
                        className="mySwiper"
                    >
                        <SwiperSlide>
                            <img src="https://swiperjs.com/demos/images/nature-1.jpg" className='rounded-lg' />
                        </SwiperSlide>
                        <SwiperSlide>
                            <img src="https://swiperjs.com/demos/images/nature-2.jpg" className='rounded-lg' />
                        </SwiperSlide>
                        <SwiperSlide>
                            <img src="https://swiperjs.com/demos/images/nature-3.jpg" className='rounded-lg' />
                        </SwiperSlide>
                        <SwiperSlide>
                            <img src="https://swiperjs.com/demos/images/nature-4.jpg" className='rounded-lg' />
                        </SwiperSlide>
                        <SwiperSlide>
                            <img src="https://swiperjs.com/demos/images/nature-5.jpg" className='rounded-lg' />
                        </SwiperSlide>
                        <SwiperSlide>
                            <img src="https://swiperjs.com/demos/images/nature-6.jpg" className='rounded-lg' />
                        </SwiperSlide>
                        <SwiperSlide>
                            <img src="https://swiperjs.com/demos/images/nature-7.jpg" className='rounded-lg' />
                        </SwiperSlide>
                        <SwiperSlide>
                            <img src="https://swiperjs.com/demos/images/nature-8.jpg" className='rounded-lg' />
                        </SwiperSlide>
                        <SwiperSlide>
                            <img src="https://swiperjs.com/demos/images/nature-9.jpg" className='rounded-lg' />
                        </SwiperSlide>
                        <SwiperSlide>
                            <img src="https://swiperjs.com/demos/images/nature-10.jpg" className='rounded-lg' />
                        </SwiperSlide>
                    </Swiper>

                    <div className='flex justify-center items-center mt-8 w-full'>
                        <div className='w-[95%] text-gray-800 text-lg grid grid-cols-4 gap-4'>
                            <div className='grid grid-cols-4 gap-2'>
                                <div className='flex justify-center items-center col-span-1'><UsersRound className='size-8' /></div>
                                <div className='grid grid-rows-2 col-span-3'>
                                    <div>Max. Guests</div>
                                    <div className='font-semibold'>3 Adults / 2 Children</div>
                                </div>
                            </div>
                            <div className='grid grid-cols-4 gap-2'>
                                <div className='flex justify-center items-center col-span-1'><Moon className="size-8" /></div>
                                <div className='grid grid-rows-2 col-span-3'>
                                    <div>Booking Nights</div>
                                    <div className='font-semibold'>1 Night</div>
                                </div>
                            </div>
                            <div className='grid grid-cols-4 gap-2'>
                                <div className='flex justify-center items-center col-span-1'><BedDouble className='size-8' /></div>
                                <div className='grid grid-rows-2 col-span-3'>
                                    <div>Bed Type</div>
                                    <div className='font-semibold'>Double Bed</div>
                                </div>
                            </div>
                            <div className='grid grid-cols-4 gap-2'>
                                
                                <div className='flex justify-center items-center col-span-1'><svg xmlns="http://www.w3.org/2000/svg" width="2em" height="2em" viewBox="0 0 24 24"><path fill="currentColor" d="M3 5v14c0 1.103.897 2 2 2h14c1.103 0 2-.897 2-2V5c0-1.103-.897-2-2-2H5c-1.103 0-2 .897-2 2m16.002 14H5V5h14z"></path><path fill="currentColor" d="M15 12h2V7h-5v2h3zm-3 3H9v-3H7v5h5z"></path></svg></div>
                                <div className='grid grid-rows-2 col-span-3'>
                                    <div>Area</div>
                                    <div className='font-semibold'>168 sq. ft.</div>
                                </div>
                                
                               
                            </div>
                        </div>
                    </div>

                    <div className='flex justify-center items-center mt-8'>
                        <div className='w-[95%] text-gray-800 text-lg text-justify'>
                            {roomDetails.description}
                        </div>
                    </div>

                    <div className='w-full mt-16'>
                        <Facilities roomservices={roomDetails.roomservices} />
                    </div>

                    <div className='w-full pt-16'>
                        <SimilarRooms similarrooms={roomDetails.similarrooms} />
                    </div>

                    <div className='w-full pt-16'>
                        <BookingProcess />
                    </div>
                </div>
                <div className="col-span-3">
                    <div className="sticky top-[11rem] w-[90%]">
                        <SelectMonth />
                    </div>
                </div>

            </div>

        </div>
    );
}

export default RoomsTemplate