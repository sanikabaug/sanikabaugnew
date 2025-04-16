"use client";
import React, { useState, useEffect, useCallback } from "react";
import {
    BedDouble, Bus, Camera, Plane, Utensils, UsersRound, UserRound, Moon, Wifi, Cctv,
    Droplets,
    CircleParking,
    GlassWater,
    ArrowUpRight
} from "lucide-react";
import { Button, Switch, VisuallyHidden, useSwitch, Autocomplete, AutocompleteItem, Checkbox } from "@nextui-org/react";
import Image from "next/image";
import Sitefilter from "@/_components/Filterpage/Sitefilter";
import IMAGES from "@/public/index";
import SearchBar from "@/_components/Filterpage/SearchBar";
import { useRouter } from "next/navigation";
import { useSearchParams } from "next/navigation";
import { format, parse, eachDayOfInterval } from "date-fns";
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import { FreeMode, Navigation } from 'swiper/modules';
import 'swiper/css/free-mode';
import 'swiper/css/navigation';
import '@/app/styles/rooms.css';
import {
    Modal,
    ModalContent,
    ModalHeader,
    ModalBody,
    ModalFooter,
    useDisclosure,
} from "@nextui-org/modal";

const generateUniqueID = async () => {
    const response = await fetch("/api/userApi/booking_details", {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
        },
    });
    const result = await response.json();

    let abc = result.data;

    let newId;
    let isUnique = false;

    if (abc.length === 0) {
        newId = `BK${String(0 + 1).padStart(5, "0")}`;
        isUnique = true;
    } else {
        const lastElement = abc[abc.length - 1];
        const lastElementId = lastElement.booking_id;

        // Extract numeric part from the last booking ID
        const numericPartMatch = lastElementId.match(/BK0*(\d+)/);
        let lastNumericId = numericPartMatch ? parseInt(numericPartMatch[1]) : 0;

        while (!isUnique) {
            newId = `BK${String(lastNumericId + 1).padStart(5, "0")}`;

            // Check if the new ID already exists in the database
            if (!abc.some((item) => item.booking_id === newId)) {
                isUnique = true;
            } else {
                // Increment numeric part and try again
                lastNumericId++;
            }
        }
    }

    return newId;
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


