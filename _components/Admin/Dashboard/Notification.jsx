

// import React, { useState } from "react";
// import {
//   Calendar,
//   FileText,
//   MessageCircle,
//   CreditCard,
//   ThumbsUp,
//   ShoppingCart,
//   Briefcase,
//   Phone,
//   AlertCircle,
// } from "lucide-react";

// const notifications = [
//   { icon: <Briefcase size={24} />, label: "Work Order", count: 0 },
//   { icon: <Calendar size={24} />, label: "Booking Inquiry", count: 0 },
//   { icon: <CreditCard size={24} />, label: "Payment Failed", count: 0 },
//   { icon: <ShoppingCart size={24} />, label: "Over Booking", count: 0 },
//   { icon: <Phone size={24} />, label: "Guest Portal", count: 0 },
//   { icon: <MessageCircle size={24} />, label: "Guest Message", count: 0 },
//   { icon: <AlertCircle size={24} />, label: "Cardverify Failed", count: 0 },
//   { icon: <FileText size={24} />, label: "Tasks", count: 0 },
//   { icon: <ThumbsUp size={24} />, label: "Review", count: 0 },
// ];

// const Notification = () => {
//   const [visibleCount, setVisibleCount] = useState(4);
//   const [isExpanded, setIsExpanded] = useState(false);

//   const handleToggle = () => {
//     setIsExpanded(!isExpanded);
//     setVisibleCount(isExpanded ? 4 : notifications.length);
//   };

//   return (
//     <div className="rounded-lg bg-background  p-4">
//       <h3 className="text-lg font-bold mb-5">Notifications</h3>
//       <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
//         {notifications.slice(0, visibleCount).map((item, index) => (
//           <div key={index} className="flex p-4 shadow-xl rounded-md">
//             <div className="flex justify-center items-center">{item.icon}</div>
//             <div className="flex gap-2 p-3">
//               <div className="flex justify-center items-center w-full text-center text-2xl font-bold">{item.count}</div>
//               <div className="w-full text-center">{item.label}</div>
//             </div>
//           </div>
//         ))}
//       </div>
//       <div className="text-center mt-10 flex justify-end ">
//         <button
//           className=" border border-blue-600 text-blue-600 py-2 px-4 rounded-md hover:bg-blue-600 hover:text-white transition shadow-lg"
//           onClick={handleToggle}
//         >
//           {isExpanded ? "Show Less" : "Show More"}
//         </button>
//       </div>
//     </div>
//   );
// };

// export default Notification;


import React, { useState } from "react";
import {
  Calendar,
  FileText,
  MessageCircle,
  CreditCard,
  ThumbsUp,
  ShoppingCart,
  Briefcase,
  Phone,
  AlertCircle,
} from "lucide-react";

const notifications = [
  { icon: <Briefcase size={24} />, label: "Work Order", count: 0 },
  { icon: <Calendar size={24} />, label: "Booking Inquiry", count: 0 },
  { icon: <CreditCard size={24} />, label: "Payment Failed", count: 0 },
  { icon: <ShoppingCart size={24} />, label: "Over Booking", count: 0 },
  { icon: <Phone size={24} />, label: "Guest Portal", count: 0 },
  { icon: <MessageCircle size={24} />, label: "Guest Message", count: 0 },
  { icon: <AlertCircle size={24} />, label: "Cardverify Failed", count: 0 },
  { icon: <FileText size={24} />, label: "Tasks", count: 0 },
  { icon: <ThumbsUp size={24} />, label: "Review", count: 0 },
];

const Notification = () => {
  const [visibleCount, setVisibleCount] = useState(4);
  const [isExpanded, setIsExpanded] = useState(false);

  const handleToggle = () => {
    setIsExpanded(!isExpanded);
    setVisibleCount(isExpanded ? 4 : notifications.length);
  };

  return (
    <div className="rounded-lg bg-background  p-4">
      <h3 className="text-lg font-bold mb-5">Notifications</h3>
      <div className="flex flex-wrap">
        {notifications.slice(0, visibleCount).map((item, index) => (
          <div
            key={index}
            className="flex p-4 shadow-sm dark:shadow-gray-600 rounded-md w-full sm:w-1/2"
          >
            <div className="flex-1 flex justify-center items-center">{item.icon}</div>
            <div className="flex-2 flex p-3 justify-between items-center">
              <div className="flex justify-center items-center w-full text-center text-2xl font-bold">
                {item.count}
              </div>
              <div className="flex justify-center items-center w-full text-center">{item.label}</div>
            </div>
          </div>
        ))}
      </div>
      <div className="text-center mt-10 mb-5 flex justify-end ">
        <button
         className=" border border-blue-600 text-blue-600 py-2 px-4 rounded-md hover:bg-blue-600 hover:text-white transition shadow-lg"
          onClick={handleToggle}
        >
          {isExpanded ? "Show Less" : "Show More"}
        </button>
      </div>
    </div>
  );
};

export default Notification;
