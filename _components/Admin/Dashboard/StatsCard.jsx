const StatsCard = ({ title, value, percentage, isPositive }) => {
    return (
      <div className=" p-4 rounded-lg  bg-background text-foreground shadow-sm dark:shadow-gray-600">
        <h2 className="text-gray-500">{title}</h2>
        <p className="text-3xl font-bold">{value}</p>
        
      </div>
    );
  };
  
  export default StatsCard;
  