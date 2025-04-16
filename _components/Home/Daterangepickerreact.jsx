'use client';
import React, { useState, useEffect } from "react";
import 'react-date-range/dist/styles.css'; // main css file
import 'react-date-range/dist/theme/default.css'; // theme css file
import { DateRange } from 'react-date-range';
import { cn } from "@/_lib/utils";
import { addDays, format } from "date-fns";
import { Button } from "@nextui-org/react";
import { CalendarRange } from "lucide-react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/_components/Home/Popover";

export default function Daterangepickerreact({
  className,
  initialDate,
  onDateValue,
  checkindate,
}) {
  const [popoverOpen, setPopoverOpen] = useState(false);
  const [date, setDate] = useState(() => {
    if (initialDate) {
      const parseDate = (dateString) => {
        const [day, month, year] = dateString.split('-');
        return new Date(`${year}-${month}-${day}`);
      };

      const parsedCheckinDate = parseDate(checkindate);

      return [
        {
          startDate: parsedCheckinDate,
          endDate: addDays(parsedCheckinDate, initialDate),
          key: 'selection',
        },
      ];
    } else {
      return [
        {
          startDate: new Date(),
          endDate: null,
          key: 'selection',
        },
      ];
    }
  });

  const [monthsToShow, setMonthsToShow] = useState(1); // Default to 1 month

  const handleResize = () => {
    if (window.matchMedia("(min-width: 768px)").matches) {
      setMonthsToShow(2); // Show 2 months after md (768px)
    } else {
      setMonthsToShow(1); // Show 1 month on small screens
    }
  };

  useEffect(() => {
    handleResize(); // Set initial value
    window.addEventListener("resize", handleResize); // Add event listener
    return () => {
      window.removeEventListener("resize", handleResize); // Cleanup on unmount
    };
  }, []);

  const handleSelect = (item) => {
    console.log("New Date: ", item);
    setDate([item.selection]);
    onDateValue([item.selection]);
  };

  // useEffect(() => {
  //   if (date) {
  //     onDateValue(date);
  //   }
  // }, [date, onDateValue]);

  return (
    <div className={cn("grid gap-2", className)}>
      <Popover open={popoverOpen} onOpenChange={(newState) => setPopoverOpen(newState)}>
        <PopoverTrigger asChild className="text-black bg-white">
          <Button
            id="date"
            variant={"destructive"}
            className={cn(
              "flex justify-center text-center font-semibold text-gray-500 bg-slate-100 text-[13px] lg:text-medium lg:text-[#333333]",
              !date && "text-black bg-white"
            )}
          >
            <CalendarRange className="block size-5" />
            {date[0]?.startDate ? (
              date[0]?.endDate ? (
                <>
                  {format(date[0]?.startDate, "LLL dd, y")} : {format(date[0]?.endDate, "LLL dd, y")}
                </>
              ) : (
                format(date[0]?.startDate, "LLL dd, y")
              )
            ) : (
              <span>Pick a date</span>
            )}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-0 text-black bg-white" align="start">
          <DateRange
            className="flex flex-col lg:flex-row bg-white rounded-lg border-2 border-gray-300 h-90 w-66 overflow-hidden"
            editableDateInputs={true}
            onChange={(item) => handleSelect(item)}
            moveRangeOnFirstSelection={false}
            ranges={date}
            months={monthsToShow} // Dynamic month display
            direction="horizontal"
            minDate={new Date()}
          />
        </PopoverContent>
      </Popover>
    </div>
  );
}
