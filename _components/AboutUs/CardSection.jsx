import { SendHorizontal } from "lucide-react";
import React from "react";

const CardSection = () => {
    const cardData = [
        {
            icon: <SendHorizontal size={40} />,
            title: "Serene Comfort",
            description:
                "Sanika Baug offers a tranquil retreat with clean, comfortable rooms and exceptional service, making your stay near Pavagadh unforgettable.",
            iconColor: "text-blue-500",
            bgColor: "bg-blue-100",
        },
        {
            icon: <SendHorizontal size={40} />,
            title: "Prime Location",
            description:
                "Conveniently located near Pavagadh's attractions, Sanika Baug is the perfect base for exploring the area's cultural and natural wonders.",
            iconColor: "text-green-500",
            bgColor: "bg-green-100",
        },
        {
            icon: <SendHorizontal size={40} />,
            title: "Affordable Luxury",
            description:
                "Experience top-notch amenities and warm hospitality at budget-friendly rates, ensuring a delightful stay without breaking the bank.",
            iconColor: "text-red-500",
            bgColor: "bg-red-100",
        },
        {
            icon: <SendHorizontal size={40} />,
            title: "Tailored Stays",
            description:
                "Whether you're visiting with family, friends, or solo, we offer personalized services to cater to your unique preferences.",
            iconColor: "text-yellow-500",
            bgColor: "bg-yellow-100",
        },
        {
            icon: <SendHorizontal size={40} />,
            title: "Guest Satisfaction",
            description:
                "Our team is dedicated to ensuring every guest leaves with cherished memories and a smile, making your comfort our top priority.",
            iconColor: "text-purple-500",
            bgColor: "bg-purple-100",
        },
        {
            icon: <SendHorizontal size={40} />,
            title: "Community Spirit",
            description:
                "Be part of our growing family of happy guests. Share your experiences, connect with fellow travelers, and enjoy exclusive offers.",
            iconColor: "text-orange-500",
            bgColor: "bg-orange-100",
        },
    ];

    return (
        <div className="">
            <div className="flex justify-center items-center w-[95%] mx-auto gap-10 my-10">
                <div className="flex justify-center items-center flex-col gap-10 w-full ">
                    <div>
                        <h1 className="text-4xl font-semibold w-full  text-center">
                            A One-Stop Destination for Your  {" "}
                            <span className="text-themeColor">
                                Stay in Halol
                            </span>{" "}
                        </h1>
                    </div>
                    <p className="text-gray-500 w-full lg:w-[50%] text-center">

                        At Sanika Baug, we strive to be your one-stop destination for a comfortable stay near Pavagadh. With our experience and dedication to hospitality, you can trust us to make your visit hassle-free and enjoyable.
                    </p>
                    <div className="relative flex justify-center items-center w-full ">
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 w-full">
                            {cardData.map((card, index) => (
                                <div
                                    key={index}
                                    className="flex flex-col w-full h-96 rounded-xl border bg-white px-4 py-8 transition-transform duration-300 hover:-translate-y-2 hover:shadow-xl group gap-5"
                                >
                                    <div
                                        className={`size-16 ${card.bgColor} flex justify-center items-center rounded-xl ${card.iconColor} group-hover:scale-110 transition-transform duration-300`}
                                    >
                                        {React.cloneElement(card.icon, {
                                            className: card.iconColor,
                                        })}

                                    </div>
                                    <h2 className="mt-4 text-xl lg:text-3xl font-semibold  rounded  transition-colors duration-300 group-hover:text-themeColor">
                                        {card.title}
                                    </h2>
                                    <p className="mt-2 text-gray-500 w-full text-base lg:text-lg">
                                        {card.description}
                                    </p>
                                </div>
                            ))}
                        </div>

                        <div
                            className="absolute transform skew-x-0 inset-0 w-[60%] h-full  md:h-[60%] bg-red-100 m-auto rounded-full z-[-10]"
                            style={{ transform: "skewY(-30deg)" }}
                        ></div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CardSection;
