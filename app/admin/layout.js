'use client'
import React, { useState } from 'react';
import SideBar from '@/_components/Admin/SideBar';
import TopBar from '@/_components/Admin/TopBar';
import { Inter } from 'next/font/google'
import { Providers } from "@/app/providers";
import '@/app/styles/globals.css'


const inter = Inter({ subsets: ['latin'] })

// export const metadata = {
//   title: 'PMS',
//   description: 'PMS',
// }

export default function AdminPageLayout({ children }) {
  const [isOpen, setIsOpen] = useState(false);

  const toggleSidebar = () => {
    setIsOpen(!isOpen); // Toggle the state
  };

  return (
    <html lang="en" >
      <body>
        <main>
          <Providers>
            <div className='flex h-screen'>
              <div className={`${isOpen ? 'w-full lg:w-[20%] ' : 'w-0 lg:w-16 '} transition-all h-screen duration-800 overflow-y-scroll`}>
                <SideBar isOpen={isOpen} toggleSidebar={toggleSidebar} />
              </div>
              <div className={`${isOpen ? 'hidden lg:flex lg:w-[80%]' : 'w-full'} bg-black `}>
                <div className="m-0 w-full h-full lg:m-2 lg:w-[99%] lg:h-[98%] bg-white lg:rounded-3xl  overflow-y-scroll">
                  <div className="h-[8%]">
                    <TopBar />
                  </div>
                  <div className="h-[92%] overflow-y-scroll">
                    {/* <div className="flex overflow-hidden w-full"> */}
                    {children}
                    {/* </div> */}
                  </div>
                </div>
              </div>
            </div>
          </Providers>
        </main>
      </body>
    </html>
  )
}