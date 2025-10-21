import { Nav } from "react-bootstrap";
import { NavLink } from "react-router-dom";

export default function Sidebar() {
  return (
    <>
      <h4 className="mb-4 text-center">User Dashboard</h4>
      <Nav className="flex-column">
        <Nav.Link as={NavLink} to="profile">
          Profile
        </Nav.Link>
        <Nav.Link as={NavLink} to="bookings">
          My Bookings
        </Nav.Link>
        <Nav.Link as={NavLink} to="support">
          Support
        </Nav.Link>
        <Nav.Link as={NavLink} to="/">
          ← Back to Home
        </Nav.Link>
      </Nav>
    </>
  );
}
