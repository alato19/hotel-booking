import { useEffect, useState } from "react";
import { Container, Row, Col } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { useAuthenticateContext } from "../context/AuthenticateContext";

import NavBar from "../components/NavBar/NavBar";
import Footer from "../components/Footer/Footer";
import Sidebar from "../components/User/Sidebar";
import Profile from "../components/User/Profile";
import MyBookings from "../components/User/MyBookings";
import Support from "../components/User/Support";
import optHeaderBackground from "../assets/header.jpg";
import "./UserDashboard.css";

export default function UserDashboard() {
  const [activeTab, setActiveTab] = useState("profile");
  const { authUser, isAuthChecked } = useAuthenticateContext();
  const navigate = useNavigate();

  useEffect(() => {
    if (isAuthChecked && (!authUser || authUser.role !== "user")) {
      navigate("/login");
    }
  }, [authUser, isAuthChecked, navigate]);

  if (!isAuthChecked) {
    return <div className="text-center mt-5">Checking authentication...</div>;
  }

  return (
    <>
      <NavBar />

      {/* Hero section */}
      <section
        className="dashboard-hero text-white d-flex align-items-center"
        style={{
          backgroundImage: `url(${optHeaderBackground})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          height: "40vh",
          width: "100%",
        }}
      >
        <div className="container text-center">
          <h1 className="fw-bold">Your Dashboard</h1>
          <p className="lead">View your bookings and manage your profile</p>
        </div>
      </section>

      {/* Main content */}
      <Container className="py-5">
        <Row>
          {/* Sidebar */}
          <Col xs={12} md={3} className="mb-4">
            <Sidebar activeTab={activeTab} setActiveTab={setActiveTab} />
          </Col>

          {/* Main content area */}
          <Col xs={12} md={9}>
            {activeTab === "profile" && <Profile />}
            {activeTab === "bookings" && <MyBookings />}
            {activeTab === "support" && <Support />}
          </Col>
        </Row>
      </Container>

      <Footer />
    </>
  );
}
