import { Table } from "react-bootstrap";

export default function MyBookings() {
  const demoBookings = [];

  return (
    <>
      <h3 className="mb-4">My Bookings</h3>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>#</th>
            <th>Room</th>
            <th>Check-In</th>
            <th>Check-Out</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {demoBookings.map((b, index) => (
            <tr key={b.id}>
              <td>{index + 1}</td>
              <td>{b.room}</td>
              <td>{b.checkIn}</td>
              <td>{b.checkOut}</td>
              <td>{b.status}</td>
            </tr>
          ))}
        </tbody>
      </Table>
    </>
  );
}
