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

  return (
    <div className="position-relative">
      <NavBar />

      <section
        className="text-white d-flex align-items-center position-relative"
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
          <p className="d-flex align-items-center justify-content-center text-white">
            <span className="border-top mx-3" style={{ width: "60px" }}></span>
            Hotels and Resorts
            <span className="border-top mx-3" style={{ width: "60px" }}></span>
          </p>
        </div>

        <div className="container position-absolute top-50 start-50 translate-middle">
          <Form
            className="row g-3 bg-white text-dark p-4 rounded shadow align-items-end"
            onSubmit={(e) => e.preventDefault()}
          >
            <div className="col-md-3">
              <Form.Label className="fw-semibold small text-uppercase text-muted">
                Arrival Date
              </Form.Label>
              <Form.Control
                type="date"
                value={filters.arrival}
                onChange={(e) =>
                  setFilters({ ...filters, arrival: e.target.value })
                }
              />
            </div>

            <div className="col-md-3">
              <Form.Label className="fw-semibold small text-uppercase text-muted">
                Departure Date
              </Form.Label>
              <Form.Control
                type="date"
                value={filters.departure}
                onChange={(e) =>
                  setFilters({ ...filters, departure: e.target.value })
                }
              />
            </div>

            <div className="col-md-2">
              <Form.Label className="fw-semibold small text-uppercase text-muted">
                People
              </Form.Label>
              <Form.Control
                type="number"
                min="1"
                value={filters.people}
                onChange={(e) =>
                  setFilters({ ...filters, people: e.target.value })
                }
              />
            </div>

            <div className="col-md-2 d-flex">
              <Button
                type="submit"
                className="w-100 fw-bold text-uppercase"
                variant="dark"
                style={{ backgroundColor: "#8b6f47", border: "none" }}
              >
                Check Availability
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
