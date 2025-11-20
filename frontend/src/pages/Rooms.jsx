//Rooms.jsx
import { useRoomContext } from "../context/RoomContext";
import NavBar from "../components/NavBar/NavBar";
import optHeaderBackground from "../assets/header.jpg";
import Footer from "../components/Footer/Footer";
import { Link } from "react-router-dom";
import room1 from "../assets/our-1.jpg";
import room2 from "../assets/our-2.jpg";
import room3 from "../assets/our-3.jpg";
import room4 from "../assets/our-4.jpg";
import room5 from "../assets/our-5.jpg";
import room6 from "../assets/our-6.jpg";
import "./Rooms.css";

const roomImages = {
  1: room1,
  2: room2,
  3: room3,
  4: room4,
  5: room5,
  6: room6,
};

export default function Rooms() {
  const { rooms } = useRoomContext();

  return (
    <div className="position-relative">
      <NavBar />

      {/* Hero banner */}
      <section
        className="rooms-hero text-white d-flex align-items-center justify-content-center text-center"
        style={{
          backgroundImage: `url(${optHeaderBackground})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <h1 className="fw-bold">Our Rooms</h1>
      </section>

      {/* Room list */}
      <div className="container py-5">
        <div className="list-group shadow-sm">
          {rooms.map((room) => (
            <Link
              to={`/rooms/${room.id}`}
              key={room.id}
              className="list-group-item list-group-item-action py-4 room-item d-flex align-items-center"
            >
              {/* Thumbnail */}
              <img
                src={roomImages[room.id] || room1}
                alt={room.title}
                className="room-thumb rounded"
              />

              {/* Info */}
              <div className="flex-fill">
                <h5 className="fw-bold room-title mb-1">{room.title}</h5>
                <p className="mb-2 small text-muted">{room.description}</p>

                <div className="room-meta">
                  <span className="price fw-semibold text-primary">
                    {room.price} € / night
                  </span>
                  <span className="guests text-muted">
                    | {room.maxPeople} guests
                  </span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>

      <Footer />
    </div>
  );
}
