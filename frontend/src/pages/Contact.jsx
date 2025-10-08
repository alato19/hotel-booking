import React from "react";
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

export default function Contact() {
  return (
    <>
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
            <h1 className="display-3 fw-bold">Contact Us</h1>
          </div>
        </section>
      </div>

      <Container className="my-5">
        <Row className="g-4">
          {/* Left column: Form */}
          <Col lg={6}>
            <Card className="shadow">
              <Card.Body className="p-4">
                <div className="text-center mb-4">
                  <p className="h4 fw-bold">Write to Us</p>
                </div>

                <Form>
                  <Form.Group className="mb-3">
                    <Form.Label>Your Name</Form.Label>
                    <Form.Control type="text" placeholder="Enter your name" />
                  </Form.Group>

                  <Form.Group className="mb-3">
                    <Form.Label>Your Email</Form.Label>
                    <Form.Control type="email" placeholder="Enter your email" />
                  </Form.Group>

                  <Form.Group className="mb-3">
                    <Form.Label>Subject</Form.Label>
                    <Form.Control type="text" placeholder="Enter subject" />
                  </Form.Group>

                  <Form.Group className="mb-3">
                    <Form.Label>Your Message</Form.Label>
                    <Form.Control
                      as="textarea"
                      rows={4}
                      placeholder="Write your message"
                    />
                  </Form.Group>

                  <div className="text-center">
                    <Button
                      variant="secondary"
                      type="submit"
                      className="px-4 fw-bold"
                      style={{ backgroundColor: "#8b6f47", border: "none" }}
                    >
                      Send
                    </Button>
                  </div>
                </Form>
              </Card.Body>
            </Card>
          </Col>

          {/* Right column: Info + Map */}
          <Col lg={6}>
            <div className="p-4">
              <h4 className="fw-bold mb-3">Contact Information</h4>
              <p>
                <FaMapMarkerAlt className="me-2 text-muted" />
                123 Paradise Street, Tirana, Albania
              </p>
              <p>
                <FaPhone className="me-2 text-muted" />
                +355 44 123 456
              </p>
              <p>
                <FaEnvelope className="me-2 text-muted" />
                contact@hotelparadise.com
              </p>

              <h5 className="fw-bold mt-4">Follow Us</h5>
              <div className="d-flex gap-3 fs-4 mt-2">
                <a href="#" className="text-dark">
                  <FaInstagram />
                </a>
                <a href="#" className="text-dark">
                  <FaFacebook />
                </a>
                <a href="#" className="text-dark">
                  <FaTripadvisor />
                </a>
                <a href="#" className="text-dark">
                  <BsBuilding title="Booking.com" />
                </a>
              </div>

              <div className="mt-4">
                {/* Placeholder Map (you can embed Google Maps iframe later) */}
                <div
                  className="bg-light border rounded"
                  style={{ height: "250px" }}
                >
                  <p className="text-center text-muted pt-5">
                    [ Google Map Placeholder ]
                  </p>
                </div>
              </div>
            </div>
          </Col>
        </Row>
      </Container>

      <Footer />
    </>
  );
}
