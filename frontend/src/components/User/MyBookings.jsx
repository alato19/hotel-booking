import { Table } from "react-bootstrap";
import { useBookingsContext } from "../../context/BookingContext";

export default function MyBookings() {
  const { bookings } = useBookingsContext();

  return (
    <>
      <h3 className="mb-4">My Bookings</h3>
      {bookings.length === 0 ? (
        <p>No bookings yet.</p>
      ) : (
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>#</th>
              <th>Room</th>
              <th>Status</th>
              <th>Created At</th>
            </tr>
          </thead>
          <tbody>
            {bookings.map((b, index) => (
              <tr key={b.id}>
                <td>{index + 1}</td>
                <td>{b.room?.title}</td>
                <td>{b.confirmed ? "Confirmed" : "Pending"}</td>
                <td>{new Date(b.createdAt).toLocaleString()}</td>
              </tr>
            ))}
          </tbody>
        </Table>
      )}
    </>
  );
}
