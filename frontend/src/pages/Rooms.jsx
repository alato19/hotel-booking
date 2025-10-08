import { useRoomContext } from "../context/RoomContext";
import NavBar from "../components/NavBar/NavBar";
import optHeaderBackground from "../assets/header.jpg";
import Footer from "../components/Footer/Footer";
import { FaUsers, FaMoneyBillWave } from "react-icons/fa";
import { Link } from "react-router-dom";
import room1 from "../assets/our-1.jpg";
import room2 from "../assets/our-2.jpg";
import room3 from "../assets/our-3.jpg";
import room4 from "../assets/our-4.jpg";
import room5 from "../assets/our-5.jpg";
import room6 from "../assets/our-6.jpg";

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
            <h1 className="display-3 fw-bold">Our Rooms</h1>
          </div>
        </section>
      </div>

      <div className="container my-5">
        <div className="list-group shadow-sm">
          {rooms.map((room) => (
            <div
              key={room.id}
              className="list-group-item list-group-item-action d-flex align-items-center gap-3 py-4"
            >
              {/* Small thumbnail */}
              <img
                src={roomImages[room.id] || room1}
                alt={room.title}
                className="img-fluid rounded shadow-sm"
                style={{ width: "120px", height: "80px", objectFit: "cover" }}
              />
              {/* Room info */}
              <div className="flex-fill">
                {/* clickable title */}
                <h5 className="mb-1">
                  <Link
                    to={`/rooms/${room.id}`}
                    className="text-decoration-none text-dark fw-bold"
                  >
                    {room.title}
                  </Link>
                </h5>

                <p className="mb-2 text-muted small">{room.description}</p>

                <div className="d-flex gap-3 text-muted small">
                  <span>
                    <FaMoneyBillWave className="me-1 text-success" />
                    {room.price} €/night
                  </span>
                  <span>
                    <FaUsers className="me-1" />
                    {room.maxPeople} guests
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <Footer />
    </>
  );
}
