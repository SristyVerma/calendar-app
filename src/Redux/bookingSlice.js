
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  bookings: [],
  vendors: [] 
};

const bookingSlice = createSlice({
  name: 'booking',
  initialState,
  reducers: {
    addBooking: (state, action) => {
      state.bookings.push(action.payload);
    },
    updateVendorAvailability: (state, action) => {
      const { vendorId, date, slot } = action.payload;
      const vendor = state.vendors.find(vendor => vendor.id === vendorId);
      if (vendor) {
        const availability = vendor.availability.find(avail => avail.date === date);
        if (availability) {
          availability.slots = availability.slots.filter(s => s !== slot);
        }
      }
    },
    setVendors: (state, action) => {
      state.vendors = action.payload;
    }
  }
});

export const { addBooking, updateVendorAvailability, setVendors } = bookingSlice.actions;
export default bookingSlice.reducer;
