'use client'
import React, { useState, useEffect } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/free-mode';
import 'swiper/css/navigation';
import 'swiper/css/thumbs';
import '@/app/styles/rooms.css';
import { FreeMode, Navigation, Thumbs } from 'swiper/modules';
import { CalendarRange, Search, NotebookPen } from "lucide-react"
import Daterangepickerreact from "@/_components/Home/Daterangepickerreact"
import { PiUsersLight } from "react-icons/pi";
import RoomsAndGuests from '@/_components/Home/RoomsAndGuests'
import { Button, Card, CardHeader, CardBody, CardFooter, Autocomplete, AutocompleteItem, Checkbox } from '@nextui-org/react'
import { today, getLocalTimeZone } from "@internationalized/date";
import { AlarmClockCheck, Moon, BedDouble, CircleArrowRight, Clock, MapPin, Plane, IndianRupee, Wifi, Cctv, Droplets, CircleParking, Dish, GlassWater, UsersRound } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import IMAGES from '@/public';
import { format, parse, eachDayOfInterval } from "date-fns";
import { Spinner } from "@nextui-org/react";
import {
    Modal,
    ModalContent,
    ModalHeader,
    ModalBody,
    ModalFooter,
    useDisclosure,
} from "@nextui-org/modal";


const SelectMonth = ({
    allRoomsDet,
    onCheckindate,
    onCheckoutdate,
    onSelectedDateRange,
    onAdultsSelect,
    onChildSelect,
    onFilteredResults,
    maxadults,
    maxchilds,
    roomprice,
    checkInDataForSum,
    checkOutDataForSum,
    roombaseprice,
    onRoomAvailableClicked,
    roomDetails,
    selectedRoomIdd
}
) => {

    const [selectedRoomId, setSelectedRoomId] = useState(selectedRoomIdd);
    const [selectedRoomCount, setSelectedRoomCount] = useState("1");
    const [selectedExtraperson, setSelectedExtraperson] = useState("0");
    const [selectedGuestPerRoom, setSelectedGuestPerRoom] = useState("1");

    const [checked, setChecked] = useState(false);

    const { isOpen, onOpen, onOpenChange, onClose } = useDisclosure();

    let defaultDate = today(getLocalTimeZone());

    const nextDay = defaultDate.add({ days: 1 });

    const router = useRouter();

    const [adultsSelect, setAdultsSelect] = useState("1");
    const [childSelect, setChildSelect] = useState("0");

    const [roomAvailableClicked, setRoomAvailableClicked] = useState(false);

    const formatDate = (date) => {
        const day = String(date.day).padStart(2, "0");
        const month = String(date.month).padStart(2, "0");
        const year = String(date.year);
        return `${day}-${month}-${year}`;
    };

    function formatDatee(dateString) {
        const [day, month, year] = dateString.split("-");
        const months = [
            "Jan",
            "Feb",
            "Mar",
            "Apr",
            "May",
            "Jun",
            "Jul",
            "Aug",
            "Sep",
            "Oct",
            "Nov",
            "Dec",
        ];
        const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

        const date = new Date(year, month - 1, day);
        const dayName = days[date.getDay()];
        const monthName = months[date.getMonth()];

        return `${dayName} ${day} ${monthName}`;
    }

    const parseDatee = (dateString) => {
        const [day, month, year] = dateString.split("-").map(Number);
        return new Date(year, month - 1, day);
    };

    const [checkindate, setCheckindate] = useState(formatDate(defaultDate));
    const [checkoutdate, setCheckoutdate] = useState(formatDate(nextDay));

    const [selectedDateRange, setSelectedDateRange] = useState([
        {
            startDate: parseDatee(formatDate(defaultDate)),
            endDate: parseDatee(formatDate(nextDay)),
            key: "selection",
        },
    ]);

    console.log("selectedDateRange:::::>", selectedDateRange)

    // const searchedDate = "25-11-2024";
    // const checkoutdate = "26-11-2024";

    const differenceInDays = (date1, date2) => (new Date(date2.split('-').reverse().join('-')) - new Date(date1.split('-').reverse().join('-'))) / (1000 * 3600 * 24);
    const [initialDate, setInitialDate] = useState(
        differenceInDays(checkindate, checkoutdate)
    );


    const handleDateSelect = (val) => {

        const formatDate = (date) => {
            const day = String(date.getDate()).padStart(2, "0");
            const month = String(date.getMonth() + 1).padStart(2, "0"); // Months are 0-based
            const year = date.getFullYear();
            return `${day}-${month}-${year}`;
        };
        const formattedStartDate = formatDate(val[0].startDate);
        const formattedEndDate = formatDate(val[0].endDate);

        setCheckindate(formattedStartDate);
        setCheckoutdate(formattedEndDate);
        setSelectedDateRange(val);


    };

    const handleAdultSelect = (value) => {
        setAdultsSelect(value);

    };
    const handleChildSelect = (value) => {
        setChildSelect(value);

    };

    useEffect(() => {
        if (roomAvailableClicked) {
            onRoomAvailableClicked(roomAvailableClicked)
        }
    }, [roomAvailableClicked])


    const searchActionMobile = () => {
        try {

            setRoomAvailableClicked(true)
            const filteredRooms = allRoomsDet.filter((item) => {

                const isAdultValid = item.base_adult <= adultsSelect && item.max_adult >= adultsSelect;

                const isChildValid = (item.base_child <= childSelect && item.max_child >= childSelect) || (childSelect === 0 && item.base_child >= 1);

                return isAdultValid && isChildValid;

            });

            onFilteredResults(filteredRooms)
            onCheckindate(checkindate);
            onCheckoutdate(checkoutdate);
            onSelectedDateRange(selectedDateRange);
            onAdultsSelect(adultsSelect);
            onChildSelect(childSelect);

        } catch (error) {
            console.log("Error:::::>", error)
        }

    }

    const searchActionLarge = () => {
        try {
            const filteredRooms = allRoomsDet.filter((item) => {

                const isAdultValid = item.base_adult <= adultsSelect && item.max_adult >= adultsSelect;

                const isChildValid = (item.base_child <= childSelect && item.max_child >= childSelect) || (childSelect === 0 && item.base_child >= 1);

                return isAdultValid && isChildValid;

            });

            onFilteredResults(filteredRooms)
            onCheckindate(checkindate);
            onCheckoutdate(checkoutdate);
            onSelectedDateRange(selectedDateRange);
            onAdultsSelect(adultsSelect);
            onChildSelect(childSelect);

        } catch (error) {
            console.log("Error:::::>", error)
        }

    }

    ///////////////checkout///////////////////////////////////////////////////////////////

    const generateUniqueID = async () => {
        const response = await fetch("/api/userApi/booking_details", {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            },
        });
        const result = await response.json();

        let abc = result.data;

        if (abc.length === 0) {
            return `BK${String(0 + 1).padStart(5, "0")}`;
        } else {
            const lastElement = abc[abc.length - 1];
            const lastElementId = lastElement.booking_id;

            // Updated regular expression without named capturing group
            const numericPartMatch = lastElementId.match(/BK0*(\d+)/);
            const lastNumericId = numericPartMatch ? parseInt(numericPartMatch[1]) : null;


            return `BK${String(lastNumericId + 1).padStart(5, "0")}`;
        }
    };

    function getCurrentDateTime() {
        const today = new Date();
        const year = today.getFullYear();
        const month = String(today.getMonth() + 1).padStart(2, "0");
        const day = String(today.getDate()).padStart(2, "0");
        const hours = String(today.getHours()).padStart(2, "0");
        const minutes = String(today.getMinutes()).padStart(2, "0");
        const seconds = String(today.getSeconds()).padStart(2, "0");
        return `${day}-${month}-${year} ${hours}:${minutes}:${seconds}`;
    }


    const handleCheckout = async () => {
        try {
            
            const { startDate, endDate } = selectedDateRange[0];

            const formatDate = (date) => {
                const day = String(date.getDate()).padStart(2, "0");
                const month = String(date.getMonth() + 1).padStart(2, "0");
                const year = date.getFullYear();
                return `${day}-${month}-${year}`;
            };

            await Promise.resolve(searchActionLarge());

            const formattedStartDate = formatDate(startDate);
            const formattedEndDate = formatDate(endDate);

            const abc = differenceInDays(formattedStartDate, formattedEndDate)
    
    
            let payload = {
                user_id: "",
                booking_id: await generateUniqueID(),
                salutation: "Mr",
                username: "",
                email: "",
                phone: "",
                Hotel_Id: "123456",
                Hotel_name: "Sanika Baug",
                booking_date: getCurrentDateTime(),
                arrival_time:'',
                roomDet: [roomdetPayload],
                price: (roombaseprice * abc),
                status: "inprocess",
                city: '',
                zip: '',
                adults_count: adultsSelect,
                checkin_date: formatDatee(formattedStartDate),
                checkout_date: formatDatee(formattedEndDate),
                checkin_dateF: formattedStartDate,
                checkout_dateF: formattedEndDate,
                rooms_count: 1,
                childrens_count: childSelect,
                pflag0: 0,
                pflag1: 0,
                pflag2: 0,
                pflag3: 0,
                payment_id: "",
                order_id: "",
                signature: "",
                refund_flag: 0,
                selectedGuestPerRoom: selectedGuestPerRoom,
                selectedRoomCount: selectedRoomCount,
                selectedExtraperson: selectedExtraperson,
                totalExtraGuest: roomdetPayload.totalExtraGuest,
                totalGuestWithExtraPerson: roomdetPayload.totalGuestWithExtraPerson,
                totalroomamountwithextraguest: roomdetPayload.totalroomamountwithextraguest,
                created_date: getCurrentDateTime(),
                last_update_on: getCurrentDateTime(),
            };
    
            // const response = await fetch("/api/userApi/booking_details", {
            //     method: "POST",
            //     headers: {
            //         "Content-Type": "application/json",
            //     },
            //     body: JSON.stringify(payload),
            // });
    
            // const result = await response.json();
    
            // if (result.user_bookings && Object.keys(result.user_bookings).length > 0) {
                router.push(`/filterpage/checkout?id=${payload?.booking_id}&&payload=${encodeURIComponent(JSON.stringify(payload))}`);
            // }
        } catch (error) {
            console.error("Checkout failed", error);
        }
    };
    
    

    const handleRoomChange = () => {
    //     console.log("Abcd:::::::", selectedRoomId, selectedRoomCount, selectedExtraperson, selectedGuestPerRoom)

    //     const updatedIsSelected = roomdetPayload.map((item) =>
    //         item.main_id === selectedRoomId
    //             ? {
    //                 ...item,
    //                 value: false,
    //                 totalroomamount: parseInt(item.amount) * parseInt(selectedRoomCount),
    //                 selectedRoomCount: selectedRoomCount,
    //                 selectedExtraperson: selectedExtraperson,
    //                 selectedGuestPerRoom: selectedGuestPerRoom,
    //                 totalGuest: parseInt(selectedGuestPerRoom) * parseInt(selectedRoomCount),
    //                 totalExtraGuest: parseInt(selectedExtraperson) * parseInt(selectedRoomCount),
    //                 totalroomamountwithextraguest: (parseInt(item.amount) * parseInt(selectedRoomCount)) + ((parseInt(selectedExtraperson) * parseInt(selectedRoomCount)) * 200),
    //                 totalExtraGuestAmount: (parseInt(selectedExtraperson) * parseInt(selectedRoomCount)) * 200,
    //                 guestWithExtraPerson: parseInt(selectedGuestPerRoom) + parseInt(selectedExtraperson),
    //                 totalGuestWithExtraPerson: (parseInt(selectedGuestPerRoom) + parseInt(selectedExtraperson)) * parseInt(selectedRoomCount),
    //             }
    //             : item
    //     );

    //     console.log("Updated isSelected:", updatedIsSelected);

    //     setIsSelected(updatedIsSelected)

    //     setSelectedRoomId("")
    //     setSelectedRoomCount("1")
    //     setSelectedExtraperson("0")
    //     setSelectedGuestPerRoom("1")

        onClose()

        handleCheckout()


    }

    useEffect(() => {
        if (selectedRoomId) {
            setSelectedGuestPerRoom(roomDetails.max_adults)
        }
    }, [selectedRoomId, roomDetails])

    const roomdetPayload = {
        id: roomDetails.id,
        main_id: roomDetails.mainid,
        name: roomDetails.roomname,
        value: true,
        amount: roomDetails.price,
        totalroomamount: parseInt(roomDetails.price) * parseInt(selectedRoomCount),
        totalroomamountwithextraguest: (parseInt(roomDetails.price) * parseInt(selectedRoomCount)) + ((parseInt(selectedExtraperson) * parseInt(selectedRoomCount)) * 200),
        adultCount: adultsSelect,
        childCount: childSelect,
        roomimage: roomDetails?.roomimage,
        selectedRoomCount: selectedRoomCount,
        selectedExtraperson: selectedExtraperson,
        selectedGuestPerRoom: selectedGuestPerRoom,
        totalGuest: parseInt(selectedGuestPerRoom) * parseInt(selectedRoomCount),
        totalExtraGuest: parseInt(selectedExtraperson) * parseInt(selectedRoomCount),
        totalExtraGuestAmount: (parseInt(selectedExtraperson) * parseInt(selectedRoomCount)) * 200,
        guestWithExtraPerson: parseInt(selectedGuestPerRoom) + parseInt(selectedExtraperson),
        totalGuestWithExtraPerson: (parseInt(selectedGuestPerRoom) + parseInt(selectedExtraperson)) * parseInt(selectedRoomCount),
    }

    const handleCheckoutt = () => {
        onOpen()
    }

    return (
        <div className="w-full rounded-xl shadow-xl bg-rose-50 border flex flex-col gap-5 h-[21rem] overflow-hidden">
            <div className="flex flex-col gap-2 w-full h-full">
                {/* Optional Header */}
                {/* <h2 className="text-base font-semibold">Tour Packages:</h2> */}

                <div className="w-full h-full lg:h-[60vh] flex flex-col lg:flex-col gap-5 hide-scrollbar">
                    <div className="flex flex-col gap-5 w-full">
                        <div className="my-4 w-full max-w-[35rem]">
                            <div className="flex flex-col w-full h-full gap-4 items-start m-auto text-black transition-all duration-200 ease-in-out">
                                <div className="flex flex-col w-full p-6 rounded-xl gap-6 backdrop-blur-sm">
                                    {/* Check-In Check-Out Section */}
                                    <div className="flex flex-col w-full gap-4">
                                        <p className="flex items-center justify-center gap-2 text-lg font-semibold">
                                            <CalendarRange className="size-8" />
                                            Check In - Check Out
                                        </p>
                                        <Daterangepickerreact
                                            className=""
                                            initialDate={initialDate}
                                            onDateValue={handleDateSelect}
                                            checkindate={checkindate}
                                        />
                                    </div>

                                    {/* Guests Section */}
                                    <div className="flex flex-col lg:flex-row items-center justify-center w-full gap-6">
                                        <div className="w-full">
                                            <p className="flex items-center justify-center gap-2 text-lg font-semibold">
                                                <PiUsersLight className="size-8" />
                                                Guests
                                            </p>
                                            <RoomsAndGuests
                                                adultsSelectParam={'1'}
                                                childSelectParam={'0'}
                                                onAdultsSelect={handleAdultSelect}
                                                onChildSelect={handleChildSelect}
                                                maxadults={maxadults}
                                                maxchilds={maxchilds}
                                            />
                                        </div>
                                    </div>

                                    {/* Button Section */}
                                    <div className="flex flex-col items-center justify-center w-full gap-4">
                                        {/* <Button
                                            isIconOnly
                                            size="lg"
                                            onClick={(e) => searchActionMobile()}
                                            className="flex lg:hidden w-full p-4 bg-[#333333] border border-black border-b-medium hover:bg-red-300 transition-all duration-200 text-white rounded-lg items-center justify-center gap-2"
                                        >
                                            <div className='flex flex-row gap-2 justify-center items-center'>
                                                <Search className="text-white size-5" />
                                                <span className="text-white">Check Availability</span>
                                            </div>

                                        </Button>

                                        <Button
                                            isIconOnly
                                            size="lg"
                                            onClick={(e) => searchActionLarge()}
                                            className="hidden lg:flex w-full p-4 bg-[#333333] border border-black border-b-medium hover:bg-red-300 transition-all duration-200 text-white rounded-lg items-center justify-center gap-2"
                                        >
                                            <div className='flex flex-row gap-2 justify-center items-center'>
                                                <Search className="text-white size-5" />
                                                <span className="text-white">Check Availability</span>
                                            </div>

                                        </Button> */}

                                        <Button
                                            isIconOnly
                                            size="lg"
                                            onClick={(e) => handleCheckoutt()}
                                            className="w-full p-4 border border-black border-b-medium bg-[#333333] hover:bg-red-300 transition-all duration-200 text-white rounded-lg flex items-center justify-center gap-2"
                                        >

                                            <div className='flex flex-row gap-2 justify-center items-center'>
                                                <NotebookPen className="text-white size-5" />
                                                <span className="text-white">Book Now</span>
                                            </div>

                                        </Button>
                                    </div>
                                </div>
                            </div>







                        </div>


                    </div>
                </div>

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
                                        Booking Details
                                    </div>
                                </ModalHeader>
                                <ModalBody className="mx-6">
                                    <div className="flex flex-col gap-4">
                                        <div className="grid grid-cols-2 gap-2">
                                            <div className="flex flex-col gap-2">
                                                <p className='font-semibold'>Check in</p>
                                                <div>
                                                    {checkindate}
                                                </div>
                                            </div>
                                            <div className="flex flex-col gap-2">
                                                <p className='font-semibold'>Check out</p>
                                                <div>
                                                    {checkoutdate}
                                                </div>
                                            </div>
                                        </div>

                                        <div className="grid grid-cols-2 gap-2">
                                            <div className="flex flex-col gap-2">
                                                <p className='font-semibold'>Rooms Count</p>
                                                <div>
                                                    <Autocomplete
                                                        key={selectedRoomCount}
                                                        size="sm"
                                                        variant="bordered"
                                                        defaultSelectedKey={selectedRoomCount}
                                                        className="w-full"
                                                        inputProps={{
                                                            classNames: {
                                                                inputWrapper: "w-[100%]",
                                                            },
                                                            readOnly: true,
                                                        }}
                                                        value={selectedRoomCount}
                                                        allowsCustomValue={true}
                                                        onInputChange={(value) =>
                                                            setSelectedRoomCount(value)
                                                        }
                                                        onSelectionChange={(key) => {
                                                            setSelectedRoomCount(key)
                                                        }}
                                                    >
                                                        {Array.from({ length: roomDetails.rooms_available }, (_, index) => index + 1).map((roomNumber) => (
                                                            <AutocompleteItem
                                                                key={roomNumber.toString()}
                                                                value={roomNumber.toString()}
                                                            >
                                                                {roomNumber.toString()}
                                                            </AutocompleteItem>
                                                        ))}
                                                    </Autocomplete>
                                                </div>
                                            </div>
                                            <div className="flex flex-col gap-2">
                                                <p className='font-semibold'>Guest Per Room</p>
                                                <div>
                                                    <Autocomplete
                                                        key={roomDetails.max_adults}
                                                        size="sm"
                                                        variant="bordered"
                                                        defaultSelectedKey={roomDetails.max_adults}
                                                        className="w-full"
                                                        inputProps={{
                                                            classNames: {
                                                                inputWrapper: "w-[100%]",
                                                            },
                                                            readOnly: true,
                                                        }}
                                                        value={roomDetails.max_adults}
                                                        allowsCustomValue={true}
                                                        onInputChange={(value) =>
                                                            setSelectedGuestPerRoom(value)
                                                        }
                                                        onSelectionChange={(key) => {
                                                            setSelectedGuestPerRoom(key)
                                                        }}
                                                    >
                                                        {Array.from({ length: 1 }, (_, index) => index + parseInt(roomDetails.max_adults)).map((guestCount) => (
                                                            <AutocompleteItem
                                                                key={guestCount.toString()}
                                                                value={guestCount.toString()}
                                                            >
                                                                {guestCount.toString()}
                                                            </AutocompleteItem>
                                                        ))}
                                                    </Autocomplete>
                                                </div>
                                            </div>
                                        </div>

                                        <div className="flex flex-col gap-2">
                                            <Checkbox isSelected={checked} color="default" onChange={(e) => setChecked((prevVal) => !prevVal)}>
                                                Add extra person
                                            </Checkbox>
                                            <div>
                                                {
                                                    checked
                                                        ? <div className="flex flex-col gap-1">
                                                            <Autocomplete
                                                                key={selectedExtraperson}
                                                                size="sm"
                                                                variant="bordered"
                                                                defaultSelectedKey={selectedExtraperson}
                                                                className="w-full"
                                                                inputProps={{
                                                                    classNames: {
                                                                        inputWrapper: "w-[50%]",
                                                                    },
                                                                    readOnly: true,
                                                                }}
                                                                value={selectedExtraperson}
                                                                allowsCustomValue={true}
                                                                onInputChange={(value) => setSelectedExtraperson(value)}
                                                                onSelectionChange={(key) => {
                                                                    setSelectedExtraperson(key);
                                                                }}
                                                            >
                                                                {Array.from({ length: parseInt(roomDetails.extra_person) + 1 }, (_, index) => index).map((extraCount) => (
                                                                    <AutocompleteItem
                                                                        key={extraCount.toString()}
                                                                        value={extraCount.toString()}
                                                                    >
                                                                        {extraCount.toString()}
                                                                    </AutocompleteItem>
                                                                ))}
                                                            </Autocomplete>
                                                            <p className="text-sm text-gray-700">₹ 200 (extra mattress) per extra person</p>
                                                        </div>
                                                        : ""
                                                }
                                            </div>
                                        </div>
                                    </div>

                                </ModalBody>
                                <ModalFooter>
                                    <Button color="primary" variant="solid" onClick={(e) => handleRoomChange()}>
                                        Add
                                    </Button>
                                    <Button color="danger" variant="light" onClick={onClose}>
                                        Close
                                    </Button>
                                </ModalFooter>
                            </>
                        )}
                    </ModalContent>
                </Modal>
            </div>
        </div>
    );
};

