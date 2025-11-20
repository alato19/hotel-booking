import { useState, useEffect } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import { FaUserCircle } from "react-icons/fa";
import Logo from "../../assets/sky-logo-header.png";
import "./NavBar.css";
import { useAuthenticateContext } from "../../context/AuthenticateContext";

function NavBar() {
  const [scrolled, setScrolled] = useState(false);
  const { authUser, logout } = useAuthenticateContext();
  const navigate = useNavigate();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const handleLogout = async () => {
    await logout();
    navigate("/login");
  };

  return (
    <Navbar
      expand="lg"
      fixed="top"
      className={`custom-navbar ${scrolled ? "scrolled" : ""}`}
    >
      <Container>
        <Navbar.Brand as={Link} to="/">
          <img src={Logo} alt="Hotel Paradise Logo" className="brand-logo" />
        </Navbar.Brand>

        <Navbar.Toggle aria-controls="main-nav" />

        <Navbar.Collapse id="main-nav">
          <Nav className="ms-auto align-items-center">
            <Nav.Link as={NavLink} to="/" end>
              Home
            </Nav.Link>
            <Nav.Link as={NavLink} to="/rooms">
              Rooms
            </Nav.Link>
            <Nav.Link as={NavLink} to="/contact">
              Contact
            </Nav.Link>

            {authUser ? (
              <NavDropdown
                title={
                  <span className="d-flex align-items-center gap-2">
                    <FaUserCircle size={20} />
                    {authUser.firstname || authUser.email}
                  </span>
                }
                id="user-menu"
                align="end"
                className="user-dropdown"
              >
                <NavDropdown.Item
                  as={Link}
                  to={authUser.role === "admin" ? "/admin" : "/dashboard"}
                >
                  Dashboard
                </NavDropdown.Item>
                <NavDropdown.Divider />
                <NavDropdown.Item onClick={handleLogout}>
                  Logout
                </NavDropdown.Item>
              </NavDropdown>
            ) : (
              <Nav.Link as={NavLink} to="/login">
                Login
              </Nav.Link>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default NavBar;
