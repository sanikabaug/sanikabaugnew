import { FaFacebookF, FaInstagram, FaTwitter } from 'react-icons/fa'; 

const getCurrentDate = () => {
  const date = new Date();
  const day = String(date.getDate()).padStart(2, '0');
  const month = String(date.getMonth() + 1).padStart(2, '0'); // Months are zero-indexed
  const year = date.getFullYear();

  return `${day}-${month}-${year}`;
};

const currentDate = getCurrentDate();
const hotelName = "Ocean's Pearl Resort";

const addOneDay = (dateString) => {
  const [day, month, year] = dateString.split('-').map(Number);
  const date = new Date(year, month - 1, day);
  date.setDate(date.getDate() + 1);
  return formatDate(date);
};

// Function to format the date as "DD-MM-YYYY"
const formatDate = (date) => {
  const day = String(date.getDate()).padStart(2, '0');
  const month = String(date.getMonth() + 1).padStart(2, '0'); // Months are 0-based
  const year = date.getFullYear();
  return `${day}-${month}-${year}`;
};

const checkoutDate = addOneDay(currentDate);

export const siteConfig = {

  Hotel_Id: 123456,
  Hotel_name: "Sanika Baug",
  hotelname: "Sanika Baug",
  description: "Welcome to Sanika Baug, best hotel in karjat, best hotel in karjat, your perfect retreat in the heart of the city. Tailored for families and travelers alike, our hotel offers comfortable accommodations and contemporary amenities designed to make your stay delightful. Whether you're savoring our signature dishes at the in-house restaurant, unwinding in our cozy rooms, or exploring the vibrant local attractions, Sanika Baug is committed to delivering warm hospitality and exceptional service, ensuring a memorable and relaxing stay for every guest.",
  hotellink: "https://www.hotelrajdhani.com/",
  favicon: "/img/sanikaimg/sanikalogo.png",
  ownername: "Amar",
  Phone_Number: "7083166888",
  phoneNumber: "7083166888",
  companyname: "Prospera Hospitality Pvt. Ltd.",
  companyweblink: "https://www.prosperaahospitality.com/",
  email: "sanikabag1701@gmail.com",
  address: "At.bendesa, post, Posri road, tal, Tiware, Karjat, Maharashtra 410201",
  telephone: ["7083166888", "7083166888"],
  AboutUs: "About Us",
  reception_number: "7083166888",
  Email: "sanikabag1701@gmail.com",
  secondary_email: "sanikabag1701@gmail.com",
  Address: "At.bendesa, post, Posri road, tal, Tiware, Karjat, Maharashtra 410201",
  lease_expiry_date: "01-02-2025",


  keywords: [
    "Sanika Baug",
  ],

  navItems: [
    {
      label: "Home",
      href: "/",
    },

    {
      label: "About",
      href: "/aboutus",
    },
   
    {
      label: "Rooms",
      href:`/rooms/single-bed-non-ac-room`
    },

    {
      label: "Testimonials",
      href: "/testimonials",
    },

    {
      label: "Blogs",
      href: "/blog",
    },
    
    {
      label: "Contact Us",
      href: "/contactus",
    },
    // {
    //   label: "My Bookings",
    //   href: "/booking-history",
    // },
  ],


  PoliciesItems: [
    {
      label: "Terms & Conditions",
      href: "/terms-and-conditions",
    },
    {
      label: "Privacy Policy",
      href: "/privacy-policy",
    },
    // {
    //   label: "Refund Policy",
    //   href: "/refund-policy",
    // },
  ],

  socialItems : [
    { label: "Facebook", href: "https://www.facebook.com/share/15fydhXtLj/?mibextid=LQQJ4d", icon: FaFacebookF },
    { label: "Instagram", href: "https://www.instagram.com/sanika_baug", icon: FaInstagram },
    { label: "Twitter", href: "https://twitter.com/", icon: FaTwitter },
]
};