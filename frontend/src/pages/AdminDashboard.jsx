import { useEffect, useState } from "react";
import Table from "react-bootstrap/Table";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import optHeaderBackground from "../assets/header.jpg";
import NavBar from "../components/NavBar/NavBar";
import Footer from "../components/Footer/Footer";
import { useRoomContext } from "../context/RoomContext";

const API_BASE = import.meta.env.VITE_API_URL || "http://localhost:3000";

export default function AdminDashboard() {
  const [loading, setLoading] = useState(true);
  const { rooms, refreshRooms } = useRoomContext();
  const [err, setErr] = useState("");
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

  useEffect(() => {
    refreshRooms().finally(() => setLoading(false));
  }, []);

  async function handleCreateRoom(e) {
    e.preventDefault();
    try {
      const res = await fetch(`${API_BASE}/room/create`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newRoom),
      });
      if (!res.ok) throw new Error("Failed to create room");

      await refreshRooms();
      setShowModal(false);
    } catch (error) {
      console.error(error);
      alert("Error creating room");
    }
  }

  async function handleEditRoom(e) {
    e.preventDefault();
    try {
      const res = await fetch(`${API_BASE}/room/${newRoom.id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newRoom),
      });
      const data = await res.json();
      console.log("PATCH response:", data);
      if (!res.ok) throw new Error("Failed to update room");

      await refreshRooms();
      setShowModal(false);
    } catch (error) {
      console.error(error);
      alert("Error updating room");
    }
  }

  async function handleDeleteRoom(id) {
    if (!window.confirm("Are you sure you want to delete this room?")) return;

    try {
      const res = await fetch(`${API_BASE}/room/${id}`, {
        method: "DELETE",
      });
      if (!res.ok) throw new Error("Failed to delete room");

      await refreshRooms();
    } catch (error) {
      console.error(error);
      alert("Error deleting room");
    }
  }

  if (loading) return <p className="text-center mt-5">Loading...</p>;

  return (
    <div className="position-relative">
      <NavBar />

      <section
        className="text-white d-flex align-items-center"
        style={{
          backgroundImage: `url(${optHeaderBackground})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          height: "60vh",
          width: "100%",
        }}
      >
        <div className="container header">
          <h1 className="display-3 fw-bold">Admin Dashboard - Manage Rooms</h1>
        </div>
      </section>

      <div className="container py-4">
        <Button
          variant="success"
          className="mb-3"
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
          Add New Room
        </Button>

        <Table bordered hover responsive>
          <thead>
            <tr>
              <th>ID</th>
              <th>Title</th>
              <th>Price</th>
              <th>Max People</th>
              <th>Balcony</th>
              <th>Ocean View</th>
              <th>Available From</th>
              <th>Available To</th>
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
                <td>{room.availableFrom || "-"}</td>
                <td>{room.availableTo || "-"}</td>
                <td>{room.isBooked ? "Yes" : "No"}</td>
                <td>{room.isPublished ? "Yes" : "No"}</td>
                <td>
                  <Button
                    size="sm"
                    variant="warning"
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
                    size="sm"
                    variant="danger"
                    onClick={() => handleDeleteRoom(room.id)}
                  >
                    Delete
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>

        <Modal show={showModal} onHide={() => setShowModal(false)}>
          <Modal.Header closeButton>
            <Modal.Title>Add New Room</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form onSubmit={isEditing ? handleEditRoom : handleCreateRoom}>
              <Form.Group className="mb-3">
                <Form.Label>Title</Form.Label>
                <Form.Control
                  type="text"
                  value={newRoom.title}
                  onChange={(e) =>
                    setNewRoom({ ...newRoom, title: e.target.value })
                  }
                />
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label>Description</Form.Label>
                <Form.Control
                  as="textarea"
                  rows={3}
                  value={newRoom.description}
                  onChange={(e) =>
                    setNewRoom({ ...newRoom, description: e.target.value })
                  }
                />
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label>Price</Form.Label>
                <Form.Control
                  type="number"
                  value={newRoom.price}
                  onChange={(e) =>
                    setNewRoom({ ...newRoom, price: e.target.value })
                  }
                />
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label>Max People</Form.Label>
                <Form.Control
                  type="number"
                  value={newRoom.maxPeople}
                  onChange={(e) =>
                    setNewRoom({ ...newRoom, maxPeople: e.target.value })
                  }
                />
              </Form.Group>

              <Form.Check
                type="checkbox"
                label="Has Balcony"
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

              <Form.Group className="mb-3">
                <Form.Label>Available From</Form.Label>
                <Form.Control
                  type="date"
                  value={
                    newRoom.availableFrom
                      ? newRoom.availableFrom.substring(0, 10)
                      : ""
                  }
                  onChange={(e) =>
                    setNewRoom({ ...newRoom, availableFrom: e.target.value })
                  }
                />
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label>Available To</Form.Label>
                <Form.Control
                  type="date"
                  value={
                    newRoom.availableTo
                      ? newRoom.availableTo.substring(0, 10)
                      : ""
                  }
                  onChange={(e) =>
                    setNewRoom({ ...newRoom, availableTo: e.target.value })
                  }
                />
              </Form.Group>

              <Form.Check
                type="checkbox"
                label="Booked"
                checked={newRoom.isBooked}
                onChange={(e) =>
                  setNewRoom({ ...newRoom, isBooked: e.target.checked })
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

              <div className="mt-3 text-end">
                <Button
                  variant="secondary"
                  onClick={() => setShowModal(false)}
                  className="me-2"
                >
                  Cancel
                </Button>
                <Button type="submit" variant="primary">
                  {isEditing ? "Update" : "Save"}
                </Button>
              </div>
            </Form>
          </Modal.Body>
        </Modal>
      </div>

      <section id="footer">
        <Footer />
      </section>
    </div>
  );
}