const Facilities = ({ roomservices }) => {
    return (
        <div className="flex justify-center items-center">
            <div className="w-[95%]">
                <div className="flex flex-col items-start justify-center gap-8">
                    <div className="text-2xl md:text-3xl font-semibold">Room Services</div>
                    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 w-full mt-4">
                        {roomservices?.map((item, index) => (
                            <Card
                                className="w-full h-full p-3 md:p-4 bg-[#F5F5DC]"
                                key={index.toString()}
                            >
                                <div className="flex flex-col items-center justify-center gap-1 md:gap-2 text-center text-[#333333]">
                                    <div className="text-sm md:text-base lg:text-lg">
                                        {item.icon}
                                    </div>
                                    <div className="text-sm md:text-base">
                                        {item.name}
                                    </div>
                                </div>
                            </Card>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};


const SimilarRooms = ({ similarrooms }) => {
    const [thumbsSwiper, setThumbsSwiper] = useState(null);

    return (
        <div className="flex justify-center items-center">
            <div className="w-[95%]">
                <div className="text-3xl mb-8 font-semibold">Similar Rooms</div>
                <Swiper
                    style={{
                        '--swiper-navigation-color': '#fff',
                        '--swiper-pagination-color': '#fff',
                    }}
                    loop={true}
                    spaceBetween={20}
                    slidesPerView={1}
                    navigation={true}
                    thumbs={{ swiper: thumbsSwiper }}
                    modules={[Navigation, Thumbs]}
                    className="mySwiper3"
                    breakpoints={{
                        // When window width is >= 320px (Mobile)
                        320: {
                            slidesPerView: 1, // Number of slides for small screens (mobiles)
                        },
                        // When window width is >= 768px (Tablet)
                        768: {
                            slidesPerView: 2, // Number of slides for tablets
                        },
                        // When window width is >= 1024px (Desktop)
                        1024: {
                            slidesPerView: 4, // Number of slides for large screens (desktops)
                        },
                    }}
                >
                    {similarrooms?.map((item, index) => (
                        <SwiperSlide key={index.toString()}>
                            <Card className="lg:min-h-[12rem] min-h-[20rem] w-[450px] flex flex-col justify-between">
                                <div className="w-full h-[228px] lg:h-[200px] overflow-hidden rounded-lg">
                                    <Image
                                        src={item.roomimages[0] ? item.roomimages[0] : IMAGES.Adminloginbg}
                                        className="w-full h-full object-cover"
                                        alt="Room"
                                        width={900}
                                        height={900}
                                    />
                                </div>
                                <div className="p-2 flex flex-col text-start">
                                    <div className="text-lg font-semibold">
                                        {item.room_name}
                                    </div>
                                    <div className="flex flex-col text-gray-600 text-wrap justify-end text-end items-end">
                                        <div className="text-sm">Starts from </div>
                                        <div className="inline-flex text-lg font-semibold">
                                            <IndianRupee /> {item.room_rate} per night
                                        </div>
                                    </div>
                                </div>
                            </Card>
                        </SwiperSlide>
                    ))}
                </Swiper>
            </div>
        </div>
    );
};



const BookingProcess = () => {
    const sectionVariants = {
        hidden: { opacity: 0, y: 30 },
        visible: {
            opacity: 1,
            y: 0,
            transition: { duration: 1, ease: "easeInOut" },
        },
    };

    const bookingProcess = [
        {
            id: "1",
            title: "Search & Select",
            description:
                "Use our search bar to explore available rooms. Filter by location, room type, and price, then select your favorite option from our curated listings.",
        },
        {
            id: "2",
            title: "Enter Details",
            description:
                "Provide the necessary booking details, including guest information, stay duration, and any special requests, in our easy-to-use booking form.",
        },
        {
            id: "3",
            title: "Safe Checkout",
            // description:
            //     "Review your selection and proceed to checkout. Complete your booking securely using your preferred payment method, such as credit/debit cards or UPI.",
            description:
                "Review your selection and submit your booking request. Our team will contact you to confirm the details and arrange for payment securely.",
        },
        {
            id: "4",
            title: "Confirmation",
            description:
                "Receive an instant confirmation email with your booking details. Get ready for a comfortable and hassle-free stay.",
        },
    ];

    return (
        <div className="flex justify-center items-center">
            <div className="w-[95%]">

                <div className="flex flex-col gap-16 justify-center items-center">
                    <h2 className="flex font-semibold text-3xl text-start self-start w-[95%]">
                        Booking Process
                    </h2>

                    <motion.div
                        key="booking-process-motion"
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: false }}
                        variants={sectionVariants}
                        className="grid grid-cols-1 lg:grid-cols-4 w-full lg:border-x-0 border-y-0"
                    >
                        <div className="border-y lg:border-y-0 lg:border-x lg:border-l-0 relative px-5 py-10">
                            <div className="flex flex-col gap-8">
                                <h2 className="text-xl text-center font-semibold text-gray-600">
                                    SEARCH & SELECT <span className="text-7xl text-[#333333]">1</span>
                                </h2>
                                <p className="px-5 text-gray-500 text-center lg:text-start">
                                    Use our search bar to explore available rooms. Filter by location, room type, and price, then select your favorite option from our curated listings.
                                </p>
                            </div>
                            <div
                                className={`absolute w-8 h-8 transform rotate-45 bg-[#333333] 
                lg:top-[40%] left-[40%] md:left-[45%] lg:left-auto lg:right-0 translate-x-1/2  lg:translate-x-[55%] 
                bottom-0  translate-y-1/2 z-10 `}
                            ></div>
                            <div
                                className={`absolute w-8 h-8 transform rotate-45 bg-white 
                lg:top-[40%] left-[40%] md:left-[45%] lg:left-auto lg:right-0 translate-x-1/2  lg:translate-x-[30%] 
                bottom-0  translate-y-[30%] lg:translate-y-1/2 z-10 `}
                            ></div>
                        </div>
                        <div className="border-y lg:border-y-0 lg:border-x relative px-5 py-10">
                            <div className="flex flex-col gap-8">
                                <h2 className="text-xl text-center font-semibold text-gray-600">
                                    ENTER DETAILS <span className="text-7xl text-[#333333]">2</span>
                                </h2>
                                <p className="px-5 text-gray-500 text-center lg:text-start">
                                    Provide the necessary booking details, including guest information, stay duration, and any special requests, in our easy-to-use booking form.
                                </p>
                            </div>
                            <div
                                className={`absolute w-8 h-8 transform rotate-45 bg-red-700 
                lg:top-[40%] left-[40%] md:left-[45%] lg:left-auto lg:right-0 translate-x-1/2  lg:translate-x-[55%] 
                bottom-0  translate-y-1/2 z-10`}
                            ></div>
                            <div
                                className={`absolute w-8 h-8 transform rotate-45 bg-white 
                lg:top-[40%] left-[40%] md:left-[45%] lg:left-auto lg:right-0 translate-x-1/2  lg:translate-x-[30%] 
                bottom-0  translate-y-[30%] lg:translate-y-1/2 z-10`}
                            ></div>
                        </div>
                        <div className="border-y lg:border-y-0 lg:border-x relative px-5 py-10">
                            <div className="flex flex-col gap-8">
                                <h2 className="text-xl text-center font-semibold text-gray-600">
                                    SAFE CHECKOUT <span className="text-7xl text-[#333333]">3</span>
                                </h2>
                                <p className="px-5 text-gray-500 text-center lg:text-start">
                                    Review your selection and submit your booking request. Our team will contact you to confirm the details and arrange for payment securely.
                                </p>
                            </div>
                            <div
                                className={`absolute w-8 h-8 transform rotate-45 bg-red-700 
                lg:top-[40%] left-[40%] md:left-[45%] lg:left-auto lg:right-0 translate-x-1/2  lg:translate-x-[55%] 
                bottom-0  translate-y-1/2 z-10`}
                            ></div>
                            <div
                                className={`absolute w-8 h-8 transform rotate-45 bg-white 
                lg:top-[40%] left-[40%] md:left-[45%] lg:left-auto lg:right-0 translate-x-1/2  lg:translate-x-[30%] 
                bottom-0  translate-y-[30%] lg:translate-y-1/2 z-10`}
                            ></div>
                        </div>
                        <div className="border-y lg:border-y-0 lg:border-x lg:border-r-0 relative px-5 py-10 w-[106%]">
                            <div className="flex flex-col gap-8">
                                <h2 className="text-xl text-center font-semibold text-gray-600">
                                    CONFIRMATION <span className="text-7xl text-[#333333]">4</span>
                                </h2>
                                <p className="px-5 text-gray-500 text-center lg:text-start">
                                    Receive an instant confirmation email with your booking details. Get ready for a comfortable and hassle-free stay.
                                </p>
                            </div>
                        </div>
                    </motion.div>
                </div>

            </div>
        </div>

    );
}



const RoomsTemplate = (props) => {

    const [selectedRoomId, setSelectedRoomId] = useState();

    const [thumbsSwiper, setThumbsSwiper] = useState(null);

    const [roomDetails, setRoomDetails] = useState({});

    const [allRoomsDet, setAllRoomsDet] = useState([]);

    let defaultDate = today(getLocalTimeZone());

    const nextDay = defaultDate.add({ days: 1 });

    const formatDatee = (date) => {
        const day = String(date.day).padStart(2, "0");
        const month = String(date.month).padStart(2, "0");
        const year = String(date.year);
        return `${day}-${month}-${year}`;
    };

    const formatYear = (date) => {
        const day = String(date.day).padStart(2, "0");
        const month = String(date.month).padStart(2, "0");
        const year = String(date.year);
        return `${year}`;
    };

    const checkindateParam = formatDatee(defaultDate);

    const [isLoading, setIsLoading] = useState(true);

    const checkoutdateParam = formatDatee(nextDay);

    const [filteredRoomDetails, setFilteredRoomDetails] = useState([]);

    const [searchedCheckInDate, setSearchedCheckInDate] = useState(checkindateParam);

    const [searchedCheckOutDate, setSearchedCheckOutDate] = useState(checkoutdateParam);

    const [initialYear, setInitialYear] = useState(formatYear(defaultDate));

    console.log("Date4s::::::::::>", searchedCheckInDate,
        searchedCheckOutDate)

    const adultsSelectComp = '1';

    const childSelectComp = '0';

    const [adultsSelectCompp, setSelectedAdultCount] = useState('');

    const [childSelectCompp, setSelectedChildCount] = useState('');

    const [selectedDateRange, setSelectedDateRange] = useState(null);

    const [diffindayss, setDiffindayss] = useState(1);

    const [roomAvailableClicked, setRoomAvailableClicked] = useState(false);

    function formatDate(dateString) {
        const [day, month, year] = dateString.split("-");
        const months = [
            "Jan",
            "Feb",
            "Mar",
            "Apr",
            "May",
            "Jun",
            "Jul",
            "Aug",
            "Sep",
            "Oct",
            "Nov",
            "Dec",
        ];
        const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

        const date = new Date(year, month - 1, day);
        const dayName = days[date.getDay()];
        const monthName = months[date.getMonth()];

        return `${dayName} ${day} ${monthName}`;
    }

    let formattedDateCheckin = formatDate(searchedCheckInDate);
    let formattedDateCheckout = formatDate(searchedCheckOutDate);

    const [checkInDataForSum, setCheckInDataForSum] = useState(formattedDateCheckin);
    const [checkOutDataForSum, setCheckOutDataForSum] = useState(formattedDateCheckout);

    function parseDate(dateString) {
        const [day, month, year] = dateString.split("-").map(Number);
        return new Date(year, month - 1, day); // Month is zero-indexed
    }

    const checkin = parseDate(searchedCheckInDate ? searchedCheckInDate : checkindateParam);
    const checkout = parseDate(searchedCheckOutDate ? searchedCheckOutDate : checkoutdateParam);

    const numberOfNights = (!isNaN(checkin) && !isNaN(checkout))
        ? (checkout - checkin) / (1000 * 60 * 60 * 24)
        : "Invalid Date";

    const [roomResult, setRoomResult] = useState();

    const [pricePerGuest, setPricePerGuest] = useState();
    const [manageInventory, setManageInventory] = useState();

    const roomnameuri = props.roomname;

    function formatRoomName(uri) {
        return uri
            .split("-")
            .map(word => word.charAt(0).toUpperCase() + word.slice(1))
            .join(" ");
    }

    const initialFxn = async () => {

        try {

            const response = await fetch(`/api/admin/property_master/room_details?hotelId=123456&&roomnameuri=${roomnameuri}`, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                },
            });
            const result = await response.json();

            const roomInform = result.dataofRoom1;

            const allRoomInform = result.dataAllActive;

            setFilteredRoomDetails(allRoomInform)

            setAllRoomsDet(allRoomInform)

            setSelectedRoomId(roomInform?._id)

            const roomInfo = {
                id: roomInform?.id,
                mainid: roomInform?._id,
                roomname: roomInform?.room_name,
                price: roomInform?.room_rate,
                images: roomInform?.roomimages,
                roomimage: roomInform?.roomimages[0],
                bed_type: roomInform?.bed_type[0].value,
                max_adults: roomInform?.max_adult,
                max_childs: roomInform?.max_child,
                description: roomInform?.roomdesc,
                roomservices: [
                    {
                        id: "1",
                        icon: <Wifi className="size-7" />,
                        name: "Wifi"
                    },
                    {
                        id: "2",
                        icon: <Cctv className="size-7" />,
                        name: "CCTV Cameras"
                    },
                    {
                        id: "3",
                        icon: <Droplets className="size-7" />,
                        name: "Hot & Cold Water"
                    },
                    {
                        id: "4",
                        icon: <CircleParking className="size-7" />,
                        name: "Parking"
                    },
                    {
                        id: "5",
                        icon: <GlassWater className="size-7" />,
                        name: "Mineral Water"
                    },
                    {
                        id: "6",
                        icon: <svg xmlns="http://www.w3.org/2000/svg" width="2em" height="2em" viewBox="0 0 640 512"><path fill="currentColor" d="M256 64H64C28.7 64 0 92.7 0 128v256c0 35.3 28.7 64 64 64h192zm32 384h288c35.3 0 64-28.7 64-64V128c0-35.3-28.7-64-64-64H288zM64 160c0-17.7 14.3-32 32-32h64c17.7 0 32 14.3 32 32v192c0 17.7-14.3 32-32 32H96c-17.7 0-32-14.3-32-32z"></path></svg>,
                        name: "Extra Matress"
                    },
                ],
                similarrooms: allRoomInform.filter((item) => item.room_name !== formatRoomName(roomnameuri)),
                rooms_available: roomInform?.rooms_available, 
                extra_person: roomInform?.extra_person,
            }

            setRoomDetails(roomInfo)

            console.log("Datas:::::::>", result.dataofRoom1, result.dataAllActive, allRoomInform.filter((item) => item.room_name === formatRoomName(roomnameuri)), formatRoomName(roomnameuri))


            const fetchRoomRate = () => {

                const ABC = async () => {
                    try {

                        let formattedDateCheckin = formatDate(searchedCheckInDate);
                        let formattedDateCheckout = formatDate(searchedCheckOutDate);

                        setCheckInDataForSum(formattedDateCheckin);
                        setCheckOutDataForSum(formattedDateCheckout);

                        const datesss =
                            searchedCheckInDate === null || searchedCheckOutDate === null
                                ? []
                                : getDatesBetween(formattedDateCheckin, formattedDateCheckout);

                        let diffindays = differenceInDays(searchedCheckInDate, searchedCheckOutDate);




                        if (datesss.length === diffindays) {
                        } else {
                            const formattedDateCheckoutttt = subtractOneDay(searchedCheckOutDate);

                            formattedDateCheckout = formatDate(formattedDateCheckoutttt);
                        }

                        console.log("formattedDateCheckin::::>", formattedDateCheckin,
                            formattedDateCheckout)

                        console.log("Year:::::::>", initialYear)

                        const results = await fetch(
                            `/api/admin/rates_and_inventory/managerateandinventory?hotelId=${"123456"}&searchedDate=${formattedDateCheckin}&checkoutdate=${formattedDateCheckout}&year=${initialYear}`,
                            {
                                method: "GET",
                                headers: {
                                    "Content-Type": "application/json",
                                },
                            }
                        )
                            .then((response) => {
                                if (!response.ok) {
                                    throw new Error("Network response was not ok");
                                }

                                return response.json();
                            })
                            .then(async (result) => {

                                console.log("Results::::::::>", result)

                                const groupByRoomId = (data) => {
                                    return data.reduce((acc, item) => {
                                        const { room_id } = item;
                                        if (!acc[room_id]) {
                                            acc[room_id] = [];
                                        }
                                        acc[room_id].push(item);
                                        return acc;
                                    }, {});
                                };

                                const groupedDatabyroomid = groupByRoomId(result.databybookingdates);

                                console.log("Results 1::::::::>", groupedDatabyroomid)

                                const ppgFxn = async (groupedDatabyroomid, roomResult) => {

                                    let payload = {
                                        Hotel_Id: "123456",
                                        action: "calculatePrice",
                                        groupedDatabyroomid: groupedDatabyroomid,
                                    };

                                    const response1 = await fetch(
                                        `/api/admin/rates_and_inventory/priceperguest`,
                                        {
                                            method: "POST",
                                            headers: {
                                                "Content-Type": "application/json",
                                            },
                                            body: JSON.stringify(payload),
                                        }
                                    );
                                    const result1 = await response1.json();

                                    console.log("Results 2::::::::>", result1)

                                    const groupBypriceperguestId = (data) => {
                                        return data.reduce((acc, item) => {
                                            const { roomid } = item;
                                            if (!acc[roomid]) {
                                                acc[roomid] = [];
                                            }
                                            acc[roomid].push(item);
                                            return acc;
                                        }, {});
                                    };

                                    let groupedPPG = groupBypriceperguestId(result1.data);

                                    console.log("Results 3::::::::>", groupedPPG)

                                    setManageInventory(groupedDatabyroomid);
                                    setPricePerGuest(groupedPPG);

                                }

                                ppgFxn(groupedDatabyroomid, roomResult)

                            })

                    } catch (error) {
                        console.log(error)
                    }
                }

                ABC()
            }
            fetchRoomRate()
        } catch (error) {
            console.log("Abc::::::::::>", error)
        } finally {
            setIsLoading(false)
        }

    }

    useEffect(() => {
        initialFxn()
    }, [])

    ////////////////////////////rates and inventory fxn////////////////////////////////

    const differenceInDays = (date1, date2) => (new Date(date2.split('-').reverse().join('-')) - new Date(date1.split('-').reverse().join('-'))) / (1000 * 3600 * 24);




    const subtractOneDay = (dateString) => {
        const [day, month, year] = dateString.split("-").map(Number);
        const date = new Date(year, month - 1, day);
        date.setDate(date.getDate() - 1);
        return formatDateee(date);
    };

    const formatDateee = (date) => {
        const day = String(date.getDate()).padStart(2, "0");
        const month = String(date.getMonth() + 1).padStart(2, "0"); // Months are 0-based
        const year = date.getFullYear();
        return `${day}-${month}-${year}`;
    };

    const getDatesBetween = (checkin, checkout) => {
        const checkinDate = parse(checkin, "EEE dd MMM", new Date());
        const checkoutDate = parse(checkout, "EEE dd MMM", new Date());
        const interval = eachDayOfInterval({
            start: checkinDate,
            end: checkoutDate,
        });

        return interval.map((date) => format(date, "EEE dd MMM"));
    };

    ////////////////////////////////////////////////////////////////////////




    useEffect(() => {
        const fetchRoomRate = () => {

            const ABC = async () => {
                try {

                    let formattedDateCheckin = formatDate(searchedCheckInDate);
                    let formattedDateCheckout = formatDate(searchedCheckOutDate);

                    setCheckInDataForSum(formattedDateCheckin);
                    setCheckOutDataForSum(formattedDateCheckout);

                    const datesss =
                        searchedCheckInDate === null || searchedCheckOutDate === null
                            ? []
                            : getDatesBetween(formattedDateCheckin, formattedDateCheckout);

                    let diffindays = differenceInDays(searchedCheckInDate, searchedCheckOutDate);
                    setDiffindayss(diffindays)


                    if (datesss.length === diffindays) {
                    } else {
                        const formattedDateCheckoutttt = subtractOneDay(searchedCheckOutDate);

                        formattedDateCheckout = formatDate(formattedDateCheckoutttt);
                    }

                    console.log("formattedDateCheckin1::::>", formattedDateCheckin,
                        formattedDateCheckout, selectedDateRange)

                    const year = new Date(selectedDateRange[0].startDate).getFullYear();

                    console.log("Year1:::::::>", year)

                    const results = await fetch(
                        `/api/admin/rates_and_inventory/managerateandinventory?hotelId=${"123456"}&searchedDate=${formattedDateCheckin}&checkoutdate=${formattedDateCheckout}&year=${year.toString()}`,
                        {
                            method: "GET",
                            headers: {
                                "Content-Type": "application/json",
                            },
                        }
                    )
                        .then((response) => {
                            if (!response.ok) {
                                throw new Error("Network response was not ok");
                            }

                            return response.json();
                        })
                        .then(async (result) => {

                            console.log("Results::::::::>", result)

                            const groupByRoomId = (data) => {
                                return data.reduce((acc, item) => {
                                    const { room_id } = item;
                                    if (!acc[room_id]) {
                                        acc[room_id] = [];
                                    }
                                    acc[room_id].push(item);
                                    return acc;
                                }, {});
                            };

                            const groupedDatabyroomid = groupByRoomId(result.databybookingdates);

                            console.log("Results 1::::::::>", groupedDatabyroomid)

                            const ppgFxn = async (groupedDatabyroomid, roomResult) => {

                                let payload = {
                                    Hotel_Id: "123456",
                                    action: "calculatePrice",
                                    groupedDatabyroomid: groupedDatabyroomid,
                                };

                                const response1 = await fetch(
                                    `/api/admin/rates_and_inventory/priceperguest`,
                                    {
                                        method: "POST",
                                        headers: {
                                            "Content-Type": "application/json",
                                        },
                                        body: JSON.stringify(payload),
                                    }
                                );
                                const result1 = await response1.json();

                                console.log("Results 2::::::::>", result1)

                                const groupBypriceperguestId = (data) => {
                                    return data.reduce((acc, item) => {
                                        const { roomid } = item;
                                        if (!acc[roomid]) {
                                            acc[roomid] = [];
                                        }
                                        acc[roomid].push(item);
                                        return acc;
                                    }, {});
                                };

                                let groupedPPG = groupBypriceperguestId(result1.data);

                                console.log("Results 3::::::::>", groupedPPG)

                                setManageInventory(groupedDatabyroomid);
                                setPricePerGuest(groupedPPG);

                            }

                            ppgFxn(groupedDatabyroomid, roomResult)

                        })

                } catch (error) {
                    console.log(error)
                }
            }

            ABC()
        }
        fetchRoomRate()
    }, [searchedCheckInDate, searchedCheckOutDate, filteredRoomDetails])


    const finalPrice = () => {
        if (!filteredRoomDetails) return;

        console.log('filteredRoomDetails::::::>', filteredRoomDetails, pricePerGuest, manageInventory)

        let finalPricee = 0;

        const res = filteredRoomDetails.forEach((item) => {

            if (item.id === roomDetails.id) {

                let sum = 0;
                let abvvvvv = [];
                let ccc = [];

                // console.log("Rates:::::::::>", pricePerGuest, manageInventory)

                if (pricePerGuest !== undefined && manageInventory !== undefined) {
                    let abc = pricePerGuest[item.id];

                    console.log("ABC::::::::", abc)

                    if (abc === undefined) {

                        ccc = manageInventory[item.id]?.map((item) => {
                            if (item.status === "soldout") {
                                return item.room_id
                            }
                        }).filter(item => item !== undefined)

                        let fff = manageInventory[item.id]?.map((item) => { return item.rate_24hr })

                        console.log("Datas:::::::::::::::::>", ccc, fff)

                        fff?.map((it, index) => {
                            abvvvvv.push(Math.round(it))
                        })

                        console.log("abvvvvv:::::::::::::::::>", abvvvvv)


                    } else {

                        let abcd;

                        console.log("Occupancy::::::>", adultsSelectComp, adultsSelectCompp, abc)

                        if (adultsSelectComp === undefined || adultsSelectCompp !== undefined) {
                            abcd = abc?.map((item2) => {
                                if (item2.occupancy === (adultsSelectCompp).toString()) {
                                    return item2
                                }
                            }).filter((item) => item !== undefined)
                        } else {


                            abcd = abc?.map((item2) => {
                                if (item2.occupancy === (adultsSelectComp).toString()) {
                                    return item2
                                }
                            }).filter((item) => item !== undefined)


                        }


                        ccc = manageInventory[item.id]?.map((item) => {
                            if (item.status === "soldout") {
                                return item.room_id
                            }
                        }).filter(item => item !== undefined)



                        let fff = manageInventory[item.id]?.map((item) => { return item.rate_24hr })

                        console.log("Data Rates::::::::>", fff, abcd)



                        fff?.map((item4) => {
                            abcd?.map((item5) => {
                                if (item.id === item5.roomid) {

                                    let priceToDisplay;

                                    if (item5.reduction === "Normal price reduced by" && item5.isActive === true) {

                                        if (item5.type === "INR") {
                                            priceToDisplay = parseInt(item4) - parseInt(item5.amount);
                                        }

                                        if (item5.type === "%") {
                                            const discount = parseInt(item4) * (parseInt(item5.amount) / 100);
                                            const newPrice = parseInt(item4) - discount;
                                            priceToDisplay = newPrice.toFixed(2);
                                        }

                                        abvvvvv.push(Math.round(priceToDisplay))



                                    } else if (item5.reduction === "Normal price increased by" && item5.isActive === true) {

                                        if (item5.type === "INR") {
                                            priceToDisplay = parseInt(item4) + parseInt(item5.amount);
                                            abvvvvv.push(Math.round(priceToDisplay))
                                        }

                                        if (item5.type === "%") {
                                            const increase = parseInt(item4) * (parseInt(item5.amount) / 100);
                                            const newPrice = parseInt(item4) + increase;
                                            priceToDisplay = newPrice.toFixed(2);
                                            abvvvvv.push(Math.round(priceToDisplay))
                                        }


                                    } else if (item5.reduction === "Normal price" && item5.isActive === true) {
                                        priceToDisplay = parseInt(item4);
                                        abvvvvv.push(Math.round(priceToDisplay))
                                    } else {
                                        priceToDisplay = parseInt(item4);
                                        abvvvvv.push(Math.round(priceToDisplay))
                                    }
                                }
                            })
                        })
                    }



                }

                sum = abvvvvv.reduce((accumulator, currentValue) => accumulator + currentValue, 0);

                console.log("Sum::::::>", sum)

                finalPricee = sum;

                return sum




            }

        }
        );

        console.log("Final Sum for Room ID Res:", finalPricee);
        return finalPricee
    };




    

    const scrollToDiv = (id) => {
        const targetDiv = document.getElementById(id);
        if (targetDiv) {
            targetDiv.scrollIntoView({ behavior: "smooth", block: "start" });
        }
    };

    useEffect(() => {
        if (roomAvailableClicked) {
            scrollToDiv("room_det")
        }
    }, [roomAvailableClicked])

    return (
        isLoading
            ? <div className="flex justify-center items-center h-screen">
                <Spinner size="lg" color='danger' />
            </div>
            : <div className="w-full" id="room_det">
                <div className="w-full flex flex-col md:flex-row justify-center items-center h-auto md:h-[10rem] bg-slate-50 lg:bg-slate-100 lg:mb-16 mb-8 lg:pb-0 lg:pt-0 pb-4 pt-8">
                    <div className="w-full md:w-[80%] flex flex-col justify-center items-center">
                        <div
                            className="px-4 md:px-8 font-semibold text-2xl md:text-4xl w-full text-left"
                            style={{
                                fontFamily: "Times New Roman, Georgia, serif",
                                fontWeight: "bold",
                            }}
                        >
                            {roomDetails.roomname}
                        </div>
                        <div className="px-4 md:px-8 pt-2 md:pt-4 text-sm md:text-md w-full text-left">
                            Home / Rooms / {roomDetails.roomname}
                        </div>
                    </div>
                    <div className="flex flex-row lg:flex-col w-[90%] md:w-[20%] mt-4 md:mt-0 items-center md:items-end">
                        <div className='w-full flex lg:flex-col flex-row justify-end items-center lg:items-end lg:pr-8 lg:gap-0 gap-2'>
                            <div className="flex gap-2 items-end lg-items-center">
                                <div className="text-sm md:text-base text-gray-600">starts from</div>
                                <div
                                    className="flex flex-row text-2xl md:text-3xl font-bold text-gray-600"
                                    style={{
                                        fontFamily: "Times New Roman, Georgia, serif",
                                        fontWeight: "bold",
                                    }}
                                >
                                    <IndianRupee className="flex justify-center text-center self-center" />
                                    {/* {roomDetails.price ? (roomDetails.price * diffindayss) : finalPrice()} */}
                                    {roomDetails.price ? roomDetails.price : finalPrice()}
                                </div>
                            </div>
                            <div className="flex lg:justify-end lg:items-center text-sm md:text-base text-gray-500 mt-2">per night</div>
                        </div>
                    </div>
                </div>

                <div className="w-full grid grid-cols-1 md:grid-cols-12 gap-4">
                    {/* Main Image and Swiper */}
                    <div className="col-span-12 md:col-span-9">
                        <Swiper
                            key="swipers"
                            style={{
                                "--swiper-navigation-color": "#000",
                                "--swiper-pagination-color": "#000",
                            }}
                            loop={true}
                            spaceBetween={10}
                            navigation={true}
                            thumbs={{ swiper: thumbsSwiper }}
                            modules={[FreeMode, Navigation, Thumbs]}
                            className="mySwiper2"
                        >
                            {roomDetails?.images?.filter(Boolean).map((item, index) => (
                                <SwiperSlide key={`main-${index}`}>
                                    <Image
                                        src={item}
                                        alt={`Room Image ${index}`}
                                        width={1000}
                                        height={1000}
                                        className="w-full h-[200px] md:h-full object-cover rounded-lg"
                                        priority={index === 0}
                                    />
                                </SwiperSlide>
                            ))}
                        </Swiper>


                        <Swiper
                            onSwiper={setThumbsSwiper}
                            loop={true}
                            spaceBetween={10}
                            slidesPerView={3}
                            freeMode={true}
                            watchSlidesProgress={true}
                            observer={true}
                            observeParents={true}
                            modules={[FreeMode, Navigation, Thumbs]}
                            className="mySwiper"
                            breakpoints={{
                                // When window width is >= 768px
                                768: {
                                    slidesPerView: 4, // Number of slides for medium screens (tablets)
                                },
                            }}
                        >
                            {roomDetails?.images?.filter(Boolean).map((item, index) => (
                                <SwiperSlide key={`thumb-${index}`} className="rounded-xl">
                                    <Image
                                        src={item}
                                        alt={`Thumbnail ${index}`}
                                        width={200}
                                        height={200}
                                        className="w-full h-[100px] md:h-[200px] object-cover rounded-xl"
                                        priority={index === 0}
                                    />
                                </SwiperSlide>
                            ))}
                        </Swiper>


                        <div className="flex justify-center items-center mt-8 w-full">
                            <div className="w-[95%] text-gray-800 text-sm md:text-lg grid grid-cols-2 md:grid-cols-4 gap-4">
                                {/* Guest Info */}
                                <div className="grid grid-cols-4 gap-2">
                                    <div className="flex justify-center items-center col-span-1">
                                        <UsersRound className="text-lg md:text-xl" />
                                    </div>
                                    <div className="grid grid-rows-2 col-span-3">
                                        <div>Max. Guests</div>
                                        <div className="font-semibold">
                                            {roomDetails.max_adults} Adults / {roomDetails.max_childs} Children
                                        </div>
                                    </div>
                                </div>
                                {/* Booking Nights */}
                                <div className="grid grid-cols-4 gap-2">
                                    <div className="flex justify-center items-center col-span-1">
                                        <Moon className="text-lg md:text-xl" />
                                    </div>
                                    <div className="grid grid-rows-2 col-span-3">
                                        <div>Booking Nights</div>
                                        <div className="font-semibold">
                                            {numberOfNights ? numberOfNights : 1} Night
                                        </div>
                                    </div>
                                </div>
                                {/* Bed Type */}
                                <div className="grid grid-cols-4 gap-2">
                                    <div className="flex justify-center items-center col-span-1">
                                        <BedDouble className="text-lg md:text-xl" />
                                    </div>
                                    <div className="grid grid-rows-2 col-span-3">
                                        <div>Bed Type</div>
                                        <div className="font-semibold">{roomDetails.bed_type}</div>
                                    </div>
                                </div>
                                {/* Area */}
                                <div className="grid grid-cols-4 gap-2">
                                    <div className="flex justify-center items-center col-span-1">
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            width="1.5em"
                                            height="1.5em"
                                            viewBox="0 0 24 24"
                                        >
                                            <path
                                                fill="currentColor"
                                                d="M3 5v14c0 1.103.897 2 2 2h14c1.103 0 2-.897 2-2V5c0-1.103-.897-2-2-2H5c-1.103 0-2 .897-2 2m16.002 14H5V5h14z"
                                            ></path>
                                            <path
                                                fill="currentColor"
                                                d="M15 12h2V7h-5v2h3zm-3 3H9v-3H7v5h5z"
                                            ></path>
                                        </svg>
                                    </div>
                                    <div className="grid grid-rows-2 col-span-3">
                                        <div>Area</div>
                                        <div className="font-semibold">168 sq. ft.</div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="flex justify-center items-center mt-8">
                            <div className="w-[95%] text-gray-800 text-sm md:text-lg text-justify">
                                {roomDetails?.description}
                            </div>
                        </div>

                        <div className="w-full lg:mt-16 mt-8">
                            <Facilities roomservices={roomDetails?.roomservices} />
                        </div>

                        <div className="w-full pt-16">
                            <SimilarRooms similarrooms={roomDetails?.similarrooms} />
                        </div>

                        <div className="w-full pt-16 md:mb-16 lg:mb-0">
                            <BookingProcess />
                        </div>
                    </div>
                    {/* Sidebar */}
                    <div className="flex justify-center items-center w-full mt-16 mb-16 col-span-12 md:col-span-3 md:block md:mt-0 md:mb-0">
                        <div className="sticky top-[11rem] w-[95%] md:w-[90%]">
                            <SelectMonth
                                allRoomsDet={allRoomsDet}
                                onFilteredResults={setFilteredRoomDetails}
                                onCheckindate={setSearchedCheckInDate}
                                onCheckoutdate={setSearchedCheckOutDate}
                                onAdultsSelect={setSelectedAdultCount}
                                onChildSelect={setSelectedChildCount}
                                onSelectedDateRange={setSelectedDateRange}
                                maxadults={roomDetails.max_adults}
                                maxchilds={roomDetails.max_childs}
                                // roomprice={roomDetails.price ? (roomDetails.price * diffindayss) : finalPrice()}
                                roomprice={roomDetails.price ? roomDetails.price : finalPrice()}
                                checkInDataForSum={checkInDataForSum}
                                checkOutDataForSum={checkOutDataForSum}
                                roomDetails={roomDetails}
                                roombaseprice={roomDetails.price}
                                onRoomAvailableClicked={setRoomAvailableClicked}
                                selectedRoomIdd={selectedRoomId}
                            />
                        </div>
                    </div>


                </div>
            </div>

    );

}

export default RoomsTemplate


