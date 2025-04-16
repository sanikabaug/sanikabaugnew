'use client'
import React, { useState, useEffect, useCallback, useRef } from "react";
import { Tabs, Tab, Card, CardBody, CardHeader, Checkbox, Button } from "@nextui-org/react";
// import RoomSelectionTab from "@/app/admin/hotel/propertymaster/roomamenities/RoomSelectionTab"
import { useSearchParams } from 'next/navigation'
import Swal from 'sweetalert2'
import toast, { Toaster } from 'react-hot-toast';

const RoomAmenitiesPage = () => {

    const [result, setResult] = useState([]);
    const [resultt, setResultt] = useState([]);
    
    const [resultOfRoomAmenities, setResultOfRoomAmenities] = useState([]);
    const [selectedBoxes, setSelectedBoxes] = useState();
    const [selectedArea, setSelectedArea] = useState();
    const [selectedAmenities, setSelectedAmenities] = useState();
    const [previousChecks, setPreviousChecks] = useState();
    const [selectedTabs, setSelectedTabs] = useState();

    const [initialEdit, setInitialEdit] = useState(false);
    const searchParams = useSearchParams();
    const hotel_id = parseInt(searchParams.get('hotel_id'));
    const [lastID, setLastID] = useState(0);
    const initialFxnCalled = useRef(false);
    const [arr, setArr] = useState([]);
    const [resetFlag, setResetFlag] = useState(false);

    const generateUniqueID = (index) => {

        const newID = `PMSRA${String(index + 1).padStart(5, '0')}`;
        setLastID(lastID + 1);
        return newID;
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


    const initialFxnnnn = async () => {
        try {
            const response = await fetch(`/api/pms/property_master/room_details?hotelId=${hotel_id.toString()}`, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                },
            });
            const result = await response.json();
           // console.log("Data:", result);
            setResultt(result.dataActive)
        } catch (error) {
            console.error("Error fetching data:", error);
        }
    }

    const initialFxn = async () => {
        const response = await fetch(`/api/property/property_amenities?hotelId=${hotel_id.toString()}`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            },
        });
        const result = await response.json();

        let adminResult = result.data;
        let partnerResult = result.pms_propertymaster_roomamenities;

        console.log("Data: ", adminResult, partnerResult, adminResult.length, partnerResult.length)

        if (partnerResult.length === 0) {


            let payload = adminResult.map((item, index) => {
                const { creation_date, last_update_on, status, amenities_value, amenities_id, propertyarea_id, ...rest } = item;
                return {
                    ...rest,
                    unique_id: generateUniqueID(index),
                    Hotel_Id: parseInt(hotel_id),
                    availability: ['none'],
                    creation_date: getCurrentDateTime(),
                    last_update_on: getCurrentDateTime(),
                    property_areaId: item.propertyarea_id,
                    property_amenitiesId: item.amenities_id,
                };

            })
            console.log("payload", payload)

            const response = await fetch('/api/pms/property_master/room_amenities', {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(payload),
            });
            const result = await response.json();

            console.log("result: ", result)

            setResult(result.data)
            setArr(result.data)

        } else if (adminResult.length === partnerResult.length) {
            setResult(partnerResult)
            setArr(partnerResult)
        } else if (adminResult.length < partnerResult.length) {

            let abc = partnerResult
            .filter(item =>
                !adminResult.some(fand => fand.amenities_id === item.property_amenitiesId)
            )
            .map(item => item.unique_id);

        console.log("Filter array: ", abc)

        const deleteFxn = async (abc) => {
            let payload = {
                Hotel_Id: parseInt(hotel_id),
                idArr: abc,
                action: "delete",
            }

            console.log("deletepay: ",payload)

            const response = await fetch('/api/pms/property_master/room_amenities', {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(payload),
            });
            const result = await response.json();

            setResult(result.data)
        }

        deleteFxn(abc)
           
        } else if (adminResult.length > partnerResult.length) {

            let lastidd = partnerResult[partnerResult.length - 1].unique_id;

            const lastIndexOfZero = lastidd.lastIndexOf('0');

            const numberPart = lastidd.substring(lastIndexOfZero + 1);

            let abc = adminResult
                .filter(item =>
                    !partnerResult.some(roomam => roomam.property_amenitiesId === item.amenities_id)
                );

            let abcd = abc.map((item, index) => {
                const { creation_date, last_update_on, status, amenities_value, amenities_id, propertyarea_id, ...rest } = item;
                return {
                    ...rest,
                    unique_id: generateUniqueID(parseInt(numberPart) + index),
                    Hotel_Id: parseInt(hotel_id),
                    availability: ['none'],
                    creation_date: getCurrentDateTime(),
                    last_update_on: getCurrentDateTime(),
                    property_areaId: item.propertyarea_id,
                    property_amenitiesId: item.amenities_id,
                };

            })

            let payload = {
                abcd: abcd,
                action: "addExtra",
            }

            const response = await fetch('/api/pms/property_master/room_amenities', {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(payload),
            });
            const result = await response.json();

            setResult(result.data)
        }
    }

    useEffect(() => {
        initialFxnnnn()
        initialFxn()
    }, [])

    useEffect(() => {
        console.log("Checks: ", selectedBoxes, selectedArea, selectedAmenities,
            previousChecks,
            selectedTabs)

        arr?.map((items) => {
            if (items.property_area === selectedArea && items.property_amenities === selectedAmenities) {
                items.availability = selectedBoxes;
                if (selectedTabs === "allrooms") {
                    items.availability = ['allrooms'];
                } else if (selectedTabs === "none") {
                    items.availability = ['none'];
                }
                console.log("Items:::::::>", items)
            }
        })

    }, [selectedBoxes, selectedArea, selectedAmenities,
        previousChecks,
        selectedTabs, arr])

    const handleSubmit = () => {
        const handleUpdate = async () => {

            let abcd = arr
                .filter(item => !item.availability.includes('none'))  // Filter out items where availability does not include 'none'
                .map(item => ({
                    unique_id: item.unique_id,
                    availability: item.availability
                }));

            console.log("ABCD:::::::>", abcd)

            let abc = {
                Hotel_Id: parseInt(hotel_id),
                abcd: abcd,
                action: "updateAvail",
            }

            const response = await fetch('/api/pms/property_master/room_amenities', {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(abc),
            });
            const result = await response.json();

            console.log("Update Result: ", result)

            if (result.success) {
                toast.success("Data Saved");
            } else {
                toast.error("Error Occured");
            }
        }

        handleUpdate()

    }

    const handleReset = () => {
        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, reset it!"
        }).then(async (result) => {
            if (result.isConfirmed) {

                setResetFlag(!resetFlag)

                let payload = {

                    Hotel_Id: hotel_id,

                    availability: ['none'],

                    operation: "reset",
                }


                const response = await fetch('/api/pms/property_master/room_amenities', {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify(payload),
                });
                const result = await response.json();

            }
        });

    }

    const handleSelectedCheckBoxes = async (data, area, amenities, areaId, checkboxSelect, selected) => {
        console.log("Check Data0: ", data, area, amenities, hotel_id, checkboxSelect, selected)

        setSelectedBoxes(data);
        setSelectedArea(area);
        setSelectedAmenities(amenities);
        setPreviousChecks(checkboxSelect);
        setSelectedTabs(selected);

    }

    return (
        <>
            <Toaster
                position="top-right"
                reverseOrder={false} />
            <div className='m-4 p-4 flex justify-between flex-col lg:flex-row gap-5'>
                <h1 className='text-2xl text-foreground-300 font-semibold text-center lg:text-start'>Room Amenities</h1>
                <div className="flex justify-center items-center gap-5 flex-row ">
                    <Button className="mr-4" variant='shadow' color='primary' size='sm' onClick={handleSubmit}>Save</Button>
                    <Button variant='shadow' color='primary' size='sm' onClick={handleReset}>Reset</Button>
                </div>
            </div>


            {result && Array.isArray(result) && [...new Set(result?.map(item => item.property_area))].map((property_area) => (
                // eslint-disable-next-line react/jsx-key
                <div className='bg-foreground-800 h-fit rounded-xl m-4 p-4 shadow-xl' >

                    <h1 className='text-xl text-foreground-300 font-semibold'>{property_area}</h1>
                    {property_area === "Top"
                        ? <h4 className='text-sm text-foreground-300'>Listing your facilities can really help influence guests to book! Update the ones available at your property or on-site below.</h4>
                        : ""
                    }
                    <div className='w-full grid grid-cols-1 lg:grid-cols-2 place-items-center mt-4 gap-5 '>
                        {result.filter((item) => item.property_area === property_area).map((items) => (
                            <>
                                <div className='flex gap-4 justify-between m-2 items-center flex-col'>
                                    <h4 className='text-base text-foreground-300'>{items.property_amenities}</h4>
                                    <div>
                                        {/* <RoomSelectionTab hotel_id={hotel_id} onSelectedChecks={handleSelectedCheckBoxes} area={items.property_area} amenity={items.property_amenities} areaId={items.propertyarea_id} checkboxSelect={result.length > resultOfRoomAmenities.length ? [] : items.availability} selectedTabss={items.availability} resetFlag={resetFlag} result={resultt}/> */}
                                    </div>
                                </div>
                            </>
                        ))}
                    </div>
                </div>
            ))}

        </>
    )
}

export default RoomAmenitiesPage;