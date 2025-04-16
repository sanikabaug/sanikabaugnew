"use client";
import React, { useState, useEffect } from "react";
import ToggleBtn from "@/_components/Admin/Ratesandinventory/Priceperguest/ToggleBtn";
import { Autocomplete, AutocompleteItem } from "@nextui-org/react"

const PricingForm = () => {

  const hotel_id = "123456";

  const hotel_name = "Sanika Baug";

  const [roomResult, setRoomResult] = useState([]);

  const [selectedRoom, setSelectedRoom] = useState();

  const [selectedRoomKey, setSelectedRoomKey] = useState();

  const [selectedRoomObj, setSelectedRoomObj] = useState({});

  const [baseOccupancy, setBaseOccupancy] = useState();

  const [maxOccupancy, setMaxOccupancy] = useState();

  const [selectedBaseOccupancy, setSelectedBaseOccupancy] = useState();

  const [discounts, setDiscounts] = useState([]);

  const initialFxn = async () => {
    try {

      const response = await fetch(`/api/admin/property_master/room_details?hotelId=${hotel_id.toString()}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
      const result = await response.json();
      console.log("Data:123456", result.dataActive);
      let abcd = result.dataActive;
      setRoomResult(result.dataActive)

    } catch (error) {
      console.error("Error fetching data:", error);
    }
  }

  useEffect(() => {

    initialFxn()

  }, [])


  // const [discounts, setDiscounts] = useState([
  //   {
  //     occupancy: 4,
  //     reduction: "Normal price reduced by",
  //     amount: 30,
  //     type: "%",
  //     isActive: true,
  //   },
  //   {
  //     occupancy: 3,
  //     reduction: "Normal price reduced by",
  //     amount: 20,
  //     type: "%",
  //     isActive: true,
  //   },
  //   {
  //     occupancy: 2,
  //     reduction: "Normal price reduced by",
  //     amount: 15,
  //     type: "%",
  //     isActive: true,
  //   },
  //   {
  //     occupancy: 1,
  //     reduction: "Normal price reduced by",
  //     amount: 10,
  //     type: "%",
  //     isActive: true,
  //   },
  // ]);




  const generateDiscounts = (maxOccupancy) => {
    const discounts = [];
    for (let i = maxOccupancy; i >= 1; i--) {
      let amount = 0;
      discounts.push({
        occupancy: i.toString(),
        reduction: "Normal price increased by",
        amount: amount,
        type: "%",
        isActive: true,
      });
    }
    return discounts;
  };

  const updateDiscounts = (discounts, baseOccupancy) => {
    return discounts.map(discount => {
      if (discount.occupancy > baseOccupancy) {
        return {
          ...discount,
          reduction: "Normal price increased by",
        };
      } else {
        return {
          ...discount,
          reduction: "Normal price reduced by",
        };
      }
    });
  }

  const handleAmountChange = (index, value) => {
    const newDiscounts = [...discounts];
    newDiscounts[index].amount = value;
    setDiscounts(newDiscounts);
  };

  const handleTypeChange = (index, value) => {
    const newDiscounts = [...discounts];
    newDiscounts[index].type = value;
    setDiscounts(newDiscounts);
  };

  const handleToggleChange = (index) => {
    const newDiscounts = [...discounts];
    newDiscounts[index].isActive = !newDiscounts[index].isActive;
    setDiscounts(newDiscounts);
  };

  useEffect(() => {
    if (roomResult && roomResult.length > 0) {
      const defaultKey = `${roomResult[0].id}`;
      setSelectedRoomKey(defaultKey);
      setSelectedRoom(`${(roomResult[0].room_name).toString()}`)
    }
  }, [roomResult]);

  useEffect(() => {

    console.log("selectedRoomKey::::::>", selectedRoomKey)

    const abvv = async () => {

      const response1 = await fetch(`/api/admin/rates_and_inventory/priceperguest?hotelId=${hotel_id.toString()}&roomid=${selectedRoomKey}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
      const result1 = await response1.json();
      console.log("Data222222: ", result1.databyidroom);

      let abc = result1.databyidroom;

      if (abc.length > 0) {

        setBaseOccupancy(abc[0].baseOccupancy)
        setMaxOccupancy(abc[0].maxOccupancy)
        setSelectedBaseOccupancy(abc[0].baseOccupancy)

        const filteredData = abc.map(({ occupancy, reduction, amount, type, isActive }) => ({
          occupancy,
          reduction,
          amount,
          type,
          isActive
        }));

        setDiscounts(filteredData);

        let abcd = roomResult.find((item) => item.id === selectedRoomKey)
        setSelectedRoom((abcd.room_name).toString())

      } else {

        if (selectedRoomKey) {
          let abcd = roomResult.find((item) => item.id === selectedRoomKey)
          setSelectedRoom((abcd.room_name).toString())

          const abc = roomResult.find((item) => item.id === selectedRoomKey)
          setSelectedRoomObj(abc)
          setBaseOccupancy(abc.base_adult)
          setMaxOccupancy(abc.max_adult)
          setSelectedBaseOccupancy(abc.base_adult)

          const discountsArray = generateDiscounts(abc.max_adult);
          setDiscounts(discountsArray);

        }

      }

    }

    abvv()

  }, [selectedRoomKey]);

  useEffect(() => {
    if (selectedBaseOccupancy) {


      const discountsArray = updateDiscounts(discounts, selectedBaseOccupancy);
      const abc = discountsArray.map(discount => {
        if (discount.occupancy === selectedBaseOccupancy) {
          return {
            ...discount,
            reduction: "Normal price",
          };
        }
        return discount;
      });
      setDiscounts(abc);
    }
  }, [selectedBaseOccupancy]);

  useEffect(() => {
    if (discounts) {
      console.log("Discounts: ", discounts)
    }
  }, [discounts])

  const generateID = async (index) => {
    try {
      const response = await fetch(`/api/admin/rates_and_inventory/priceperguest?hotelId=${hotel_id.toString()}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
      const result = await response.json();
      console.log("Data: ", result);

      let newID;

      if (result.databyid.length === 0) {
        newID = `MRIPPG${String(index + 1).padStart(5, "0")}`;
        console.log("ABCCCCC123:", newID)
      } else {
        let abc = result.databyid[(result.databyid.length - 1)].id.match(/\d+/)[0].replace(/^0+/, '');
        console.log("ABCCCCC:", abc)
        newID = `MRIPPG${String(parseInt(abc) + 1).padStart(5, "0")}`;
      }

      return newID;

    } catch (error) {
      console.error("Error fetching data:", error);
    }
  }

  const handleSaveChanges = (discounts, selectedRoom) => {
    console.log("Save", discounts, selectedRoom)


    const fetchAndSetDiscounts = async () => {
      const payload = await Promise.all(discounts.map(async (discount, index) => ({
        ...discount,
        id: await generateID(index),
        Hotel_Id: parseInt(hotel_id),
        Hotel_name: hotel_name,
        roomid: selectedRoomKey,
        roomname: selectedRoom,
        baseOccupancy: selectedBaseOccupancy,
        maxOccupancy: maxOccupancy,
      })));

      console.log("Save Changes: ", payload)

      const save = async () => {
        try {
          const response = await fetch(`/api/admin/rates_and_inventory/priceperguest`, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(payload),
          });
          const result = await response.json();
          console.log("Data4444: ", result);
          if(result.success === true) {
            window.alert("Data saved!")
          }
        } catch (error) {

        }
      }

      save()




    }

    fetchAndSetDiscounts()

  }





  return (
    <div>
      <div className="flex items-center mt-4 gap-3">
        <h4 className="text-base text-foreground-600 font-semibold w-[10%]">
          Selected Room :
        </h4>
        <Autocomplete
          key={selectedRoomKey}
          size="sm"
          variant="bordered"
          defaultSelectedKey={selectedRoomKey}
          className="w-full"
          inputProps={{
            classNames: {
              inputWrapper: "w-[150%]",
            },
          }}
          labelPlacement="outside-left"
          value={selectedRoom}
          allowsCustomValue={true}
          onInputChange={(value) =>
            setSelectedRoom(value)
          }
          onSelectionChange={(key) => {
            setSelectedRoomKey(key)
          }}
        >
          {roomResult?.map((Room) => (
            <AutocompleteItem
              key={Room.id}
              value={(Room.room_name).toString()}
            >
              {(Room.room_name).toString()}
            </AutocompleteItem>
          ))}
        </Autocomplete>
      </div>
      <p>{selectedRoomObj?.rate_plan}</p>
      <p>Base occupancy: {baseOccupancy} guests Max occupancy: {maxOccupancy} guests</p>
      <div className="mt-4">
        <h3 className="font-semibold">
          What’s the base occupancy you want to use for this rate?
        </h3>
        <p className="text-gray-500">
          Base occupancy is how many guests you want to include for your normal
          price. The normal price is the baseline for your pricing per guest
          calculations.
        </p>
        <Autocomplete
          key={baseOccupancy}
          size="sm"
          variant="bordered"
          defaultSelectedKey={baseOccupancy}
          className="w-44"
          labelPlacement="outside-left"
          value={selectedBaseOccupancy}
          allowsCustomValue={true}
          onInputChange={(value) => {
            setSelectedBaseOccupancy(value.toString())
          }}
          onSelectionChange={(key) => {
            //setSelectedRoomKey(key)
          }}
        >
          {Array.from({ length: maxOccupancy }, (_, i) => i + 1).map((item) => (
            <AutocompleteItem
              key={item}
              value={item.toString()}
            >
              {item.toString()}
            </AutocompleteItem>
          ))}
        </Autocomplete>
      </div>
      <div className="mt-6">
        <h3 className="font-semibold">Set prices per guest</h3>
        <p className="text-gray-500">
          Adjust your prices based on the number of guests in the group. You can
          manually set your prices for different occupancies, but we recommend
          automating the calculation. Do this by setting a fixed price per
          person, or by setting a percent increase for each additional guest.
        </p>
        <div className="flex mt-2">
          <label className="mr-4">
            {/* <input type="radio" name="pricing" className="mr-2" /> Recommended */}
          </label>
          <label>
            <input
              type="radio"
              name="pricing"
              className="mr-2"
              defaultChecked
            />
            Custom
          </label>
        </div>
      </div>
      <table className="min-w-full border-collapse border mt-4">
        <thead>
          <tr>
            <th className="border p-2 text-left">Occupancy</th>
            <th className="border p-2 text-left">Price</th>
            <th className="border p-2 text-left">Toggle</th>
          </tr>
        </thead>
        <tbody>
          {discounts.sort((a, b) => b.occupancy - a.occupancy).map((discount, index) => (
            <tr key={index} className={discount.occupancy === selectedBaseOccupancy ? "border opacity-80 bg-gray-400" : "border"}>
              <td className="border p-2">
                {discount.occupancy}
                {discount.occupancy === 1 ? " guest" : " guests"}
              </td>
              <td className="border p-2">
                <div className="flex justify-between items-center flex-col lg:flex-row gap-3 lg:gap-0 text-center lg:text-start">
                  {discount.occupancy === selectedBaseOccupancy ? "Normal Price" : discount.reduction}
                  {discount.occupancy === selectedBaseOccupancy
                    ? (
                      <div className="flex gap-3 flex-col lg:flex-row">

                      </div>
                    )
                    : (
                      <div className="flex gap-3 flex-col lg:flex-row">
                        <input
                          type="text"
                          value={discount.amount}
                          onChange={(e) =>
                            handleAmountChange(index, e.target.value)
                          }
                          className=" text-center border p-1 w-20 mr-2 disabled:bg-gray-400 rounded-xl px-3 cursor-text"
                          onKeyDown={(e) => {
                            if (e.key === 'Enter') {
                              e.target.blur();
                            }
                          }}
                          disabled={!discount.isActive}
                        />
                        <select
                          value={discount.type}
                          onChange={(e) =>
                            handleTypeChange(index, e.target.value)
                          }
                          className="border p-1 disabled:bg-gray-400 rounded-xl px-5 "
                          disabled={!discount.isActive}
                        >
                          <option value="INR">INR</option>
                          <option value="%">%</option>
                        </select>
                      </div>
                    )}
                </div>
              </td>
              {discount.occupancy === selectedBaseOccupancy
                ? <td className="">

                </td>
                : <td className="border p-2">
                  <div className="flex justify-center items-center gap-5 h-full ">
                    <ToggleBtn
                      handleChange={() => handleToggleChange(index)}
                      isChecked={discount.isActive}
                    />
                    <span className=" w-10">
                      {discount.isActive ? "On" : "Off"}
                    </span>
                  </div>
                </td>
              }
            </tr>
          ))}
        </tbody>
      </table>
      <button className="mt-4 bg-green-700 text-white py-2 px-4 rounded" onClick={() => handleSaveChanges(discounts, selectedRoom)}>
        Save changes
      </button>
    </div>
  );
};

export default PricingForm;
