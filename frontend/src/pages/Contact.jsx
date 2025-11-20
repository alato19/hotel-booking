//Contact.jsx
import NavBar from "../components/NavBar/NavBar";
import optHeaderBackground from "../assets/header.jpg";
import Footer from "../components/Footer/Footer";
import { Container, Card, Form, Button, Row, Col } from "react-bootstrap";
import {
  FaInstagram,
  FaFacebook,
  FaTripadvisor,
  FaPhone,
  FaEnvelope,
  FaMapMarkerAlt,
} from "react-icons/fa";
import { BsBuilding } from "react-icons/bs";
import { useState } from "react";
import "./Contact.css";

export default function Contact() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert("Message sent successfully! (Demo form — not connected to backend)");
    setForm({ name: "", email: "", subject: "", message: "" });
  };

  return (
    <div className="position-relative">
      <NavBar />

      {/* Hero */}
      <section
        className="contact-hero text-white d-flex align-items-center justify-content-center text-center"
        style={{
          backgroundImage: `url(${optHeaderBackground})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div>
          <h1 className="fw-bold">Contact Us</h1>
          <p className="lead">We’d love to hear from you</p>
        </div>
      </section>

      {/* Main content */}
      <Container className="py-5">
        <Row className="g-4">
          {/* Left: Form */}
          <Col lg={6}>
            <Card className="shadow-sm contact-card">
              <Card.Body>
                <h4 className="fw-bold text-center mb-4 text-primary">
                  Write to Us
                </h4>

                <Form onSubmit={handleSubmit}>
                  <Form.Group className="mb-3">
                    <Form.Label>Your Name</Form.Label>
                    <Form.Control
                      type="text"
                      name="name"
                      value={form.name}
                      onChange={handleChange}
                      required
                    />
                  </Form.Group>

                  <Form.Group className="mb-3">
                    <Form.Label>Your Email</Form.Label>
                    <Form.Control
                      type="email"
                      name="email"
                      value={form.email}
                      onChange={handleChange}
                      required
                    />
                  </Form.Group>

                  <Form.Group className="mb-3">
                    <Form.Label>Subject</Form.Label>
                    <Form.Control
                      type="text"
                      name="subject"
                      value={form.subject}
                      onChange={handleChange}
                      required
                    />
                  </Form.Group>

                  <Form.Group className="mb-3">
                    <Form.Label>Your Message</Form.Label>
                    <Form.Control
                      as="textarea"
                      rows={4}
                      name="message"
                      value={form.message}
                      onChange={handleChange}
                      required
                    />
                  </Form.Group>

                  <div className="d-grid">
                    <Button
                      type="submit"
                      variant="primary"
                      className="fw-semibold"
                    >
                      Send Message
                    </Button>
                  </div>
                </Form>
              </Card.Body>
            </Card>
          </Col>

          {/* Right: Contact Info */}
          <Col lg={6}>
            <div className="contact-info">
              <h4 className="fw-bold text-primary mb-3">Contact Information</h4>

              <p>
                <FaMapMarkerAlt className="icon" /> 123 Paradise Street, Tirana,
                Albania
              </p>
              <p>
                <FaPhone className="icon" /> +355 44 123 456
              </p>
              <p>
                <FaEnvelope className="icon" /> contact@hotelparadise.com
              </p>

              <h5 className="fw-bold mt-4">Follow Us</h5>
              <div className="social-links mt-2">
                <a href="#">
                  <FaInstagram />
                </a>
                <a href="#">
                  <FaFacebook />
                </a>
                <a href="#">
                  <FaTripadvisor />
                </a>
                <a href="#">
                  <BsBuilding title="Booking.com" />
                </a>
              </div>

              {/* Map Placeholder */}
              <div className="map-placeholder mt-4">
                [ Google Map Placeholder — coming soon ]
              </div>
            </div>
          </Col>
        </Row>
      </Container>

      <Footer />
    </div>
  );
}
