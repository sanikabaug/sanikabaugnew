"use client";
import React, { useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import "swiper/css/autoplay"; // Import autoplay styles
import { Navigation, Autoplay } from "swiper/modules"; // Import Autoplay module
import { ChevronLeft, ChevronRight, UserRound } from "lucide-react";
import IMAGES from "@/public/index";


const Reviews = ({ packageReviews }) => {
    const reviews = [
        {
            title: "A Comfortable Stay Near Pavagadh Hills",
            description:
                "Experience the serenity of Pavagadh with a comfortable stay at Sanika Baug. Clean rooms and friendly staff make it an ideal choice for travelers.",
            name: "Rohit Mehta",
            gender: "Male",
            img: IMAGES.profile,
        },
        {
            title: "Affordable Accommodation with Great Accessibility",
            description:
                "Enjoy affordable accommodation close to Pavagadh attractions. Convenient location and good hospitality add to the charm of this stay.",
            name: "Simran Patel",
            gender: "Female",
            img: IMAGES.profile,
        },
        {
            title: "Perfect Base for Exploring Pavagadh",
            description:
                "Sanika Baug serves as the perfect base for exploring Pavagadh. With basic amenities and a prime location, it's a good value for money.",
            name: "Vikram Desai",
            gender: "Male",
            img: IMAGES.profile,
        },
        {
            title: "Memorable Experience with Exceptional Service",
            description:
                "The staff at Sanika Baug went above and beyond to make our stay memorable. Comfortable rooms and delicious local food were the highlights.",
            name: "Nisha Sharma",
            gender: "Female",
            img: IMAGES.profile,
        },
        {
            title: "Convenient and Budget-Friendly Stay",
            description:
                "Sanika Baug is an excellent choice for budget-conscious travelers. Its proximity to Pavagadh attractions is a big plus.",
            name: "Arjun Varma",
            gender: "Male",
            img: IMAGES.profile,
        },
        {
            title: "Clean and Peaceful Accommodation",
            description:
                "The hotel offers a peaceful ambiance with clean rooms and courteous staff. A great option for a short getaway near Pavagadh.",
            name: "Priya Menon",
            gender: "Female",
            img: IMAGES.profile,
        },
        {
            title: "Great Hospitality at a Great Location",
            description:
                "Located near the main attractions, Sanika Baug provides excellent hospitality. The staff ensured a comfortable and pleasant stay.",
            name: "Kunal Joshi",
            gender: "Male",
            img: IMAGES.profile,
        },
    ];

    const [isBeginning, setIsBeginning] = useState(true);
    const [isEnd, setIsEnd] = useState(false);
    const [activeIndex, setActiveIndex] = useState(0);



    return (
        <div className="bg-gray-100">
            <div className="flex flex-col gap-8 lg:gap-10 justify-center items-center py-20 w-[95%] mx-auto">
                <h2 className="text-2xl lg:text-3xl text-gray-600 font-bold underline decoration-themeColor">
                    Explore the heartfelt stories
                </h2>
                <p className="text-base lg:text-lg lg:w-[80%] text-center">
                    Hear the glowing stories and testimonials from guests who’ve experienced the unmatched hospitality and comfort of Sanika Baug!
                </p>

                <div className="relative w-full lg:w-[80%] mx-auto flex flex-col lg:flex-row justify-center items-center gap-16 lg:gap-5 h-full">
                    <div className="w-full h-auto ">
                        <Swiper
                            spaceBetween={20}
                            slidesPerGroup={1}
                            navigation={{
                                nextEl: ".swiper-next",
                                prevEl: ".swiper-prev",
                            }}
                            autoplay={{
                                delay: 4000, // Auto-scroll delay in milliseconds
                                disableOnInteraction: false, // Continue autoplay after interaction
                            }}
                            style={{
                                "--swiper-navigation-size": "20px",
                            }}
                            modules={[Navigation]} // Include Autoplay module
                            breakpoints={{
                                0: { slidesPerView: 1.2 }, // 1 card per view for mobile
                                1024: { slidesPerView: 3 }, // 2 cards per view for larger screens
                            }}
                            className="mySwiper relative"
                            onSlideChange={(swiper) => {
                                setActiveIndex(swiper.activeIndex); // Set active slide index
                                setIsBeginning(swiper.isBeginning);
                                setIsEnd(swiper.isEnd);
                            }}
                        >
                            {Object.keys(reviews)?.map((card, index) => {
                                return (
                                    <SwiperSlide key={index}>
                                        <div
                                            className={`w-full h-72 md:h-80 rounded-lg bg-white border p-2 `}
                                        >
                                            <div className="p-4 flex flex-col justify-between items-center w-full h-full gap-5 lg:gap-10 ">
                                                <div className="flex flex-col gap-5">
                                                    <p className={`font-semibold text-start w-full italic`}>
                                                        {reviews[card].title}
                                                    </p>
                                                    <p className="text-sm text-gray-600 line-clamp-5">
                                                        {reviews[card].description}
                                                    </p>
                                                </div>

                                                <div className="flex gap-5 items-center w-full">
                                                    <div className="flex items-center justify-center bg-slate-200 w-16 h-16 rounded-full relative overflow-hidden">
                                                        {
                                                            reviews[card].gender === "Male"
                                                            ? <UserRound className="w-16 h-16 text-gray-500 bg-slate-200" />
                                                            : <svg xmlns="http://www.w3.org/2000/svg" className="flex items-center justify-center text-gray-500 bg-slate-200" width="50px" height="100px" viewBox="0 0 1024 1024"><path fill="currentColor" d="M960.032 802.688L681.535 670.624c37.152-18.624 182.256-24.528 194.256-57.28c0 0-57.344-88.016-71.344-202.336c-5.44-44.368-14.752-102.592-24-184.592C765.44 93.408 653.567 0 512.257 0h-.513C370.432 0 258.56 93.408 243.568 226.4c-9.248 82-18.56 140.224-24 184.592c-14 114.336-71.344 202.336-71.344 202.336c12 32.752 157.088 38.656 194.256 57.28L63.968 802.688S0 825.152 0 878.16v84.528C0 998.064 28.624 1024 63.968 1024h896.064c35.343 0 63.967-25.936 63.967-61.312V878.16c0-53.008-63.967-75.472-63.967-75.472M63.999 960v-81.84c0-3.408 12.096-11.6 21.936-15.344c2.127-.752 3.44-1.344 5.44-2.32L369.87 728.432c22.128-10.464 36.32-32.687 36.593-57.151c.256-24.464-13.44-46.976-35.313-57.936c-21.68-10.88-50.336-16.256-95.248-24.032c-10.656-1.872-25.216-4.496-39.344-7.312c18.32-41.105 38.56-98.593 46.529-163.633c1.968-16.193 4.496-34.416 7.312-54.592c4.848-34.336 10.848-77.872 16.752-130.224c11.168-98.865 95.28-169.553 204.592-169.553h.512c109.312 0 193.439 70.688 204.592 169.568c5.904 52.336 11.904 95.887 16.752 130.224c2.816 20.176 5.345 38.4 7.312 54.592c7.968 65.024 28.224 122.513 46.528 163.633c-14.128 2.816-28.688 5.44-39.344 7.312c-44.912 7.776-73.568 13.152-95.248 24.032c-21.872 10.976-35.568 33.472-35.313 57.936c.289 24.464 14.464 46.687 36.592 57.151l278.496 132.064c2 .976 3.312 1.568 5.44 2.32c9.84 3.744 20.496 11.936 21.936 15.344l.032 81.824z"></path></svg>
                                                        }
                                                        
                                                        {/* <Image
                            src={packageReviews[card][0].image[0]}
                            alt={card}
                            fill
                            className="w-full h-full object-cover"
                          /> */}
                                                    </div>
                                                    <h3 className="text-themeColor font-semibold ">
                                                        {reviews[card].name}
                                                    </h3>
                                                </div>
                                            </div>
                                        </div>
                                    </SwiperSlide>
                                )
                            })}
                        </Swiper>
                    </div>
                    <div className="hidden lg:flex absolute top-0 bottom-0 m-auto z-30 justify-between gap-5 w-full">
                        <div className="flex justify-center items-center -translate-x-5">
                            <button
                                className={`swiper-prev p-2 rounded-full bg-gray-300 text-gray-500 ${isBeginning ? "opacity-50" : ""
                                    }`}
                                disabled={isBeginning}
                            >
                                <ChevronLeft className="w-6 h-6" />
                            </button>
                        </div>
                        <div className="flex justify-center items-center translate-x-5">
                            <button
                                className={`swiper-next p-2 rounded-full bg-gray-300 text-gray-500 ${isEnd ? "opacity-50" : ""
                                    }`}
                                disabled={isEnd}
                            >
                                <ChevronRight className="w-6 h-6" />
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Reviews;
