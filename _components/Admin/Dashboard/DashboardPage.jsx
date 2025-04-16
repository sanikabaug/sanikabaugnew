'use client'
import React, { useState, useEffect } from "react";
import StatsCard from "@/_components/Admin/Dashboard/StatsCard";
import SalesOverview from "@/_components/Admin/Dashboard/SalesOverview";
import UpcomingSchedule from "@/_components/Admin/Dashboard/UpcomingSchedule";
import Calendar from "@/_components/Admin/Dashboard/Calendar";
import Notification from "@/_components/Admin/Dashboard/Notification";
import { Spinner } from "@nextui-org/react";

export default function DashboardPage() {
  const [isLoading, setIsLoading] = useState(true);
  const [bookingDetails, setBookingDetails] = useState([]);
  const [paidBookings, setPaidBookings] = useState("0");
  const [pendingBookings, setPendingBookings] = useState("0");
  const [todayBookings, setTodayBookings] = useState("0");
  const [monthlyBookings, setMonthlyBookings] = useState("0");
  const [todayEarnings, setTodayEarnings] = useState("0");
  const [monthlyEarnings, setMonthlyEarnings] = useState("0");
  const [roomsBooked, setRoomsBooked] = useState("0");

  const today = new Date();
  const currentDate = `${today.getDate().toString().padStart(2, '0')}-${(today.getMonth() + 1).toString().padStart(2, '0')}-${today.getFullYear()}`;
  const [dateChange, setDateChange] = useState(null);

  const initialFxn = async () => {
    try {
      setIsLoading(true); // Start loader
      const response = await fetch(`/api/userApi/booking_details`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });

      const result = await response.json();
      console.log("Data::::::::>", result);

      setBookingDetails(result.data_All);

      const deleteOldDates = async () => {
        let payload = {
          action: "deleteOldDates",
        };

        const response = await fetch(
          `/api/admin/rates_and_inventory/managerateandinventory`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(payload),
          }
        );
        const result = await response.json();
        console.log("Delete Old Dates Result:", result);
      };

      await deleteOldDates();
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setIsLoading(false); // End loader
    }
  };

  useEffect(() => {
    initialFxn();
  }, []);

  useEffect(() => {
    if (bookingDetails.length > 0) {
      const paidBook = bookingDetails.filter((item) => item.pflag0 === 1);
      setPaidBookings((paidBook?.length).toString());

      const pendingBook = bookingDetails.filter((item) => item.pflag0 === 0);
      setPendingBookings((pendingBook?.length).toString());

      const todayBook = bookingDetails.filter((item) => (item.booking_date).split(" ")[0] === currentDate);
      setTodayBookings((todayBook?.length).toString());

      const [date, month, year] = currentDate.split("-");
      const currentMonthYear = month + "-" + year;

      const monthBookings = bookingDetails.filter((item) => {
        const [bookingDate] = item.booking_date.split(" ");
        const [date, month, year] = bookingDate.split("-");

        const bookingMonthYear = month + "-" + year;

        return bookingMonthYear === currentMonthYear;
      });

      setMonthlyBookings((monthBookings?.length).toString());

      const todayPrice = todayBook?.filter((item) => item.pflag0 === 1).reduce((sum, item) => sum + parseInt(item.price), 0);
      setTodayEarnings(todayPrice.toString());

      const monthlyPrice = monthBookings?.filter((item) => item.pflag0 === 1).reduce((sum, item) => sum + parseInt(item.price), 0);
      setMonthlyEarnings(monthlyPrice.toString());

      const roomBook = paidBook?.reduce((sum, item) => sum + parseInt(item.rooms_count), 0);
      setRoomsBooked(roomBook.toString());
    }
  }, [bookingDetails]);

  const handleDateChange = (val) => {
    setDateChange(val);
  };

  return (
    <div>
      {isLoading ? (
        <div className="flex justify-center items-center h-screen">
          <Spinner size="lg" />
        </div>
      ) : (
        <>
          <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6 bg-background text-foreground">
            <StatsCard title="Total Bookings" value={(bookingDetails.length).toString()} percentage="15" />
            <StatsCard title="Paid Bookings" value={(paidBookings).toString()} percentage="9" />
            <StatsCard title="Pending Bookings" value={(pendingBookings).toString()} percentage="7.2" />
            <StatsCard title="Rooms Booked" value={roomsBooked} percentage="4.5" />
          </div>
          <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6 bg-background text-foreground">
            <StatsCard title="Today Booking" value={(todayBookings).toString()} percentage="15" />
            <StatsCard title="Monthly Booking" value={(monthlyBookings).toString()} percentage="9" />
            <StatsCard title="Today Earning" value={todayEarnings} percentage="7.2" />
            <StatsCard title="Monthly Earning" value={monthlyEarnings} percentage="4.5" />
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            <div className="bg-background text-foreground p-4 rounded-lg shadow-sm dark:shadow-gray-600 space-y-4">
              <SalesOverview bookingDetails={bookingDetails} />
            </div>
            <div className="bg-background text-foreground shadow-g p-4 rounded-sm shadow-sm dark:shadow-gray-600 space-y-4 place-items-center place-content-center">
              <Calendar onDateChange={handleDateChange} />
            </div>
            <div className="bg-background text-foreground p-4 rounded-lg shadow-sm dark:shadow-gray-600 space-y-4">
              <Notification />
            </div>
            <div className="bg-background text-foreground p-4 rounded-lg shadow-sm dark:shadow-gray-600 space-y-4">
              <UpcomingSchedule bookingDetails={bookingDetails} dateChange={dateChange} />
            </div>
          </div>
        </>
      )}
    </div>
  );
}
