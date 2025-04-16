'use client'
import React from 'react'
import {
  Building2,
  LandPlot,
  ChevronDown
} from 'lucide-react'
import { Dropdown, DropdownTrigger, DropdownMenu, DropdownItem, Tooltip } from "@nextui-org/react";
import { button as buttonStyles } from "@nextui-org/theme";
import Link from 'next/link'

export default function PropertyMasterDropDown({ isOpen, toggleSidebar }) {

  const handleItemClick = () => {
    if (toggleSidebar) toggleSidebar();
  };

  const hotel_id = "123456";
  const hotel_name = "Sanika Baug";

  console.log("ID: ", hotel_id)
  return (
    <Dropdown placement='right-bottom'>
      <DropdownTrigger>
        <Link
          href="#"
          className={`${buttonStyles({ color: "default", size: "md", radius: "full", variant: "light" })} ${isOpen ? 'hover:bg-lime-500 text-foreground-300 hover:text-black justify-between w-[90%]' : 'text-foreground-300'}`}
        >
          <div className='flex gap-2'>
            {isOpen ? <>
              <Building2 />Property Master
            </> :
              <>
                <Tooltip
                  showArrow
                  placement="right"
                  content="Property Master"
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
                  <Building2 className='mr-10 hidden lg:flex' />
                </Tooltip>
              </>
            }
          </div>
          {isOpen ? <ChevronDown /> : ''}
        </Link>
      </DropdownTrigger>
      <DropdownMenu
        aria-label="Dropdown Variants"
        color="primary"
        variant="flat"
      >
        <DropdownItem onClick={handleItemClick} className='text-foreground-600 hover:text-primary' startContent={<Building2 aria-hidden="true" />} key="general-info">
          <Link href={`/admin/propertymaster/generalinformation`}>General Information</Link>
        </DropdownItem>
        {/* <DropdownItem onClick={handleItemClick} className='text-foreground-600 hover:text-primary' startContent={<LandPlot aria-hidden="true" />} key="facilities-services">
          <Link href={`/admin/propertymaster/facilitiesandservices`}>Facilities & Services</Link>
        </DropdownItem> */}
        <DropdownItem onClick={handleItemClick} className='text-foreground-600 hover:text-primary' startContent={<LandPlot aria-hidden="true" />} key="room-details">
          <Link href={`/admin/propertymaster/roomdetails`}>Room Details</Link>
        </DropdownItem>
        {/* <DropdownItem onClick={handleItemClick} className='text-foreground-600 hover:text-primary' startContent={<LandPlot aria-hidden="true" />} key="room-amenities">
          <Link href={`/admin/propertymaster/roomamenities`}>Room Amenities</Link>
        </DropdownItem> */}
      </DropdownMenu>
    </Dropdown>
  )
}
