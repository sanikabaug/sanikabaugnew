// const ScheduleItem = ({ date, time, description }) => (
//     <div className="flex items-center space-x-4 p-2 bg-white shadow-md rounded-lg">
//       <div className="text-green-500">
//         <p>{date}</p>
//         <p>{time}</p>
//       </div>
//       <div className="flex-1">
//         <p>{description}</p>
//       </div>
//     </div>
//   );

//   const UpcomingSchedule = () => {
//     const schedules = [
//       { date: 'Wed, 11 Jan', time: '09:30 AM', description: 'Business Meeting' },
//       { date: 'Wed, 11 Jan', time: '10:35 AM', description: 'Call with Client' },
//       { date: 'Wed, 11 Jan', time: '09:30 AM', description: 'Business Meeting' },
//       { date: 'Wed, 11 Jan', time: '10:35 AM', description: 'Call with Client' },
//       { date: 'Wed, 11 Jan', time: '09:30 AM', description: 'Business Meeting' },
//       { date: 'Wed, 11 Jan', time: '10:35 AM', description: 'Call with Client' },

//     ];

//     return (
//       <div>
//         <h2 className="text-xl font-bold mb-4">Upcoming Bookings</h2>
//         <div className="space-y-4 overflow-y-scroll ">
//           {schedules.map((item, index) => (
//             <ScheduleItem key={index} {...item} />
//           ))}
//         </div>
//       </div>
//     );
//   };

//   export default UpcomingSchedule;

'use client'
import { useRouter } from "next/navigation";
const ScheduleItem = ({ item }) => (
  <div className="w-full p-4 bg-background rounded-lg shadow-sm shadow-gray-400">
    <div className="flex items-center justify-between">
      <p className="text-blue-600 font-bold">
        {item.booking_date.split(" ")[0]}
      </p>
      <div className="text-right">
        <p className="text-sm font-bold text-foreground">Id: <span className="font-normal">{item.booking_id}</span></p>
        <p className="text-sm font-bold text-foreground">Name: <span className="font-normal">{item.username}</span></p>
        <p className="text-sm font-bold text-foreground">Rooms: <span className="font-normal">{item.roomDet.map((ite) => ite.name).join(', ')}</span></p>
      </div>
    </div>
  </div>
);

const UpcomingSchedule = ({ bookingDetails, dateChange }) => {

  const router = useRouter();

  const selectedDateBooking = bookingDetails.filter((item) => {
    if (!dateChange || typeof dateChange.format !== "function") return false; 
    return item.booking_date.split(" ")[0] === dateChange.format("DD-MM-YYYY");
  });
  

  return (
    <div className="p-6 bg-background text-gray-900 rounded-lg shadow-md dark:text-white">
      <h2 className="text-xl font-bold mb-4 text-foreground">Upcoming Bookings</h2>
      <hr className="border-gray-300 mb-4 dark:border-gray-700" />
      <div className="h-96 overflow-y-auto space-y-4">
        {selectedDateBooking.length > 0 ? (
          selectedDateBooking.map((item, index) => (
            <ScheduleItem key={index} item={item} />
          ))
        ) : (
          <p className="text-center text-gray-500">No bookings available</p>
        )}
      </div>
      <div className="text-end pt-4">
        <button
          onClick={(e) => router.push(`/admin/bookings/bookinghistory?hotel_id=123456&hotel_name=Hotel%27s%20Rajdhani`)}
          className="border border-blue-600 text-blue-600 py-2 px-4 rounded-md hover:bg-blue-600 hover:text-white transition shadow-lg"
        >
          Show More
        </button>
      </div>

    </div>
  );
};

export default UpcomingSchedule;


