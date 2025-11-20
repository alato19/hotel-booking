//Home.jsx
import { useRoomContext } from "../context/RoomContext.jsx";
import headerBackground from "../assets/Slider-v1.jpg";
import NavBar from "../components/NavBar/NavBar";
import "../pages/Home.css";
import icon from "../assets/icon-our.png";
import RoomCard from "../components/RoomsCard";
import Footer from "../components/Footer/Footer";
import { useState } from "react";
import { Form, Button } from "react-bootstrap";

export default function Home() {
  const { rooms } = useRoomContext();
  const [filters, setFilters] = useState({
    arrival: "",
    departure: "",
    people: 1,
  });

  function applyFilters(rooms) {
    return rooms.filter((room) => {
      if (filters.arrival && filters.departure) {
        const arrival = new Date(filters.arrival);
        const departure = new Date(filters.departure);

        const availableFrom = room.availableFrom
          ? new Date(room.availableFrom)
          : null;
        const availableTo = room.availableTo
          ? new Date(room.availableTo)
          : null;

        if (availableFrom && arrival < availableFrom) return false;
        if (availableTo && departure > availableTo) return false;
      }

      if (room.maxPeople < Number(filters.people)) return false;

      return true;
    });
  }

  const filteredRooms = applyFilters(rooms);

  const handleSubmit = (e) => {
    e.preventDefault();
  };

  const handleReset = () => {
    setFilters({ arrival: "", departure: "", people: 1 });
  };

  return (
    <div className="position-relative">
      <NavBar />

      {/* Hero Section */}
      <section
        className="home-hero text-white d-flex flex-column justify-content-center align-items-center text-center"
        style={{
          backgroundImage: `url(${headerBackground})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div className="container">
          <h1 className="fw-bold text-shadow">Welcome to Paradise</h1>
          <p className="lead text-white mb-4">Hotels & Resorts</p>
        </div>

        {/* Filter Form */}
        <div className="container hero-form-container">
          <Form
            className="row g-0 shadow bg-white p-3 rounded-3"
            onSubmit={handleSubmit}
          >
            {/* Arrival */}
            <div className="col-12 col-md-3 mb-3 mb-md-0">
              <Form.Label className="fw-semibold small text-uppercase text-muted">
                Arrival
              </Form.Label>
              <Form.Control
                type="date"
                className="text-center"
                value={filters.arrival}
                onChange={(e) =>
                  setFilters({ ...filters, arrival: e.target.value })
                }
              />
            </div>

            {/* Departure */}
            <div className="col-12 col-md-3 mb-3 mb-md-0">
              <Form.Label className="fw-semibold small text-uppercase text-muted">
                Departure
              </Form.Label>
              <Form.Control
                type="date"
                className="text-center"
                value={filters.departure}
                onChange={(e) =>
                  setFilters({ ...filters, departure: e.target.value })
                }
              />
            </div>

            {/* People */}
            <div className="col-12 col-md-2 mb-3 mb-md-0">
              <Form.Label className="fw-semibold small text-uppercase text-muted">
                People
              </Form.Label>
              <Form.Control
                type="number"
                min="1"
                className="text-center"
                value={filters.people}
                onChange={(e) =>
                  setFilters({ ...filters, people: e.target.value })
                }
              />
            </div>

            {/* Apply */}
            <div
              id="filter-buttons"
              className="col-md-4 p-3 d-flex align-items-center justify-content-center"
            >
              <Button type="submit" className="btn-check-availability w-100">
                Check Availability
              </Button>

              <Button
                type="button"
                onClick={handleReset}
                className="btn-reset w-100"
              >
                Reset
              </Button>
            </div>
          </Form>
        </div>
      </section>

      {/* Our Rooms */}
      <section id="ourRooms" className="py-5">
        <div className="container text-center">
          <h2 className="fw-bold text-dark">Our Rooms</h2>
          <img className="iconDivider" src={icon} alt="divider" />
          <p className="text-muted">
            Discover unmatched comfort in our beautifully designed rooms.
          </p>
          <RoomCard rooms={filteredRooms} />
        </div>
      </section>

      <Footer />
    </div>
  );
}
