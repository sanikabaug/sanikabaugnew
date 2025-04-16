'use client';
import React, { useState, useEffect } from "react";
import 'react-date-range/dist/styles.css'; // main css file
import 'react-date-range/dist/theme/default.css'; // theme css file
import { DateRange } from 'react-date-range';
import { cn } from "@/_lib/utils";
import { addDays, format } from "date-fns";
import { Button } from "@/_components/Admin/Ratesandinventory/Button";
import { CiCalendar } from "react-icons/ci";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/_components/Admin/Ratesandinventory/Popover";
import { useMediaQuery } from '@react-hook/media-query';

export default function Daterangepickerreact({ className, initialDate, onDateValue }) {
  const [popoverOpen, setPopoverOpen] = useState(false);
  const isLargeScreen = useMediaQuery('only screen and (min-width: 1024px)'); // lg: min-width 1024px
  const [date, setDate] = useState(() => {
    if (initialDate) {
      return [
        {
          startDate: new Date(),
          endDate: addDays(new Date(), 6),
          key: 'selection'
        }
      ];
    } else {
      return [
        {
          startDate: new Date(),
          endDate: null,
          key: 'selection'
        }
      ];
    }
  });

  const handleSelect = (item) => {
    console.log("New Date: ", item);
    setDate([item.selection]);
    onDateValue([item.selection]);
  };

  useEffect(() => {
    if (date) {
      onDateValue(date);
    }
  }, [date, onDateValue]);

  return (
    <div className={cn("grid gap-2", className)}>
      <Popover open={popoverOpen} onOpenChange={(newState) => setPopoverOpen(newState)}>
        <PopoverTrigger asChild className="text-foreground bg-background">
          <Button
            id="date"
            variant={"destructive"}
            className={cn(
              "w-full justify-center text-center font-normal",
              !date && "text-foreground bg-background"
            )}
          >
            <CiCalendar className="mr-2 size-4" />
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
        <PopoverContent className="w-auto p-0 text-foreground bg-white" align="start">
          <DateRange
            className="bg-white rounded-lg border-2 border-gray-300 h-90 w-66 overflow-hidden"
            editableDateInputs={true}
            onChange={(item) => handleSelect(item)}
            moveRangeOnFirstSelection={false}
            ranges={date}
            months={isLargeScreen ? 2 : 1} // Show 2 months on large screens, 1 month otherwise
            direction="horizontal"
            minDate={new Date()}
          />
        </PopoverContent>
      </Popover>
    </div>
  );
}
