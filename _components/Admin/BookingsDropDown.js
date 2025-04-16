'use client'
import React from 'react'
import { LayoutDashboard, Building2, CalendarCheck, User, LandPlot, LogIn, DoorOpen, BedDouble, Bed, MountainSnow, ChevronDown  } from 'lucide-react'
import { TbHotelService } from "react-icons/tb";
import { BsQrCodeScan } from "react-icons/bs";
import { IoTicketOutline } from "react-icons/io5";
import { MdOutlinePolicy, MdCleaningServices, MdOutlineRoomPreferences } from "react-icons/md";
import { RiServiceLine } from "react-icons/ri";
import { FaHandsWash } from "react-icons/fa";
import {Dropdown, DropdownTrigger, DropdownMenu, DropdownItem, Tooltip } from "@nextui-org/react";
import { button as buttonStyles } from "@nextui-org/theme";
import Link from 'next/link'
import { CalendarPlus, ClockCounterClockwise, CurrencyInr, SealQuestion } from "@/_components/icons"

import { useSearchParams } from 'next/navigation'


export default function BookingsDropDown ({ isOpen,toggleSidebar}) {
  const handleItemClick = () => {
    
    if (toggleSidebar) toggleSidebar();
  };

    const searchParams = useSearchParams();
  const hotel_id = searchParams.get('hotel_id');
  // const hotel_name = searchParams.get('hotel_name');
  const hotel_name = "Ocean's Pearl Resort";
    return (
        <Dropdown placement='right-bottom'>
        <DropdownTrigger>
        <Link
        href="#"
          className={`${buttonStyles({ color: "default", size: "md", radius: "full", variant: "light" })} ${isOpen ? 'hover:bg-lime-500 text-foreground-300 hover:text-black justify-between w-[90%]' : 'text-foreground-300' }`}
        >
        <div className='flex gap-2'>
        {isOpen ? <><CalendarCheck />Bookings</> : 
        <>
        <Tooltip
          showArrow
          placement="right"
          content="Bookings"
          classNames={{
            base: [
              // arrow color
              "before:bg-primary-300 dark:before:bg-primary",
            ],
            content: [
              "py-2 px-4 shadow-xl",
              "text-white bg-primary-300 from-primary-300 to-primary-300",
            ],
          }}
        >
        <CalendarCheck className='mr-10 hidden lg:flex' />
        </Tooltip>
      </>
        }
        </div>
        {isOpen ? <ChevronDown aria-hidden="true"/> : '' }
        </Link>
        </DropdownTrigger>
        <DropdownMenu 
        aria-label="Dropdown Variants"
        color="primary"
        variant="flat"
      >
        {/* <DropdownItem onClick={handleItemClick} className='text-foreground-600 hover:text-primary' startContent={<CalendarPlus aria-hidden="true" className="text-foreground" />} key="new"><Link  href="/admin/hotel/bookings/newreservation">New Reservation</Link></DropdownItem> */}
        <DropdownItem onClick={handleItemClick} className='text-foreground-600 hover:text-primary' startContent={<ClockCounterClockwise aria-hidden="true" className="text-foreground" />} key="new"><Link  href={`/admin/bookings/bookinghistory`}>Booking History</Link></DropdownItem>
        {/* <DropdownItem onClick={handleItemClick}className='text-foreground-600 hover:text-primary' startContent={<CurrencyInr aria-hidden="true" />} key="new"><Link  href="/admin/propertymaster/propertyarea">Payment</Link></DropdownItem> */}
        {/* <DropdownItem className='text-foreground-600 hover:text-primary' startContent={<SealQuestion aria-hidden="true" />} key="new"><Link href="/admin/propertymaster/floor">Adjustmnets</Link></DropdownItem> */}
        </DropdownMenu>
    </Dropdown>
    )
}