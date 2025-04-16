'use client'
import React, { useEffect } from 'react'
import Landing from '@/_components/Home/Landing'
import Introduction from '@/_components/Home/Introduction'
import Facilities from '@/_components/Home/Facilities'
import Placestovisit from '@/_components/Home/Placestovisit'
import Testimonials from '@/_components/Home/Testimonials'
import CorporateGuestsSection from '@/_components/Home/Companies'
import { useSelector, useDispatch } from 'react-redux'
import { handleLocateUsFxn, handleTouristSpotsFxn, handlePartnersClickFxn, handleRajdhaniRestaurantFxn } from "@/app/redux/slices/navSlice";
import Process from '@/_components/Home/Process'

const Home = () => {

  const dispatch = useDispatch();

  const scrollLocation = useSelector((state) => state.nav.scrollLocation);

  const scrollTourist = useSelector((state) => state.nav.scrollTourist);

  const scrollRestaurant = useSelector((state) => state.nav.scrollRestaurant);

  const partnersClick = useSelector((state) => state.nav.partnersClick);



  const scrollToDiv = (id) => {
    const targetDiv = document.getElementById(id);
    if (targetDiv) {
      targetDiv.scrollIntoView({ behavior: "smooth" });
    }
  };

  const revenuedata = [
    {
      "key": "1",
      "title": "Growth Made Easy.",
      "description": "At Prospera Hospitality, we create simple, tailored strategies that address your hotel’s unique needs. Our data-driven insights empower you to optimize pricing and maximize occupancy for sustainable revenue growth."
    }
  ]

  useEffect(() => {
    if (scrollLocation) {
      scrollToDiv("target-div")
      dispatch(handleLocateUsFxn(false))
    }
  }, [scrollLocation])

  useEffect(() => {
    if (scrollTourist) {
      scrollToDiv("target-place")
      dispatch(handleTouristSpotsFxn(false))
    }
  }, [scrollTourist])

  useEffect(() => {
    if (partnersClick) {
      scrollToDiv("target-companies")
      dispatch(handlePartnersClickFxn(false))
    }
  }, [partnersClick])

  useEffect(() => {
    if (scrollRestaurant) {
      scrollToDiv("target-restaurant")
      dispatch(handleRajdhaniRestaurantFxn(false))
    }
  }, [scrollRestaurant])



  return (
    <div className='flex flex-col'>

      <Landing />

      <Introduction />

      {/* <div className='w-full flex justify-center items-center mt-16' id="target-div">
        <div className="flex flex-col justify-center items-center w-[98%] h-full">
          <div className="border-b border-gray-500  inline-block pb-1">
            <p className="text-center text-gray-500 text-2xl lg:text-2xl font-semibold mt-8 lg:mt-0">Locate Us</p>
          </div>
          <div className="flex justify-center item-center w-full h-full p-4 mt-4">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3685.8276178427345!2d73.46753771036363!3d22.510649935153598!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3a27af00c0062751%3A0xbce61e514e75742e!2sHotel%20Rajdhani%20And%20Guest%20House!5e0!3m2!1sen!2sin!4v1732607993926!5m2!1sen!2sin"
              width="600"
              className="w-full h-72 border-none shadow-lg "
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            >
            </iframe>
          </div>
        </div>
      </div> */}

      <Facilities />

      {/* <div id="target-companies"> */}
        <CorporateGuestsSection />
      {/* </div> */}

      {/* <div id="target-place"> */}
        <Placestovisit />
      {/* </div>  */}

      {/* <Testimonials />

      <div id="target-restaurant">
        <Process />
      </div> */}

    </div>
  )
}

export default Home
