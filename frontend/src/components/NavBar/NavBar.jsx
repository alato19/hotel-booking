import { useState, useEffect } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import Logo from "../../assets/sky-logo-header.png";
import "../NavBar/NavBar.css";
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
          <img
            src={Logo}
            alt="Hotel Paradise Logo"
            height="60"
            className="d-inline-block align-top"
          />
        </Navbar.Brand>

        <Navbar.Toggle aria-controls="main-nav" />
        <Navbar.Collapse id="main-nav">
          <Nav className="ms-auto align-items-center">
            <Nav.Link as={NavLink} to="/" end>
              HOME
            </Nav.Link>
            <Nav.Link as={NavLink} to="/rooms">
              ROOMS
            </Nav.Link>
            <Nav.Link as={NavLink} to="/contact">
              CONTACT
            </Nav.Link>

            {authUser ? (
              <>
                <Nav.Link
                  as={NavLink}
                  to={authUser.role === "admin" ? "/admin" : "/dashboard"}
                  className="fw-semibold text-primary"
                >
                  Welcome,{" "}
                  <span className="fw-bold">
                    {authUser.firstname || authUser.email}
                  </span>
                </Nav.Link>
                <Nav.Link
                  onClick={handleLogout}
                  className="fw-bold text-danger"
                  style={{ cursor: "pointer" }}
                >
                  LOGOUT
                </Nav.Link>
              </>
            ) : (
              <Nav.Link as={NavLink} to="/login">
                LOGIN
              </Nav.Link>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default NavBar;
