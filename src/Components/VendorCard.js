import React, { useState, useRef, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { AiOutlineCalendar } from 'react-icons/ai';
import { isSameDay } from 'date-fns';
import { addBooking, updateVendorAvailability } from '../Redux/bookingSlice';

const VendorCard = ({ vendor }) => {
  const [showCalendar, setShowCalendar] = useState(false);
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedSlot, setSelectedSlot] = useState(null);
  const calendarRef = useRef(null);
  const dispatch = useDispatch();
  const availableDates = vendor.availability.map(avail => new Date(avail.date));
  const updateVendorAvailabilityAPI = async (vendorId, date, slot) => {
    console.log(vendorId, date, slot)
    try {
      const response = await fetch(`/vendors/${vendorId}`);
      const vendor = await response.json();
      const updatedAvailability = vendor.availability.map(avail => {
        if (avail.date === date) {
          return {
            ...avail,
            slots: avail.slots.filter(s => s !== slot)
          };
        }
        return avail;
      });
      await fetch(`/vendors/${vendorId}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ availability: updatedAvailability })
      });
    } catch (error) {
      console.error('Error updating vendor availability:', error);
    }
  };
  
  const handleBooking = async () => {
    if (selectedDate && selectedSlot) {
      const booking = {
        vendorId: vendor.id,
        vendorName: vendor.name,
        email: vendor.email,
        date: selectedDate.toISOString().slice(0, 10),
        slot: selectedSlot,
      };
  
      try {
        await updateVendorAvailabilityAPI(vendor.id, selectedDate.toISOString().slice(0, 10), selectedSlot); 
        dispatch(addBooking(booking)); 
        dispatch(updateVendorAvailability({
          vendorId: vendor.id,
          date: selectedDate.toISOString().slice(0, 10),
          slot: selectedSlot,
        })); 
        setSelectedDate(null);
        setSelectedSlot(null);
      } catch (error) {
        console.error('Error handling booking:', error);
      }
    } else {
      alert('Please select a date and time slot.');
    }
  };
  
  
  const highlightWithRanges = [
    {
      "react-datepicker__day--highlighted-custom-1": availableDates,
    }
  ];

  const isAvailable = (date) => {
    return availableDates.some(availDate => isSameDay(date, availDate));
  };

  const toggleCalendar = () => {
    setShowCalendar(!showCalendar);
  };

  const handleDateChange = (date) => {
    setSelectedDate(date);
    setSelectedSlot(null); 
    setShowCalendar(false); 
  };

  const handleClickOutside = (event) => {
    if (calendarRef.current && !calendarRef.current.contains(event.target)) {
      setShowCalendar(false);
    }
  };

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleSlotSelect = (slot) => {
    setSelectedSlot(slot);
  };

  return (
    <div className="relative max-w-sm rounded shadow-lg m-4  mt-[30px]">
      <img className="w-full h-48 object-contain" src={vendor.image} alt={vendor.name} />
      <div className="px-6 py-4">
        <div className="font-bold text-xl mb-2">{vendor.name}</div>
        <p className="text-gray-700 text-base flex items-center justify-center">  {vendor.email}</p>
      </div>
      <div className="px-6 pt-4 pb-2">
        <p className="text-gray-700 text-base mb-2 flex items-center">
          Availability:
          <button className="ml-2" onClick={toggleCalendar}>
            <AiOutlineCalendar className="text-xl" />
          </button>
        </p>
        {showCalendar && (
          <div ref={calendarRef} className="absolute z-10 bg-white p-2 border rounded shadow-lg custom-datepicker-container top-[50%]">
            <DatePicker
              selected={selectedDate}
              onChange={handleDateChange}
              inline
              highlightDates={highlightWithRanges}
              dayClassName={(date) =>
                isAvailable(date) ? "highlight-date" : undefined
              }
              minDate={new Date()}
              calendarClassName="custom-datepicker"
            />
          </div>
        )}
        {selectedDate && (
          <div className="mt-4">
            <p className="text-gray-700 text-base mb-2 flex items-center">
              Select Time Slot:
            </p>
            <div className="flex flex-wrap">
              {vendor.availability.find(avail => isSameDay(new Date(avail.date), selectedDate))?.slots.map((slot, index) => (
                <button
                  key={index}
                  className={`rounded-full px-3 py-1 text-sm font-semibold mr-2 mb-2 ${selectedSlot === slot ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-700'}`}
                  onClick={() => handleSlotSelect(slot)}
                >
                  {slot}
                </button>
              ))}
            </div>
          </div>
        )}
              <button
          className="bg-blue-500 text-white px-4 py-2 mt-4 rounded"
          onClick={handleBooking}
          disabled={!selectedDate || !selectedSlot} 
        >
          Book Slot
        </button>

      </div>
    </div>
  );
};

export default VendorCard;
