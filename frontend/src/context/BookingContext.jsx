import {
  useCallback,
  createContext,
  useContext,
  useState,
  useEffect,
} from "react";
import { get_bookings_services } from "../services/bookings";
import { useAuthenticateContext } from "../context/AuthenticateContext";

const BookingsContext = createContext({});

export const BookingsProvider = ({ children }) => {
  const [bookings, setBookings] = useState([]);
  const { authUser } = useAuthenticateContext();

  const refreshBookings = useCallback(async () => {
    if (!authUser?.id) return;
    try {
      const result = await get_bookings_services(authUser.id);
      setBookings(result);
    } catch (error) {
      console.error("Error refreshing bookings:", error);
    }
  }, [authUser]);

  useEffect(() => {
    refreshBookings();
  }, [refreshBookings]);

  return (
    <BookingsContext.Provider value={{ bookings, refreshBookings }}>
      {children}
    </BookingsContext.Provider>
  );
};

export const useBookingsContext = () => useContext(BookingsContext);
