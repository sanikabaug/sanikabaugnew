"use client";
import React, { useState } from "react";
import Image from "next/image";
import IMAGES from "@/public/index";
import Dropdown from "@/_components/Admin/Dropdown";
import Link from "next/link";
import { button as buttonStyles } from "@nextui-org/theme";
import { Tooltip } from "@nextui-org/react";
import {
  LayoutDashboard,
  Building2,
  CalendarCheck,
  User,
  LogIn,
  PanelLeftClose,
  PanelLeftOpen,
  FilePieChart,
} from "lucide-react";
import BookingsDropDown from "@/_components/Admin/BookingsDropDown";
import RatesInventoryDropDown from "@/_components/Admin/RatesInventoryDropDown";
import { Logo } from "@/_components/icons";
import PropertyMasterDropDown from "@/_components/Admin/PropertyMasterDropDown";

const SideBar = ({ isOpen, toggleSidebar }) => {
  return (
    <>
      <aside
        className={`flex overflow-y-auto flex-col px-5 py-4 h-screen bg-black ${
          isOpen ? "" : "w-[60%] lg:w-16"
        }`}
      >
        <Link className="flex justify-between items-center" href="">
          <img src={IMAGES.logowithoutbg} size={60} className="mb-8 w-[90%]"/>
          <div className="flex justify-end text-white">
            {isOpen ? (
              <>
                <PanelLeftClose className="m-4" onClick={toggleSidebar} />
              </>
            ) : (
              <>
                <div className="flex flex-col">
                  <img src={IMAGES.logowithoutbg} size={80} className="pr-4" />
                  <PanelLeftOpen
                    className="mt-[0px] lg:mt-2 ml-2 lg:ml-24 absolute z-50 text-black"
                    onClick={toggleSidebar}
                  />
                </div>
              </>
            )}
          </div>
        </Link>

        <div className="mt-2 flex flex-1 flex-col">
          <nav className="-mx-3 space-y-6">
            <div
            onClick={toggleSidebar}
              className={`${
                isOpen ? "space-y-3 w-[90%] hover:bg-lime-400 rounded-full" : ""
              }`}
            >
              <Link 
                href="/admin/dashboard"
                className={`${buttonStyles({
                  color: "default",
                  size: "md",
                  radius: "full",
                  variant: "light",
                })} ${
                  isOpen
                    ? "text-foreground-300  hover:text-black"
                    : "text-foreground-300 hover:text-lime-400"
                }`}
              >
                {isOpen ? (
                  < >
                  
                    <LayoutDashboard />
                    Dashboard

              
                  </>
                ) : (
                  <>
                    <Tooltip
                      showArrow
                      placement="right"
                      content="Dashboard"
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
                      <LayoutDashboard className="mr-10"/>
                    </Tooltip>
                  </>
                )}
              </Link>
            </div>
            <div className={`${isOpen ? "space-y-3" : ""}`} >
              <label
                className={`${
                  isOpen ? "px-3" : ""
                } text-xs font-semibold uppercase text-foreground-300`}
              >
                {isOpen ? "Front Office" : ""}
              </label>
              <BookingsDropDown isOpen={isOpen} toggleSidebar={toggleSidebar} />
              <RatesInventoryDropDown isOpen={isOpen} toggleSidebar={toggleSidebar} />
            </div>
            <div className={`${isOpen ? "space-y-3" : ""}`}>
              <label
                className={`${
                  isOpen ? "px-3" : ""
                } text-xs font-semibold uppercase text-foreground-300`}
              >
                {isOpen ? "Property Master" : ""}
              </label>
              <PropertyMasterDropDown isOpen={isOpen} toggleSidebar={toggleSidebar} />
            </div>
            {/* {isOpen ? (
              <>
                <div className="relative w-[200px] h-[100px] top-[10px] bottom-[90px] bg-gray-500 rounded-[16px] ml-6">
                  hii
                </div>
              </>
            ) : (
              ""
            )} */}
          </nav>
        </div>
      </aside>
    </>
  );
};

export default SideBar;









