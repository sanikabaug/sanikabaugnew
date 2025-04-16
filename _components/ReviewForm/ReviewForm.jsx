'use client'
import React, { useState, useEffect } from "react";
import { Input, Textarea, Button, Select, SelectItem } from "@nextui-org/react";
import { Plus, X } from "lucide-react";
import Image from "next/image"

const ReviewForm = () => {


    const [allPackages, setAllPackages] = useState([])

    const [selectedValue, setSelectedValue] = React.useState(new Set([]));

    const animals = allPackages;

    const [formData, setFormData] = useState({
        name: "",
        email: "",
        phone: "",
        // packageName: "",
        rating: "",
        // tourLeader: "",
        // travelledDate: "",
        tagline: "",
        description: ""
    });

    const generateUniqueID = async () => {
        const response = await fetch("/api/reviewApi", {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            },
        });
        const result = await response.json();

        let abc = result.result;

        if (abc.length === 0) {
            return `RF${String(0 + 1).padStart(5, "0")}`;
        } else {
            const lastElement = abc[abc.length - 1];
            const lastElementId = lastElement.package_id;

            const numericPartMatch = lastElementId.match(/RF*(\d+)/);
            const lastNumericId = numericPartMatch ? parseInt(numericPartMatch[1]) : null;


            return `PK${String(lastNumericId + 1).padStart(5, "0")}`;
        }
    };

    function getCurrentDateTime() {
        const today = new Date();
        const year = today.getFullYear();
        const month = String(today.getMonth() + 1).padStart(2, '0');
        const day = String(today.getDate()).padStart(2, '0');
        const hours = String(today.getHours()).padStart(2, '0');
        const minutes = String(today.getMinutes()).padStart(2, '0');
        const seconds = String(today.getSeconds()).padStart(2, '0');
        return `${day}-${month}-${year} ${hours}:${minutes}:${seconds}`;
    }


    const handleSubmit = async (e) => {

        console.log("submit")

        e.preventDefault();

        try {

            const rf_id = await generateUniqueID();


            const payload = {
                review_id: rf_id,
                name: formData.name,
                email: formData.email,
                phone: formData.phone,
                package_name: formData.packageName,
                package_id: selectedValue.currentKey,
                rating: formData.rating,
                tour_leader: formData.tourLeader,
                traveled_date: formData.travelledDate,
                tagline: formData.tagline,
                description: formData.description,
                image: [],
                creation_date: getCurrentDateTime()
            }

            const response = await fetch(
                `/api/reviewApi`,
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify(payload)
                }
            );
            const result = await response.json();

            if (result.success === true) {
                alert("Thanks for the review!")
                window.location.reload()
            }

        } catch (error) {

        }

    };


    const handleInputChange = (e) => {
        const { name, value } = e.target;
        if (name === "packageName") {
            setFormData((prevData) => ({
                ...prevData,
                [name]: allPackages?.find((item) => item.package_id === value).package_name,
            }));
        } else {
            setFormData((prevData) => ({
                ...prevData,
                [name]: value,
            }));
        }
    };



    return (
        <div className="max-w-xl mx-auto p-4 bg-white shadow-md rounded-md mt-4">
            <h2 className="text-2xl font-bold mb-4">Submit Your Review</h2>

            {/* Form Start */}
            <form onSubmit={(e) => {



                handleSubmit(e)



            }}>
                {/* Name */}
                <div className="mb-4">
                    <label className="block text-gray-700 mb-1">Name</label>
                    <Input
                        fullWidth
                        placeholder="Your Name"
                        name="name"
                        value={formData.name}
                        onChange={handleInputChange}
                    />
                </div>

                {/* Email */}
                <div className="mb-4">
                    <label className="block text-gray-700 mb-1">Email</label>
                    <Input
                        fullWidth
                        placeholder="Your Email"
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                    />
                </div>

                {/* Phone Number */}
                <div className="mb-4">
                    <label className="block text-gray-700 mb-1">Phone Number</label>
                    <Input
                        fullWidth
                        placeholder="Your Phone Number"
                        type="tel"
                        name="phone"
                        value={formData.phone}
                        onChange={handleInputChange}
                    />
                </div>

                

                {/* Rating */}
                <div className="mb-4">
                    <label className="block text-gray-700 mb-1">Rating</label>
                    <Input
                        fullWidth
                        placeholder="Rate from 1 to 5"
                        type="number"
                        name="rating"
                        value={formData.rating}
                        onChange={handleInputChange}
                        min="1"
                        max="5"
                    />
                </div>

                {/* Tour Leader */}
                {/* <div className="mb-4">
                    <label className="block text-gray-700 mb-1">Tour Leader</label>
                    <Input
                        fullWidth
                        placeholder="Tour Leader's Name"
                        name="tourLeader"
                        value={formData.tourLeader}
                        onChange={handleInputChange}
                    />
                </div> */}

                {/* Travelled Date */}
                {/* <div className="mb-4">
                    <label className="block text-gray-700 mb-1">Travelled Date</label>
                    <Input
                        fullWidth
                        type="date"
                        name="travelledDate"
                        value={formData.travelledDate}
                        onChange={handleInputChange}
                    />
                </div> */}

                {/* Tagline */}
                <div className="mb-4">
                    <label className="block text-gray-700 mb-1">Tag line</label>
                    <Input
                        fullWidth
                        type="text"
                        name="tagline"
                        placeholder="Tag Line"
                        value={formData.tagline}
                        onChange={handleInputChange}
                    />
                </div>

                {/* Description */}
                <div className="mb-4">
                    <label className="block text-gray-700 mb-1">Description</label>
                    <Textarea
                        fullWidth
                        placeholder="Describe your experience..."
                        minRows={4}
                        name="description"
                        value={formData.description}
                        onChange={handleInputChange}
                    />
                </div>

                {/* Submit Button */}
                <div className="text-right">
                    <Button color="primary" type="submit">
                        Submit Review
                    </Button>
                </div>
            </form>
        </div>
    );
};

export default ReviewForm;
