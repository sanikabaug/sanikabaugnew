'use client';
import React, { useEffect } from 'react';
import Link from 'next/link';
import { Button } from '@nextui-org/react';
import IMAGES from '@/public';
import Image from 'next/image';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/effect-fade';
import { Autoplay, EffectFade } from "swiper/modules";

const Landing = (props) => {




    return (
        // <div className="relative w-full h-[36rem] md:h-[100vh]">
        //     <div className="absolute inset-0 flex flex-col items-center justify-center text-center lg:items-start lg:justify-center lg:text-start top-0 lg:top-0 text-gray-600 drop-shadow-2xl z-20 px-4 ">
        //         <span
        //             className="text-lg md:text-6xl  text-white p-2 rounded-lg px-4 lg:tracking-widest drop-shadow-2xl font-serif"
        //         >
        //             Sanika Baug
        //         </span>
        //         <span
        //             className="text-sm md:text-6xl  text-white mt-4 p-2 rounded-lg px-4 tracking-wider drop-shadow-2xl font-serif"
        //         >
        //             A Luxury Farmstay in Karjat
        //         </span>
        //         <div className='flex flex-col mt-8'>
        //             <span className='text-white text-xl px-4 tracking-wider drop-shadow-2xl'>Immerse yourself in unparalleled Luxury </span>
        //             <span className='text-white text-xl px-4 tracking-wider drop-shadow-2xl'>as you step into our lavishly Adorned villa.</span>
        //         </div>
        //         <Button
        //             className="bg-gray-700 text-gray-100 font-semibold px-8 rounded-none mt-8 py-4 ml-4"
        //         >
        //             Book Your Stay
        //         </Button>
        //     </div>
        //     <div className="relative w-full h-full flex justify-center items-center bg-black opacity-95">
        //         <Swiper
        //             slidesPerView={1}
        //             spaceBetween={10}
        //             autoplay={{ delay: 3000, disableOnInteraction: false }}
        //             loop={true}
        //             modules={[Autoplay, EffectFade]}
        //             effect="fade"
        //             speed={1000}
        //             className="mySwiper1 w-full h-full"
        //         >
        //             <SwiperSlide className="relative w-full h-full">
        //                 <Image src={IMAGES[2]} alt="landing-bg" fill className="object-cover" />
        //             </SwiperSlide>
        //         </Swiper>
        //         <div className="absolute inset-0 flex flex-col justify-center items-center px-4">
        //             {props.content && props.content.map((e, i) => (
        //                 <div
        //                     key={i}
        //                     className="flex flex-col gap-4 md:gap-10 justify-start lg:justify-center items-center text-center"
        //                 >
        //                     <h1 className="text-2xl md:text-5xl lg:text-8xl text-[#800000] font-bold">
        //                         {e.title}
        //                     </h1>
        //                     <p className="w-full md:w-[80%] lg:w-[70%] text-sm md:text-lg text-gray-500 font-medium">
        //                         {e.description}
        //                     </p>
        //                     <Link href="/contact-us">
        //                         <Button radius="full" className="bg-[#800000] text-white font-semibold px-4">
        //                             Let’s Get Started!
        //                         </Button>
        //                     </Link>
        //                 </div>
        //             ))}
        //         </div>
        //     </div>
        // </div>



        <div className="relative w-full h-[85vh] md:h-[100vh]">
            {/* Overlay Text */}
            <div className="absolute inset-0 flex flex-col justify-center text-start items-start z-20 lg:px-4">
                <span className="hidden lg:block text-2xl sm:text-4xl md:text-6xl text-white p-2 rounded-lg px-4 tracking-wider drop-shadow-2xl font-serif">
                    Sanika Baug
                </span>
                <span className="block lg:hidden uppercase font-semibold text-xl text-white p-2 rounded-lg px-4 tracking-widest drop-shadow-2xl">
                    Sanika Baug
                </span>
                <span className="text-5xl lg:text-6xl text-white mt-2 sm:mt-4 p-2 px-4 tracking-wide drop-shadow-2xl font-serif">
                    A Luxury Farmstay in Karjat
                </span>
                <div className='flex flex-col mt-6 space-y-1 sm:space-y-2'>
                    <span className='text-white text-base sm:text-lg md:text-xl px-4 tracking-wide drop-shadow-2xl'>
                        Immerse yourself in unparalleled Luxury
                    </span>
                    <span className='text-white text-base sm:text-lg md:text-xl px-4 tracking-wide drop-shadow-2xl'>
                        as you step into our lavishly adorned farmstay.
                    </span>
                </div>
                <Button className="bg-gray-200 hover:bg-gray-600 hover:text-white text-black font-semibold mt-6 rounded-md ml-4 text-md p-6 tracking-wider" onPress={() => window.location.href = '/contactus'}>
                    Book Your Stay
                </Button>
            </div>

            {/* Background Swiper */}
            <div className="relative w-full h-full flex justify-center items-center bg-black">
                <Swiper
                    slidesPerView={1}
                    spaceBetween={10}
                    autoplay={{ delay: 3000, disableOnInteraction: false }}
                    loop={true}
                    modules={[Autoplay, EffectFade]}
                    effect="fade"
                    speed={1000}
                    className="mySwiper1 w-full h-full"
                >
                    <SwiperSlide className="relative w-full h-full">
                        <Image src={IMAGES[83]} alt="landing-bg" fill className="object-cover hidden lg:block" />
                        <Image src={IMAGES[83]} alt="landing-bg" fill className="object-cover block lg:hidden" />
                    </SwiperSlide>
                </Swiper>

                {/* Optional Overlay Content */}
                {props.content && (
                    <div className="absolute inset-0 flex flex-col justify-center items-center px-4 text-center">
                        {props.content.map((e, i) => (
                            <div
                                key={i}
                                className="flex flex-col gap-4 md:gap-8 justify-center items-center"
                            >
                                <h1 className="text-3xl sm:text-5xl lg:text-8xl text-[#800000] font-bold drop-shadow">
                                    {e.title}
                                </h1>
                                <p className="w-full md:w-[80%] lg:w-[70%] text-sm sm:text-base md:text-lg text-gray-200 font-medium">
                                    {e.description}
                                </p>
                               
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};

export default Landing;
