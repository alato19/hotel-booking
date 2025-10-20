import { useRoomContext } from "../context/RoomContext.jsx";
import headerBackground from "../assets/Slider-v1.jpg";
import NavBar from "../components/NavBar/NavBar";
import "bootstrap/dist/css/bootstrap.min.css";
import "../pages/Home.css";
import icon from "../assets/icon-our.png";
import RoomCard from "../components/RoomsCard";
import Footer from "../components/Footer/Footer";
import { useState } from "react";
import { Form, Button } from "react-bootstrap";
import "@fortawesome/fontawesome-free/css/all.min.css";

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
    const results = applyFilters(rooms);
    setFilteredRooms(results);
  };

  const handleReset = () => {
    setFilters({ arrival: "", departure: "", people: 1 });
    setFilteredRooms(rooms);
  };

  return (
    <div className="position-relative">
      <NavBar />

      <section
        className="text-white d-flex flex-column justify-content-center align-items-center text-center"
        style={{
          backgroundImage: `url(${headerBackground})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          height: "100vh",
          width: "100%",
        }}
      >
        <div className="container header">
          <h1 className="display-3 fw-bold">Welcome to Paradise</h1>
          <p className="lead text-white">Hotels and Resorts</p>
        </div>

        <div className="container">
          <Form
            className="row g-0 justify-content-center shadow"
            onSubmit={handleSubmit}
          >
            {/* Arrival Date */}
            <div className="col-md-3 p-3 bg-white border">
              <Form.Label className="fw-semibold small text-uppercase text-muted">
                Arrival Date
              </Form.Label>
              <div className="input-group">
                <Form.Control
                  type="date"
                  value={filters.arrival}
                  onChange={(e) =>
                    setFilters({ ...filters, arrival: e.target.value })
                  }
                  className="border-0 fs-4 fw-light text-center"
                />
                <span className="input-group-text bg-white border-0">
                  <i className="fas fa-calendar-alt text-muted"></i>
                </span>
              </div>
            </div>

            {/* Departure Date */}
            <div className="col-md-3 p-3 bg-white border">
              <Form.Label className="fw-semibold small text-uppercase text-muted">
                Departure Date
              </Form.Label>
              <div className="input-group">
                <Form.Control
                  type="date"
                  value={filters.departure}
                  onChange={(e) =>
                    setFilters({ ...filters, departure: e.target.value })
                  }
                  className="border-0 fs-4 fw-light text-center"
                />
                <span className="input-group-text bg-white border-0">
                  <i className="fas fa-calendar-check text-muted"></i>
                </span>
              </div>
            </div>

            {/* People */}
            <div className="col-md-2 p-3 bg-white border">
              <Form.Label className="fw-semibold small text-uppercase text-muted">
                People
              </Form.Label>
              <div className="input-group">
                <Form.Control
                  type="number"
                  min="1"
                  value={filters.people}
                  onChange={(e) =>
                    setFilters({ ...filters, people: e.target.value })
                  }
                  className="border-0 fs-4 fw-light text-center"
                />
                <span className="input-group-text bg-white border-0">
                  <i className="fas fa-user text-muted"></i>
                </span>
              </div>
            </div>

            {/* Check Availability */}
            <div className="col-md-2 p-3 d-flex align-items-center justify-content-center">
              <Button
                type="submit"
                className="w-100 fw-bold text-uppercase"
                style={{ backgroundColor: "#8b6f47", border: "none" }}
              >
                Check Availability
              </Button>
            </div>

            {/* Reset */}
            <div className="col-md-2 p-3 d-flex align-items-center justify-content-center">
              <Button
                type="button"
                onClick={handleReset}
                className="w-100 fw-bold text-uppercase"
                style={{
                  backgroundColor: "#ccc",
                  border: "none",
                  color: "#333",
                }}
              >
                Reset
              </Button>
            </div>
          </Form>
        </div>
      </section>

      <section id="ourRooms">
        <div className="container">
          <h2>Our Rooms</h2>
          <div>
            {" "}
            <img className="iconDivider" src={icon} />
          </div>
          <p>
            When you host a party or family reunion, the special celebrations
            let you streng then bonds with
          </p>

          <RoomCard rooms={filteredRooms} />
        </div>
      </section>

      <section id="footer">
        <Footer />
      </section>
    </div>
  );
}
