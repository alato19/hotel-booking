import { Table, Spinner, Button } from "react-bootstrap";
import { useEffect } from "react";
import { Link } from "react-router-dom";
import { useBookingsContext } from "../../context/BookingContext";
import { useAuthenticateContext } from "../../context/AuthenticateContext";

export default function MyBookings() {
  const { bookings, refreshBookings, loading } = useBookingsContext();
  const { authUser, isAuthChecked } = useAuthenticateContext();

  useEffect(() => {
    if (isAuthChecked && authUser?.id) {
      refreshBookings();
    }
  }, [isAuthChecked, authUser, refreshBookings]);

  async function cancelBooking(bookingId) {
    if (!window.confirm("Are you sure you want to cancel this booking?"))
      return;

    try {
      const res = await fetch(`http://localhost:3000/bookings/${bookingId}`, {
        method: "DELETE",
        credentials: "include",
      });
      if (!res.ok) throw new Error("Failed to cancel booking");
      alert("Booking cancelled successfully!");
      refreshBookings();
    } catch (error) {
      console.error("Cancel error:", error);
      alert("Error cancelling booking.");
    }
  }

  if (loading || !isAuthChecked) {
    return (
      <div className="text-center py-5">
        <Spinner animation="border" variant="secondary" />
        <p className="mt-3">Loading your bookings...</p>
      </div>
    );
  }

  if (!bookings || bookings.length === 0) {
    return (
      <div className="text-center py-5">
        <p className="text-muted mb-3">You haven’t made any bookings yet.</p>
        <Link to="/rooms" className="btn btn-outline-primary">
          Book your first stay
        </Link>
      </div>
    );
  }

  return (
    <div className="mt-3">
      <h3 className="mb-4">My Bookings</h3>
      <Table striped bordered hover responsive className="shadow-sm">
        <thead className="table-light">
          <tr>
            <th>#</th>
            <th>Room</th>
            <th>Status</th>
            <th>Booked On</th>
            <th>Action</th>
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
              <td>
                <Button
                  variant="outline-danger"
                  size="sm"
                  onClick={() => cancelBooking(b.id)}
                >
                  Cancel
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
}
