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
        <section className="bg-[#faf4f1] pt-32 pb-0 lg:py-32">
            <div className="max-w-[90%] mx-auto lg:px-4 grid grid-cols-1 md:grid-cols-3 gap-8 relative">

                <div className='h-[50vh]'>
                    <div className="flex flex-col items-center">
                        <img
                            src={IMAGES[8]}
                            alt="Amazing Gazebo"
                            className="w-full h-[300px] object-cover shadow-md"
                        />

                        <div className="bg-white w-[80%] lg:w-[25%] text-center py-8 mt-4 shadow-md absolute top-[17%] lg:top-[57%] font-serif">
                            <div className="text-2xl md:text-2xl text-[#0b2341] flex flex-col">
                                <p>Beautiful</p>
                                <p>Lawn</p>
                            </div>
                        </div>


                    </div>
                </div>



                <div className='h-[50vh]'>
                    <div className="flex flex-col items-center">
                        <img
                            src={IMAGES[3]}
                            alt="Amazing Gazebo"
                            className="w-full h-[300px] object-cover shadow-md"
                        />

                        <div className="bg-white w-[80%] lg:w-[25%] text-center py-8 mt-4 shadow-md absolute top-[51%] lg:top-[57%] font-serif">
                            <div className="text-2xl text-[#0b2341] flex flex-col">
                                <p>Outdoor</p>
                                <p>Swiming Pool</p>
                            </div>
                        </div>


                    </div>
                </div>

                <div className='h-[50vh]'>
                <div className="flex flex-col items-center">
                    <img
                        src={IMAGES[78]}
                        alt="Amazing Gazebo"
                        className="w-full h-[300px] object-cover shadow-md"
                    />

                    <div className="bg-white w-[80%] lg:w-[25%] text-center py-8 mt-4 shadow-md absolute top-[86%] lg:top-[57%] font-serif">
                        <div className="text-2xl text-[#0b2341] flex flex-col">
                            <p>Rain</p>
                            <p>Dance</p>
                        </div>
                    </div>


                </div>
                </div>
               

            </div>
        </section>
    );
}
