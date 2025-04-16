"use client";
import React from "react";
import {
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
  Tooltip,
} from "@nextui-org/react";
import Link from "next/link";
import { Codesandbox, ChevronDown } from "lucide-react";
import { button as buttonStyles } from "@nextui-org/theme";

export default function RatesInventoryDropDown({
  isOpen,
  handleLinkClick,
  toggleSidebar,
}) {
  const handleItemClick = () => {
    if (handleLinkClick) handleLinkClick();
    if (toggleSidebar) toggleSidebar();
  };

  return (
    <Dropdown placement="right-bottom">
      <DropdownTrigger>
        <Link
          href="#"
          className={`${buttonStyles({
            color: "default",
            size: "md",
            radius: "full",
            variant: "light",
          })} ${
            isOpen
              ? "hover:bg-lime-500 text-foreground-300 hover:text-black justify-between w-[90%]"
              : "text-foreground-300"
          }`}
        >
          <div className="flex gap-2">
            {isOpen ? (
              <>
                <Codesandbox />
                Rates & Inventory
              </>
            ) : (
              <Tooltip
                showArrow
                placement="right"
                content="Rates & Inventory"
                classNames={{
                  base: ["before:bg-primary-300 dark:before:bg-primary"],
                  content: [
                    "py-2 px-4 shadow-xl",
                    "text-white bg-primary-300 from-primary-300 to-primary-300",
                  ],
                }}
              >
                <Codesandbox className="mr-10 hidden lg:flex" />
              </Tooltip>
            )}
          </div>
          {isOpen ? <ChevronDown /> : ""}
        </Link>
      </DropdownTrigger>
      <DropdownMenu
        aria-label="Dropdown Variants"
        color="primary"
        variant="flat"
      >
        <DropdownItem
          onClick={handleItemClick}
          className="text-foreground-600 hover:text-primary"
          startContent={<Codesandbox />}
          key="manage-rate-inventory"
        >
          <Link
            href={`/admin/rateandinventory/managerateandinventory`}
          >
            Manage Rate & Inventory
          </Link>
        </DropdownItem>
        <DropdownItem
          onClick={handleItemClick}
          className="text-foreground-600 hover:text-primary"
          startContent={<Codesandbox />}
          key="price-per-guest"
        >
          <Link
            href={`/admin/rateandinventory/priceperguest`}
          >
            Price Per Guest
          </Link>
        </DropdownItem>
        {/* <DropdownItem
          onClick={handleItemClick}
          className="text-foreground-600 hover:text-primary"
          startContent={<Codesandbox />}
          key="policies"
        >
          <Link
            href={`/admin/rateandinventory/policies`}
          >
            Policies
          </Link>
        </DropdownItem> */}
      </DropdownMenu>
    </Dropdown>
  );
}
