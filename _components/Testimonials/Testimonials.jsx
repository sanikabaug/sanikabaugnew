"use client";
import React, { useState, useEffect } from "react";
import Image from "next/image";
import IMAGES from "@/public/index";
import { FaStar } from "react-icons/fa6";
import { Pagination } from "@nextui-org/react";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  useDisclosure,
} from "@nextui-org/modal";
import { Button } from "@nextui-org/react";
import { Spinner } from "@nextui-org/react";

const TestCard = ({ packageReviews, allPackages }) => {
  const [isLoading, setIsLoading] = useState(true);
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [selectedReview, setSelectedReview] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [activeSection, setActiveSection] = useState("reviews");
  const [filteredReviews, setFilteredReviews] = useState([
    {
      rating: 4.7,
      tagline: "Perfect Venue for Outdoor Celebrations!",
      description:
        "We recently celebrated my sister's engagement at Sanika Baug, and the garden space was absolutely stunning! The property has not one, but three beautifully maintained gardens that are perfect for outdoor functions. We hosted about 80 guests comfortably, and everything from the lighting to the ambiance was just right. The staff was super cooperative and helped with every detail, making the event stress-free. Highly recommended for anyone planning a birthday or wedding celebration!",
      image: [IMAGES[116]],
      package_name: "Sanika Baug Celebration Package",
      name: "Ritika Mehta",
      creation_date: "2025-04-16",
    },
    {
      rating: 4.8,
      tagline: "Spacious and Comfortable Stay!",
      description:
        "The rooms were extremely clean and well-maintained. We booked multiple double-bed AC rooms, and they were spacious and had all the necessary amenities. The housekeeping team was attentive, making our stay even more comfortable.",
      image: [],
      package_name: "Sanika Baug Accommodation",
      name: "Amit Sharma",
      creation_date: "2025-04-12",
    },
    {
      rating: 4.5,
      tagline: "Refreshing Swimming Pool Experience",
      description:
        "The separate swimming pools for adults and children were a great touch! The kids had a blast while we could enjoy a relaxed time in the adult pool. The water was clean, and the poolside ambiance was fantastic.",
      image: [],
      package_name: "Sanika Baug Pool Experience",
      name: "Sneha Rao",
      creation_date: "2025-04-03",
    },
    {
      rating: 4.7,
      tagline: "Rain Dance Party was a Blast!",
      description:
        "The rain dance setup was amazing! The DJ played fantastic music, and we had so much fun dancing under the artificial rain. It was a highlight of our trip!",
      image: [],
      package_name: "Sanika Baug Rain Dance",
      name: "Rahul Verma",
      creation_date: "2025-03-24",
    },
    {
      rating: 4.6,
      tagline: "Great Food and Dining Experience",
      description:
        "The food was delicious! We opted for the package including breakfast, lunch, and dinner, and every meal was freshly prepared. The dining hall was spacious and well-organized.",
      image: [IMAGES[106]],
      package_name: "Sanika Baug Dining",
      name: "Priya Nair",
      creation_date: "2025-03-15",
    },
    {
      rating: 4.9,
      tagline: "Perfect Venue for a Destination Wedding",
      description:
        "We hosted my cousin's wedding here, and it was an unforgettable experience. The garden was decorated beautifully, and the staff ensured everything went smoothly. Highly recommend for weddings!",
      image: [],
      package_name: "Sanika Baug Wedding Venue",
      name: "Vikram Singh",
      creation_date: "2025-03-07",
    },
    {
      rating: 4.3,
      tagline: "Spacious Dormitory Hall for Celebrations",
      description:
        "We booked the dormitory hall for a family gathering, and it was perfect for our needs. The air conditioning kept the place cool, and it easily accommodated 100 people.",
      image: [],
      package_name: "Sanika Baug Dormitory",
      name: "Neha Kapoor",
      creation_date: "2025-02-23",
    },
    {
      rating: 4.4,
      tagline: "Seamless Booking Process",
      description:
        "The booking process was super easy and available 24/7. We paid online, and everything was handled professionally. No last-minute hassles!",
      image: [],
      package_name: "Sanika Baug Booking",
      name: "Arjun Patel",
      creation_date: "2025-03-19",
    },
    {
      rating: 4.2,
      tagline: "Private Parking was a Huge Plus!",
      description:
        "Having private parking made our trip stress-free. We came with multiple vehicles, and there was ample space available.",
      image: [],
      package_name: "Sanika Baug Parking",
      name: "Megha Joshi",
      creation_date: "2025-03-15",
    },
    {
      rating: 4.7,
      tagline: "Superb DJ and Music Setup",
      description:
        "The DJ setup was on point! We danced all night to amazing beats, and the sound system was top-notch. Definitely a party-friendly place!",
      image: [],
      package_name: "Sanika Baug DJ Experience",
      name: "Rohan Malhotra",
      creation_date: "2025-03-06",
    },
    {
      rating: 4.6,
      tagline: "Reliable Power Backup",
      description:
        "Even during a brief power cut, the inverter kicked in immediately, and we faced no issues. Great infrastructure for a worry-free stay!",
      image: [],
      package_name: "Sanika Baug Power Backup",
      name: "Sanya Desai",
      creation_date: "2025-02-20",
    },
    {
      rating: 4.9,
      tagline: "Perfect Getaway for a Large Group",
      description:
        "We were a group of 25 people, and this place was perfect! Spacious rooms, great outdoor space, and fun activities for all ages.",
      image: [],
      package_name: "Sanika Baug Group Stay",
      name: "Karthik Iyer",
      creation_date: "2025-02-14",
    },
    {
      rating: 4.8,
      tagline: "Loved the Indoor & Outdoor Games!",
      description:
        "There were so many activities to do! From badminton and carrom to outdoor cricket on the turf, we never had a dull moment.",
      image: [],
      package_name: "Sanika Baug Activities",
      name: "Shreya Das",
      creation_date: "2025-02-08",
    },
    {
      rating: 4.5,
      tagline: "Close to Railway Station",
      description:
        "The location is super convenient, just 5 km from the railway station. It made our travel experience much smoother.",
      image: [],
      package_name: "Sanika Baug Location",
      name: "Aniket Yadav",
      creation_date: "2025-01-21",
    },
    {
      rating: 4.7,
      tagline: "Fast and Free WiFi",
      description:
        "The WiFi connection was reliable, and we had no issues with video calls or streaming. A great option for remote work as well!",
      image: [],
      package_name: "Sanika Baug WiFi",
      name: "Deepa Ramesh",
      creation_date: "2025-01-19",
    },
    {
      rating: 4.3,
      tagline: "Comfortable Extra Mattresses for Large Families",
      description:
        "We had extra people in our group, and the additional mattresses provided were comfortable and clean. No complaints!",
      image: [],
      package_name: "Sanika Baug Extra Bedding",
      name: "Harsh Vardhan",
      creation_date: "2025-01-17",
    },
    {
      rating: 4.6,
      tagline: "Perfect for Kids!",
      description:
        "There were so many kid-friendly activities. The separate pool for children and the spacious gardens made it a fantastic experience for families.",
      image: [],
      package_name: "Sanika Baug Family-Friendly",
      name: "Pooja Agarwal",
      creation_date: "2025-01-13",
    },
    {
      rating: 4.5,
      tagline: "Well-Maintained Property",
      description:
        "The entire property was neat and clean, from the rooms to the gardens. Kudos to the housekeeping team for their excellent service!",
      image: [],
      package_name: "Sanika Baug Cleanliness",
      name: "Tarun Khanna",
      creation_date: "2025-01-08",
    },
    {
      rating: 4.8,
      tagline: "Projector was Great for Movie Night!",
      description:
        "We had a fun movie night using their projector setup. The quality was excellent, and it felt like a private outdoor cinema experience!",
      image: [],
      package_name: "Sanika Baug Projector",
      name: "Rashi Bansal",
      creation_date: "2025-01-05",
    },
    {
      rating: 4.7,
      tagline: "Great for Corporate Retreats",
      description:
        "We booked this place for an office team-building event, and it was a hit! The dormitory hall was spacious, and the outdoor games kept everyone engaged.",
      image: [],
      package_name: "Sanika Baug Corporate Stay",
      name: "Nishant Gupta",
      creation_date: "2025-01-01",
    }
  ]);
  const reviewsPerPage = 6;

  const uniquePackagesSet = new Set(
    packageReviews?.map((review) => review.package_id)
  );
  const [sortOrder, setSortOrder] = useState("");

  const handleSortChange = (event) => {
    setSortOrder(event.target.value);
  };



  useEffect(() => {
    if (packageReviews?.length > 0) {
      // setFilteredReviews(packageReviews);
      setIsLoading(false)
    }
  }, [packageReviews]);



  useEffect(() => {
    if (sortOrder) {
      const sortTrips = () => {
        const sorted = [...packageReviews].sort((a, b) => {
          const dateA = new Date(a.traveled_date);
          const dateB = new Date(b.traveled_date);
          if (sortOrder === "newest") {
            return dateB - dateA;
          } else {
            return dateA - dateB;
          }
        });
        // setFilteredReviews(sorted);
      };
      sortTrips();
    }
  }, [sortOrder]);

  // Calculate total pages
  const totalPages = Math.ceil(filteredReviews.length / reviewsPerPage);

  // Get current reviews based on the page
  const currentReviews = filteredReviews.slice(
    (currentPage - 1) * reviewsPerPage,
    currentPage * reviewsPerPage
  );

  // Function to handle page change
  const handlePageChange = (page) => {
    if (page < 1 || page > totalPages) return;
    setCurrentPage(page);
  };

  // Function to open modal and store the selected review
  const handleReadMore = (review) => {
    setSelectedReview(review);
    onOpen();
  };



  return (
    <div className="py-10 flex flex-col gap-8">
      <div className="w-[95%] mx-auto flex flex-col gap-2">
        {/* Header and search input */}
        <div className="flex justify-between items-center flex-col lg:flex-row gap-5">
          <p className="text-lg text-gray-700">
            <span className="font-semibold">7,67,919+</span> happy guests,{" "}
            <span className="font-semibold">57,552 </span> stays,{" "}
            <span className="font-semibold">10779+ </span> guests reviews
          </p>

        </div>

        <div className="flex flex-col gap-5">

        </div>
      </div>

      <div className="w-full h-full flex flex-col justify-between bg-white py-8">
        <div className="w-[95%] mx-auto flex justify-between items-center gap-5">
          <div className="flex justify-center items-center gap-5">
            <select
              className="w-full bg-white rounded-md shadow-sm py-3 px-3 border"
              value={sortOrder}
              onChange={handleSortChange}
            >
              <option disabled>Sort By: Newest to Oldest</option>
              <option value="newest">Newest to Oldest</option>
              <option value="oldest">Oldest to Newest</option>
            </select>
          </div>
        </div>
        {isLoading
          ? <div className="flex justify-center items-center min-h-screen">
            <Spinner size="lg" color="danger" />
          </div>
          : activeSection === "reviews" && (
            <>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 w-[95%] mx-auto my-8">
                {currentReviews?.map((review, index) => (
                  <div
                    key={index}
                    className="relative w-full border overflow-hidden rounded-xl shadow-lg flex flex-col bg-white"
                  >
                    <div className="relative w-full min-h-72 border overflow-hidden rounded-xl shadow-lg">
                      <Image
                        src={IMAGES.testimonialsbg}
                        alt="Background"
                        fill
                        className="w-full h-full object-contain opacity-20"
                      />
                      <div className="absolute inset-0 flex flex-col justify-between p-4 gap-2">
                        <div className="flex justify-between items-start">
                          <div className="flex items-center gap-2">
                            <FaStar className="text-yellow-400" />
                            <span className="text-base font-semibold">
                              {review?.rating}
                            </span>
                          </div>
                        </div>

                        <div className="flex gap-4">
                          <div className="flex-1 h-32">
                            <h1 className="font-semibold line-clamp-2 text-gray-700">
                              {review?.tagline}
                            </h1>
                            <p className="text-sm line-clamp-4 text-gray-500 mt-2">
                              {review?.description}
                            </p>
                            <button
                              onClick={() => handleReadMore(review)}
                              className="underline text-themeColor"
                            >
                              read more
                            </button>
                          </div>

                          {review?.image[0] && (
                            <div className="w-32 h-32 relative group overflow-hidden rounded-xl shadow-lg">
                              <Image
                                src={review?.image[0]}
                                alt={review?.package_name}
                                width={400}
                                height={400}
                                className="w-full h-full object-cover transition-all group-hover:scale-105"
                                loading="lazy"
                              />
                            </div>
                          )}
                        </div>
                        <div className="flex justify-between items-center">
                          <div>
                            <h3 className="font-semibold">{review?.name}</h3>
                            <p className="text-xs">{review?.creation_date.split(" ")[0]}</p>
                          </div>

                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {totalPages > 1 && (
                <div className="flex justify-center mt-8">
                  <Pagination
                    total={totalPages}
                    page={currentPage}
                    onChange={handlePageChange}
                    classNames={{
                      wrapper: "gap-3",
                      item: "rounded-full bg-white",
                      cursor: "bg-[#333333] text-white font-bold rounded-full",
                    }}
                  />
                </div>
              )}
            </>
          )
        }


        {selectedReview && (
          <Modal
            isOpen={isOpen}
            onOpenChange={onOpenChange}
            scrollBehavior="inside"
            backdrop="blur"
            placement="center"
          >
            <ModalContent>
              {(onClose) => (
                <>
                  <ModalHeader className="flex flex-col gap-2">
                    <div className="flex justify-between items-start">
                      <div className="flex items-center gap-2">
                        <FaStar className="text-yellow-400" />
                        <span className="text-base font-semibold">
                          {selectedReview.rating}
                        </span>
                        {selectedReview.special && (
                          <span className="text-xs text-themeColor border px-1 border-themeColor rounded">
                            {selectedReview.special}
                          </span>
                        )}
                      </div>
                    </div>
                    <span>{selectedReview.tagline}</span>
                    {selectedReview?.image[0] && (

                      <div className="w-full h-[15rem] relative group overflow-hidden rounded-xl shadow-lg">
                        <Image
                          src={selectedReview?.image[0]}
                          alt={selectedReview?.package_name}
                          width={300}
                          height={300}
                          className="w-full h-full object-cover transition-all group-hover:scale-105 aspect-[100/00]"
                          loading="lazy"
                        />
                      </div>

                    )}
                  </ModalHeader>
                  <ModalBody className="mx-6">
                    <h3 className="text-xl font-semibold">
                      {selectedReview.name}
                    </h3>

                    <p>
                      <span className="font-medium">Review Date:</span>{" "}
                      {selectedReview.creation_date.split(" ")[0]}
                    </p>
                    <p>{selectedReview.description}</p>

                  </ModalBody>
                  <ModalFooter>
                    <Button color="danger" variant="light" onClick={onClose}>
                      Close
                    </Button>
                  </ModalFooter>
                </>
              )}
            </ModalContent>
          </Modal>
        )}
      </div>
    </div>
  );
};

export default TestCard;
