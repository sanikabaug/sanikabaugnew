import React from 'react';
import IMAGES from '@/public';

const features = [
    {
        title: 'Amazing Gazebo',
        image: IMAGES[8], // replace with actual path
    },
    {
        title: 'Outdoor Swiming Pool',
        image: IMAGES[3], // replace with actual path
    },
    {
        title: 'Beautiful Lawn',
        image: IMAGES[78], // replace with actual path
    },
];

export default function Description() {
    return (
        <section className="bg-[#faf4f1] py-32">
            <div className="max-w-[90%] mx-auto px-4 grid grid-cols-1 md:grid-cols-3 gap-8 relative">

                
                    <div className="flex flex-col items-center">
                        <img
                            src={IMAGES[8]}
                            alt="Amazing Gazebo"
                            className="w-full h-[300px] object-cover shadow-md"
                        />

                            <div className="bg-white w-[25%] text-center py-8 mt-4 shadow-md absolute top-[75%] font-serif">
                                <div className="text-lg md:text-2xl text-[#0b2341] flex flex-col">
                                <p>Amazing</p>
                                <p>Gazebo</p>
                                </div>
                            </div>
                    

                    </div>

                    <div className="flex flex-col items-center">
                        <img
                            src={IMAGES[3]}
                            alt="Amazing Gazebo"
                            className="w-full h-[300px] object-cover shadow-md"
                        />

                            <div className="bg-white w-[25%] text-center py-8 mt-4 shadow-md absolute top-[75%] font-serif">
                            <div className="text-lg md:text-2xl text-[#0b2341] flex flex-col">
                                <p>Outdoor</p>
                                <p>Swiming Pool</p>
                                </div>
                            </div>
                    

                    </div>

                    <div className="flex flex-col items-center">
                        <img
                            src={IMAGES[78]}
                            alt="Amazing Gazebo"
                            className="w-full h-[300px] object-cover shadow-md"
                        />

                            <div className="bg-white w-[25%] text-center py-8 mt-4 shadow-md absolute top-[75%] font-serif">
                            <div className="text-lg md:text-2xl text-[#0b2341] flex flex-col">
                                <p>Beautiful</p>
                                <p>Lawn</p>
                                </div>
                            </div>
                    

                    </div>
              
            </div>
        </section>
    );
}
