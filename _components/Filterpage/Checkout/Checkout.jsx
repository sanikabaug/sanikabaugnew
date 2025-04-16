
"use client";
import React, { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import {
  Button,
  Radio,
  RadioGroup,
  Spinner
} from "@nextui-org/react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import Swal from 'sweetalert2'

export default function Checkout() {

  const searchParams = useSearchParams();

  const [selected, setSelected] = React.useState('');

  const router = useRouter();

  const booking_id = searchParams.get("id");

  const payload = searchParams.get("payload");

  const parsedPayload = payload ? JSON.parse(decodeURIComponent(payload)) : null;

  console.log("parsedPayload:::::::>", parsedPayload)

  const [bookingDetails, setBookingDetails] = useState(parsedPayload);

  const [currectYear, setCurrentYear] = useState();

  const [nights, setNights] = useState(0);

  const [salutation, setSalutation] = useState("Mr");

  const [name, setName] = useState("");

  const [number, setNumber] = useState(0);

  const [email, setEmail] = useState("");

  const [check, setCheck] = useState(false);

  const [city, setCity] = useState(false);

  const [zip, setZip] = useState(false);

  const [isClient, setIsClient] = useState(false);

  function extractYear(dateTimeString) {
    const [datePart] = dateTimeString.split(" ");
    const [day, month, year] = datePart.split("-");
    return year;
  }

  const initialFxn = () => {
    let abc = async () => {
      // const response = await fetch(
      //   `/api/userApi/booking_details?bookingId=${booking_id}`,
      //   {
      //     method: "GET",
      //     headers: {
      //       "Content-Type": "application/json",
      //     },
      //   }
      // );
      // const result = await response.json();

      // setBookingDetails(parsedPayload);

      // const response = await fetch("/api/userApi/booking_details", {
      //   method: "POST",
      //   headers: {
      //     "Content-Type": "application/json",
      //   },
      //   body: JSON.stringify(parsedPayload),
      // });
      // const result = await response.json();

      const checkinData =
        parsedPayload?.checkin_date +
        "," +
        " " +
        extractYear(parsedPayload?.checkin_dateF);
      const checkoutData =
        parsedPayload?.checkout_date +
        "," +
        " " +
        extractYear(parsedPayload?.checkin_dateF);

      const checkinDate = new Date(checkinData);
      const checkoutDate = new Date(checkoutData);

      const timeDifference = checkoutDate - checkinDate;

      const numberOfNights = timeDifference / (1000 * 60 * 60 * 24);

      setNights(numberOfNights);

      setCurrentYear(extractYear(parsedPayload?.checkin_dateF));


      if (parsedPayload?.pflag0 === 1) {
        router.push(`/`)
      }



    }

    abc()



  }

  useEffect(() => {
    initialFxn();
    setIsClient(true)
  }, []);

  const handleBookingRequest = () => {

    const mainFxn = async () => {

      const insertFxn = async (name, email, number, booking_id, finalAmount, pflag0, city, zip, selected) => {


        // let payload = {
        //   booking_id: booking_id,
        //   salutation: salutation,
        //   name: name,
        //   number: number.toString(),
        //   email: email,
        //   city: city,
        //   zip: zip,
        //   amt: finalAmount,
        //   pflag0: pflag0,
        //   payment_id: '',
        //   order_id: '',
        //   signature: '',
        //   invoice_id: '',
        //   arrival_time: selected,
        //   action: "update",
        // }

        let payload = {
          ...parsedPayload,
          booking_id: booking_id,
          salutation: salutation,
          username: name,
          phone: number,
          email: email,
          city: city,
          zip: zip,
          price: finalAmount,
          pflag0: pflag0,
          payment_id: '',
          order_id: '',
          signature: '',
          arrival_time: selected,
        };

        const response = await fetch("/api/userApi/booking_details", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(payload),
        });

        const result = await response.json();

        let sendEmail = async (selected) => {
          const payload = {
            operation: "sendenquirymail",
            booking_id: booking_id,
            name: name,
            email: email,
            number: number.toString(),
            city: city,
            zip: zip,
            amt: finalAmount,
            nights: nights,
            selected: selected,
            bookingDetails: bookingDetails,
          }

          const emailresponse = await fetch(`/api/send-email`, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(payload)
          });

          const emailresult = await emailresponse.json();

          if (emailresult.status === 200) {
            Swal.fire({
              title: "Success!",
              text: "Request sent successfully!",
              icon: "success"
            }).then((result) => {
              window.location.href = "/";
            });

          }
        }

        sendEmail(selected)

        return result.response;
      }

      if (name && number) {
        const resp = await insertFxn(name, email, number, booking_id, bookingDetails?.price, 0, city, zip, selected)
      }
    }

    mainFxn()
  }

  return (

    !isClient ? (
      <div className="flex justify-center items-center h-screen">
        <Spinner size="lg" />
      </div>
    ) : (
      <>

        <div className=" bg-gray-50 flex flex-col lg:flex-col items-center justify-center">

          <div className="container mx-auto p-6">

            <div className="flex justify-between items-start flex-col lg:flex-row gap-6">

              {/* Checkout Details */}
              <div className="w-full lg:w-[70%] bg-white p-6 rounded-lg shadow-lg">
                {/* Coupon Section */}

                <h2 className="flex text-xl font-semibold mb-4 w-full justify-center">
                  Booking Summary
                </h2>
                <div className="flex justify-between items-center flex-col md:flex-row gap-2 mb-5 ">
                  <div className="flex gap-3 md:flex-col justify-center items-center">
                    <p className="text-sm lg:text-lg">Check In</p>
                    <p className="text-lg font-semibold">
                      {bookingDetails?.checkin_date}
                      {","} {currectYear}
                    </p>
                  </div>
                  <div className="flex items-center gap-2">
                    <span
                      className="font-bold"
                      style={{
                        "WebkitTextStroke": "thick",
                        padding: "0 0 7px 0",
                      }}
                    >
                      .
                    </span>
                    <span>----</span>
                    <span className="text-2xl">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="lucide lucide-moon"
                      >
                        <path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z" />
                      </svg>
                    </span>
                    <span className="text-lg font-semibold">{nights ? nights : nights}</span>
                    <span>----</span>
                    <span
                      className="font-bold"
                      style={{
                        "WebkitTextStroke": "thick",
                        padding: "0 0 7px 0",
                      }}
                    >
                      .
                    </span>
                  </div>
                  <div className="flex gap-3 md:flex-col justify-center items-center">
                    <p className="text-sm lg:text-lg">Check Out</p>
                    <p className="text-lg font-semibold">
                      {bookingDetails?.checkout_date}
                      {","} {currectYear}
                    </p>
                  </div>
                </div>

                {/* Room Details */}
                <div className="mb-4 w-full">
                  {/* Desktop/Table View */}
                  <div className="hidden md:block">
                    <table className="w-full table-auto border-collapse border border-gray-200 text-sm">
                      <thead>
                        <tr className="bg-gray-100 text-left">
                          {/* <th className="border border-gray-200 px-4 py-2 w-48">Room Image</th> */}
                          <th className="border border-gray-200 px-4 py-2">Name</th>
                          <th className="border border-gray-200 px-4 py-2">Room</th>
                          <th className="border border-gray-200 px-4 py-2">Guest per Room</th>
                          <th className="border border-gray-200 px-4 py-2">Base Price</th>
                          <th className="border border-gray-200 px-4 py-2">Total Guest</th>
                          <th className="border border-gray-200 px-4 py-2">Extra Guest</th>
                          <th className="border border-gray-200 px-4 py-2">Total Room Amount</th>
                          <th className="border border-gray-200 px-4 py-2">Total Extra Guest Amount</th>
                          <th className="border border-gray-200 px-4 py-2">Total Guest Pay</th>
                        </tr>
                      </thead>
                      <tbody>
                        {bookingDetails?.roomDet.map((item, index) => (
                          <tr key={item.id || `room-${index}`} className="hover:bg-gray-50">
                            {/* <td className="border border-gray-200 px-4 py-2 w-48">
              <Image
                src={item.roomimage}
                alt="Room"
                className="w-40 h-40 object-cover rounded-lg"
                width={160}
                height={160}
              />
            </td> */}
                            <td className="border border-gray-200 px-4 py-2">{item.name || ''}</td>
                            <td className="border border-gray-200 px-4 py-2">{item.selectedRoomCount || ''}</td>
                            <td className="border border-gray-200 px-4 py-2">
                              {item.selectedGuestPerRoom || ''} Adults, 0 Children
                            </td>
                            <td className="border border-gray-200 px-4 py-2">₹ {item.amount || ''}</td>
                            <td className="border border-gray-200 px-4 py-2">{item.totalGuestWithExtraPerson || ''}</td>
                            <td className="border border-gray-200 px-4 py-2">
                              {item.totalExtraGuest || '0'} (₹200 extra mattress per extra guest)
                            </td>
                            <td className="border border-gray-200 px-4 py-2">₹ {item.totalroomamount || '0'}</td>
                            <td className="border border-gray-200 px-4 py-2">₹ {item.totalExtraGuestAmount || '0'}</td>
                            <td className="border border-gray-200 px-4 py-2">₹ {item.totalroomamountwithextraguest || '0'}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>

                  {/* Mobile/Card View */}
                  <div className="block md:hidden">
                    {bookingDetails?.roomDet.map((item, index) => (
                      <div
                        key={item.id || `room-${index}`}
                        className="mb-4 border border-gray-200 rounded-lg shadow-sm"
                      >
                        <div className="flex flex-col">
                          {/* Fixed-size image container */}
                          <div className="w-full flex justify-center">
                            <div className="w-full h-64">
                              <Image
                                src={item.roomimage}
                                alt="Room"
                                className="w-full h-full object-cover rounded-lg"
                                width={256} // Matches w-64
                                height={256} // Matches h-64
                              />
                            </div>
                          </div>
                          <div className="p-4">
                            <h2 className="font-semibold text-lg mb-4 text-center">{item.name || 'Room'}</h2>
                            <div className="space-y-2">
                              <div className="flex justify-between items-center text-sm">
                                <span className="text-gray-500 font-medium">Rooms:</span>
                                <span className="text-gray-700">{item.selectedRoomCount || 'N/A'}</span>
                              </div>
                              <div className="flex justify-between items-center text-sm">
                                <span className="text-gray-500 font-medium">Guests per Room:</span>
                                <span className="text-gray-700">{item.selectedGuestPerRoom || 'N/A'} Adults</span>
                              </div>
                              <div className="flex justify-between items-center text-sm">
                                <span className="text-gray-500 font-medium">Base Price:</span>
                                <span className="text-gray-700">₹ {item.amount || '0'}</span>
                              </div>
                              <div className="flex justify-between items-center text-sm">
                                <span className="text-gray-500 font-medium">Total Guests:</span>
                                <span className="text-gray-700">{item.totalGuestWithExtraPerson || '0'}</span>
                              </div>
                              <div className="flex justify-between items-center text-sm">
                                <span className="text-gray-500 font-medium">Extra Guests:</span>
                                <span className="text-gray-700">
                                  {item.totalExtraGuest || '0'} (₹200 per extra guest)
                                </span>
                              </div>
                            </div>
                          </div>

                        </div>
                        <div className="p-4 space-y-2">
                          <div className="flex justify-between items-center text-sm">
                            <span className="text-gray-500 font-medium">Total Room Amount:</span>
                            <span className="text-gray-700">₹ {item.totalroomamount || '0'}</span>
                          </div>
                          <div className="flex justify-between items-center text-sm">
                            <span className="text-gray-500 font-medium">Total Extra Guest Amount:</span>
                            <span className="text-gray-700">₹ {item.totalExtraGuestAmount || '0'}</span>
                          </div>
                          <div className="flex justify-between items-center text-sm">
                            <span className="text-gray-500 font-medium">Total Guest Pay:</span>
                            <span className="text-gray-900 font-semibold">₹ {item.totalroomamountwithextraguest || '0'}</span>
                          </div>
                        </div>

                      </div>
                    ))}
                  </div>

                </div>






                <div className="w-full flex justify-center items-center md:justify-end">
                  <button
                    className="bg-[#333333] text-white font-medium py-2 px-4 rounded-lg"
                    onClick={(e) => {
                      router.push(
                        `/filterpage?checkindate=${bookingDetails.checkin_dateF}&checkoutdate=${bookingDetails.checkout_dateF}&adultsSelect=${bookingDetails.roomDet[0].adultCount}&childSelect=${bookingDetails.roomDet[0].childCount}&bookId=${booking_id}`
                      );
                    }}
                  >
                    Modify
                  </button>
                </div>


                <div className="flex flex-col text-xl font-semibold gap-4 mt-8">
                  <p className="mb-2">Arrival Time</p>
                  <RadioGroup
                    value={selected}
                    onValueChange={setSelected}
                  >
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 w-full text-gray-800">
                      <Radio value="12:00 A.M to 06:00 A.M">12:00 A.M to 06:00 A.M</Radio>
                      <Radio value="06:00 A.M to 11:00 A.M">06:00 A.M to 11:00 A.M</Radio>
                      <Radio value="11:00 A.M to 04:00 P.M">11:00 A.M to 04:00 P.M</Radio>
                      <Radio value="04:00 P.M to 08:00 P.M">04:00 P.M to 08:00 P.M</Radio>
                      <Radio value="08:00 P.M to 11:45 P.M">08:00 P.M to 11:45 P.M</Radio>
                    </div>
                  </RadioGroup>
                </div>


                <div className="mb-5 bg-white p-6 rounded-lg border-t w-full mt-8 shadow-md">
                  {/* <h2 className="text-lg font-semibold mb-4">Have a coupon code?</h2>
  <div className="flex flex-col sm:flex-row items-center gap-2">
    <input
      type="text"
      placeholder="Coupon"
      className="p-2 border border-gray-300 rounded-lg w-full sm:w-auto flex-grow" />
    <button className="bg-gray-500 text-white py-2 px-4 rounded-lg">
      Apply
    </button>
  </div> */}

                  {bookingDetails?.roomDet.map((item, index) => (
                    <div
                      key={item.main_id}
                      className="border-b border-gray-200 py-4 last:border-none"
                    >
                      <div className="flex justify-between items-center">
                        <p className="text-gray-700 font-medium">{item.name}</p>
                        <p className="text-gray-900 font-semibold">₹ {item?.totalroomamountwithextraguest}</p>
                      </div>
                    </div>
                  ))}

                  {/* <div className="flex justify-between items-center mt-4">
    <p className="text-gray-500">GST</p>
    <p className="text-gray-700 font-medium">₹ {(bookingDetails?.price * 18 / 100).toFixed(2)}</p>
  </div> */}

                  <div
                    className="border-b border-gray-200 py-4 last:border-none"
                  >
                    <div className="flex justify-between items-center">
                      <p className="text-gray-700 font-medium">Nights</p>
                      <p className="text-gray-900 font-semibold">{nights}</p>
                    </div>
                  </div>

                  <div className="flex justify-between items-center font-semibold text-lg mt-4">
                    <p className="text-gray-800">Total Price</p>
                    {/* <p>₹ {(bookingDetails?.price * (1 + 18 / 100)).toFixed(2)}</p> */}
                    <p className="text-gray-900">₹ {bookingDetails?.totalroomamountwithextraguest * nights}</p>
                  </div>
                </div>
              </div>

              {/* Repeating Guest */}
              <div className="w-full lg:w-[30%] bg-white p-6 rounded-lg shadow-lg">
                <h2 className="text-xl font-semibold mb-4">Guest Details</h2>
                <div className="mb-4">
                  <label className="block text-sm font-medium mb-1">Name *</label>
                  <div className="inline-flex gap-2 w-full">
                    <select
                      onChange={(e) => setSalutation(e.target.value)}
                      value={salutation}
                      className="border rounded-md p-1"
                    >
                      <option value="Mr">Mr</option>
                      <option value="Mrs">Mrs</option>
                    </select>
                    <input
                      type="text"
                      className="w-full p-2 border border-gray-300 rounded-lg"
                      placeholder="Name"
                      onChange={(e) => setName(e.target.value)}
                    />
                  </div>
                </div>
                <div className="mb-4 w-full">
                  <label className="block text-sm font-medium mb-1">
                    Phone Number *
                  </label>
                  <div className="flex justify-between lg:gap-2 flex-col lg:flex-row gap-3">
                    <input
                      type="number"
                      className="w-full p-2 border border-gray-300 rounded-lg"
                      placeholder="Phone Number"
                      onChange={(e) => setNumber(e.target.value)}
                    />


                  </div>
                </div>
                <div className="mb-4">
                  <label className="block text-sm font-medium mb-1">
                    Email ID
                  </label>
                  <input
                    type="email"
                    className="w-full p-2 border border-gray-300 rounded-lg"
                    placeholder="Email"
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>
                <div className="flex mb-4 gap-2 w-full">
                  <div className="">
                    <label className="block text-sm font-medium mb-1">
                      City
                    </label>
                    <input
                      type="text"
                      className="w-full p-2 border border-gray-300 rounded-lg"
                      placeholder="City"
                      onChange={(e) => setCity(e.target.value)}
                    />
                  </div>


                  <div className="">
                    <label className="block text-sm font-medium mb-1">
                      Zip
                    </label>
                    <input
                      type="text"
                      className="w-full p-2 border border-gray-300 rounded-lg"
                      placeholder="Zip"
                      onChange={(e) => setZip(e.target.value)}
                    />
                  </div>
                </div>

                {/* <h3 className="text-lg font-semibold mb-2">Payment Methods</h3>
              <p className="mb-4">Prepaid</p> */}

                <div className="flex items-center mb-4">
                  <input
                    type="checkbox"
                    className="mr-2"
                    onChange={(e) => setCheck((prevVal) => !prevVal)}
                  />
                  <label className="text-sm">
                    I have read and accept the Hotel&apos;s{" "}
                    <a href="#" className="text-pink-500 underline">
                      Terms & conditions, Privacy policies, Cancellation Policies.
                    </a>
                  </label>
                </div>
                <div className="w-full flex justify-center lg:justify-start">
                  <Button onClick={(e) => handleBookingRequest()} className="bg-[#333333] text-white font-medium">Send Booking Request</Button>
                </div>
              </div>
            </div>


          </div>
        </div>


      </>
    )

  );
}
