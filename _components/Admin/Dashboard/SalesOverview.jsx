import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const SalesOverview = ({ bookingDetails }) => {

  const abc = [
    "Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec",
  ];
  
  const monthArray = abc.map((month, index) => {

    const id = String(index + 1).padStart(2, '0');

    return { id, val: month };

  });


  const getMonthlyData = (bookings) => {

    const monthlyData = Array(12).fill(0);

    // console.log("monthlyData: ", bookings)

    monthArray.map((item, index) => {
      const monthBookings = bookings.filter((boooking) => {
        const [bookingDate] = boooking.booking_date.split(" ");
        const [date, month, year] = bookingDate.split("-")
  
        return item.id === month
      });

      monthlyData[index] += monthBookings.length
    })

    // console.log("monthBookings: ", monthlyData)
    

    // bookings?.map((item) => {
    //   const bookingDate = item.booking_date.split(" ")[0]

    // });

    return monthlyData;
  };

  const paidBook = bookingDetails.filter((item) => item.pflag0 === 1);
  const pendingBook = bookingDetails.filter((item) => item.pflag0 === 0);

  // Calculate data for the chart
  const paidData = getMonthlyData(paidBook);
  const pendingData = getMonthlyData(pendingBook);

  const data = {
    labels: [
      "Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec",
    ],
    datasets: [
      {
        label: "Paid",
        data: paidData,
        backgroundColor: "rgb(59, 143, 255,1.0)", // blue color
        borderWidth: 1,
        borderRadius: 5,
      },
      {
        label: "Unpaid",
        data: pendingData,
        backgroundColor: "rgb(255, 52, 32,1.0)", // red color
        borderWidth: 1,
        borderRadius: 5,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    aspectRatio: 2,
    plugins: {
      legend: {
        position: "top",
      },
      title: {
        display: true,
        text: "Booking Overview",
      },
    },
  };

  return (
    <div className="w-full h-64 sm:max-h-80 lg:max-h-[300px]">
      <Bar data={data} options={options} />
    </div>
  );
};

export default SalesOverview;
