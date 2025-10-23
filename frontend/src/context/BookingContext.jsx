import {
  useCallback,
  createContext,
  useContext,
  useState,
  useEffect,
} from "react";
import { get_bookings_services } from "../services/bookings";
import { useAuth } from "../context/AuthContext";

const BookingsContext = createContext({});

const BookingsProvider = (props) => {
  const [bookings, setBookings] = useState([]);
  const { user } = useAuth();

  const refreshBookings = useCallback(async () => {
    if (!user?.id) return;
    try {
      const result = await get_bookings_services(user.id);
      setBookings(result);
    } catch (error) {
      console.error("Error refreshing bookings:", error);
    }
  }, [user]);

  useEffect(() => {
    refreshBookings();
  }, [refreshBookings]);

  return (
    <BookingsContext.Provider value={{ bookings, refreshBookings }}>
      {props.children}
    </BookingsContext.Provider>
  );
};

export const useBookingsContext = () => useContext(BookingsContext);
export { BookingsProvider };
