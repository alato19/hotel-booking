import { Nav } from "react-bootstrap";
import { Link } from "react-router-dom";
import { useAuthenticateContext } from "../../context/AuthenticateContext";
import "./Sidebar.css";

export default function Sidebar({ activeTab, setActiveTab }) {
  const { authUser } = useAuthenticateContext();

  // ✅ Derive initials safely
  const initials = authUser?.firstname
    ? (authUser.firstname[0] + (authUser.lastname?.[0] || "")).toUpperCase()
    : "U";

  return (
    <div className="sidebar text-center py-4">
      {/* Avatar / initials */}
      <div className="avatar-fallback mx-auto mb-3">{initials}</div>

      {/* Divider */}
      <div className="sidebar-divider mx-auto mb-4"></div>

      {/* Navigation links */}
      <Nav className="flex-column">
        <Nav.Link
          active={activeTab === "profile"}
          onClick={() => setActiveTab("profile")}
          className="fw-semibold"
        >
          Profile
        </Nav.Link>

        <Nav.Link
          active={activeTab === "bookings"}
          onClick={() => setActiveTab("bookings")}
          className="fw-semibold"
        >
          My Bookings
        </Nav.Link>

        <Nav.Link
          active={activeTab === "support"}
          onClick={() => setActiveTab("support")}
          className="fw-semibold"
        >
          Support
        </Nav.Link>

        <Nav.Link as={Link} to="/" className="mt-4 text-muted">
          ← Back to Home
        </Nav.Link>
      </Nav>
    </div>
  );
}
