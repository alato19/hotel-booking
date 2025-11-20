import { useAuthenticateContext } from "../context/AuthenticateContext";
import { Navigate } from "react-router-dom";
import { useEffect, useState } from "react";
import {
  Container,
  Button,
  Table,
  Modal,
  Form,
  Row,
  Col,
} from "react-bootstrap";
import optHeaderBackground from "../assets/header.jpg";
import NavBar from "../components/NavBar/NavBar";
import Footer from "../components/Footer/Footer";
import { useRoomContext } from "../context/RoomContext";
import { useBookingsContext } from "../context/BookingContext";
import "./AdminDashboard.css";

const API_BASE =
  import.meta.env.VITE_API_URL || "https://hotel-booking-d4se.onrender.com";

export default function AdminDashboard() {
  const { authUser } = useAuthenticateContext();
  const [loading, setLoading] = useState(true);
  const { rooms, refreshRooms } = useRoomContext();
  const [isEditing, setIsEditing] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [newRoom, setNewRoom] = useState({
    title: "",
    description: "",
    price: "",
    maxPeople: "",
    hasBalcony: false,
    oceanView: false,
    tvService: false,
    isPublished: true,
  });

  const { adminBookings, refreshAdminBookings } = useBookingsContext();

  useEffect(() => {
    async function loadData() {
      await refreshRooms();
      if (authUser?.role === "admin") {
        await refreshAdminBookings();
      }
      setLoading(false);
    }
    loadData();
  }, [authUser, refreshRooms, refreshAdminBookings]);

  if (loading) return <p className="text-center mt-5">Loading...</p>;
  if (!authUser || authUser.role !== "admin") return <Navigate to="/login" />;

  return (
    <>
      <NavBar />

      {/* Hero banner */}
      <section
        className="admin-hero d-flex align-items-center text-white"
        style={{
          backgroundImage: `url(${optHeaderBackground})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          height: "40vh",
        }}
      >
        <Container className="text-center">
          <h1 className="fw-bold">Admin Dashboard</h1>
          <p className="lead">Manage rooms & booking approvals</p>
        </Container>
      </section>

      <Container className="py-5">
        {/* Manage Rooms */}
        <div className="d-flex justify-content-between align-items-center mb-4">
          <h3 className="text-primary">Rooms Management</h3>
          <Button
            variant="primary"
            onClick={() => {
              setNewRoom({
                title: "",
                description: "",
                price: "",
                maxPeople: "",
                hasBalcony: false,
                oceanView: false,
                tvService: false,
                isPublished: true,
              });
              setShowModal(true);
              setIsEditing(false);
            }}
          >
            + Add Room
          </Button>
        </div>

        <Table bordered hover responsive className="shadow-sm">
          <thead className="table-light">
            <tr>
              <th>ID</th>
              <th>Title</th>
              <th>Price</th>
              <th>Max People</th>
              <th>Balcony</th>
              <th>Ocean View</th>
              <th>Booked</th>
              <th>Published</th>
              <th>Actions</th>
            </tr>
          </thead>

          <tbody>
            {rooms.map((room) => (
              <tr key={room.id}>
                <td>{room.id}</td>
                <td>{room.title}</td>
                <td>{room.price}</td>
                <td>{room.maxPeople}</td>
                <td>{room.hasBalcony ? "Yes" : "No"}</td>
                <td>{room.oceanView ? "Yes" : "No"}</td>
                <td>{room.isBooked ? "Yes" : "No"}</td>
                <td>{room.isPublished ? "Yes" : "No"}</td>
                <td>
                  <Button
                    variant="outline-primary"
                    size="sm"
                    className="me-2"
                    onClick={() => {
                      setNewRoom(room);
                      setShowModal(true);
                      setIsEditing(true);
                    }}
                  >
                    Edit
                  </Button>
                  <Button
                    variant="outline-danger"
                    size="sm"
                    onClick={() => handleDeleteRoom(room.id)}
                  >
                    Delete
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>

        {/* Pending bookings */}
        <h3 className="text-primary mt-5 mb-3">Pending Bookings</h3>
        <Table bordered hover responsive className="shadow-sm">
          <thead className="table-light">
            <tr>
              <th>ID</th>
              <th>Room</th>
              <th>User</th>
              <th>Confirmed</th>
              <th>Action</th>
            </tr>
          </thead>

          <tbody>
            {adminBookings.map((booking) => (
              <tr key={booking.id}>
                <td>{booking.id}</td>
                <td>{booking.room?.title || "-"}</td>
                <td>{booking.user?.email || "-"}</td>
                <td
                  className={
                    booking.confirmed
                      ? "text-success fw-semibold"
                      : "text-warning fw-semibold"
                  }
                >
                  {booking.confirmed ? "Yes" : "No"}
                </td>
                <td>
                  <Button
                    size="sm"
                    variant="outline-success"
                    disabled={booking.confirmed}
                    onClick={() => handleApproveBooking(booking.id)}
                  >
                    {booking.confirmed ? "Approved" : "Approve"}
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </Container>

      {/* Modal for create/edit */}
      <Modal show={showModal} onHide={() => setShowModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>{isEditing ? "Edit Room" : "New Room"}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={isEditing ? handleEditRoom : handleCreateRoom}>
            <Row className="g-3">
              <Col md={6}>
                <Form.Group>
                  <Form.Label>Title</Form.Label>
                  <Form.Control
                    type="text"
                    value={newRoom.title}
                    onChange={(e) =>
                      setNewRoom({ ...newRoom, title: e.target.value })
                    }
                  />
                </Form.Group>
              </Col>

              <Col md={6}>
                <Form.Group>
                  <Form.Label>Price</Form.Label>
                  <Form.Control
                    type="number"
                    value={newRoom.price}
                    onChange={(e) =>
                      setNewRoom({ ...newRoom, price: e.target.value })
                    }
                  />
                </Form.Group>
              </Col>

              <Col md={6}>
                <Form.Group>
                  <Form.Label>Max People</Form.Label>
                  <Form.Control
                    type="number"
                    value={newRoom.maxPeople}
                    onChange={(e) =>
                      setNewRoom({ ...newRoom, maxPeople: e.target.value })
                    }
                  />
                </Form.Group>
              </Col>
            </Row>

            <Form.Group className="mt-3">
              <Form.Label>Description</Form.Label>
              <Form.Control
                as="textarea"
                rows={2}
                value={newRoom.description}
                onChange={(e) =>
                  setNewRoom({ ...newRoom, description: e.target.value })
                }
              />
            </Form.Group>

            <div className="mt-3">
              <Form.Check
                type="checkbox"
                label="Balcony"
                checked={newRoom.hasBalcony}
                onChange={(e) =>
                  setNewRoom({ ...newRoom, hasBalcony: e.target.checked })
                }
              />
              <Form.Check
                type="checkbox"
                label="Ocean View"
                checked={newRoom.oceanView}
                onChange={(e) =>
                  setNewRoom({ ...newRoom, oceanView: e.target.checked })
                }
              />
              <Form.Check
                type="checkbox"
                label="TV Service"
                checked={newRoom.tvService}
                onChange={(e) =>
                  setNewRoom({ ...newRoom, tvService: e.target.checked })
                }
              />
              <Form.Check
                type="checkbox"
                label="Published"
                checked={newRoom.isPublished}
                onChange={(e) =>
                  setNewRoom({ ...newRoom, isPublished: e.target.checked })
                }
              />
            </div>

            <div className="mt-3 text-end">
              <Button
                variant="secondary"
                onClick={() => setShowModal(false)}
                className="me-2"
              >
                Cancel
              </Button>

              <Button type="submit" variant="primary">
                {isEditing ? "Update" : "Create"}
              </Button>
            </div>
          </Form>
        </Modal.Body>
      </Modal>

      <Footer />
    </>
  );
}
