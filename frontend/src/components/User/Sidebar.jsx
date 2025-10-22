import { Nav } from "react-bootstrap";
import { Link } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import "./Sidebar.css";

export default function Sidebar({ activeTab, setActiveTab }) {
  const { user } = useAuth();
  const initials = user?.firstname
    ? (user.firstname[0] + (user.lastname?.[0] || "")).toUpperCase()
    : "U";

  return (
    <div className="sidebar text-center">
      <div className="avatar-fallback mb-3">{initials}</div>

      <div className="sidebar-divider mx-auto mb-4"></div>

      <Nav className="flex-column">
        <Nav.Link
          active={activeTab === "profile"}
          onClick={() => setActiveTab("profile")}
        >
          Profile
        </Nav.Link>

        <Nav.Link
          active={activeTab === "bookings"}
          onClick={() => setActiveTab("bookings")}
        >
          My Bookings
        </Nav.Link>

        <Nav.Link
          active={activeTab === "support"}
          onClick={() => setActiveTab("support")}
        >
          Support
        </Nav.Link>

        <Nav.Link as={Link} to="/">
          ← Back to Home
        </Nav.Link>
      </Nav>
    </div>
  );
}
