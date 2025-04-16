"use client";
import React, { useState, useEffect, useCallback, useRef } from "react";
import { Chip, Button } from "@nextui-org/react";
// import EditModal from '@/app/(partner)/hotel/rateandinventory/managerateandinventory/EditModal';
import { useSelector, useDispatch } from "react-redux";
import { useSearchParams } from "next/navigation";
import { removeQuickSoldFormattedDate } from "@/app/redux/slices/rateandinventorySlice";
import { handleQuickSoldFormattedDate } from "@/app/redux/slices/rateandinventorySlice";
import { handleFormattedDateUpdateProp } from "@/app/redux/slices/rateandinventorySlice";
import { handleUpdatePropArray } from "@/app/redux/slices/rateandinventorySlice";
import { useSession, getSession, signIn, signOut } from "next-auth/react";
import {
  format,
  startOfMonth,
  endOfMonth,
  addDays,
  isSaturday,
  isSunday,
  parse,
} from "date-fns";
import { ChevronDown, ChevronUp } from "lucide-react";
import { Spinner } from "@nextui-org/react";

export default function RIMainCont() {
  const [isLoading, setIsLoading] = useState(true);
  const [showAdditionalRows, setShowAdditionalRows] = useState(false);

  const [roomToSell, setRoomtosell] = useState(0);
  const [price, setPrice] = useState({ key: "0", value: 0 });

  const searchParams = useSearchParams();
  const hotel_id = "123456";
  const hotel_name = "Sanika Baug";
  const [result, setResult] = useState([]);
  const [lastID, setLastID] = useState(0);
  const dispatch = useDispatch();
  const [previousDateRange, setPreviousDateRange] = useState([]);

  let selectedDateRange = useSelector(
    (state) => state.rateandinventory.formattedDateRange
  );
  let standardDateRange = useSelector(
    (state) => state.rateandinventory.standardDateRange
  );
  console.log("standardDateRange:::::::::>", standardDateRange);
  let selectedRoom = useSelector(
    (state) => state.rateandinventory.selectedRoom
  );

  let quickSold = useSelector((state) => state.rateandinventory.quickSold);
  let quickSoldFormattedDate = useSelector(
    (state) => state.rateandinventory.quickSoldFormattedDate
  );
  let quickSoldFormattedDateCopy = useSelector(
    (state) => state.rateandinventory.quickSoldFormattedDateCopy
  );
  let quickSoldSelectedRadio = useSelector(
    (state) => state.rateandinventory.quickSoldSelectedRadio
  );

  let updateBulkProperty = useSelector(
    (state) => state.rateandinventory.updateBulkProperty
  );
  let formattedDateUpdateProp = useSelector(
    (state) => state.rateandinventory.formattedDateUpdateProp
  );
  let formattedDateUpdatePropCopy = useSelector(
    (state) => state.rateandinventory.formattedDateUpdatePropCopy
  );
  let selectedRoomUpdateProperty = useSelector(
    (state) => state.rateandinventory.selectedRoomUpdateProperty
  );
  let selectedRadioUpdateProp = useSelector(
    (state) => state.rateandinventory.selectedRadioUpdateProp
  );

  let updatePropArray = useSelector(
    (state) => state.rateandinventory.updatePropArray
  );
  let updateRoomArray = useSelector(
    (state) => state.rateandinventory.updateRoomArray
  );
  let updateRateArray = useSelector(
    (state) => state.rateandinventory.updateRateArray
  );

  let formattedDateUpdateRoom = useSelector(
    (state) => state.rateandinventory.formattedDateUpdateRoom
  );
  let selectedRoomUpdateRooms = useSelector(
    (state) => state.rateandinventory.selectedRoomUpdateRooms
  );
  let valueTotalRoom = useSelector(
    (state) => state.rateandinventory.valueTotalRoom
  );

  let checkPricePerGuest = useSelector(
    (state) => state.rateandinventory.checkPricePerGuest
  );

  const [editableSelectedRoom, setEditableSelectedRoom] = useState([]);
  const [editableSelectedRoomCopy, setEditableSelectedRoomCopy] = useState([]);

  const [editableUpdateProp, setEditableUpdateProp] = useState([]);
  const [editableUpdatePropCopy, setEditableUpdatePropCopy] = useState([]);

  const [pricePerGuest, setPricePerGuest] = useState([]);

  const [currentSelectedRoomDetails, setCurrentSelectedRoomDetails] = useState(
    {}
  );

  let selectedRoomUpdateRate = useSelector(
    (state) => state.rateandinventory.selectedRoomUpdateRate
  );
  let formattedDateUpdateRate = useSelector(
    (state) => state.rateandinventory.formattedDateUpdateRate
  );
  let value3HourRate = useSelector(
    (state) => state.rateandinventory.value3HourRate
  );
  let value6HourRate = useSelector(
    (state) => state.rateandinventory.value6HourRate
  );
  let value12HourRate = useSelector(
    (state) => state.rateandinventory.value12HourRate
  );
  let valueBaseRate = useSelector(
    (state) => state.rateandinventory.valueBaseRate
  );
  let valueChildRate = useSelector(
    (state) => state.rateandinventory.valueChildRate
  );
  let valueExtraPersonRate = useSelector(
    (state) => state.rateandinventory.valueExtraPersonRate
  );

  const [session, setSession] = React.useState({});

  React.useEffect(() => {
    const getSessionInfo = async () => {
      const session = await getSession();
      setSession(session);
    };
    getSessionInfo();
  }, []);

  React.useEffect(() => {

  }, [session]);

  const getData = async () => {
    try {

      setIsLoading(true)

      const response1 = await fetch(
        `/api/admin/rates_and_inventory/managerateandinventory?hotelId=${hotel_id.toString()}&&selectedRoom=${selectedRoom}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      const result1 = await response1.json();

      let databyid = result1?.databyid;

      databyid = databyid?.filter((item) => {
        return selectedDateRange.includes(item.booking_date);
      });

      const sortedData = databyid?.sort((a, b) => a.id - b.id);

      setResult(sortedData);

    } catch (error) {

    } finally {
      setIsLoading(false)
    }

  };

  const getData1 = async () => {
    try {

      const response1 = await fetch(
        `/api/admin/rates_and_inventory/managerateandinventory?hotelId=${hotel_id.toString()}&&selectedRoom=${selectedRoom}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      const result1 = await response1.json();

      let databyid = result1?.databyid;

      databyid = databyid?.filter((item) => {
        return selectedDateRange.includes(item.booking_date);
      });

      const sortedData = databyid?.sort((a, b) => a.id - b.id);

      setResult(sortedData);

    } catch (error) {

    } finally {

    }

  };

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const dataFxn = useCallback(
    async (
      selectedDateRange,
      selectedRoom,
      quickSoldFormattedDate,
      editableSelectedRoom
    ) => {

      setIsLoading(true);

      let roooomid;

      if (selectedRoom && selectedRoom !== undefined) {


        const response = await fetch(
          `/api/admin/property_master/room_details?hotelId=${hotel_id.toString()}&&roomname=${selectedRoom}`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
            },
          }
        );
        const result = await response.json();

        roooomid = result.dataofRoom.id;
      } else {
        roooomid = "";
      }

      try {
        const response0 = await fetch(
          `/api/admin/rates_and_inventory/managerateandinventory`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
            },
          }
        );
        const result0 = await response0.json();
        const resultData = result0.data.sort((a, b) => a.id - b.id);

        let lstID;
        if (resultData && resultData.length > 0) {

          const ids = resultData?.map(item => item.id).sort((a, b) => a.localeCompare(b));
          // const lastElement = resultData[resultData.length - 1];
          const lastElementId = ids[ids.length - 1];
          const numericPart = lastElementId.replace('MRI', '').replace(/^0+/, '');
          const lastNumericId = numericPart ? parseInt(numericPart) : null;

          lstID = lastNumericId;
        } else {
          lstID = 0;
        }

        const response = await fetch(
          `/api/admin/property_master/room_details?hotelId=${hotel_id.toString()}`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
            },
          }
        );
        const result = await response.json();
        let activeResults = result.dataActive;
        let filteredResults = activeResults.find(
          (item) =>
            item.Hotel_Id === parseInt(hotel_id) &&
            item.room_name === selectedRoom
        );

        console.log("selectedDateRange:::::::::::>", selectedDateRange)


        await Promise.all(
          standardDateRange?.map(async (item) => {
            const date = parse(item, "dd-MM-yyyy", new Date());


            lstID = lstID + 1;

            if (selectedRoom !== " " || selectedRoom !== undefined) {
              let payload;
              payload = {
                id: `MRI${String(lstID).padStart(5, "0")}`,
                Hotel_Id: hotel_id,
                Hotel_name: hotel_name,
                user_id: "01",
                user_name: "test",
                booking_date: format(date, "EEE dd MMM"),
                booking_dateF: item,
                room_type: selectedRoom,
                room_id: roooomid,
                price_per_guest_flag: false,
                room_occupancy: filteredResults?.base_adult,
                rate_3hr: 0,
                rate_6hr: 0,
                rate_12hr: 0,
                rate_24hr: filteredResults?.room_rate,
                total_rooms_count: 0,
                booked_rooms_count: 0,
                first_checkin_last_checkout_3hr: "12 AM - 11 PM",
                first_checkin_last_checkout_6hr: "12 AM - 11 PM",
                first_checkin_last_checkout_12hr: "12 AM - 11 PM",
                first_checkin_last_checkout_24hr: "12 AM - 11 PM",
                first_checkin_last_checkout_status_3hr: "Active",
                first_checkin_last_checkout_status_6hr: "Active",
                first_checkin_last_checkout_status_12hr: "Active",
                first_checkin_last_checkout_status_24hr: "Active",
                status: "bookable",
                creation_date: getCurrentDateTime(),
                last_update_on: getCurrentDateTime(),
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
            }


          })
        );

        if (quickSoldSelectedRadio === "soldout") {
          editableSelectedRoom?.map(async (item) => {
            if (item.roomtype === selectedRoom) {
              if (item.updatedDates.length === 0) {
                if (quickSoldFormattedDateCopy) {
                  let payload = {
                    Hotel_Id: hotel_id,
                    formattedDates: quickSoldFormattedDateCopy,
                    status: quickSoldSelectedRadio,
                    selectedRoom: selectedRoom,
                    operation: "bulkEdit",
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
                  getData();
                }
              } else {
                if (quickSoldFormattedDate) {
                  let datessss = item.updatedDates;
                  const filteredQuickSoldFormattedDateCopy =
                    quickSoldFormattedDateCopy.filter(
                      (item) => !datessss.includes(item)
                    );

                  let payload = {
                    Hotel_Id: hotel_id,
                    formattedDates: quickSoldFormattedDate,
                    status: quickSoldSelectedRadio,
                    selectedRoom: selectedRoom,
                    operation: "bulkEdit",
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

                  if (filteredQuickSoldFormattedDateCopy.length !== 0) {
                    let payload1 = {
                      Hotel_Id: hotel_id,
                      formattedDates: filteredQuickSoldFormattedDateCopy,
                      status: "bookable",
                      selectedRoom: selectedRoom,
                      operation: "bulkEdit",
                    };
                    const response1 = await fetch(
                      `/api/admin/rates_and_inventory/managerateandinventory`,
                      {
                        method: "POST",
                        headers: {
                          "Content-Type": "application/json",
                        },
                        body: JSON.stringify(payload1),
                      }
                    );
                    const result1 = await response1.json();
                    getData();
                  }
                }
              }
            } else {
              console.log("Room Not Found");
            }
          });

          setEditableSelectedRoomCopy(editableSelectedRoom);

          const updatedArray = updatePropArray?.map((item) => ({
            ...item,
            updatedDates: [],
          }));
          dispatch(handleUpdatePropArray(updatedArray));
        } else {
        }

        if (selectedRadioUpdateProp === "soldout") {
          if (selectedRoomUpdateProperty === selectedRoom) {
            updatePropArray?.map(async (item) => {
              if (item.roomtype === selectedRoom) {
                let filteredUpdateProp = selectedDateRange.filter((date) =>
                  item.updatedDates.includes(date)
                );

                let payload = {
                  Hotel_Id: hotel_id,
                  formattedDates: filteredUpdateProp,
                  status: selectedRadioUpdateProp,
                  selectedRoom: selectedRoomUpdateProperty,
                  operation: "bulkEdit",
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
              }
            });
          }
        } else {
          if (selectedRoomUpdateProperty === selectedRoom) {
            updatePropArray?.map(async (item) => {
              if (item.roomtype === selectedRoom) {

                let payload = {
                  Hotel_Id: hotel_id,
                  formattedDates: item.updatedDates,
                  status: selectedRadioUpdateProp,
                  selectedRoom: selectedRoomUpdateProperty,
                  operation: "bulkEdit",
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
              }
            });
          }
        }

        if (updateRoomArray) {
          updateRoomArray?.map(async (item) => {
            if (item.roomtype === selectedRoom) {
              let previousDateRangeNew =
                previousDateRange[previousDateRange.length - 2];



              let filteredUpdateRoom = selectedDateRange.filter(
                (date) => !previousDateRangeNew?.includes(date)
              );
              let filteredUpdateRoomnew = filteredUpdateRoom.filter((date) =>
                item.updatedDates?.includes(date)
              );


              let payload = {
                Hotel_Id: hotel_id,
                formattedDates: filteredUpdateRoomnew,
                selectedRoom: selectedRoom,
                totalRooms: parseInt(item.value),
                operation: "bulkUpdateRoom",
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
              getData();
            }
          });
        }

        if (updateRateArray) {

          updateRateArray?.map(async (item) => {
            if (item.roomtype === selectedRoom) {
              let previousDateRangeNew =
                previousDateRange[previousDateRange.length - 2];



              let filteredUpdateRoom = selectedDateRange.filter(
                (date) => !previousDateRangeNew?.includes(date)
              );
              let filteredUpdateRoomnew = filteredUpdateRoom.filter((date) =>
                item.updatedDates?.includes(date)
              );

              let payload = {
                Hotel_Id: hotel_id,
                formattedDates: filteredUpdateRoomnew,
                selectedRoom: selectedRoom,
                rate_3hr: value3HourRate,
                rate_6hr: value6HourRate,
                rate_12hr: value12HourRate,
                rate_24hr: valueBaseRate,
                rate_child: valueChildRate,
                rate_extraperson: valueExtraPersonRate,
                operation: "bulkUpdateRate",
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
              getData();
            }
          });
        }

        const response1 = await fetch(
          `/api/admin/rates_and_inventory/managerateandinventory?hotelId=${hotel_id.toString()}&&selectedRoom=${selectedRoom}`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
            },
          }
        );
        const result1 = await response1.json();

        let databyid = result1?.databyid;

        databyid = databyid?.filter((item) => {
          return selectedDateRange.includes(item.booking_date);
        });

        const sortedData = databyid?.sort((a, b) => a.id - b.id);

        setResult(sortedData);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setIsLoading(false);
      }
    }
  );

  useEffect(() => {
    if (selectedDateRange.length !== 0) {
      setPreviousDateRange((prevDateRange) => [
        ...prevDateRange,
        selectedDateRange,
      ]);
    }

    console.log("selectedDateRangeselectedRoom", selectedDateRange,
      selectedRoom)

    if (selectedDateRange || selectedRoom) {
      dataFxn(
        selectedDateRange,
        selectedRoom,
        quickSoldFormattedDate,
        editableSelectedRoom
      );
    }
  }, [selectedDateRange, selectedRoom, editableSelectedRoom]);


  const generateUniqueID = () => {
    const newID = `MRI${String(lastID + 1).padStart(5, "0")}`;
    setLastID(lastID + 1);
    return newID;
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

  useEffect(() => {
    if (quickSold) {
      // eslint-disable-next-line react-hooks/exhaustive-deps
      quickSold = quickSold?.filter((item) => {
        return selectedDateRange.includes(item.booking_date);
      });

      const sortedData = quickSold?.sort((a, b) => a.id - b.id);
      setResult(sortedData);
    }

    if (editableSelectedRoom) {
      editableSelectedRoom?.map((item) => {
        item.updatedDates = [];
      });

      setEditableSelectedRoomCopy(editableSelectedRoom);
    }
  }, [quickSold]);

  useEffect(() => {
    if (
      selectedRoom &&
      quickSoldFormattedDateCopy &&
      !editableSelectedRoom.some((item) => item.roomtype === selectedRoom)
    ) {
      let payload = {
        roomtype: selectedRoom,
        updatedDates: [],
      };
      setEditableSelectedRoom((prevState) => [...prevState, payload]);
      setEditableSelectedRoomCopy((prevState) => [...prevState, payload]);
      dispatch(handleQuickSoldFormattedDate(quickSoldFormattedDateCopy));
    }

    if (editableSelectedRoom) {
      editableSelectedRoom?.map((item) => {
        if (item.roomtype === selectedRoom) {
          if (item.updatedDates.length === 0) {
            dispatch(handleQuickSoldFormattedDate(quickSoldFormattedDateCopy));
          } else {
            dispatch(handleQuickSoldFormattedDate(item.updatedDates));
          }
        }
      });
    }

    // if (selectedRoom && formattedDateUpdatePropCopy && !editableUpdateProp.some(item => item.roomtype === selectedRoom)) {


    //     let payload = {
    //         roomtype: selectedRoom,
    //         updatedDates: [],
    //     };
    //     setEditableUpdateProp(prevState => [...prevState, payload]);
    //     setEditableUpdatePropCopy(prevState => [...prevState, payload]);
    //     dispatch(handleFormattedDateUpdateProp(formattedDateUpdatePropCopy));

    // }

    // if(editableUpdateProp) {
    //     editableUpdateProp?.map((item) => {
    //         if(item.roomtype === selectedRoom) {
    //             if(item.updatedDates.length === 0) {
    //                 dispatch(handleFormattedDateUpdateProp(formattedDateUpdatePropCopy));
    //             }else{
    //                 dispatch(handleFormattedDateUpdateProp(item.updatedDates));
    //             }
    //         }
    //     })
    // }
  }, [selectedRoom]);

  useEffect(() => {
    if (editableSelectedRoomCopy) {
      editableSelectedRoomCopy?.map(async (item) => {
        if (item.roomtype === selectedRoom) {
          if (item.updatedDates.length !== 0) {
            let payload = {
              Hotel_Id: hotel_id,
              formattedDates: item.updatedDates,
              status: "soldout",
              selectedRoom: selectedRoom,
              operation: "bulkEdit",
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
            getData();
          }
        }
      });
    }
  }, [editableSelectedRoomCopy, selectedRoom]);

  useEffect(() => {
    if (updateBulkProperty) {
      // eslint-disable-next-line react-hooks/exhaustive-deps
      updateBulkProperty = updateBulkProperty?.filter((item) => {
        return selectedDateRange.includes(item.booking_date);
      });

      const sortedData = updateBulkProperty?.sort((a, b) => a.id - b.id);
      setResult(sortedData);
    }
  }, [updateBulkProperty]);

  useEffect(() => { }, [editableUpdatePropCopy]);

  useEffect(() => { }, [updateRoomArray]);


  // useEffect(() => {
  //   setTimeout(() => {
  //     setIsLoading(false);
  //   }, 2000); 
  // }, []);

  const start = startOfMonth(new Date());
  const end = endOfMonth(new Date());
  const dates = [];


  result.forEach((item) => {
    const date = parse(item.booking_date, "EEE dd MMM", new Date());

    dates.push({
      ...item,
      date: item.booking_dateF,
      day: format(date, "EEEE"),
    });

    dates.sort((a, b) => {

      const dateA = new Date(a.booking_date.split("-").reverse().join("-"));
      const dateB = new Date(b.booking_date.split("-").reverse().join("-"));

      return dateA - dateB;
    });



    console.log(dates);


  });



  const toggleAdditionalRows = (selectedRoom) => {

    setShowAdditionalRows((prev) => !prev);
  };

  const handleKeyDown = async (
    e,
    item,
    booking_date,
    hotelid,
    rate24hr,
    selectedRoom,
    action
  ) => {
    // if (e.key === 'Enter') {
    //   e.target.blur(); // Remove focus from input field
    // }

    if (action === "editRate") {
      let payload = {
        Hotel_Id: hotelid,
        formattedDates: booking_date,
        // status: "soldout",
        rate24hr: rate24hr,
        selectedRoom: selectedRoom,
        operation: "singleEdit",
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

      getData1();
    }
  };

  useEffect(() => {
    if (selectedRoom) {


      const abc = async () => {
        try {


          const response = await fetch(
            `/api/admin/property_master/room_details?hotelId=${hotel_id.toString()}&&roomname=${selectedRoom}`,
            {
              method: "GET",
              headers: {
                "Content-Type": "application/json",
              },
            }
          );
          const result = await response.json();

          setCurrentSelectedRoomDetails(result.dataofRoom);

          const response1 = await fetch(
            `/api/admin/rates_and_inventory/priceperguest?hotelId=${hotel_id.toString()}&roomname=${selectedRoom}`,
            {
              method: "GET",
              headers: {
                "Content-Type": "application/json",
              },
            }
          );
          const result1 = await response1.json();

          setPricePerGuest(result1.databyidroomname);
        } catch (error) { }
      };

      abc();
    }
  }, [selectedRoom]);

  useEffect(() => {
    if (checkPricePerGuest === true) {
      setShowAdditionalRows(true);
    }
  }, [checkPricePerGuest]);

  useEffect(() => {

  }, [price]);

  const handleChangeStatus = (item) => {

    const statuschange = async (item) => {
      try {


        const response1 = await fetch(
          `/api/admin/rates_and_inventory/managerateandinventory`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              id: item.id,
              action: "statusChange",
              status: item.status,
            }),
          }
        );
        const result1 = await response1.json();


        getData1();
      } catch (error) { }
    };

    statuschange(item);
  };

  console.log("DAtes:::::::::>", dates)

  return (
    <div className="overflow-x-scroll w-full lg:w-[80rem] 2xl:w-[99rem] overflow-auto custom-scrollbar">
      <table className="w-[50%]">
        <thead className="sticky top-50 bg-background">
          <tr>
            <th className="sticky left-0 z-10 bg-background border">
              <div className="min-w-[80px] lg:min-w-[200px]"></div>
            </th>
            {dates.map((item) => (
              <th
                key={item.date}
                className={`border bg-background ${isSaturday(new Date(item.date)) || isSunday(new Date(item.date)) ? 'font-bold' : ''
                  } max-w-[80px] lg:w-[200px] `}
              >
                <div className="flex justify-center items-center flex-col py-2">
                  <div className="font-semibold">{item.day}</div>
                  <div className="font-semibold">{item.date}</div>
                </div>
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {isLoading ? (
            <tr>
              <td colSpan={dates.length + 1} className="text-center py-5">
                <div className="spinner-border text-light" role="status">
                  <Spinner />
                </div>
              </td>
            </tr>
          ) : (
            <>
              <tr>
                <td className="sticky left-0 z-10 bg-background border p-2">
                  Room status
                </td>
                {dates.map((item) => (
                  <td key={item.date} className="border bg-background text-center">
                    {item.status === 'bookable' ? (
                      <Button
                        variant="flat"
                        color="success"
                        radius="none"
                        className="w-full text-black"
                        onClick={(e) => handleChangeStatus(item)}
                      >
                        Bookable
                      </Button>
                    ) : (
                      <Button
                        variant="flat"
                        color="danger"
                        radius="none"
                        className="w-full text-black"
                        onClick={(e) => handleChangeStatus(item)}
                      >
                        Closed
                      </Button>
                    )}
                  </td>
                ))}
              </tr>

              <tr>
                <td className="sticky left-0 z-10 bg-background border p-2">
                  Net Booked
                </td>
                {dates.map((item) => (
                  <td className="rounded border h-full w-full" key={item.date}>
                    {/* Empty for future customization */}
                  </td>
                ))}
              </tr>

              <tr>
                <td className="sticky left-0 z-10 bg-background border p-2">
                  <div className="flex flex-col">
                    <button
                      onClick={(e) =>
                        checkPricePerGuest === true ? null : toggleAdditionalRows(selectedRoom)
                      }
                      className="flex gap-3"
                    >
                      Guest Count :{' '}
                      {pricePerGuest && pricePerGuest.length > 0
                        ? pricePerGuest[0].baseOccupancy
                        : currentSelectedRoomDetails.base_adult}
                      {showAdditionalRows ? (
                        <ChevronUp className="text-blue-600" />
                      ) : (
                        <ChevronDown className="text-blue-600" />
                      )}
                    </button>
                  </div>
                </td>

                {dates.map((item) => (
                  <td key={item.date} className="border bg-background">
                    <div className="text-center pr-4 text-[14px] pt-1">INR</div>
                    <input
                      key={item.id}
                      type="number"
                      value={price.key === item.id && price.value ? price.value : item.rate_24hr}
                      onChange={(e) => {
                        setPrice({ key: item.id, value: e.target.value });
                        handleKeyDown(
                          e,
                          item,
                          item.booking_date,
                          item.Hotel_Id,
                          e.target.value,
                          selectedRoom,
                          'editRate'
                        );
                      }}
                      className="py-2 bg-background text-foreground text-center cursor-text"
                      onKeyDown={(e) => {
                        if (e.key === 'Enter') {
                          e.target.blur(); // Remove focus from input field
                        }
                      }}
                    />
                  </td>
                ))}
              </tr>

              {showAdditionalRows && (
                <>
                  {pricePerGuest
                    .filter((item) => item.reduction !== 'Normal price')
                    .map((item1, index) => (
                      <React.Fragment key={item1.id || `${item1.occupancy}-${index}`}>
                        <tr>
                          <td className="sticky left-0 z-10 bg-background border p-2">
                            <div className="inline-flex">
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="18"
                                height="18"
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                className="lucide lucide-user-round"
                              >
                                <circle cx="12" cy="8" r="5" />
                                <path d="M20 21a8 8 0 0 0-16 0" />
                              </svg>
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                style={{ margin: '4px 0 0 0' }}
                                width="13"
                                height="13"
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                className="lucide lucide-x"
                              >
                                <path d="M18 6 6 18" />
                                <path d="m6 6 12 12" />
                              </svg>
                              <span className="" style={{ margin: '-2px 0 0 3px' }}>
                                {item1.occupancy}
                              </span>
                            </div>
                          </td>

                          {dates.map((item) => {
                            let priceToDisplay;

                            if (price.key === item.id) {
                              if (item1.reduction === 'Normal price increased by') {
                                if (item1.type === 'INR') {
                                  priceToDisplay = parseInt(price.value) + parseInt(item1.amount);
                                }

                                if (item1.type === '%') {
                                  const increase =
                                    parseInt(price.value) * (parseInt(item1.amount) / 100);
                                  const newPrice = parseInt(price.value) + increase;
                                  priceToDisplay = newPrice.toFixed(2);
                                }
                              } else if (item1.reduction === 'Normal price reduced by') {
                                if (item1.type === 'INR') {
                                  priceToDisplay = parseInt(price.value) - parseInt(item1.amount);
                                }

                                if (item1.type === '%') {
                                  const discount =
                                    parseInt(price.value) * (parseInt(item1.amount) / 100);
                                  const newPrice = parseInt(price.value) - discount;
                                  priceToDisplay = newPrice.toFixed(2);
                                }
                              }

                              if (item1.isActive === false) {
                                priceToDisplay = price.value;
                              }
                            } else {
                              if (item1.reduction === 'Normal price increased by') {
                                if (item1.type === 'INR') {
                                  priceToDisplay = parseInt(item.rate_24hr) + parseInt(item1.amount);
                                }

                                if (item1.type === '%') {
                                  const increase =
                                    parseInt(item.rate_24hr) * (parseInt(item1.amount) / 100);
                                  const newPrice = parseInt(item.rate_24hr) + increase;
                                  priceToDisplay = newPrice.toFixed(2);
                                }
                              } else if (item1.reduction === 'Normal price reduced by') {
                                if (item1.type === 'INR') {
                                  priceToDisplay = parseInt(item.rate_24hr) - parseInt(item1.amount);
                                }

                                if (item1.type === '%') {
                                  const discount =
                                    parseInt(item.rate_24hr) * (parseInt(item1.amount) / 100);
                                  const newPrice = parseInt(item.rate_24hr) - discount;
                                  priceToDisplay = newPrice.toFixed(2);
                                }
                              }

                              if (item1.isActive === false) {
                                priceToDisplay = item.rate_24hr;
                              }
                            }

                            return (
                              <td
                                key={`${item.date}-${item1.id || index}`}
                                className="border bg-background text-center"
                              >
                                {Math.round(priceToDisplay)}
                              </td>
                            );
                          })}
                        </tr>
                      </React.Fragment>
                    ))}
                </>
              )}
            </>
          )}
        </tbody>
      </table>
    </div>
  );

}
