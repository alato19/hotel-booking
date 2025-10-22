import { useState } from "react";
import { Container, Row, Col, Tabs, Tab } from "react-bootstrap";
import NavBar from "../components/NavBar/NavBar";
import Footer from "../components/Footer/Footer";
import Sidebar from "../components/User/Sidebar";
import Profile from "../components/User/Profile";
import MyBookings from "../components/User/MyBookings";
import Support from "../components/User/Support";
import optHeaderBackground from "../assets/header.jpg";

export default function Dashboard() {
  const [activeTab, setActiveTab] = useState("profile");

  return (
    <div className="position-relative">
      <NavBar />

      {/* Hero section with background */}
      <section
        className="text-white d-flex align-items-center"
        style={{
          backgroundImage: `url(${optHeaderBackground})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          height: "50vh",
          width: "100%",
        }}
      >
        <div className="container text-center">
          <h1 className="display-3 fw-bold mt-5">Your Dashboard</h1>
          <p className="lead text-white">View Bookings and edit Profile</p>
        </div>
      </section>

      {/* Main content */}
      <div className="container py-5">
        <Container fluid className="mt-5 pt-4">
          <Row>
            <Col md={3} lg={2} className="bg-light min-vh-100 p-3">
              <Sidebar activeTab={activeTab} setActiveTab={setActiveTab} />
            </Col>

            <Col md={9} lg={10} className="p-4">
              <Tabs
                activeKey={activeTab}
                onSelect={(k) => setActiveTab(k)}
                id="dashboard-tabs"
                className="mb-3"
              >
                <Tab eventKey="profile" title="Profile">
                  <Profile />
                </Tab>
                <Tab eventKey="bookings" title="My Bookings">
                  <MyBookings />
                </Tab>
                <Tab eventKey="support" title="Support">
                  <Support />
                </Tab>
              </Tabs>
            </Col>
          </Row>
        </Container>
      </div>

      <Footer />
    </div>
  );
}
