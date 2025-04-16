"use client";
import React, { useState } from "react";
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


const Reviews = () => {

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
        <section className="py-32 bg-[#f9f3ef] text-center">
                <p className="text-md uppercase tracking-widest text-gray-600 mb-4">Discover</p>
                <h2 className="text-3xl md:text-5xl font-serif text-gray-800 mb-4">Our Best Amenities</h2>
                <p className="text-gray-400 max-w-3xl mx-auto mb-12">
                    Enjoy luxury and comfort with spacious interiors, a private pool, lush gardens, modern entertainment,
                    and scenic views. Experience a perfect blend of relaxation and elegance at LEXMOR!
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
    );
};

export default Reviews;
