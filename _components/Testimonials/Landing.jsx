'use client';
import { MoveDown } from 'lucide-react';
import React from 'react';
import Link from 'next/link';
import { Button } from '@nextui-org/react';
import IMAGES from '@/public';
import Image from 'next/image';

const Landing = (props) => {
  return (
    <div className="relative w-full h-[38rem] md:h-[38rem] lg:h-[70vh]">

      
      <div className="absolute inset-0 flex flex-col items-center justify-center text-gray-600 drop-shadow-2xl z-20 font-serif px-4 text-center mb-16">
        <span className="text-4xl lg:text-5xl text-gray-100 p-2 px-4 font-serif">
          Testimonials
        </span>
      </div>

      {/* Landing Section */}
      <div className="relative w-full h-full flex justify-center items-center bg-black opacity-95">
        {/* Background Image */}
        <Image
          src={IMAGES.aboutuslanding}
          alt="landing-bg"
          fill
          className="object-cover"
        />

        {/* Content Section */}
        <div className="absolute inset-0 flex flex-col justify-center items-center px-4">
          {props.content &&
            props.content.map((e, i) => (
              <div
                key={i}
                className="flex flex-col gap-6 md:gap-10 justify-start lg:justify-center items-center text-center"
              >
                <h1 className="text-2xl md:text-4xl lg:text-5xl text-[#800000] font-bold">
                  {e.title}
                </h1>
                <p className="w-full text-sm md:text-base lg:text-lg text-gray-500 font-medium">
                  {e.description}
                </p>
                <Link href="/contact-us">
                  <Button
                    radius="full"
                    className="bg-[#800000] text-white font-semibold px-4"
                  >
                    Let’s Get Started!
                  </Button>
                </Link>
              </div>
            ))}

        </div>

        <div className="absolute inset-0 bg-black bg-opacity-50 z-10" />

        <div className="absolute bottom-0 top-0 left-0 h-0 lg:h-8 w-full z-10 bg-gradient-to-t from-transparent via-black to-black"></div>

        {/* Bottom Gradient */}
        <div className="absolute bottom-0 left-0 h-8 md:h-10 w-full z-10 bg-gray-200 flex justify-center items-center text-center font-semibold text-lg py-8">
          Home{" > "}Testimonials
        </div>
      </div>
    </div>
  );
};

export default Landing;
