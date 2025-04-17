'use client'
import React, { useState, useEffect } from 'react'
import TestCard from '@/_components/Testimonials/Testimonials'
import Landing from '@/_components/Testimonials/Landing'

const TestimonialsPage = () => {

  const [packageReviews, setPackageReviews] = useState([]);

  useEffect(() => {
    const abc = async () => {

      const response1 = await fetch(`/api/reviewApi`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
      const result1 = await response1.json();

      setPackageReviews(result1.result)
    };

    abc();
  }, []);

  return (
    <div>
      <Landing />
      <TestCard packageReviews={packageReviews} />
    </div>
  )
}

export default TestimonialsPage