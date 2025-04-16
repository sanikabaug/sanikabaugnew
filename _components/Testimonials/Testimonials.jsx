"use client";
import React, { useState, useEffect } from "react";
import Image from "next/image";
import IMAGES from "@/public/index";
import { FaStar } from "react-icons/fa6";
import { IoIosPerson } from "react-icons/io";
import { Pagination } from "@nextui-org/react";

import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  useDisclosure,
} from "@nextui-org/modal";
import {
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
  Button,
} from "@nextui-org/react";
import { Search } from "lucide-react";
import { Spinner } from "@nextui-org/react";

const sampleGalleryImages = [
  IMAGES.specialtours,
  IMAGES.testimonialsbg,
  // Add more images for the gallery as needed
];

const TestCard = ({ packageReviews, allPackages }) => {
  const [isLoading, setIsLoading] = useState(true);
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [selectedReview, setSelectedReview] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [activeSection, setActiveSection] = useState("reviews");
  const [reviewRegions, setReviewRegions] = useState([]);
  const [filteredReviews, setFilteredReviews] = useState([]);
  const [selectedRegion, setSelectedRegion] = useState("");
  const reviewsPerPage = 6;

  const uniquePackagesSet = new Set(
    packageReviews?.map((review) => review.package_id)
  );
  // const uniquiId = [...uniquePackagesSet];
  const [uniquiId, setUniquiId] = useState([...uniquePackagesSet]);
  const [serchInput, setSerchInput] = useState("");
  const [sortOrder, setSortOrder] = useState("");

  const handleSortChange = (event) => {
    setSortOrder(event.target.value);
  };

  // useEffect(() => {
  //   if (allPackages?.length > 0) {
  //     const abc = allPackages
  //       ?.map((item) => {
  //         if (uniquiId.includes(item.package_id)) {
  //           return item.state;
  //         }
  //       })
  //       .filter((state) => state !== undefined);

  //     setReviewRegions(abc);
  //   }
  // }, [allPackages, uniquiId]);

  // useEffect(() => {
  //   if (selectedRegion) {
  //     const uniquePackagesSet = new Set(
  //       allPackages?.map((review) =>
  //         review.state === selectedRegion ? review.package_id : ""
  //       )
  //     );
  //     const abc = [...uniquePackagesSet].filter((item) => item !== "");
  //     setFilteredReviews(
  //       packageReviews?.filter((item) => abc.includes(item.package_id))
  //     );
  //   }
  // }, [allPackages, packageReviews, selectedRegion]);

  useEffect(() => {
    if (packageReviews?.length > 0) {
      setFilteredReviews(packageReviews);
      setIsLoading(false)
    }
  }, [packageReviews]);

  // useEffect(() => {
  //   if (serchInput) {
  //     const uniquePackagesSet = new Set(
  //       allPackages?.map((review) =>
  //         review.package_name.toLowerCase().includes(serchInput.toLowerCase())
  //           ? review.package_id
  //           : ""
  //       )
  //     );
  //     const abc = [...uniquePackagesSet].filter((item) => item !== "");
  //     const uniqueStatesSet = new Set(
  //       allPackages?.map((review) =>
  //         review.state.toLowerCase().includes(serchInput.toLowerCase())
  //           ? review.package_id
  //           : ""
  //       )
  //     );
  //     const abc1 = [...uniqueStatesSet].filter((item) => item !== "");
  //     const uniqueCitySet = new Set(
  //       allPackages?.map((review) =>
  //         review.city.toLowerCase().includes(serchInput.toLowerCase())
  //           ? review.package_id
  //           : ""
  //       )
  //     );
  //     const abc2 = [...uniqueCitySet].filter((item) => item !== "");
  //     const mergedArray = [...new Set([...abc, ...abc1, ...abc2])];
  //     setFilteredReviews(
  //       packageReviews?.filter((item) => mergedArray.includes(item.package_id))
  //     );
  //   } else {
  //     setFilteredReviews(packageReviews);
  //   }
  // }, [serchInput, packageReviews, allPackages]);

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
        setFilteredReviews(sorted);
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

  function capitalizeWords(sentence) {
    if (typeof sentence !== "string") {
      return "";
    }
    return sentence
      .toLowerCase()
      .split(" ")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" ");
  }

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
          {/* <div className="relative flex justify-center items-center border py-3 px-4 lg:px-3 gap-1 lg:gap-5 rounded-lg w-full md:w-[45%] lg:w-[35%] bg-gray-50">
            <input
              className="border-none focus:ring-0 focus:outline-none w-full bg-transparent"
              type="text"
              placeholder="Search reviews for a tour or destination ..."
              onChange={(e) => setSerchInput(e.target.value)}
              value={serchInput}
            />
            <Search className="size-4 text-gray-500 cursor-pointer" />
          </div> */}
        </div>

        <div className="flex flex-col gap-5">
          {/* <p className="text-gray-700">
            We&apos;ve been receiving outstanding reviews from guests all around
            the world.
          </p> */}

          {/* <div className="flex justify-between items-center">
            <ul className="flex gap-5 overflow-x-auto w-full text-nowrap bg-gray-100 rounded-lg justify-left pt-4 pl-4">
              {reviewRegions?.map((region, index) => (
                <li key={index}>
                  <Button
                    className="text-black border px-3 py-2 w-full mb-3 rounded-lg cursor-pointer bg-gray-300"
                    onClick={() => setSelectedRegion(region)}
                  >
                    {capitalizeWords(region)}
                  </Button>
                </li>
              ))}
            </ul>
          </div> */}
        </div>
      </div>

      <div className="w-full h-full flex flex-col justify-between bg-gray-50 py-8">
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
          <Spinner size="lg" color="danger"/>
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
                                className="w-full h-full object-fill transition-all group-hover:scale-105"
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
                          className="w-full h-full object-fill transition-all group-hover:scale-105 aspect-[100/00]"
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
                    {/* <p className="flex gap-5 items-center">
                      <span>
                        <IoIosPerson className="size-7" />
                      </span>
                      <span className="font-medium">Tour Leader:</span>{" "}
                      {selectedReview.tour_leader}
                    </p> */}
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
