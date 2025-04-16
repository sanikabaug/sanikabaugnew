'use client'
import React, { useState } from 'react'
import { CalendarRange, Search } from "lucide-react"
import Daterangepickerreact from "@/_components/Home/Daterangepickerreact"
import { PiUsersLight } from "react-icons/pi";
import RoomsAndGuests from '@/_components/Home/RoomsAndGuests'
import { Button } from '@nextui-org/react'
import { today, getLocalTimeZone } from "@internationalized/date";
import { useRouter } from 'next/navigation';

const SearchBar = () => {

    const router = useRouter();

    let defaultDate = today(getLocalTimeZone());
    const nextDay = defaultDate.add({ days: 1 });

    console.log("Dates::::::::>", defaultDate, nextDay)

    const formatDate = (date) => {
        const day = String(date.day).padStart(2, "0");
        const month = String(date.month).padStart(2, "0");
        const year = String(date.year);
        return `${day}-${month}-${year}`;
    };

    const [checkindate, setCheckindate] = useState(formatDate(defaultDate));
    const [checkoutdate, setCheckoutdate] = useState(formatDate(nextDay));

    const [adultsSelect, setAdultsSelect] = useState(1);
    const [childSelect, setChildSelect] = useState(0);

    const differenceInDays = (date1, date2) => (new Date(date2.split('-').reverse().join('-')) - new Date(date1.split('-').reverse().join('-'))) / (1000 * 3600 * 24);
    const [initialDate, setInitialDate] = useState(
        differenceInDays(checkindate, checkoutdate)
    );

    const handleDateSelect = (val) => {

        console.log("Val:::::::::>", val)

        const formatDate = (date) => {
            const day = String(date.getDate()).padStart(2, "0");
            const month = String(date.getMonth() + 1).padStart(2, "0"); // Months are 0-based
            const year = date.getFullYear();
            return `${day}-${month}-${year}`;
        };
        const formattedStartDate = formatDate(val[0].startDate);
        const formattedEndDate = formatDate(val[0].endDate);

        setCheckindate(formattedStartDate);
        setCheckoutdate(formattedEndDate)
    };

    const handleAdultSelect = (value) => {
        setAdultsSelect(value);
    };
    const handleChildSelect = (value) => {
        setChildSelect(value);
    };


    const searchAction = () => {
        router.push(`/filterpage?checkindate=${checkindate}&checkoutdate=${checkoutdate}&adultsSelect=${adultsSelect}&childSelect=${childSelect}`)
    };


    return (
        <>
            <div className="hidden lg:block lg:my-4 w-[45rem] mt-8">

                <div className="flex-col h-full lg:flex-row w-full gap-2 flex items-center m-auto  transition-all duration-200 delay-200 ease-in-out text-black lg:p-0 p-4">
                    <div className="flex w-full bg-transparent lg:bg-black/20 flex-col lg:flex-row justify-center items-center p-4 rounded-xl gap-2 lg:gap-5 lg:backdrop-blur-sm">
                        <div className="lg:w-full w-[70%] gap-2 flex-2">
                            <p className="flex gap-2 justify-center items-center pb-2 text-white">
                                <CalendarRange className="size-8" />
                                Check In-Check Out
                            </p>

                            <Daterangepickerreact
                                className=""
                                initialDate={initialDate}
                                onDateValue={handleDateSelect}
                                checkindate={checkindate} />
                        </div>

                        <div className="flex justify-center items-center flex-col lg:flex-row gap-5 lg:gap-0 flex-2">
                            <div className="w-full gap-2">
                                <p className="flex gap-2 justify-center items-center pb-2 text-white">
                                    <PiUsersLight className="size-8" />
                                    Guests
                                </p>
                                <RoomsAndGuests
                                    adultsSelectParam={"1"}
                                    childSelectParam={"0"}
                                    onAdultsSelect={handleAdultSelect}
                                    onChildSelect={handleChildSelect} />
                            </div>
                        </div>
                        <div className="flex justify-center  items-center  lg:items-end lg:self-end lg:mt-0 mt-4 flex-1 w-full ">
                            <Button
                                isIconOnly
                                // color="secondary"
                                // variant="shadow"
                                size="lg"
                                onClick={(e) => searchAction()}
                                className="w-full p-4 bg-[#F5F5DC] font-semibold"
                            >
                                <Search className="text-[#333333]" />
                                <p className="text-[#333333] ml-2">Search</p>
                            </Button>
                        </div>
                    </div>
                </div>
            </div>



            <div className='block lg:hidden w-full'>
                <div className="grid grid-rows-1 gap-4 w-full p-4 text-black">
                    <div className="flex flex-col items-center  p-4 rounded-xl gap-4 bg-transparent">
                        <div className="grid grid-cols-12 w-[80%] gap-2">
                            {/* <p className="col-span-4 flex gap-2 justify-center items-center text-slate-100 font-extrabold text-md text-center"> */}
                                {/* <CalendarRange className="size-8" /> */}
                                {/* Check In-Check Out
                            </p> */}
                            <Daterangepickerreact
                                className="col-span-12"
                                initialDate={initialDate}
                                onDateValue={handleDateSelect}
                                checkindate={checkindate}
                            />
                        </div>

                        <div className="grid grid-cols-12 w-[80%] gap-2">
                            {/* <p className="col-span-4 flex gap-2 justify-center items-center pb-2 text-slate-100 font-extrabold text-md text-center">
                                <PiUsersLight className="size-8" />
                                Guests
                            </p> */}
                            <div className="col-span-12">
                                <RoomsAndGuests
                                    adultsSelectParam={"1"}
                                    childSelectParam={"0"}
                                    onAdultsSelect={handleAdultSelect}
                                    onChildSelect={handleChildSelect}
                                />
                            </div>

                        </div>

                        <div className="flex justify-center items-center w-[40%]">
                            <Button
                                isIconOnly
                                size="md"
                                onClick={(e) => searchAction()}
                                className="w-full bg-[#F5F5DC] font-semibold"
                            >
                                <Search className="text-[#333333]" />
                                <p className="text-[#333333] ml-2">Search</p>
                            </Button>
                        </div>
                    </div>
                </div>
            </div>

        </>
    )
}

export default SearchBar