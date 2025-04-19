import React, { useRef, useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';
import { Autoplay, Navigation } from 'swiper/modules';
import 'swiper/css/navigation';
import '@/app/styles/rooms.css';
import Image from 'next/image';
import IMAGES from '@/public';
import {
    Wifi,
    Music,
    Gamepad2,
    Speaker,
    Fence,
    SquareParking,
    ShieldCheck,
    CloudRainWind,
    BedDouble,
    HandPlatter, MoveLeft,
    MoveRight
} from 'lucide-react';

export default function Facilities() {

    const amenities = [
        { icon: <Wifi size={62} />, label: 'FAST WIFI' },
        { icon: <Fence size={62} />, label: 'GARDEN FOR EVENTS' },
        { icon: <Gamepad2 size={62} />, label: 'INDOOR / OUTDOOR GAMES' },
        { icon: <Speaker size={62} />, label: 'DJ' },
        {
            icon: (
                <svg xmlns="http://www.w3.org/2000/svg" width="62" height="62" viewBox="0 0 24 24" fill="none"
                    stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
                    className="lucide lucide-waves-ladder">
                    <path d="M19 5a2 2 0 0 0-2 2v11" />
                    <path d="M2 18c.6.5 1.2 1 2.5 1 2.5 0 2.5-2 5-2 2.6 0 2.4 2 5 2 2.5 0 2.5-2 5-2 1.3 0 1.9.5 2.5 1" />
                    <path d="M7 13h10" />
                    <path d="M7 9h10" />
                    <path d="M9 5a2 2 0 0 0-2 2v11" />
                </svg>
            ), label: 'SWIMMING POOL'
        },
        { icon: <CloudRainWind size={62} />, label: 'RAINDANCE' },
        { icon: <SquareParking size={62} />, label: 'PRIVATE PARKING' },
        { icon: (<svg xmlns="http://www.w3.org/2000/svg" width={64} height={64} viewBox="0 0 100 100"><path fill="#040404" d="M76.647 30.353a2 2 0 0 1-2-2v-3h-3a2 2 0 0 1 0-4h5a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2m-13.659-5h-8.659a2 2 0 0 1 0-4h8.659a2 2 0 0 1 0 4m-17.318 0h-8.659a2 2 0 0 1 0-4h8.659a2 2 0 0 1 0 4m-22.317 5a2 2 0 0 1-2-2v-5a2 2 0 0 1 2-2h5a2 2 0 0 1 0 4h-3v3a2 2 0 0 1-2 2m0 34.635a2 2 0 0 1-2-2v-8.659a2 2 0 0 1 4 0v8.659a2 2 0 0 1-2 2m0-17.318a2 2 0 0 1-2-2v-8.659a2 2 0 0 1 4 0v8.659a2 2 0 0 1-2 2m5 30.977h-5a2 2 0 0 1-2-2v-5a2 2 0 0 1 4 0v3h3a2 2 0 0 1 0 4m34.635 0h-8.659a2 2 0 0 1 0-4h8.659a2 2 0 0 1 0 4m-17.318 0h-8.659a2 2 0 0 1 0-4h8.659a2 2 0 0 1 0 4m30.977 0h-5a2 2 0 0 1 0-4h3v-3a2 2 0 0 1 4 0v5a2 2 0 0 1-2 2m0-13.659a2 2 0 0 1-2-2v-8.659a2 2 0 0 1 4 0v8.659a2 2 0 0 1-2 2m0-17.318a2 2 0 0 1-2-2v-8.659a2 2 0 0 1 4 0v8.659a2 2 0 0 1-2 2"></path><path fill="#040404" d="M90.216 92.216H9.784a2 2 0 0 1-2-2V9.784a2 2 0 0 1 2-2h80.432a2 2 0 0 1 2 2v80.432a2 2 0 0 1-2 2m-78.432-4h76.432V11.784H11.784z"></path></svg>), label: 'TURF' },
        { icon: (<svg xmlns="http://www.w3.org/2000/svg" width={64} height={64} viewBox="0 0 24 24"><path fill="#040404" d="M8.042 14.227h2.534a.23.23 0 0 1 .23.23v1.737a.23.23 0 0 1-.23.23H8.042a.23.23 0 0 1-.23-.23v-1.737a.23.23 0 0 1 .23-.23m-1.13 5.825a32 32 0 0 0 4.931.3a32 32 0 0 0 4.963-.3a.726.726 0 0 0 .615-.769v-.266h-11.3v.255a.885.885 0 0 0 .791.78m10.509-17.83h-.728A47 47 0 0 0 11.95 2c-2.833 0-4.843.161-5.495.221h-.334v16.494h11.3zM12.2 9.5v-.151c1.781 0 3.585.38 3.585 1.106s-1.8 1.091-3.588 1.091s-3.585-.375-3.585-1.091s1.8-1.106 3.585-1.106V9.5Zm-1.627 4.424a.534.534 0 0 1 .533.534v1.736a.533.533 0 0 1-.533.533h-2.53a.534.534 0 0 1-.534-.533v-1.736a.535.535 0 0 1 .534-.534zm9.254 4.67V4.224l-2.04-1.889l-.063-.006v16.386h2.1v-.121zM5.818 2.7L4.173 4.215v14.5h1.646zm11.906 16.573a1.03 1.03 0 0 1-.875 1.08a32.6 32.6 0 0 1-5.006.3h-.535a32 32 0 0 1-4.432-.309a1.19 1.19 0 0 1-1.057-1.065v-.27H4.178C4.241 21.611 5.03 22 11.949 22c6.953 0 7.8-.427 7.872-2.982h-2.1z" className="cls-1"></path></svg>), label: 'INVERTER POWER BACKUP' },
        { icon: <HandPlatter size={62} />, label: 'HOUSE KEEPING' },
    ];

    return (
        <div>
            <section className=" bg-white text-center lg:flex flex-col w-full h-full">
                <div className="relative w-[100vw] h-[65vh] lg:h-[75vh] mt-36">
                    <button
                        className="hidden lg:block swiper-button-prev-custom absolute top-[80%] left-[5%] lg:top-[70%] lg:left-96 z-10 transform -translate-y-1/2 bg-white text-black lg:p-2 rounded-full shadow-md hover:bg-gray-200"
                    >
                        <MoveLeft className="m-2" />
                    </button>

                    <button
                        className="hidden lg:block swiper-button-next-custom absolute top-[80%] right-[5%] lg:top-[70%] lg:right-96 z-10 transform -translate-y-1/2 bg-white text-black lg:p-2 rounded-full shadow-md hover:bg-gray-200"
                    >
                        <MoveRight className="m-2" />
                    </button>

                    <Swiper
                        spaceBetween={30}
                        centeredSlides={true}
                        navigation={{
                            nextEl: '.swiper-button-next-custom',
                            prevEl: '.swiper-button-prev-custom',
                        }}
                        breakpoints={{
                            320: {
                                slidesPerView: 1,
                            },
                            640: {
                                slidesPerView: 1.5,
                            },
                            1024: {
                                slidesPerView: 2,
                            },
                        }}
                        modules={[ Autoplay, Navigation ]}
                        className="mySwiper w-full h-full relative"
                        loop={true}
                        autoplay={{
                            delay: 3000,
                            disableOnInteraction: false,
                        }}
                    >
                        <SwiperSlide className="w-full h-full flex flex-col justify-center items-center bg-black">
                            <div className='bg-black flex flex-row gap-3 w-full h-full px-4'>
                                <div className='w-[50%]'>
                                    <Image
                                        src={IMAGES[27]}
                                        alt="Slide 1"
                                        width={1920}
                                        height={1080}
                                        className="object-cover w-full h-full"
                                    />
                                </div>
                                <div className='w-[50%]'>
                                    <Image
                                        src={IMAGES[32]}
                                        alt="Slide 1"
                                        width={1920}
                                        height={1080}
                                        className="object-cover w-full h-full"
                                    />
                                </div>

                            </div>
                            <div className="w-full h-full flex justify-center items-center absolute">
                                <div className="bg-white text-black w-[75%] text-start h-auto self-end justify-end z-10 p-8 flex flex-col gap-2 text-sm lg:text-lg">
                                    <p>Discover</p>
                                    <p className='text-xl lg:text-3xl font-serif'>Bedrooms</p>
                                    <p>Relax in our inviting bedroom designed for comfort and tranquility. Featuring soft linens, earthy decor, and large windows that frame the lush outdoors, each room offers a perfect blend of rustic charm and modern ease. Wake up to the sounds of nature and enjoy a peaceful stay surrounded by greenery — a true countryside escape.</p>
                                </div>
                            </div>
                        </SwiperSlide>
                        <SwiperSlide className="w-full h-full flex flex-col justify-center items-center">
                            <div className='bg-black flex flex-row gap-3 w-full h-full pl-4'>
                                <div className='w-[50%]'>
                                    <Image
                                        src={IMAGES[3]}
                                        alt="Slide 1"
                                        width={1920}
                                        height={1080}
                                        className="object-cover w-full h-full"
                                    />
                                </div>
                                <div className='w-[50%] bg-white h-full px-4'>
                                    <div className='flex flex-col gap-2 w-full h-full justify-center items-center '>
                                        <div className='w-full h-full'>
                                            <Image
                                                src={IMAGES[4]}
                                                alt="Slide 1"
                                                width={1920}
                                                height={1080}
                                                className="object-cover w-full h-full"
                                            />
                                        </div>
                                        <div className='w-full h-full'>
                                            <Image
                                                src={IMAGES[6]}
                                                alt="Slide 1"
                                                width={1920}
                                                height={1080}
                                                className="object-cover w-full h-full"
                                            />
                                        </div>
                                    </div>

                                </div>

                            </div>
                            <div className="w-full h-full flex justify-center items-center absolute">
                                <div className="bg-white text-black w-[75%] text-start h-auto self-end justify-end z-10 p-8 flex flex-col gap-2 text-sm lg:text-lg">
                                    <p>Discover</p>
                                    <p className='text-xl lg:text-3xl font-serif'>Swimming Pool</p>
                                    <p>Enjoy a refreshing escape with our separate pools for adults and kids. Whether you&apos;re taking a peaceful dip or watching your little ones splash safely nearby, our pool area offers the perfect blend of fun and relaxation. Surrounded by nature, it&apos;s a great way to unwind and make lasting memories.

                                    </p>
                                </div>
                            </div>
                        </SwiperSlide>
                        <SwiperSlide className="w-full h-full flex flex-col justify-center items-center bg-black">
                            <div className='bg-black flex flex-row gap-3 w-full h-full px-4 lg:px-20 py-10'>
                                <div className='w-[50%] bg-white rounded-tl-[4rem]'>
                                    <Image
                                        src={IMAGES[48]}
                                        alt="Slide 1"
                                        width={1920}
                                        height={1080}
                                        className="object-cover w-full h-full p-1 rounded-tl-[4rem]"
                                    />
                                </div>
                                <div className='w-[50%] bg-white rounded-tr-[4rem]'>
                                    <Image
                                        src={IMAGES[45]}
                                        alt="Slide 1"
                                        width={1920}
                                        height={1080}
                                        className="object-cover w-full h-full p-1 rounded-tr-[4rem]"
                                    />
                                </div>

                            </div>
                            <div className="w-full h-full flex justify-center items-center absolute">
                                <div className="bg-white text-black w-[75%] text-start h-auto self-end justify-end z-10 p-8 flex flex-col gap-2 text-sm lg:text-lg">
                                    <p>Discover</p>
                                    <p className='text-xl lg:text-3xl font-serif'>Gardens</p>
                                    <p>Wander through the peaceful gardens of Sanika Baug, where nature blooms all around. Perfect for a morning stroll or quiet evening moments, our green spaces offer a refreshing break from city life. Surrounded by trees, flowers, and open skies — it’s calm, simple, and soothing.</p>
                                </div>
                            </div>
                        </SwiperSlide>
                        <SwiperSlide className="w-full h-full flex flex-col justify-center items-center bg-black">
                            <div className='bg-black flex flex-row gap-3 w-full h-full px-4'>
                                <div className='w-[50%]'>
                                    <Image
                                        src={IMAGES[34]}
                                        alt="Slide 1"
                                        width={1920}
                                        height={1080}
                                        className="object-cover w-full h-full"
                                    />
                                </div>
                                <div className='w-[50%]'>
                                    <Image
                                        src={IMAGES[68]}
                                        alt="Slide 1"
                                        width={1920}
                                        height={1080}
                                        className="object-cover w-full h-full"
                                    />
                                </div>

                            </div>
                            <div className="w-full h-full flex justify-center items-center absolute">
                                <div className="bg-white text-black w-[75%] text-start h-auto self-end justify-end z-10 p-8 flex flex-col gap-2 text-sm lg:text-lg">
                                    <p>Discover</p>
                                    <p className='text-xl lg:text-3xl font-serif'>Play area</p>
                                    <p>Let the little ones enjoy endless fun in our dedicated play area, designed just for kids. With open space and safe equipment, it&apos;s the perfect spot for them to run, play, and make happy memories. A joyful corner of Sanika Baug where laughter never ends.</p>
                                </div>
                            </div>
                        </SwiperSlide>

                    </Swiper>

                </div>
                <div className="w-full h-full flex justify-end items-end">
                    <div className="bg-[#f9f3ef] absolute w-full h-36 self-end justify-end z-0"></div>
                </div>
            </section>


            <section className="py-32 bg-[#f9f3ef] text-center">
                <p className="text-md uppercase tracking-widest text-gray-600 mb-4">Discover</p>
                <h2 className="text-3xl md:text-5xl font-serif text-gray-800 mb-4">Our Best Amenities</h2>
                <p className="text-gray-400 max-w-3xl mx-auto mb-12">
                    Enjoy luxury and comfort with spacious interiors, a private pool, lush gardens, modern entertainment,
                    and scenic views. Experience a perfect blend of relaxation and elegance at Sanika Baug!
                </p>

                <div className="grid grid-cols-1 lg:grid-cols-5 gap-6 max-w-[93%] mx-auto px-4">
                    {amenities.map((amenity, index) => (
                        <div
                            key={index}
                            className="bg-white w-[100%] py-20 rounded-lg flex flex-col items-center justify-center hover:shadow-xl transition-shadow"
                        >
                            <div className="text-[#14213d] mb-2">{amenity.icon}</div>
                            <p className="text-md font-medium text-gray-800">{amenity.label}</p>
                        </div>
                    ))}
                </div>
            </section>
        </div>
    );
}
