"use client";
import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import dayjs from 'dayjs';

const Calendar = ({ onDateChange }) => {
  const [date, setDate] = useState(dayjs());
  const [daysOfWeek, setDaysOfWeek] = useState([]);

  useEffect(() => {
    const startOfWeek = date.startOf('week');
    const newDaysOfWeek = Array.from({ length: 7 }, (_, i) => startOfWeek.add(i, 'day'));
    setDaysOfWeek(newDaysOfWeek);
  }, [date]);

  const handlePrevMonth = () => setDate(date.subtract(1, 'day'));
  const handleNextMonth = () => setDate(date.add(1, 'day'));

  useEffect(() => {
    if (date) {
      onDateChange(date)
    }
  }, [date])


  return (
    <div className="p-4 rounded-lg bg-background flex flex-col items-center gap-3">
      <div className="flex justify-between w-full items-center">
        <button onClick={handlePrevMonth} className="p-2">
          <ChevronLeft className="w-6 h-6" />
        </button>
        <h3 className="text-lg font-bold">{date.format('MMMM YYYY')}</h3>
        <button onClick={handleNextMonth} className="p-2">
          <ChevronRight className="w-6 h-6" />
        </button>
      </div>
      <div className="grid grid-cols-7 gap-2 mt-4 w-full">
        {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map((day) => (
          <div key={day} className="text-center font-semibold">
            {day}
          </div>
        ))}
      </div>
      <div className="grid grid-cols-7 gap-2 mt-2 w-full place-items-center">
        {daysOfWeek.map((day) => (
          <button
            key={day.format('DD')}
            className={`size-10 rounded-full ${day.isSame(date, 'day') ? 'bg-blue-600 text-white' : ''
              }`}
            onClick={() => setDate(day)}
          >
            {day.format('D')}
          </button>
        ))}
      </div>
    </div>
  );
};

export default Calendar;
