import React, { useEffect, useState } from 'react';
import VendorCard from '../Components/VendorCard';
import { useDispatch } from 'react-redux';
import { addBooking } from '../Redux/authSlice';

const VendorIntegration = () => {
  const [vendors, setVendors] = useState([]);
  const dispatch = useDispatch();

  useEffect(() => {
    fetch('http://localhost:5000/vendors')
      .then(response => response.json())
      .then(data => setVendors(data))
      .catch(error => console.error('Error fetching vendors:', error));
  }, []);
  const handleBooking = (vendorId, date, slot) => {
    dispatch(addBooking({ vendorId, date, slot }));
    fetch(`http://localhost:5000/vendors/${vendorId}/book/${date}/${slot}`, {
      method: 'DELETE',
    })
      .then(response => response.json())
      .then(data => {
        console.log(`Slot ${slot} on ${date} booked successfully!`);
      })
      .catch(error => {
        console.error('Error booking slot:', error);
      });
  };

  return (
    <div className="flex flex-wrap justify-center">
      {vendors.map((vendor) => (
        <VendorCard key={vendor.id} vendor={vendor} onBook={handleBooking} />
      ))}
    </div>
  );
};

export default VendorIntegration;
