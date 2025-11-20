//RoomDetail.jsx
import axios from "axios";
import { useNavigate, useParams, useLocation, Link } from "react-router-dom";
import { useRoomContext } from "../context/RoomContext";
import { useAuthenticateContext } from "../context/AuthenticateContext";
import { useBookingsContext } from "../context/BookingContext";

import NavBar from "../components/NavBar/NavBar";
import Footer from "../components/Footer/Footer";
import optHeaderBackground from "../assets/header.jpg";
import room1 from "../assets/our-1.jpg";
import room2 from "../assets/our-2.jpg";
import room3 from "../assets/our-3.jpg";
import room4 from "../assets/our-4.jpg";
import room5 from "../assets/our-5.jpg";
import room6 from "../assets/our-6.jpg";
import "./RoomDetail.css";

const roomImages = {
  1: room1,
  2: room2,
  3: room3,
  4: room4,
  5: room5,
  6: room6,
};

export default function RoomDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const { authUser } = useAuthenticateContext();
  const { refreshBookings } = useBookingsContext();
  const { rooms } = useRoomContext();

  const room = rooms.find((room) => room?.id === parseInt(id));

  if (!room) return <p className="text-center mt-5">Room not found</p>;

  const handleBooking = async () => {
    if (!authUser) {
      navigate("/login", { state: { from: location.pathname } });
      return;
    }

    try {
      const res = await axios.post(
        `https://hotel-booking-d4se.onrender.com/bookings`,
        {
          userId: authUser.id,
          roomId: room.id,
        }
      );

      alert(`Booking requested! Waiting for confirmation.`);
      if (typeof refreshBookings === "function") refreshBookings();
    } catch (error) {
      alert("Booking failed. Try again.");
    }
  };

  return (
    <div className="position-relative">
      <NavBar />

      {/* Hero */}
      <section
        className="roomdetail-hero text-white d-flex align-items-center justify-content-center"
        style={{
          backgroundImage: `url(${optHeaderBackground})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div className="text-center">
          <h1 className="fw-bold">{room.title}</h1>
          <p className="lead">
            {room.oceanView ? "Ocean View Experience" : "Comfort & Relaxation"}
          </p>
        </div>
      </section>

      {/* Content */}
      <div className="container py-5">
        <div className="row g-4">
          {/* Room Image */}
          <div className="col-lg-7">
            <img
              src={roomImages[room.id] || room1}
              alt={room.title}
              className="img-fluid rounded shadow-sm roomdetail-img"
            />
          </div>

          {/* Room Info */}
          <div className="col-lg-5">
            <h3 className="fw-bold text-primary mb-3">Room Information</h3>
            <p className="mb-4">{room.description}</p>

            <ul className="room-info-list list-group mb-4">
              <li className="list-group-item">
                <strong>Price:</strong> {room.price} € / night
              </li>
              <li className="list-group-item">
                <strong>Max People:</strong> {room.maxPeople}
              </li>
              <li className="list-group-item">
                <strong>Balcony:</strong> {room.hasBalcony ? "Yes" : "No"}
              </li>
              <li className="list-group-item">
                <strong>Ocean View:</strong> {room.oceanView ? "Yes" : "No"}
              </li>
              <li className="list-group-item">
                <strong>Availability:</strong> {room.availableFrom || "-"} →{" "}
                {room.availableTo || "-"}
              </li>
            </ul>

            {/* Booking Button */}
            {!authUser ? (
              <Link
                to="/login"
                state={{ from: location.pathname }}
                className="btn btn-primary btn-lg w-100 fw-bold"
              >
                Login to Book
              </Link>
            ) : (
              <button
                onClick={handleBooking}
                className="btn btn-primary btn-lg w-100 fw-bold"
                disabled={room.isBooked}
              >
                {room.isBooked ? "Currently Unavailable" : "Book Now"}
              </button>
            )}
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}
