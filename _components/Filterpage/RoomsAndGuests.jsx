"use client";
import { useState, useEffect } from "react";
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
  Button,
} from "@nextui-org/react";
import { PlusCircle, MinusCircle } from "lucide-react";
import { cn } from "@/_lib/utils";
import { PiUsersLight } from "react-icons/pi";
import { GoPlus } from "react-icons/go";
import { FiMinus } from "react-icons/fi";
import { useDispatch } from "react-redux";
import { handleAgeSelect } from "@/app/redux/slices/searchSlice";
import { useSelector } from "react-redux";

const IncDecfunc = ({ title, description, onChange, value, ageSelect, maxchilds }) => {

  const [children, setChildren] = useState(
    ageSelect.length === 0 ? [{ id: value, age: "" }] : ageSelect
  );
  const dispatch = useDispatch();

  function increment() {
    onChange(value + 1);

    setChildren([...children, { id: children.length + 1, age: "" }]);
  }

  function decrement() {
    onChange(value > 0 ? value - 1 : 0);

    if (children.length > 1) {
      setChildren(children.slice(0, -1));
    }
    if (children.length === 0 || value === 0) {
      setChildren([]);
    }
  }

  const handleAgeChange = (id, value) => {
    setChildren(
      children.map((child) =>
        child.id === id ? { ...child, age: value } : child
      )
    );
  };

  useEffect(() => {
    if (children) {


      dispatch(handleAgeSelect(children));
    }
  }, [children]);

  useEffect(() => {
    if (parseInt(value) === 0) {
      setChildren([]);
    }
  }, [value]);

  return (
    <div className="py-2 px-4 flex flex-col w-full gap-5">
      <div className="flex justify-between">
        <div className="w-60">
          <h1 className="text-base">{title}</h1>
          <h4>{description}</h4>
        </div>

        <div className="flex gap-4 items-center text-gray-500">
          <Button
            isIconOnly
            variant="shadow"
            color="primary"
            size="sm"
            isDisabled={value === 0}
            onClick={decrement}
          >
            <FiMinus />
          </Button>
          <h1 className="text-lg">{value}</h1>
          <Button
            isIconOnly
            variant="shadow"
            color="primary"
            size="sm"
            isDisabled={value === Number(maxchilds)}
            onClick={increment}
          >
            <GoPlus />
          </Button>
        </div>
      </div>
      {/* 
      <div className="space-y-4">
        {children?.map((child, index) => (
          <div key={child.id} className="flex items-center space-x-2">
            <select
              value={child.age}
              onChange={(e) => handleAgeChange(child.id, e.target.value)}
              className="border rounded px-2 py-1 "
            >
              <option value="">Age needed</option>
              {Array.from({ length: 17 }, (_, i) => i + 1).map((age) => (
                <option key={age} value={age}>
                  {age} years old
                </option>
              ))}
            </select>
          </div>
        ))}
      </div> */}
    </div>
  );
};

const AdultsRoomfunc = ({ title, description, onChange, value, maxadults }) => {
  function increment() {
    onChange(value + 1);
  }

  function decrement() {
    onChange(value > 1 ? value - 1 : 1);
  }

  return (
    <div className="py-2 px-4 flex w-full gap-5">
      <div className="w-60">
        <h1 className="text-base">{title}</h1>
        <h4>{description}</h4>
      </div>

      <div className="flex gap-4 items-center text-gray-500">
        <Button
          isIconOnly
          variant="shadow"
          color="primary"
          size="sm"
          isDisabled={value === 1}
          onClick={decrement}
        >
          <FiMinus />
        </Button>
        <h1 className="text-lg">{value}</h1>
        <Button
          isIconOnly
          variant="shadow"
          color="primary"
          size="sm"
          isDisabled={value === Number(maxadults)}
          onClick={increment}
        >
          <GoPlus />
        </Button>
      </div>
    </div>
  );
};


export default function RoomsAndGuests({
  onAdultsSelect,
  onChildSelect,
  onRoomsSelect,
  adultsSelectParam,
  childSelectParam,
  roomsSelectParam,
  onChildAgeSelect,
  ageArray,
  maxadults,
  maxchilds
}) {
  const ageSelect = useSelector((state) => state.search.ageSelect);

  const [adults, setAdults] = useState(parseInt(adultsSelectParam));
  const [children, setChildren] = useState(parseInt(childSelectParam));
  const [infants, setInfants] = useState(0);
  const [rooms, setRooms] = useState(parseInt(roomsSelectParam));
  const [pets, setPets] = useState(0);
  const [buttonText, setButtonText] = useState("Add Guest");

  const handleDoneClick = () => {
    setButtonText(`Adults: ${adults}, Rooms: ${rooms}`);
  };

  // useEffect(() => {
  //   const checkAndCallFunction = (func, arg) => {
  //     if (typeof func === "function") {
  //       func(arg);
  //     }
  //   };

  //   checkAndCallFunction(onAdultsSelect, adults);
  //   checkAndCallFunction(onChildSelect, children);
  //   checkAndCallFunction(onRoomsSelect, rooms);
  // }, [adults, children, rooms, onAdultsSelect, onChildSelect, onRoomsSelect]);

  const handleAdults = (val) => {
    setAdults(val)
    onAdultsSelect(val)
  }
  const handleChilds = (val) => {
    setChildren(val)
    onChildSelect(val)
  }

  return (
    <div className="flex w-full justify-center items-center ">
      <Popover placement="bottom">
        <PopoverTrigger asChild className="text-black bg-white rounded-xl">
          <Button
            variant="destructive"
            className={cn("w-full justify-center text-center font-normal bg-white")}
          >
            <PiUsersLight className="hidden lg:block size-6 text-gray-500 lg:text-[#333333] " />
            <span className="font-semibold text-gray-500 lg:text-[#333333]">
              {`Adults: ${adults}, Childrens: ${children}`}
            </span>
          </Button>
        </PopoverTrigger>
        <PopoverContent className="ml-2 lg:m-0 bg-white w-[80%] lg:w-full">
          <AdultsRoomfunc title="Adults" description="Ages 6 or above" onChange={handleAdults} value={adults} maxadults={maxadults} />
          <IncDecfunc title="Children" description="Ages 0 – 6" onChange={handleChilds} value={children} ageSelect={ageSelect} maxchilds={maxchilds} />
        </PopoverContent>
      </Popover>
    </div>
  );
}
