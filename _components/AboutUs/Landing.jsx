'use client';
import { MoveDown } from 'lucide-react';
import React from 'react';
import Link from 'next/link';
import { Button } from '@nextui-org/react';
import IMAGES from '@/public';
import Image from 'next/image';

const Landing = (props) => {
  return (
    <div className="relative w-full h-[38rem] md:h-[38rem] lg:h-[40rem]">

      {/* Title and Subtitle Section */}
      <div className="absolute inset-0 flex flex-col items-center justify-center text-gray-600 drop-shadow-2xl z-20 font-serif px-4 text-center">
        <span className="text-2xl md:text-4xl lg:text-5xl bg-black text-gray-100 p-2 rounded-lg px-4 bg-opacity-30">
          About Us
        </span>
        <span className="text-sm md:text-lg lg:text-2xl bg-black text-gray-100 mt-4 p-2 rounded-lg px-4 bg-opacity-30">
          Discover the story of Sanika Baug and experience the perfect blend of tradition, luxury, and exceptional hospitality.
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

          {/* Scroll Indicator */}
          <div className="absolute bottom-4 md:right-20 right-10 flex-col justify-end hidden lg:flex z-20">
            <div className="flex flex-col items-center justify-end gap-2 md:gap-4 animate-bounce">
              <span className="transform rotate-90 rounded font-semibold">
                Scroll
              </span>
              <span>
                <MoveDown />
              </span>
            </div>
          </div>
        </div>

        {/* Bottom Gradient */}
        <div className="absolute bottom-0 left-0 h-8 md:h-10 w-full z-10 bg-gradient-to-t from-white via-white to-transparent"></div>
      </div>
    </div>
  );
};

export default Landing;
