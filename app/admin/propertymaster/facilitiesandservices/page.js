'use client'
import React, { useState, useEffect, useCallback, useRef } from "react";
import { Button, Checkbox, CheckboxGroup } from "@nextui-org/react";
import { useSearchParams } from 'next/navigation'
import Swal from 'sweetalert2'
import toast, { Toaster } from 'react-hot-toast';
import {Star} from "lucide-react"

const FacilitiesAndServicesPage = () => {

    const searchParams = useSearchParams();
    const hotel_id = searchParams.get('hotel_id');
    const [result, setResult] = useState([]);
    const [roomfands, setRoomfands] = useState([]);
    const [arr, setArr] = useState([]);
    const initialFxnCalled = useRef(false);
    const [lastID, setLastID] = useState(0);
    const [selectedCheckBoxes, setSelectedCheckBoxes] = useState();
    const [prevSelectedCheckBoxes, setPrevSelectedCheckBoxes] = useState();

    const lastIDRef = useRef(0);



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

    const initialFxn = async () => {
        try {

            const response = await fetch(`/api/fands/fands_combs?hotelId=${hotel_id.toString()}`, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                },
            });
            const result = await response.json();

            let res_fandscomb = result.data_active;
            let res_roomfands = result.pms_propertymaster_roomfands;

            console.log("Data: ", res_fandscomb, res_roomfands, res_fandscomb.length, res_roomfands.length)

            const generateUniqueID = (index) => {

                const currentID = lastIDRef.current;
                const newID = `PMSFS${String(index + 1).padStart(5, '0')}`;
                lastIDRef.current = currentID + 1;
                console.log("Last id::::::>", newID)
                return newID;
            };


            if (res_roomfands.length === 0) {

                let abc = res_fandscomb.map((item, index) => {
                    const { id, ...rest } = item;
                    return {
                        ...rest,
                        id: generateUniqueID(index),
                        Hotel_Id: parseInt(hotel_id),
                        availability: false,
                        creation_date: getCurrentDateTime(),
                        last_update_on: getCurrentDateTime()
                    };

                })

                const response = await fetch('/api/pms/property_master/room_fands', {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify(abc),
                });
                const result = await response.json();

                setResult(result.data)

            } else if (res_fandscomb.length === res_roomfands.length) {

                setResult(res_roomfands)

                let res = res_roomfands;
                let init = [];
                res?.map((item) => {
                    if (item.availability === true) {
                        init.push(item.fands_itemid)
                    }
                })
                setSelectedCheckBoxes(init)
                setPrevSelectedCheckBoxes(init)
            } else if (res_fandscomb.length < res_roomfands.length) {

                let abc = res_roomfands
                    .filter(item =>
                        !res_fandscomb.some(fand => fand.fands_itemid === item.fands_itemid)
                    )
                    .map(item => item.id);

                console.log("Filter array: ", abc)

                const deleteFxn = async (abc) => {
                    let payload = {
                        Hotel_Id: parseInt(hotel_id),
                        idArr: abc,
                        action: "delete",
                    }

                    const response = await fetch('/api/pms/property_master/room_fands', {
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

            } else if (res_fandscomb.length > res_roomfands.length) {

                let lastidd = res_roomfands[res_roomfands.length - 1].id;

                const lastIndexOfZero = lastidd.lastIndexOf('0');

                const numberPart = lastidd.substring(lastIndexOfZero + 1);

                let abc = res_fandscomb
                    .filter(item =>
                        !res_roomfands.some(fand => fand.fands_itemid === item.fands_itemid)
                    );

                let abcd = abc.map((item, index) => {
                    const { id, ...rest } = item;
                    return {
                        ...rest,
                        id: generateUniqueID(parseInt(numberPart) + index),
                        Hotel_Id: parseInt(hotel_id),
                        availability: false,
                        creation_date: getCurrentDateTime(),
                        last_update_on: getCurrentDateTime()
                    };

                })

                let payload = {
                    abcd: abcd,
                    action: "addExtra",
                }

                const response = await fetch('/api/pms/property_master/room_fands', {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify(payload),
                });
                const result = await response.json();

                setResult(result.data)

            }

        } catch (error) {

        }
    }

    useEffect(() => {
        initialFxn()
    }, [])

    useEffect(() => {
        if (selectedCheckBoxes) {
            console.log("selectedCheckBoxes: ", selectedCheckBoxes)
        }
    }, [selectedCheckBoxes])

    const handleSubmit = () => {

        const handleUpdate = async () => {
            let abc = {
                Hotel_Id: parseInt(hotel_id),
                prevSelectedCheckBoxes: prevSelectedCheckBoxes !== undefined ? prevSelectedCheckBoxes.filter(item => !selectedCheckBoxes.includes(item)) : [],
                selectedCheckBoxes: selectedCheckBoxes,
                action: "updateAvail",
            }

            const response = await fetch('/api/pms/property_master/room_fands', {
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

        setPrevSelectedCheckBoxes(selectedCheckBoxes)
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

                setSelectedCheckBoxes([])


                let payload = {

                    Hotel_Id: hotel_id,

                    availability: false,

                    operation: "reset",
                }

                const response = await fetch('/api/pms/property_master/room_fands', {
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



    return (
        <>
            <Toaster
                position="top-right"
                reverseOrder={false} />
            <div className='m-4 p-4 flex justify-between flex-col lg:flex-row gap-5'>
                <div>
                    <h1 className='text-2xl text-foreground-300 font-semibold'>Facilities & services</h1>
                    <h4 className='text-sm text-foreground-300'>Listing your facilities can really help influence guests to book! Update the ones available at your property or on-site below.</h4>
                </div>
                <div className="flex lg:justify-center items-center gap-5">
                <Button variant='shadow' color='primary' onClick={handleSubmit}>Save</Button>
                <Button variant='shadow' color='primary' onClick={handleReset}>Reset</Button>
                </div>
            </div>

            {/* Top facilities */}
            {result && Array.isArray(result) && [...new Set(result?.map(item => item.fands_category))].map((fands_category) => (
                // eslint-disable-next-line react/jsx-key
                <div className='bg-foreground-800 h-fit rounded-xl m-4 p-4 shadow-xl '>
                    <h1 className='text-xl text-foreground-300 font-semibold mb-4'>{fands_category}</h1>

                    {fands_category === "Top Facilities"

                        ? <CheckboxGroup
                            color="warning"
                            value={selectedCheckBoxes}
                            onValueChange={setSelectedCheckBoxes}
                        >
                            <div className='grid w-full justify-between grid-cols-1 lg:grid-cols-2'>

                                {result.filter((item) => item.fands_category === fands_category).map((items) => (
                                    // eslint-disable-next-line react/jsx-key
                                    <div className='flex gap-1 justify-between mt-2 w-full lg:w-[75%]'>
                                        <Star className="size-6 text-background" />
                                        <h4 className='text-base text-foreground-300'>{items.fands_item}</h4>
                                        <Checkbox key={items.fands_item} value={items.fands_itemid}

                                        ></Checkbox>
                                    </div>
                                ))}
                            </div>
                        </CheckboxGroup>
                        : <div className='w-full flex flex-col'>
                            <CheckboxGroup
                                color="warning"
                                value={selectedCheckBoxes}
                                onValueChange={setSelectedCheckBoxes}
                            >
                                {result.filter((item) => item.fands_category === fands_category).map((items) => (
                                    <div key="" className='flex gap-4 justify-between mt-2'>
                                        <h4 className='text-base text-foreground-300'>{items.fands_item}</h4>
                                        <Checkbox key={items.fands_item} value={items.fands_itemid}

                                        ></Checkbox>
                                    </div>
                                ))}
                            </CheckboxGroup>
                        </div>
                    }
                </div>
            ))}


            {/* Safety features */}



        </>
    )
}

export default FacilitiesAndServicesPage;