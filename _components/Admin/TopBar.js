"use client";
import React, { useState, useEffect } from "react";
import {
  Menu,
  X,
  ChevronDown,
  ChevronRight,
  Search,
  KeyRound,
  Settings,
  Power,
  Mail,
  MessageCircleMore,
  MessageCircleQuestion,
} from "lucide-react";
import {
  Input,
  Avatar,
  Badge,
  Popover,
  PopoverTrigger,
  PopoverContent,
  Button,
  User,
  Tooltip,
} from "@nextui-org/react";
import { ThemeSwitch } from "@/_components/Admin/ThemeSwitch";
import { CompanyDashLogo, NotificationIcon } from "@/_components/icons";
import Link from "next/link";
import { button as buttonStyles } from "@nextui-org/theme";
import { RxExternalLink } from "react-icons/rx";
import {
  SessionProvider,
  useSession,
  getSession,
  signIn,
  signOut,
} from "next-auth/react";
import { useRouter } from "next/navigation";

const menuItems = [
  {
    name: "Home",
    href: "#",
  },
  {
    name: "About",
    href: "#",
  },
  {
    name: "Contact",
    href: "#",
  },
];

const TopBar = () => {
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);

  const [session, setSession] = useState({});
  const [isInvisible, setIsInvisible] = React.useState(false);
  let router = useRouter();
  useEffect(() => {
    const getSessionInfo = async () => {
      const session = await getSession();
      setSession(session);
    };
    getSessionInfo();
  }, []);

  // useEffect(() => {
  //   console.log("Session at top company bar:",session)
  // }, [session])

  useEffect(() => {
 

    if(session === null) {
      window.location.reload()
      router.push(`/adminlogin`)
    }

    if (session && session?.user?.user_role === "guest") {
      setSession(null);
    }
  }, [session]);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const notification = (
    <PopoverContent>
      <div className="px-1 py-2">
        <div className="text-small font-bold">Popover Content</div>
        <div className="text-tiny">This is the popover content</div>
      </div>
    </PopoverContent>
  );

  const profile = (
    <PopoverContent>
      <div>
        <div className="px-1 py-2 flex gap-10 flex-col ">
          {
          session?.user?.user_role === "admin" ? (
            <User
              name={session?.user?.firstname + " " + session?.user?.lastname}
              description="Agent 007"
              avatarProps={{
                src: "https://www.svgrepo.com/show/509009/avatar-thinking-3.svg",
              }}
              className="text-black"
            />
          ) : (
            ""
          )}

          {/* <Link
            href="/hotel/dashboard"
            className={`${buttonStyles({
              color: "default",
              size: "sm",
              radius: "full",
              variant: "light",
            })} text-primary`}
          >
            <Tooltip content="Change Password" color="danger">
              <KeyRound className="mt-2" />
            </Tooltip>
          </Link> */}
        </div>
        {/* <Link
          href="/userprofile"
          className={`${buttonStyles({
            color: "default",
            size: "md",
            radius: "full",
            variant: "light",
          })} text-primary ml-3`}
        >
          <Settings />
          Settings
        </Link> */}
      </div>
      {/* <label className="mr-28 mt-2 text-xs font-semibold uppercase text-primary">
        Need Help ?
      </label> */}
      <div className="flex flex-col items-start mr-6">
        {/* <Link
          href="#"
          className={`${buttonStyles({
            color: "default",
            size: "md",
            radius: "full",
            variant: "light",
          })} text-primary`}
        >
          <Mail />
          Report an Issue
        </Link> */}

        {/* <Link
          href="#"
          className={`${buttonStyles({
            color: "default",
            size: "md",
            radius: "full",
            variant: "light",
          })} text-primary`}
        >
          <MessageCircleMore />
          Chat Support
          <RxExternalLink className="ml-6" size={16} />
        </Link> */}

        {/* <Link
          href="#"
          className={`${buttonStyles({
            color: "default",
            size: "md",
            radius: "full",
            variant: "light",
          })} text-primary`}
        >
          <MessageCircleQuestion />
          Explore FAQs
          <RxExternalLink className="ml-6" size={16} />
        </Link> */}

        <Button
          variant="shadow"
          color="danger"
          size="sm"
          className="left-4 mt-3 mb-3"
          startContent={<Power />}
          onClick={async (e) => {
            try {
              await signOut({ redirect: false });
              setSession(null);
              router.push("/adminlogin");
            } catch (error) {
              console.error("Sign out error:", error);
            }
          }}
        >
          Logout
        </Button>
      </div>
    </PopoverContent>
  );

  return (
    <div className="relative w-full bg-background">
      <div className="flex mx-auto max-w-7xl items-center justify-between pl-20 px-10 py-2">
        {/* <Input
          variant="bordered"
          color=""
          placeholder="Type to search..."
          size="sm"
          radius="lg"
          classNames={{
            inputWrapper: [
              "w-[60%]",
              "text-foreground",
              "border-1",
              "border-foreground-600",
              "shadow-lg hidden md:flex",
            ],
          }}
          startContent={
            <Search className="text-2xl text-foreground pointer-events-none flex-shrink-0" />
          }
        /> */}

        <div className="flex grow justify-end mr-2">
          {/* <ThemeSwitch /> */}

          {session?.user?.user_role === "admin" ? (
            session?.user?.firstname === undefined &&
            session?.user?.lastname === undefined ? (
              <Link
                href="/adminlogin"
                // onClick = {(e) => signIn()}
                className={buttonStyles({
                  color: "primary",
                  radius: "full",
                  variant: "shadow",
                })}
              >
                Login/Sign Up
              </Link>
            ) : (
              <>
                <Popover
                  key="bottom"
                  placement="bottom"
                  color="default"
                  backdrop="transparent"
                >
                  <PopoverTrigger>
                    <Button
                      color="primary"
                      variant="link"
                      className="capitalize"
                    >
                      <User
                        name={
                          session?.user?.user_id
                        }
                        description="Agent 007"
                        avatarProps={{
                          src: "https://www.svgrepo.com/show/509003/avatar-thinking-6.svg",
                        }}
                        className="text-black "
                      />
                    </Button>
                  </PopoverTrigger>
                  {profile}
                </Popover>
              </>
            )
          ) : (
            <Link
              href="/adminlogin"
              // onClick = {(e) => signIn()}
              className={buttonStyles({
                color: "primary",
                radius: "full",
                variant: "shadow",
              })}
            >
              Login/Sign Up
            </Link>
          )}
        </div>
      </div>
    </div>
  );
};

export default TopBar;
