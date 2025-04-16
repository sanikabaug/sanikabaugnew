import React from 'react';
import RoomsTemplate from '@/_components/Rooms/Rooms';
import { Wifi, Cctv, Droplets, CircleParking, Dish, GlassWater } from "lucide-react";

const SingleBedNonAc = () => {
  const content = {
    roomname: "Single Bed Non AC Room",
    price: "1,399",
    images: {
      room1: "https://swiperjs.com/demos/images/nature-1.jpg",
      room2: "https://swiperjs.com/demos/images/nature-1.jpg",
    },
    description: "Experience ultimate comfort and relaxation in our Double-Bed AC Rooms at Sanika Baug. Designed for a peaceful stay, these rooms feature spacious interiors, modern amenities, and a cool, refreshing ambiance to help you unwind after a day of exploring the beautiful surroundings of karjat. Whether you're here for a short getaway or an extended stay, our AC rooms offer a perfect blend of comfort and convenience, ensuring you have an unforgettable experience.",
    roomservices: [
      {
        icon: <Wifi className="size-7" />,
        name: "Wifi"
      },
      {
        icon: <Cctv className="size-7" />,
        name: "CCTV Cameras"
      },
      {
        icon: <Droplets className="size-7" />,
        name: "Hot & Cold Water"
      },
      {
        icon: <CircleParking className="size-7" />,
        name: "Parking"
      },
      {
        icon: <GlassWater className="size-7" />,
        name: "Mineral Water"
      },
      {
        icon: <svg xmlns="http://www.w3.org/2000/svg" width="3em" height="3em" viewBox="0 0 640 512"><path fill="currentColor" d="M256 64H64C28.7 64 0 92.7 0 128v256c0 35.3 28.7 64 64 64h192zm32 384h288c35.3 0 64-28.7 64-64V128c0-35.3-28.7-64-64-64H288zM64 160c0-17.7 14.3-32 32-32h64c17.7 0 32 14.3 32 32v192c0 17.7-14.3 32-32 32H96c-17.7 0-32-14.3-32-32z"></path></svg>,
        name: "Extra Matress"
      },
    ],
    similarrooms: [
      {
        roomimage: {
          room1: "https://swiperjs.com/demos/images/nature-1.jpg",
          room2: "https://swiperjs.com/demos/images/nature-1.jpg",
        },
        roomname: "Double Bed AC Room",
        price: "1,699"
      },
      {
        roomimage: {
          room1: "https://swiperjs.com/demos/images/nature-1.jpg",
          room2: "https://swiperjs.com/demos/images/nature-1.jpg",
        },
        roomname: "Triple Bed AC Room",
        price: "1,499"
      }
    ]
  }

  return (
    <div>
      <RoomsTemplate content={content} />
    </div>
  );
}

export default SingleBedNonAc