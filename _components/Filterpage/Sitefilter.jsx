'use client'
import React, { useEffect, useState, useCallback } from 'react'
import { Accordion, AccordionItem } from "@nextui-org/react";
import { Autocomplete, AutocompleteItem } from "@nextui-org/react";
import { Checkbox } from "@nextui-org/react";
import { Calendar, Dot, ListFilter, MapPin } from 'lucide-react';
import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button, useDisclosure } from "@nextui-org/react";
import axios from 'axios';
import { useRouter } from 'next/navigation';

const Filtermodal = ({ onselectedprice, highestRoomRate }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [size, setSize] = React.useState('md');

  const [minprice, setminprice] = useState(0);

  const [maxprice, setmaxprice] = useState(highestRoomRate && !isNaN(highestRoomRate) ? highestRoomRate : 5000);

  const [selectedprice, setselectedprice] = useState(maxprice && !isNaN(maxprice) ? maxprice : 5000);

  const handleprice = (e) => {
    setselectedprice(Number(e.target.value));
    onselectedprice(Number(e.target.value));
  };


  const sizes = ["full"];

  useEffect(() => {
    setselectedprice(highestRoomRate)
    setmaxprice(highestRoomRate)
  }, [highestRoomRate])


  const handleOpen = (size) => {
    setSize(size)
    onOpen();
  }

  return (
    <>

      <div className="w-full">
        {sizes.map((size) => (
          <Button key={size} onPress={() => handleOpen(size)} className='text-sm w-full bg-white border border-[#f33624] text-[#f33624] p-1 rounded-full' color='default' radius='none'><ListFilter className='w-[14px] h-[14px] text-[#f33624] ' /> <span><p className='font-semibold'>Filter</p></span></Button>

        ))}
      </div>


      <Modal
        size={size}
        isOpen={isOpen}
        onClose={onClose}
      >
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1 font-semibold text-center">Filter</ModalHeader>
              <ModalBody>
                <hr className='border border-[#c6cbd1]' />

                <div className='border border-[#c6cbd1] mt-3 rounded-sm'>
                  <Accordion>
                    <AccordionItem key="4" aria-label="Price" title="Price" className='font-semibold pl-1'>
                      <div className='pb-3'>
                        <div className="flex justify-between text-sm mb-2">
                          <p className='font-semibold'>min. <span>&#8377; {minprice} </span></p>
                          <p className='font-semibold'>max. <span>&#8377; {selectedprice && !isNaN(selectedprice) ? selectedprice : 5000}</span></p>
                        </div>

                        <input
                          type="range"
                          min={minprice}
                          max={maxprice}
                          value={selectedprice}
                          onChange={handleprice}
                          className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer slider-thumb"
                          style={{
                            background: `linear-gradient(to right, red ${((selectedprice - minprice) / (maxprice - minprice)) * 100}%, #ddd 0%)`,
                          }}
                        />
                      </div>
                    </AccordionItem>
                  </Accordion>
                </div>

              </ModalBody>
              <ModalFooter>
                <Button color="danger" variant="light" onPress={onClose}>
                  Close
                </Button>
                <Button color="primary" onPress={onClose}>
                  Action
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
}

const Sitefilter = ({ onSelectedDuration, onselectedprice, onSetshowstate, highestRoomRate }) => {

  const [selectedKeys, setSelectedKeys] = React.useState(new Set(["1", "2", "3", "4"]));

  const [showstate, setshowstate] = useState(false);;

  const [minprice, setminprice] = useState(0);

  const [maxprice, setmaxprice] = useState(highestRoomRate && !isNaN(highestRoomRate) ? highestRoomRate : 5000);

  const [selectedprice, setselectedprice] = useState(maxprice && !isNaN(maxprice) ? maxprice : 5000);

  const [noninternational, setnoninternational] = useState(["Gym", "Swimming Pool", "Wifi", "CCTV Cameras", "Hot & Cold Water", "Parking", "Mineral Water", "Extra Mattress"]);

  const [selectedState, setSelectedState] = useState([]);

  const router = useRouter();

  const handlestate = () => {
    setshowstate(!showstate)
    // onSetshowstate(!showstate)
  }

  useEffect(() => {
    setselectedprice(highestRoomRate)
    setmaxprice(highestRoomRate)
  }, [highestRoomRate])




  const handleprice = (e) => {
    const value = Number(e.target.value);
    setselectedprice(value);
    onselectedprice(value);
  };




  const handleCheckboxChange = (value) => {
    setSelectedState((prev) =>
      prev.includes(value)
        ? prev.filter((state) => state !== value)
        : [...prev, value]
    );
    // router.push(`/filterpage/${state}`);
  };



  function capitalizeWords(sentence) {
    if (typeof sentence !== 'string') {
      return '';
    }

    return sentence
      .toLowerCase()
      .split(" ")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" ");
  }

  return (
    <div>

      {/* for desktop view */}

      <div className='hidden lg:block '>
        <div className='w-full p-3 font-semibold text-black bg-slate-100 lg:bg-slate-200 rounded-md flex justify-start gap-3'>
          <ListFilter />
          <p>Sort & Filter</p>
        </div>

        <div className='border border-[#c6cbd1] mt-3 rounded-md'>
          <Accordion selectedKeys={selectedKeys}
            onSelectionChange={setSelectedKeys} selectionMode="multiple">

            <AccordionItem key="4" aria-label="Price" title="Price" className='font-semibold pl-1'>
              <div className='pb-3'>
                <div className="flex justify-between text-sm mb-2">
                  <p className='font-semibold'>Min. <span>&#8377; {minprice} </span></p>
                  <p className='font-semibold'>Max. <span>&#8377; {selectedprice && !isNaN(selectedprice) ? selectedprice : 5000}</span></p>
                </div>

                <input
                  type="range"
                  min={minprice}
                  max={maxprice}
                  value={selectedprice}
                  onChange={handleprice}
                  className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer slider-thumb"
                  style={{
                    background: `linear-gradient(to right, #333333 ${((selectedprice - minprice) / (maxprice - minprice)) * 100}%, #ddd 0%)`,
                  }}
                />
              </div>
            </AccordionItem>

            <AccordionItem key="3" aria-label="Room Amenities" title="Room Amenities" className="font-semibold pl-1">
              <div className="flex flex-col gap-3 font-normal pb-3">
                {console.log("ABC:::::::>", noninternational[0])}
                {noninternational &&
                  noninternational
                    // .slice(0, showstate ? noninternational.length : 2)
                    .map((e, i) => (
                      <div key={i} className="flex justify-start gap-3 item-center">
                        <input
                          type="checkbox"
                          className="size-5 rounded-sm"
                          checked={selectedState.includes(e)}
                          onChange={() => handleCheckboxChange(e)}
                        />
                        <p>{capitalizeWords(e)} </p>
                      </div>
                    ))}
                <Button
                  onClick={handlestate}
                  className="w-full bg-[#333333] text-white font-extrabold mt-3 text-base"
                  radius="sm"
                >
                  {showstate ? 'Show Less' : 'Show More'}
                </Button>
              </div>
            </AccordionItem>


          </Accordion>
        </div>
      </div>


      {/* for mobile view */}
      <div className='flex lg:hidden'>
        <div className=' w-full flex justify-between items-center gap-3 text-center'>

          <div className='w-[25%]'>
            <Filtermodal onselectedprice={onselectedprice} highestRoomRate={highestRoomRate} />
          </div>
        </div>
      </div>
    </div>
  )
}

export default Sitefilter