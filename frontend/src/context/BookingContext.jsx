import { createContext, useContext, useState, useEffect } from "react";
import { get_bookings_services } from "../services/bookings";

const BookingsContext = createContext({});

const BookingsProvider = (props) => {
  const [bookings, setBookings] = useState([]);

  useEffect(() => {
    refreshBookings();
  }, []);

  const refreshBookings = async () => {
    try {
      const result = await get_bookings_services();
      setBookings(result);
    } catch (error) {
      console.error("Error refreshing bookings:", error);
    }
  };

  const values = {
    bookings,
    refreshBookings,
  };
  return (
    <BookingsContext.Provider value={values}>
      {props.children}
    </BookingsContext.Provider>
  );
};

const useBookingsContext = () => useContext(BookingsContext);

export { BookingsProvider, useBookingsContext };
