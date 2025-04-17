"use client";

import React, { useState } from 'react'
import { Tabs, Tab, Card, CardBody } from "@nextui-org/react";
import Image from 'next/image';
import IMAGES from '@/public';
import { AnimatePresence, motion } from "framer-motion";

const Gallery = () => {

  const [selectedTab, setSelectedTab] = useState("allimages");

  const tabs = [
    {
      id: "allimages",
      label: "ALL IMAGES",
      images:
        [
          IMAGES[1], IMAGES[3], IMAGES[4], IMAGES[7], IMAGES[8], IMAGES[9], IMAGES[14], IMAGES[15], IMAGES[17], IMAGES[18], IMAGES[20], IMAGES[21], IMAGES[22], IMAGES[24], IMAGES[25], IMAGES[27], IMAGES[34], IMAGES[35], IMAGES[78], IMAGES[80], IMAGES[75], IMAGES[82], IMAGES[101], IMAGES[104], IMAGES[105], IMAGES[106], IMAGES[108], IMAGES[110], IMAGES[117], IMAGES[121],       
        ],
    },
    {
      id: "outdoor",
      label: "OUTDOOR AREA",
      images:
        [
          IMAGES[1], IMAGES[3], IMAGES[4], IMAGES[7], IMAGES[8], IMAGES[9], IMAGES[14], IMAGES[15], IMAGES[17], IMAGES[20], IMAGES[21], IMAGES[22], IMAGES[24], IMAGES[25], IMAGES[27], IMAGES[34], IMAGES[35], IMAGES[78], IMAGES[80], IMAGES[75], IMAGES[82], IMAGES[105], IMAGES[110], IMAGES[117], IMAGES[121],
        ],
    },
    {
      id: "swimmingpool",
      label: "SWIMMING POOL",
      images:
        [
          IMAGES[3], IMAGES[4], IMAGES[78], IMAGES[80], IMAGES[75]
        ],
    },
    {
      id: "indoor",
      label: "INDOOR AREA",
      images:
        [
          IMAGES[14], IMAGES[15], IMAGES[17], IMAGES[18], IMAGES[101], IMAGES[104], IMAGES[106], IMAGES[108],
        ],
    },
    {
      id: "room",
      label: "ROOM",
      images:
        [
          IMAGES[15], IMAGES[18],
        ],
    },
    {
      id: "food",
      label: "FOOD",
      images:
        [
          IMAGES[106], IMAGES[108],
        ],
    },
  ];

  const activeTab = tabs.find((tab) => tab.id === selectedTab);

  return (
    <div className="flex w-full flex-col bg-white justify-center items-center py-32">
      <div className='w-[95%] lg:w-[90%] flex justify-center items-center flex-col'>
      <Tabs
      aria-label="Dynamic tabs"
      variant="underlined"
      color="primary"
      selectedKey={selectedTab}
      onSelectionChange={setSelectedTab}
      classNames={{
        base: "w-[90%] lg:w-full custom-scrollbar",
        tabList:
          "w-full gap-6 pb-8 relative rounded-none border-divider bg-white",
        cursor: "w-full bg-black",
        tab:
          "max-w-fit h-12 px-4 text-black bg-gray-100 hover:text-white focus:outline-none focus:ring-0",
        tabContent: "group-data-[selected=true]:text-black",
      }}
    >
      {tabs.map((tab) => (
        <Tab key={tab.id} title={tab.label}>
          <AnimatePresence mode="wait">
            <motion.div
              key={tab.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.3 }}
            >
              <Card className="shadow-none">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
                  {tab.images.map((img, index) => (
                    <CardBody key={index} className="w-full lg:w-[30vw] h-[45vh]">
                      <Image
                        src={img}
                        alt="asdf"
                        height="800"
                        width="800"
                        className="object-cover w-full h-full"
                      />
                    </CardBody>
                  ))}
                </div>
              </Card>
            </motion.div>
          </AnimatePresence>
        </Tab>
      ))}
    </Tabs>
      </div>

    </div>
  );
};

export default Gallery;
