import React from 'react';
import { useSelector } from 'react-redux';

const Dashboard = () => {
  const bookings = useSelector((state) => state.bookings.bookings); 
  console.log(bookings)

  return (
    <div className="container mx-auto">
      <h1 className="text-3xl font-bold mt-8 mb-4">My Bookings</h1>
      <div className="flex flex-wrap justify-center">
        {bookings.map((booking) => (

          <div key={booking.vendorId} className="max-w-sm rounded overflow-hidden shadow-lg m-4">
            
            <div className="px-6 py-4">
              <div className="font-bold text-xl mb-2">{booking.vendorName}</div>
              <p className="text-gray-700 text-base">{booking.email}</p>
              <p className="text-gray-700 text-base">Date: {booking.date}</p>
              <p className="text-gray-700 text-base">Slot: {booking.slot}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Dashboard;
