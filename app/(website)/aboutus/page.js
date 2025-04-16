import React from 'react'
import AboutUs from '@/_components/AboutUs/AboutUs'
import Description from '@/_components/AboutUs/Description'
import Landing from '@/_components/AboutUs/Landing'
import Reviews from '@/_components/AboutUs/Reviews'
import CardSection from '@/_components/AboutUs/CardSection'

const Aboutus = () => {
  return (
    <div className='flex flex-col'>
      <Landing />
      <AboutUs />
      <Description />
      <CardSection />
      <Reviews />
    </div>
  )
}

export default Aboutus