'use client'
import React, {useState,useEffect} from "react";
import Image from 'next/image';
import IMAGES from '@/public/index';
import { Input, Autocomplete, AutocompleteItem, Button, Checkbox } from "@nextui-org/react";
import { EyeSlashFilledIcon, EyeFilledIcon, CompanyLogiLogo } from '@/_components/icons'
import { SessionProvider, useSession, getSession, signIn, signOut } from 'next-auth/react'
import { useRouter } from 'next/navigation';
import { siteConfig } from "@/config/siteConfig"

console.log("siteConfig: ",siteConfig)
const AdminloginPage = () => {

  const [isVisible, setIsVisible] = useState(false);
  const toggleVisibility = () => setIsVisible(!isVisible);

  let router = useRouter();

  const [selectedRole, setSelectedRole] = useState("admin");
  const [userID, setUserID] = useState();
  const [password, setPassword] = useState();
  const [ hotelID, setHotelID ] = useState();

  const [session, setSession] = useState({});
  useEffect(() => {
    const getSessionInfo = async () => {
      const session = await getSession();
      setSession(session);
    };
    getSessionInfo();
  }, [])

  useEffect(() => {
    console.log("Session at admin page: ",session)
  }, [session])

  const handleLoginAction = async () => {
    console.log("Admin Login", selectedRole, userID, password)

    if(siteConfig.Hotel_Id === parseInt("123456")) {
      const result = await signIn("credentials", {
      
        userID: userID,
  
        password: password,
  
        user_role: 'admin',
  
        redirect: false,
  
        // callbackUrl: "/admin/dashboard",
  
        // session: { favorites: ["item1", "item2"] }
  
      }).catch((error) => {
       
      });

      
  
      if(result.ok === true) {
        console.log("ABC:::::::>", result, hotelID, siteConfig.Hotel_name)

        

        router.push(encodeURI(`/admin/dashboard?hotel_id=${"123456"}&hotel_name=${"Sanika Baug"}`))
        
      }else if(result.ok === false){
        alert("Username or password is incorrect!")
        //window.location.reload()
      }
  
      console.log("Result::::>",result)
    }else [
      window.alert("Invalid credentials!")
    ]



  }

  return (
    <div className="w-screen h-screen">

      <Image
        src={IMAGES.Adminloginbg}
        fill
        alt="Loginbg"
        sizes="100%"
        style={{
          objectFit: 'cover'
        }}
        className=""
      />
      <div className="bg-black/20 absolute mx-auto w-screen h-screen flex justify-center items-center">
        <div className="flex flex-col items-center justify-center bg-transparent/60 pl-16 pr-16 pb-10 rounded-xl">
        
        <svg xmlns="http://www.w3.org/2000/svg" className="text-gray-300 mt-4" width="8em" height="8em" viewBox="0 0 24 24"><path fill="currentColor" d="M12 23C6.443 21.765 2 16.522 2 11V5l10-4l10 4v6c0 5.524-4.443 10.765-10 12M4 6v5a10.58 10.58 0 0 0 8 10a10.58 10.58 0 0 0 8-10V6l-8-3Z"></path><circle cx={12} cy={8.5} r={2.5} fill="currentColor"></circle><path fill="currentColor" d="M7 15a5.78 5.78 0 0 0 5 3a5.78 5.78 0 0 0 5-3c-.025-1.896-3.342-3-5-3c-1.667 0-4.975 1.104-5 3"></path></svg>

          <Input 
            type="text" 
            label="Admin Id" 
            placeholder="Enter your admin id"
            color="primary" 
            variant="bordered" 
            className="text-white mt-6"
            onChange={(e) => setUserID(e.target.value)}
          />
          <Input
            label="Password"
            variant="bordered"
            color="primary"
            placeholder="Enter your password"
            endContent={
              <button className="focus:outline-none" type="button" onClick={toggleVisibility}>
                {isVisible ? (
                  <EyeSlashFilledIcon className="text-2xl text-default-400 pointer-events-none" />
                ) : (
                  <EyeFilledIcon className="text-2xl text-default-400 pointer-events-none" />
                )}
              </button>
            }
            type={isVisible ? "text" : "password"}
            className="text-white mt-6"
            onChange={(e) => setPassword(e.target.value)}
          />
          <div className="flex gap-16">
  
      
        </div>
          <Button variant="shadow" color="primary" size="md" radius="lg" className="mt-4" onClick={handleLoginAction}>Login</Button>
        </div>
      </div>
    </div>
  )
};

export default AdminloginPage;
