import { Table, Spinner } from "react-bootstrap";
import { useEffect } from "react";
import { useBookingsContext } from "../../context/BookingContext";
import { useAuthenticateContext } from "../../context/AuthenticateContext";

export default function MyBookings() {
  const { bookings, refreshBookings } = useBookingsContext();
  const { authUser, isAuthChecked } = useAuthenticateContext();

  // ✅ Automatically refresh bookings when user logs in
  useEffect(() => {
    if (isAuthChecked && authUser?.id) {
      refreshBookings();
    }
  }, [isAuthChecked, authUser, refreshBookings]);

  if (!isAuthChecked) {
    return (
      <div className="text-center py-5">
        <Spinner animation="border" variant="secondary" />
        <p className="mt-3">Loading your bookings...</p>
      </div>
    );
  }

  return (
    <div className="mt-3">
      <h3 className="mb-4">My Bookings</h3>

      {!bookings || bookings.length === 0 ? (
        <p className="text-muted">You have no bookings yet.</p>
      ) : (
        <Table striped bordered hover responsive className="shadow-sm">
          <thead className="table-light">
            <tr>
              <th>#</th>
              <th>Room</th>
              <th>Status</th>
              <th>Booked On</th>
            </tr>
          </thead>
          <tbody>
            {bookings.map((b, index) => (
              <tr key={b.id}>
                <td>{index + 1}</td>
                <td>{b.room?.title || "N/A"}</td>
                <td
                  className={
                    b.confirmed
                      ? "text-success fw-semibold"
                      : "text-warning fw-semibold"
                  }
                >
                  {b.confirmed ? "Confirmed" : "Pending"}
                </td>
                <td>{new Date(b.createdAt).toLocaleDateString()}</td>
              </tr>
            ))}
          </tbody>
        </Table>
      )}
    </div>
  );
}
