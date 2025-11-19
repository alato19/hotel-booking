import {
  useCallback,
  createContext,
  useContext,
  useState,
  useEffect,
} from "react";
import {
  get_all_bookings_services,
  get_bookings_services,
} from "../services/bookings";
import { useAuthenticateContext } from "../context/AuthenticateContext";

const BookingsContext = createContext({});

const BookingsProvider = (props) => {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(false);
  const { authUser } = useAuthenticateContext();
  const [adminBookings, setAdminBookings] = useState([]);
  const [adminLoading, setAdminLoading] = useState(false);

  const refreshAdminBookings = useCallback(async () => {
    if (!authUser || authUser.role !== "admin") {
      setAdminBookings([]);
      return;
    }
    setAdminLoading(true);
    try {
      const result = await get_all_bookings_services();
      setAdminBookings(result);
    } catch (error) {
      console.error("Error refreshing ALL bookings:", error);
    } finally {
      setAdminLoading(false);
    }
  }, [authUser]);

  const refreshBookings = useCallback(async () => {
    if (!authUser?.id) return;
    setLoading(true);
    try {
      const result = await get_bookings_services(authUser.id);
      setBookings(result);
    } catch (error) {
      console.error("Error refreshing bookings:", error);
    } finally {
      setLoading(false);
    }
  }, [authUser]);

  useEffect(() => {
    if (authUser?.id) refreshBookings();
  }, [authUser, refreshBookings]);

  return (
    <BookingsContext.Provider
      value={{
        bookings,
        refreshBookings,
        loading,
        setBookings,
        adminBookings,
        refreshAdminBookings,
        adminLoading,
      }}
    >
      {props.children}
    </BookingsContext.Provider>
  );
};

export const useBookingsContext = () => useContext(BookingsContext);
export { BookingsProvider };