const BookingSummary = ({ displayBookingSum, searchedCheckInDate, searchedCheckOutDate, bookingSum, selectedDateRange, checkInDataForSum,
    checkOutDataForSum }) => {

    console.log("Selected Date Range checkout::::::>", selectedDateRange)

    const [isLoading, setIsLoading] = useState(false);
    const router = useRouter()


    const handleCheckout = async () => {
        setIsLoading(true);

        try {
            const formatDate = (date) => {
                const day = String(date.getDate()).padStart(2, "0");
                const month = String(date.getMonth() + 1).padStart(2, "0");
                const year = date.getFullYear();
                return `${day}-${month}-${year}`;
            };

            const formattedStartDate = formatDate(selectedDateRange[0].startDate);
            const formattedEndDate = formatDate(selectedDateRange[0].endDate);

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
                arrival_time: '',
                roomDet: bookingSum.filter((item) => item.value !== true),
                price: displayBookingSum.amount,
                status: "inprocess",
                city: '',
                zip: '',
                adults_count: displayBookingSum.adultCount,
                checkin_date: checkInDataForSum,
                checkout_date: checkOutDataForSum,
                checkin_dateF: formattedStartDate,
                checkout_dateF: formattedEndDate,
                rooms_count: bookingSum.filter((item) => item.value !== true).length,
                childrens_count: displayBookingSum.childCount,
                pflag0: 0,
                pflag1: 0,
                pflag2: 0,
                pflag3: 0,
                payment_id: "",
                order_id: "",
                signature: "",
                refund_flag: 0,
                selectedGuestPerRoom: displayBookingSum.selectedGuestPerRoom,
                selectedRoomCount: displayBookingSum.selectedRoomCount,
                selectedExtraperson: displayBookingSum.selectedExtraperson,
                totalExtraGuest: displayBookingSum.totalExtraGuest,
                totalGuestWithExtraPerson: displayBookingSum.totalGuestWithExtraPerson,
                totalroomamountwithextraguest: displayBookingSum.totalroomamountwithextraguest,
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

            // if (Object.keys(result.user_bookings).length > 0) {
                router.push(
                    `/filterpage/checkout?id=${payload?.booking_id}&&payload=${encodeURIComponent(JSON.stringify(payload))}`
                );
            // }
        } catch (error) {
            console.error("Checkout failed", error);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="fixed bottom-0 left-0 right-0 flex flex-col lg:flex-row gap-5 lg:gap-0 items-center justify-between bg-slate-100 lg:bg-slate-200 p-4 shadow-lg z-[100]">
            <div className="flex gap-5 flex-col lg:flex-row flex-2 items-center">
                {/* Date Range */}
                <div className="flex space-x-2 text-black ">
                    <svg xmlns="http://www.w3.org/2000/svg" width="23" height="23" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-calendar">
                        <path d="M8 2v4" />
                        <path d="M16 2v4" />
                        <rect width="18" height="18" x="3" y="4" rx="2" />
                        <path d="M3 10h18" />
                    </svg>
                    <span>
                        {searchedCheckInDate} - {searchedCheckOutDate}
                    </span>
                </div>
                <div className="flex justify-between gap-5 ">
                    {/* Rooms */}
                    <div className="flex items-center space-x-2 text-black">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            strokeWidth="2"
                            stroke="currentColor"
                            className="w-6 h-6"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M5 12h14M5 12a2 2 0 010-4h14a2 2 0 010 4M5 12v6m14-6v6m0 0a2 2 0 01-2 2H7a2 2 0 01-2-2m14 0H5"
                            />
                        </svg>
                        <span>
                            Rooms: {displayBookingSum.selectedRoomCount}
                        </span>
                    </div>
                    {console.log("displayBookingSum:::::::>", displayBookingSum)}

                    {/* Guests */}
                    <div className="flex items-center space-x-2 text-black">
                        <UsersRound />
                        <span>Guests: {displayBookingSum.totalGuestWithExtraPerson}</span>
                    </div>

                    {/* Extra person */}
                    <div className="flex items-center space-x-2 text-black">
                        <UserRound />
                        <span>Extra Guest: {displayBookingSum.totalExtraGuest}</span>
                    </div>
                </div>
            </div>

            {/* Price and Checkout */}
            <div className="flex items-center lg:items-end justify-center lg:justify-end gap-5 flex-1 ">
                <div className="flex gap-5 justify-between place-self-center  lg:justify-end w-full">
                    <div className="text-black text-xl flex place-self-center">
                        Total: ₹ {displayBookingSum.totalroomamountwithextraguest}
                        {/* <span className="text-sm text-pink-100 block cursor-pointer">
                            Price Breakup
                        </span> */}
                    </div>

                    <Button
                        className="bg-[#333333] text-white font-semibold px-6 py-2 rounded-lg hover:bg-pink-200 hover:text-black"
                        color="default"
                        auto
                        onClick={handleCheckout}
                        isLoading={isLoading}
                        disabled={isLoading}
                    >
                        {isLoading ? (
                            <>
                                Next <ArrowUpRight className="text-white" size={20} />
                            </>
                        ) : (
                            <>
                                Next <ArrowUpRight className="text-white" size={20} />
                            </>
                        )}

                    </Button>

                </div>
            </div>
        </div>
    );
};


const SimpleSwitch = ({ isSelected, onValueChange }) => {
    return (
        <div className="flex flex-col gap-2 w-[33%]">
            <button
                onClick={() => onValueChange(!isSelected)}
                className={`w-[100px] h-[47px] flex items-center justify-center rounded-lg ${isSelected ? "bg-[#333333] text-white hover:bg-gray-600 hover:text-white" : "bg-default-100 text-black hover:bg-default-200 hover:text-black font-semibold"
                    }`}
            >
                {isSelected ? "Add Room" : "Remove"}
            </button>
        </div>
    );
};



const Filterpage = () => {
    const [loading, setLoading] = useState(true);
    const [isSelected, setIsSelected] = useState([]);
    const [displayBookingSum, setDisplayBookingSum] = useState({});
    const [allRoomsDet, setAllRoomsDet] = useState([]);

    const { isOpen, onOpen, onOpenChange, onClose } = useDisclosure();

    const searchParams = useSearchParams();

    const checkindateParam = searchParams.get("checkindate");
    const checkoutdateParam = searchParams.get("checkoutdate");
    const adultsSelectComp = searchParams.get("adultsSelect");
    const childSelectComp = searchParams.get("childSelect");
    const adultsSelectParam = searchParams.get("adultsSelect");
    const childSelectParam = searchParams.get("childSelect");
    const bookId = searchParams.get("bookId");
    const [filteredRoomDetails, setFilteredRoomDetails] = useState([]);
    const [newFilteredRoomDetails, setNewFilteredRoomDetails] = useState([]);

    const [searchedCheckInDate, setSearchedCheckInDate] = useState(checkindateParam);
    const [searchedCheckOutDate, setSearchedCheckOutDate] = useState(checkoutdateParam);
    const [adultsSelectCompp, setSelectedAdultCount] = useState(adultsSelectComp);
    const [childSelectCompp, setSelectedChildCount] = useState(childSelectComp);
    const [selectedPrice, setSelectedPrice] = useState(5000);
    const [diffindayss, setDiffindayss] = useState(1);
    const [highestRoomRate, setHighestRoomRate] = useState(5000);

    const [selectedRoomId, setSelectedRoomId] = useState();
    const [selectedRoomCount, setSelectedRoomCount] = useState("1");
    const [selectedExtraperson, setSelectedExtraperson] = useState("0");
    const [selectedGuestPerRoom, setSelectedGuestPerRoom] = useState("1");

    const [checked, setChecked] = useState(false);




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

    const parseDatee = (dateString) => {
        const [day, month, year] = dateString.split("-").map(Number);
        return new Date(year, month - 1, day);
    };

    let formattedDateCheckin = formatDate(searchedCheckInDate);
    let formattedDateCheckout = formatDate(searchedCheckOutDate);

    const [checkInDataForSum, setCheckInDataForSum] = useState(formattedDateCheckin);
    const [checkOutDataForSum, setCheckOutDataForSum] = useState(formattedDateCheckout);

    const [selectedDateRange, setSelectedDateRange] = useState([
        {
            startDate: parseDatee(searchedCheckInDate),
            endDate: parseDatee(searchedCheckOutDate),
            key: "selection",
        },
    ]);

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

    const fetchfilteritemdata = [
        {
            id: "1",
            roomname: "Single Bed Non AC Room",
            intro: `Experience ultimate comfort and relaxation in our Double-Bed AC Rooms at Sanika Baug. Designed for a peaceful stay, these rooms feature spacious interiors, modern amenities, and a cool, refreshing ambiance to help you unwind after a day of exploring the beautiful surroundings of karjat. Whether you're here for a short getaway or an extended stay, our AC rooms offer a perfect blend of comfort and convenience, ensuring you have an unforgettable experience.`,
            value: true,
            amount: "1000",
            adultCount: "2",
            childCount: "2",
        },
        {
            id: "2",
            roomname: "Double Bed Non AC Room",
            intro: `Experience ultimate comfort and relaxation in our Double-Bed AC Rooms at Sanika Baug. Designed for a peaceful stay, these rooms feature spacious interiors, modern amenities, and a cool, refreshing ambiance to help you unwind after a day of exploring the beautiful surroundings of karjat. Whether you're here for a short getaway or an extended stay, our AC rooms offer a perfect blend of comfort and convenience, ensuring you have an unforgettable experience.`,
            value: true,
            amount: "2000",
            adultCount: "2",
            childCount: "2",
        },
        {
            id: "3",
            roomname: "Double Bed AC Room",
            intro: `Experience ultimate comfort and relaxation in our Double-Bed AC Rooms at Sanika Baug. Designed for a peaceful stay, these rooms feature spacious interiors, modern amenities, and a cool, refreshing ambiance to help you unwind after a day of exploring the beautiful surroundings of karjat. Whether you're here for a short getaway or an extended stay, our AC rooms offer a perfect blend of comfort and convenience, ensuring you have an unforgettable experience.`,
            value: true,
            amount: "3000",
            adultCount: "2",
            childCount: "2",
        },
        {
            id: "4",
            roomname: "Triple Bed Non AC Room",
            intro: `Experience ultimate comfort and relaxation in our Double-Bed AC Rooms at Sanika Baug. Designed for a peaceful stay, these rooms feature spacious interiors, modern amenities, and a cool, refreshing ambiance to help you unwind after a day of exploring the beautiful surroundings of karjat. Whether you're here for a short getaway or an extended stay, our AC rooms offer a perfect blend of comfort and convenience, ensuring you have an unforgettable experience.`,
            value: true,
            amount: "4000",
            adultCount: "2",
            childCount: "2",
        },
        {
            id: "5",
            roomname: "Super Deluxe AC Room",
            intro: `Experience ultimate comfort and relaxation in our Double-Bed AC Rooms at Sanika Baug. Designed for a peaceful stay, these rooms feature spacious interiors, modern amenities, and a cool, refreshing ambiance to help you unwind after a day of exploring the beautiful surroundings of karjat. Whether you're here for a short getaway or an extended stay, our AC rooms offer a perfect blend of comfort and convenience, ensuring you have an unforgettable experience.`,
            value: true,
            amount: "5000",
            adultCount: "2",
            childCount: "2",
        },
    ];

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

    const initialFxn = async () => {
        try {

            const response = await fetch(`/api/admin/property_master/room_details?hotelId=123456`, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                },
            });
            const result = await response.json();

            const allRoomInform = result.dataAllActive;

            setRoomResult(allRoomInform)

            setAllRoomsDet(allRoomInform)

            setFilteredRoomDetails(allRoomInform)

            setNewFilteredRoomDetails(allRoomInform)

            console.log("Book Id::::::::>", bookId)

            if (bookId) {
                const response = await fetch(`/api/userApi/booking_details?bookingId=${bookId}`, {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json",
                    },
                });
                const result = await response.json();

                setIsSelected(result?.databyid?.roomDet)
            }

        } catch (error) {
            console.log("Error::::::>", error)
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        initialFxn()
    }, [])


    useEffect(() => {
        console.log("isSelected booking:::::::::>", isSelected)

        if (isSelected?.length > 0) {
            const total = isSelected
                .filter((item) => item.value !== true)
                .reduce(
                    (acc, item) => {
                        acc.amount += parseInt(item.amount);
                        acc.adultCount += parseInt(item.adultCount, 10);
                        acc.childCount += parseInt(item.childCount, 10);
                        acc.selectedGuestPerRoom += parseInt(item.selectedGuestPerRoom, 10);
                        acc.selectedRoomCount += parseInt(item.selectedRoomCount, 10);
                        acc.selectedExtraperson += parseInt(item.selectedExtraperson, 10);

                        acc.totalExtraGuest += parseInt(item.totalExtraGuest, 10);
                        acc.totalGuestWithExtraPerson += parseInt(item.totalGuestWithExtraPerson, 10);
                        acc.totalroomamountwithextraguest += parseInt(item.totalroomamountwithextraguest, 10);
                        return acc;
                    },
                    {
                        amount: 0, adultCount: 0, childCount: 0, selectedGuestPerRoom: 0, selectedRoomCount: 0, selectedExtraperson: 0, totalExtraGuest: 0,
                        totalGuestWithExtraPerson: 0, totalroomamountwithextraguest: 0
                    }
                );
            console.log("isSelected::::::1", total)

            setDisplayBookingSum(total);
        }

    }, [isSelected])

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

                    console.log("diffindays:::::::::>", diffindays, searchedCheckInDate, searchedCheckOutDate)

                    if (datesss.length === diffindays) {
                    } else {
                        const formattedDateCheckoutttt = subtractOneDay(searchedCheckOutDate);

                        console.log("formattedDateCheckoutttt:::::::::>", formattedDateCheckoutttt)

                        formattedDateCheckout = formatDate(formattedDateCheckoutttt);
                    }

                    const year = new Date(selectedDateRange[0].startDate).getFullYear();

                    console.log("Years::::::::::::>", year, selectedDateRange)

                    const results = await fetch(
                        `/api/admin/rates_and_inventory/managerateandinventory?hotelId=${"123456"}&searchedDate=${formattedDateCheckin}&checkoutdate=${formattedDateCheckout}&year=${year}`,
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

    }, [filteredRoomDetails, searchedCheckInDate, searchedCheckOutDate])


    useEffect(() => {
        console.log("Abc selectedPrice", selectedPrice)

        const filteredRooms = filteredRoomDetails
            ?.map((item, index) => {
                let sum = 0;
                let abvvvvv = [];
                let ccc = [];

                if (pricePerGuest !== undefined && manageInventory !== undefined) {
                    let abc = pricePerGuest[item.id];

                    if (abc === undefined) {
                        ccc = manageInventory[item.id]
                            ?.map((item) => {
                                if (item.status === "soldout") {
                                    return item.room_id;
                                }
                            })
                            .filter((item) => item !== undefined);

                        let fff = manageInventory[item.id]?.map((item) => item.rate_24hr);

                        fff?.map((it) => {
                            abvvvvv.push(Math.round(it));
                        });
                    } else {
                        let abcd;

                        if (adultsSelectComp === undefined || adultsSelectCompp !== undefined) {
                            abcd = abc
                                ?.map((item2) => {
                                    if (item2.occupancy === adultsSelectCompp?.toString()) {
                                        return item2;
                                    }
                                })
                                .filter((item) => item !== undefined);
                        } else {
                            abcd = abc
                                ?.map((item2) => {
                                    if (item2.occupancy === adultsSelectComp?.toString()) {
                                        return item2;
                                    }
                                })
                                .filter((item) => item !== undefined);
                        }

                        ccc = manageInventory[item.id]
                            ?.map((item) => {
                                if (item.status === "soldout") {
                                    return item.room_id;
                                }
                            })
                            .filter((item) => item !== undefined);

                        let fff = manageInventory[item.id]?.map((item) => item.rate_24hr);

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

                                        abvvvvv.push(Math.round(priceToDisplay));
                                    } else if (
                                        item5.reduction === "Normal price increased by" &&
                                        item5.isActive === true
                                    ) {
                                        if (item5.type === "INR") {
                                            priceToDisplay = parseInt(item4) + parseInt(item5.amount);
                                            abvvvvv.push(Math.round(priceToDisplay));
                                        }

                                        if (item5.type === "%") {
                                            const increase = parseInt(item4) * (parseInt(item5.amount) / 100);
                                            const newPrice = parseInt(item4) + increase;
                                            priceToDisplay = newPrice.toFixed(2);
                                            abvvvvv.push(Math.round(priceToDisplay));
                                        }
                                    } else if (item5.reduction === "Normal price" && item5.isActive === true) {
                                        priceToDisplay = parseInt(item4);
                                        abvvvvv.push(Math.round(priceToDisplay));
                                    } else {
                                        priceToDisplay = parseInt(item4);
                                        abvvvvv.push(Math.round(priceToDisplay));
                                    }
                                }
                            });
                        });
                    }
                }

                sum = abvvvvv.reduce((accumulator, currentValue) => accumulator + currentValue, 0);

                return {
                    ...item,
                    sum, // Add the calculated sum to the item object
                };
            })
            .filter((item) => item.sum <= selectedPrice);

        console.log("Filter Rooms:::::::::::::::::::::>", filteredRooms)

        // setNewFilteredRoomDetails(filteredRooms)

        // if (filteredRooms.length === 0 && selectedPrice !== 0) {
        //     setNewFilteredRoomDetails(filteredRoomDetails)
        // }





    }, [selectedPrice, filteredRoomDetails, manageInventory, pricePerGuest, adultsSelectComp, adultsSelectCompp])

    useEffect(() => {

        if (newFilteredRoomDetails.length > 0) {

            console.log("New Filtered Result:::::::>", newFilteredRoomDetails)

        }

    }, [newFilteredRoomDetails])

    const handleFilteredResults = (val) => {

        setFilteredRoomDetails(val)

        setNewFilteredRoomDetails(val)

    }

    const handleSelectedPrice = (price) => {
        setSelectedPrice(price);
    };

    useEffect(() => {
        setIsSelected([])
    }, [selectedDateRange])

    useEffect(() => {
        console.log("selectedPrice", selectedPrice)
    }, [selectedPrice])

    useEffect(() => {
        const highestRateRoom = newFilteredRoomDetails.reduce((max, room) => {
            const maxRate = parseFloat(max.room_rate);
            const currentRate = parseFloat(room.room_rate);
            return currentRate > maxRate ? room : max;
        }, newFilteredRoomDetails[0]);

        //   console.log("highestRateRoom", (parseInt(highestRateRoom?.room_rate) * diffindayss));
        console.log("highestRateRoom", (parseInt(highestRateRoom?.room_rate)));
        setHighestRoomRate(
            highestRateRoom?.room_rate && diffindayss
                //   ? parseInt(highestRateRoom.room_rate, 10) * diffindayss
                ? parseInt(highestRateRoom.room_rate, 10)
                : 0
        );
        setSelectedPrice(
            highestRateRoom?.room_rate && diffindayss
                //   ? parseInt(highestRateRoom.room_rate, 10) * diffindayss
                ? parseInt(highestRateRoom.room_rate, 10)
                : 0
        )

    }, [diffindayss, newFilteredRoomDetails])


    const handleRoomChange = () => {
        console.log("Abcd:::::::", selectedRoomId, selectedRoomCount, selectedExtraperson, selectedGuestPerRoom, isSelected)

        const updatedIsSelected = isSelected.map((item) =>
            item.main_id === selectedRoomId
                ? {
                    ...item,
                    value: false,
                    totalroomamount: parseInt(item.amount) * parseInt(selectedRoomCount),
                    selectedRoomCount: selectedRoomCount,
                    selectedExtraperson: selectedExtraperson,
                    selectedGuestPerRoom: selectedGuestPerRoom,
                    totalGuest: parseInt(selectedGuestPerRoom) * parseInt(selectedRoomCount),
                    totalExtraGuest: parseInt(selectedExtraperson) * parseInt(selectedRoomCount),
                    totalroomamountwithextraguest: (parseInt(item.amount) * parseInt(selectedRoomCount)) + ((parseInt(selectedExtraperson) * parseInt(selectedRoomCount)) * 200),
                    totalExtraGuestAmount: (parseInt(selectedExtraperson) * parseInt(selectedRoomCount)) * 200,
                    guestWithExtraPerson: parseInt(selectedGuestPerRoom) + parseInt(selectedExtraperson),
                    totalGuestWithExtraPerson: (parseInt(selectedGuestPerRoom) + parseInt(selectedExtraperson)) * parseInt(selectedRoomCount),
                }
                : item
        );

        console.log("Updated isSelected:", updatedIsSelected);

        setIsSelected(updatedIsSelected)

        setSelectedRoomId("")
        setSelectedRoomCount("1")
        setSelectedExtraperson("0")
        setSelectedGuestPerRoom("1")
        setChecked(false)

        onClose()


    }

    useEffect(() => {
        if (selectedRoomId) {
            setSelectedGuestPerRoom(newFilteredRoomDetails.find((item) => item._id === selectedRoomId).max_adult)
        }
    }, [selectedRoomId, newFilteredRoomDetails])

    useEffect(() => {
        console.log("isSelectedisSelected: ", isSelected)
    }, [isSelected])





    return (
        <div>
            <div className="w-[95%] m-auto">
                <div>
                    <SearchBar
                        checkindateParam={checkindateParam}
                        checkoutdateParam={checkoutdateParam}
                        adultsSelectParam={adultsSelectParam}
                        childSelectParam={childSelectParam}
                        allRoomsDet={allRoomsDet}
                        onFilteredResults={handleFilteredResults}
                        onCheckindate={setSearchedCheckInDate}
                        onCheckoutdate={setSearchedCheckOutDate}
                        onAdultsSelect={setSelectedAdultCount}
                        onChildSelect={setSelectedChildCount}
                        onSelectedDateRange={setSelectedDateRange}
                    />
                </div>
                <div className="w-full grid grid-cols-1 lg:grid-cols-4 gap-5 pt-4">
                    <div className="col-span-1 lg:h-full">
                        <Sitefilter onselectedprice={handleSelectedPrice} highestRoomRate={highestRoomRate} />
                    </div>

                    {
                        loading
                            ? <div className="col-span-1 lg:col-span-3">
                                <SkeletonCard />
                            </div>
                            : <div className="col-span-1 lg:col-span-3">
                                <div>
                                    <div className="w-full flex justify-between items-center">
                                        <div className="w-full lg:w-[55%]">
                                            <p className="font-semibold mt-2 text-xl text-gray-600">
                                                {/* ({newFilteredRoomDetails?.filter((items) => Number(items.room_rate * diffindayss) <= selectedPrice).length} Rooms Available) */}
                                                ({newFilteredRoomDetails?.filter((items) => Number(items.room_rate) <= selectedPrice).length} Rooms Available)
                                            </p>
                                        </div>
                                    </div>

                                    {loading ? (
                                        <SkeletonCard />
                                    ) : (
                                        // newFilteredRoomDetails && newFilteredRoomDetails?.filter((items) => Number(items.room_rate * diffindayss) <= selectedPrice).map((item, index) => {

                                        newFilteredRoomDetails && newFilteredRoomDetails?.filter((items) => Number(items.room_rate) <= selectedPrice).map((item, index) => {


                                            let sum = 0;
                                            let abvvvvv = [];
                                            let ccc = [];

                                            // console.log("Rates:::::::::>", pricePerGuest, manageInventory)


                                            if (pricePerGuest !== undefined && manageInventory !== undefined) {
                                                let abc = pricePerGuest[item.id];

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




                                            return (
                                                <div
                                                    key={index}
                                                    className="rounded-lg w-full mt-7 grid grid-cols-1 lg:grid-cols-4 gap-0 lg:gap-6 p-4 shadow-[rgba(0,_0,_0,_0.35)_0px_5px_15px] mb-11"
                                                >
                                                    <div className="col-span-1">

                                                        <div className="hidden lg:block">
                                                            <div className="w-full h-44 relative">
                                                                <Image
                                                                    alt={"abc"}
                                                                    src={item.roomimages[0]}
                                                                    fill
                                                                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                                                                    className="rounded-lg object-fill"
                                                                // style={{ objectFit: "cover" }}
                                                                />
                                                            </div>
                                                            <div className="w-full h-44 relative mt-2">
                                                                <Image
                                                                    alt={"abc"}
                                                                    src={item.roomimages[1]}
                                                                    fill
                                                                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                                                                    className="rounded-lg object-fill"
                                                                // style={{ objectFit: "cover" }}
                                                                />
                                                            </div>
                                                        </div>

                                                        <div className="block lg:hidden">
                                                            <Swiper
                                                                spaceBetween={50}
                                                                slidesPerView={1}
                                                                modules={[FreeMode, Navigation]}
                                                                loop={true}
                                                                navigation={true}
                                                                className="mySwiper4"
                                                            >
                                                                <SwiperSlide key={`${index}-${item.roomimages[0]}`}>
                                                                    <div className="w-full h-64 relative">
                                                                        <Image
                                                                            alt={"abc"}
                                                                            src={item.roomimages[0]}
                                                                            fill
                                                                            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                                                                            className="rounded-lg object-fill"
                                                                        />
                                                                    </div>
                                                                </SwiperSlide>
                                                                <SwiperSlide key={`${index}-${item.roomimages[1]}`}>
                                                                    <div className="w-full h-64 relative">
                                                                        <Image
                                                                            alt={"abc"}
                                                                            src={item.roomimages[1]}
                                                                            fill
                                                                            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                                                                            className="rounded-lg object-fill"
                                                                        />
                                                                    </div>
                                                                </SwiperSlide>
                                                            </Swiper>
                                                        </div>

                                                    </div>

                                                    <div className="col-span-1 lg:col-span-3 flex flex-col justify-between">
                                                        <div>
                                                            <p className="text-xl lg:text-2xl font-semibold mt-4"
                                                                style={{
                                                                    fontFamily: "Times New Roman, Georgia, serif",
                                                                    fontWeight: "bold",
                                                                }}
                                                            >
                                                                {item.room_name}
                                                            </p>

                                                            <p className="line-clamp-3 mt-4">{item.roomdesc}</p>

                                                            <div>
                                                                <div className="flex justify-start items-center mt-2 w-full pt-2">
                                                                    <div className="w-full text-gray-800 text-lg grid grid-cols-2 md:grid-cols-4 gap-8">
                                                                        {/* Max Guests */}
                                                                        <div className="flex items-center gap-2">
                                                                            <div className="flex justify-center items-center">
                                                                                <UsersRound className="w-6 h-6" />
                                                                            </div>
                                                                            <div className="flex flex-col">
                                                                                <div className="text-sm">Max. Guests</div>
                                                                                <div className="font-semibold text-sm">{item.max_adult} Adults / {item.max_child} Children</div>
                                                                            </div>
                                                                        </div>

                                                                        {/* Booking Nights */}
                                                                        <div className="flex items-center gap-2">
                                                                            <div className="flex justify-center items-center">
                                                                                <Moon className="w-6 h-6" />
                                                                            </div>
                                                                            <div className="flex flex-col">
                                                                                <div className="text-sm">Booking Nights</div>
                                                                                <div className="font-semibold text-sm">{numberOfNights ? numberOfNights : 1} Night</div>
                                                                            </div>
                                                                        </div>

                                                                        {/* Bed Type */}
                                                                        <div className="flex items-center gap-2">
                                                                            <div className="flex justify-center items-center">
                                                                                <BedDouble className="w-6 h-6" />
                                                                            </div>
                                                                            <div className="flex flex-col">
                                                                                <div className="text-sm">Bed Type</div>
                                                                                <div className="font-semibold text-sm">{item?.bed_type[0].value}</div>
                                                                            </div>
                                                                        </div>

                                                                        {/* Area */}
                                                                        <div className="flex items-center gap-2">
                                                                            <div className="flex justify-center items-center">
                                                                                <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" viewBox="0 0 24 24">
                                                                                    <path fill="currentColor" d="M3 5v14c0 1.103.897 2 2 2h14c1.103 0 2-.897 2-2V5c0-1.103-.897-2-2-2H5c-1.103 0-2 .897-2 2m16.002 14H5V5h14z"></path>
                                                                                    <path fill="currentColor" d="M15 12h2V7h-5v2h3zm-3 3H9v-3H7v5h5z"></path>
                                                                                </svg>
                                                                            </div>
                                                                            <div className="flex flex-col">
                                                                                <div className="text-sm">Area</div>
                                                                                <div className="font-semibold text-sm">168 sq. ft.</div>
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </div>



                                                        </div>

                                                        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 w-full pb-4">
                                                            <div className="col-span-10 w-full">
                                                                <div className="hidden lg:block w-full h-full">
                                                                    <div className="mt-4 w-full h-full flex items-center gap-5 flex-wrap justify-center lg:justify-start lg:content-end pb-4">
                                                                        <div className="flex justify-start items-center flex-col">
                                                                            <div className="border bg-slate-200 w-[35px] h-[35px] rounded-lg flex justify-center items-center">
                                                                                <Wifi className="w-[25px] h-[25px] text-[#333333]" />
                                                                            </div>
                                                                            <p className="text-sm font-semibold mt-1">Wifi</p>
                                                                        </div>

                                                                        <div className="flex justify-center items-center flex-col ">
                                                                            <div className="border bg-slate-200 w-[35px] h-[35px] rounded-lg flex justify-center items-center">
                                                                                <Cctv className="w-[25px] h-[25px] text-[#333333]" />
                                                                            </div>
                                                                            <p className="text-sm font-semibold mt-1 text-center">CCTV Cameras</p>
                                                                        </div>

                                                                        <div className="flex justify-center items-center flex-col ">
                                                                            <div className="border bg-slate-200 w-[35px] h-[35px] rounded-lg flex justify-center items-center">
                                                                                <Droplets className="w-[25px] h-[25px] text-[#333333]" />
                                                                            </div>
                                                                            <p className="text-sm font-semibold mt-1 text-center">Hot & Cold Water</p>
                                                                        </div>

                                                                        <div className="flex justify-center items-center flex-col ">
                                                                            <div className="border bg-slate-200 w-[35px] h-[35px] rounded-lg flex justify-center items-center">
                                                                                <CircleParking className="w-[25px] h-[25px] text-[#333333]" />
                                                                            </div>
                                                                            <p className="text-sm font-semibold mt-1">Parking</p>
                                                                        </div>

                                                                        <div className="flex justify-center items-center flex-col ">
                                                                            <div className="border bg-slate-200 w-[35px] h-[35px] rounded-lg flex justify-center items-center">
                                                                                <GlassWater className="w-[25px] h-[25px] text-[#333333]" />
                                                                            </div>
                                                                            <p className="text-sm font-semibold mt-1 text-center">Mineral Water</p>
                                                                        </div>

                                                                        <div className="flex justify-center items-center flex-col ">
                                                                            <div className="border bg-slate-200 w-[35px] h-[35px] rounded-lg flex justify-center items-center">
                                                                                <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 640 512">
                                                                                    <path fill="currentColor" d="M256 64H64C28.7 64 0 92.7 0 128v256c0 35.3 28.7 64 64 64h192zm32 384h288c35.3 0 64-28.7 64-64V128c0-35.3-28.7-64-64-64H288zM64 160c0-17.7 14.3-32 32-32h64c17.7 0 32 14.3 32 32v192c0 17.7-14.3 32-32 32H96c-17.7 0-32-14.3-32-32z"></path>
                                                                                </svg>
                                                                            </div>
                                                                            <p className="text-sm font-semibold mt-1 text-center">Extra Mattress</p>
                                                                        </div>
                                                                    </div>
                                                                </div>

                                                                <div className="lg:hidden block w-full h-full">
                                                                    <div className="w-full h-full">
                                                                        <div className="mt-8 w-full h-full grid grid-cols-4 md:grid-cols-3 lg:grid-cols-4 gap-5 pb-4 justify-center lg:justify-start">
                                                                            <div className="flex justify-center items-center flex-col">
                                                                                <div className="border bg-gray-100 w-[35px] h-[35px] rounded-lg flex justify-center items-center">
                                                                                    <Wifi className="w-[25px] h-[25px] text-red-700" />
                                                                                </div>
                                                                                <p className="text-sm font-semibold mt-1 text-center">Wifi</p>
                                                                            </div>

                                                                            <div className="flex justify-center items-center flex-col">
                                                                                <div className="border bg-gray-100 w-[35px] h-[35px] rounded-lg flex justify-center items-center">
                                                                                    <Cctv className="w-[25px] h-[25px] text-red-700" />
                                                                                </div>
                                                                                <p className="text-sm font-semibold mt-1 text-center">CCTV Cameras</p>
                                                                            </div>

                                                                            <div className="flex justify-center items-center flex-col">
                                                                                <div className="border bg-gray-100 w-[35px] h-[35px] rounded-lg flex justify-center items-center">
                                                                                    <Droplets className="w-[25px] h-[25px] text-red-700" />
                                                                                </div>
                                                                                <p className="text-sm font-semibold mt-1 text-center">Hot & Cold Water</p>
                                                                            </div>

                                                                            <div className="flex justify-center items-center flex-col">
                                                                                <div className="border bg-gray-100 w-[35px] h-[35px] rounded-lg flex justify-center items-center">
                                                                                    <CircleParking className="w-[25px] h-[25px] text-red-700" />
                                                                                </div>
                                                                                <p className="text-sm font-semibold mt-1 text-center">Parking</p>
                                                                            </div>

                                                                            <div className="flex justify-center items-center flex-col">
                                                                                <div className="border bg-gray-100 w-[35px] h-[35px] rounded-lg flex justify-center items-center">
                                                                                    <GlassWater className="w-[25px] h-[25px] text-red-700" />
                                                                                </div>
                                                                                <p className="text-sm font-semibold mt-1 text-center">Mineral Water</p>
                                                                            </div>

                                                                            <div className="flex justify-center items-center flex-col">
                                                                                <div className="border bg-gray-100 w-[35px] h-[35px] rounded-lg flex justify-center items-center">
                                                                                    <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 640 512">
                                                                                        <path fill="currentColor" d="M256 64H64C28.7 64 0 92.7 0 128v256c0 35.3 28.7 64 64 64h192zm32 384h288c35.3 0 64-28.7 64-64V128c0-35.3-28.7-64-64-64H288zM64 160c0-17.7 14.3-32 32-32h64c17.7 0 32 14.3 32 32v192c0 17.7-14.3 32-32 32H96c-17.7 0-32-14.3-32-32z"></path>
                                                                                    </svg>
                                                                                </div>
                                                                                <p className="text-sm font-semibold mt-1 text-center">Extra Mattress</p>
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                </div>

                                                            </div>

                                                            <div className="col-span-2 w-full">
                                                                <div className="flex flex-col justify-end">
                                                                    {ccc?.includes(item.id) ? (
                                                                        <p className="text-end p-4">Soldout</p>
                                                                    ) : (
                                                                        <div>
                                                                            <div className="flex mt-2 mb-2">
                                                                                <div className="w-full">
                                                                                    <p className="text-xs font-extralight">Start From</p>
                                                                                    <p className="font-semibold text-2xl mt-2"
                                                                                        style={{
                                                                                            fontFamily: "Times New Roman, Georgia, serif",
                                                                                            fontWeight: "bold",
                                                                                        }}>
                                                                                        {/* &#8377; {sum ? sum : "0"}* */}
                                                                                        {/* &#8377; {item.room_rate ? (item.room_rate * diffindayss) : sum}* */}

                                                                                        &#8377; {item.room_rate ? item.room_rate : sum}*
                                                                                    </p>
                                                                                </div>
                                                                            </div>
                                                                            <SimpleSwitch
                                                                                isSelected={isSelected?.find(sel => sel.id === item.id)?.value ?? true}
                                                                                onValueChange={(value) => {
                                                                                    console.log("Value:::::::::>", value, item._id);
                                                                                    setSelectedRoomId(item._id)

                                                                                    setIsSelected(prevval => {
                                                                                        const existingIndex = prevval?.findIndex(sel => sel.id === item.id);

                                                                                        if (existingIndex !== -1) {
                                                                                            const updatedArray = [...prevval];

                                                                                            if (value === false && updatedArray[existingIndex].value === true) {
                                                                                                onOpen()
                                                                                                updatedArray[existingIndex] = {
                                                                                                    id: item.id,
                                                                                                    main_id: item._id,
                                                                                                    name: item.room_name,
                                                                                                    value: !value,
                                                                                                    // amount: sum,
                                                                                                    // amount: (item.room_rate * diffindayss),
                                                                                                    amount: item.room_rate,
                                                                                                    totalroomamount: parseInt(item.room_rate) * parseInt(selectedRoomCount),
                                                                                                    totalroomamountwithextraguest: (parseInt(item.room_rate) * parseInt(selectedRoomCount)) + ((parseInt(selectedExtraperson) * parseInt(selectedRoomCount)) * 200),
                                                                                                    adultCount: adultsSelectCompp,
                                                                                                    childCount: childSelectCompp,
                                                                                                    roomimage: item.roomimages[0],
                                                                                                    selectedRoomCount: selectedRoomCount,
                                                                                                    selectedExtraperson: selectedExtraperson,
                                                                                                    selectedGuestPerRoom: selectedGuestPerRoom,
                                                                                                    totalGuest: parseInt(selectedGuestPerRoom) * parseInt(selectedRoomCount),
                                                                                                    totalExtraGuest: parseInt(selectedExtraperson) * parseInt(selectedRoomCount),
                                                                                                    totalExtraGuestAmount: (parseInt(selectedExtraperson) * parseInt(selectedRoomCount)) * 200,
                                                                                                    guestWithExtraPerson: parseInt(selectedGuestPerRoom) + parseInt(selectedExtraperson),
                                                                                                    totalGuestWithExtraPerson: (parseInt(selectedGuestPerRoom) + parseInt(selectedExtraperson)) * parseInt(selectedRoomCount),
                                                                                                };
                                                                                                return updatedArray;
                                                                                            } else {
                                                                                                updatedArray[existingIndex] = {
                                                                                                    id: item.id,
                                                                                                    main_id: item._id,
                                                                                                    name: item.room_name,
                                                                                                    value: value,
                                                                                                    // amount: sum,
                                                                                                    // amount: (item.room_rate * diffindayss),
                                                                                                    amount: item.room_rate,
                                                                                                    totalroomamount: parseInt(item.room_rate) * parseInt(selectedRoomCount),
                                                                                                    adultCount: adultsSelectCompp,
                                                                                                    childCount: childSelectCompp,
                                                                                                    roomimage: item.roomimages[0],
                                                                                                    selectedRoomCount: selectedRoomCount,
                                                                                                    selectedExtraperson: selectedExtraperson,
                                                                                                    selectedGuestPerRoom: selectedGuestPerRoom,
                                                                                                    totalGuest: parseInt(selectedGuestPerRoom) * parseInt(selectedRoomCount),
                                                                                                    totalExtraGuest: parseInt(selectedExtraperson) * parseInt(selectedRoomCount),
                                                                                                    totalroomamountwithextraguest: (parseInt(item.room_rate) * parseInt(selectedRoomCount)) + ((parseInt(selectedExtraperson) * parseInt(selectedRoomCount)) * 200),
                                                                                                    totalExtraGuestAmount: (parseInt(selectedExtraperson) * parseInt(selectedRoomCount)) * 200,
                                                                                                    guestWithExtraPerson: parseInt(selectedGuestPerRoom) + parseInt(selectedExtraperson),
                                                                                                    totalGuestWithExtraPerson: (parseInt(selectedGuestPerRoom) + parseInt(selectedExtraperson)) * parseInt(selectedRoomCount),
                                                                                                };
                                                                                                return updatedArray;
                                                                                            }


                                                                                        } else {
                                                                                            onOpen()
                                                                                            return [
                                                                                                ...prevval,
                                                                                                {
                                                                                                    id: item.id,
                                                                                                    main_id: item._id,
                                                                                                    name: item.room_name,
                                                                                                    value: !value,
                                                                                                    // amount: sum,
                                                                                                    // amount: (item.room_rate * diffindayss),
                                                                                                    amount: item.room_rate,
                                                                                                    totalroomamount: parseInt(item.room_rate) * parseInt(selectedRoomCount),
                                                                                                    adultCount: adultsSelectCompp,
                                                                                                    childCount: childSelectCompp,
                                                                                                    roomimage: item.roomimages[0],
                                                                                                    selectedRoomCount: selectedRoomCount,
                                                                                                    selectedExtraperson: selectedExtraperson,
                                                                                                    selectedGuestPerRoom: selectedGuestPerRoom,
                                                                                                    totalGuest: parseInt(selectedGuestPerRoom) * parseInt(selectedRoomCount),
                                                                                                    totalExtraGuest: parseInt(selectedExtraperson) * parseInt(selectedRoomCount),
                                                                                                    totalroomamountwithextraguest: (parseInt(item.room_rate) * parseInt(selectedRoomCount)) + ((parseInt(selectedExtraperson) * parseInt(selectedRoomCount)) * 200),
                                                                                                    totalExtraGuestAmount: (parseInt(selectedExtraperson) * parseInt(selectedRoomCount)) * 200,
                                                                                                    guestWithExtraPerson: parseInt(selectedGuestPerRoom) + parseInt(selectedExtraperson),
                                                                                                    totalGuestWithExtraPerson: (parseInt(selectedGuestPerRoom) + parseInt(selectedExtraperson)) * parseInt(selectedRoomCount),
                                                                                                }
                                                                                            ];
                                                                                        }
                                                                                    });
                                                                                }}
                                                                            />

                                                                        </div>
                                                                    )}
                                                                </div>
                                                            </div>
                                                        </div>




                                                    </div>
                                                </div>
                                            )
                                        })
                                    )}

                                    {isSelected?.filter((item) => item.value !== true).length > 0 ? (
                                        <BookingSummary
                                            displayBookingSum={displayBookingSum}
                                            searchedCheckInDate={searchedCheckInDate}
                                            searchedCheckOutDate={searchedCheckOutDate}
                                            bookingSum={isSelected}
                                            selectedDateRange={selectedDateRange}
                                            checkInDataForSum={checkInDataForSum}
                                            checkOutDataForSum={checkOutDataForSum}
                                        />
                                    ) : (
                                        ""
                                    )}
                                </div>
                            </div>
                    }


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
                                                <p className="font-semibold">Check in</p>
                                                <div>
                                                    {searchedCheckInDate}
                                                </div>
                                            </div>
                                            <div className="flex flex-col gap-2">
                                                <p className="font-semibold">Check out</p>
                                                <div>
                                                    {searchedCheckOutDate}
                                                </div>
                                            </div>
                                        </div>

                                        <div className="grid grid-cols-2 gap-2">
                                            <div className="flex flex-col gap-2">
                                                <p className="font-semibold">Rooms Count</p>
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
                                                        {Array.from({ length: newFilteredRoomDetails.find((item) => item._id === selectedRoomId).rooms_available }, (_, index) => index + 1).map((roomNumber) => (
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
                                                <p className="font-semibold">Guest Per Room</p>
                                                <div>
                                                    <Autocomplete
                                                        key={newFilteredRoomDetails.find((item) => item._id === selectedRoomId).max_adult}
                                                        size="sm"
                                                        variant="bordered"
                                                        defaultSelectedKey={newFilteredRoomDetails.find((item) => item._id === selectedRoomId).max_adult}
                                                        className="w-full"
                                                        inputProps={{
                                                            classNames: {
                                                                inputWrapper: "w-[100%]",
                                                            },
                                                            readOnly: true,
                                                        }}
                                                        value={newFilteredRoomDetails.find((item) => item._id === selectedRoomId).max_adult}
                                                        allowsCustomValue={true}
                                                        onInputChange={(value) =>
                                                            setSelectedGuestPerRoom(value)
                                                        }
                                                        onSelectionChange={(key) => {
                                                            setSelectedGuestPerRoom(key)
                                                        }}
                                                    >
                                                        {Array.from({ length: 1 }, (_, index) => index + parseInt(newFilteredRoomDetails.find((item) => item._id === selectedRoomId).max_adult)).map((guestCount) => (
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
                                                                {Array.from({ length: parseInt(newFilteredRoomDetails.find((item) => item._id === selectedRoomId).extra_person) + 1 }, (_, index) => index).map((extraCount) => (
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

export default Filterpage;

const SkeletonCard = () => {
    return (
        <div className="rounded-lg w-full grid grid-cols-1 lg:grid-cols-4 gap-6 p-4 shadow-[rgba(0,_0,_0,_0.35)_0px_5px_15px] animate-pulse">
            <div className="col-span-1">
                <div className="w-full h-44 bg-gray-200 rounded-lg"></div>
                <div className="flex w-full mt-2 h-40 bg-gray-200 rounded-lg"></div>
            </div>

            <div className="col-span-1 lg:col-span-2">
                <div className="flex justify-start items-center">
                    <div className="h-4 w-24 bg-gray-200 rounded-md"></div>
                </div>

                <div className="h-6 w-1/2 bg-gray-200 rounded-md mt-1"></div>

                <div className="mt-4 w-full flex justify-start items-center gap-5">
                    {Array(4)
                        .fill()
                        .map((_, index) => (
                            <div
                                key={index}
                                className="flex justify-center items-center flex-col"
                            >
                                <div className="border bg-gray-200 w-[25px] h-[25px] rounded-large"></div>
                                <div className="h-4 w-16 bg-gray-200 rounded-md mt-1"></div>
                            </div>
                        ))}
                </div>

                <hr className="border border-black border-dotted mt-5 mb-4" />
                <div className="mt-2">
                    <div className="flex flex-col lg:flex-row justify-start gap-1">
                        <div className="font-semibold w-full lg:w-[22%]">
                            <div className="h-4 w-24 bg-gray-200 rounded-md"></div>
                        </div>
                        <div className="flex w-full lg:w-[75%] flex-wrap gap-1">
                            <div className="h-4 w-1/2 bg-gray-200 rounded-md"></div>
                        </div>
                    </div>
                </div>

                <div className="mt-2">
                    <div className="flex flex-col lg:flex-row justify-start gap-1">
                        <div className="font-semibold w-full lg:w-[22%]">
                            <div className="h-4 w-24 bg-gray-200 rounded-md"></div>
                        </div>
                        <div className="flex w-full lg:w-[75%] justify-start flex-wrap gap-1">
                            <div className="h-4 w-1/2 bg-gray-200 rounded-md"></div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="col-span-1">
                <div className="h-4 w-full bg-gray-200 rounded-md"></div>
                <div className="grid grid-cols-2 gap-3 mt-2">
                    <div className="w-full">
                        <div className="h-4 w-1/2 bg-gray-200 rounded-md"></div>
                    </div>
                    <div className="w-full">
                        <div className="h-4 w-1/2 bg-gray-200 rounded-md"></div>
                    </div>
                </div>
            </div>
        </div>
    );
};
