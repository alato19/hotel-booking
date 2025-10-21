import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import { useRoomContext } from "../context/RoomContext";
import { useAuth } from "../context/AuthContext";
import NavBar from "../components/NavBar/NavBar";
import Footer from "../components/Footer/Footer";
import optHeaderBackground from "../assets/header.jpg";
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

const handleBooking = async () => {
  if (!user) {
    navigate("/login");
    return;
  }
  try {
    const res = await axios.post(`http://localhost:3000/booking`, {
      userId: user.id,
      roomId: room.id,
    });
    alert(`Booking successful! ID: ${res.data.id}`);
    console.log("Booking result:", res.data);
  } catch (error) {
    console.error("Booking error:", error.response?.data || error.message);
    alert("Booking failed, please try again.");
  }
};

export default function RoomDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();
  const { rooms } = useRoomContext();
  const room = rooms.find((room) => room?.id === parseInt(id));

  if (!room) return <p className="text-center mt-5">Room not found</p>;

  const handleBooking = async () => {
    if (!user) {
      navigate("/login");
      return;
    }

    try {
      const res = await axios.post(`http://localhost:3000/booking`, {
        userId: user.id,
        roomId: room.id,
      });

      alert(`Booking confirmed for ${room.title}!`);
      console.log("Booking result:", res.data);
    } catch (error) {
      console.error("Booking error:", error.response?.data || error.message);
      alert("Booking failed. Please try again.");
    }
  };

  return (
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
          <h1 className="display-3 fw-bold mt-5">{room.title}</h1>
          <p className="lead text-white">
            {room.oceanView ? "Ocean View" : "Comfort & Relaxation"}
          </p>
        </div>
      </section>

      {/* Room details section */}
      <div className="container py-5">
        <div className="row">
          {/* Left column: image */}
          <div className="col-lg-7 mb-4">
            <img
              src={roomImages[room.id] || room1}
              alt={room.title}
              className="img-fluid rounded shadow-sm"
            />
          </div>

          {/* Right column: details */}
          <div className="col-lg-5">
            <h2 className="fw-bold mb-3">Room Information</h2>
            <p className="mb-4">{room.description}</p>

            <ul className="list-group list-group-flush mb-4">
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
                <strong>Booked:</strong> {room.isBooked ? "Yes" : "No"}
              </li>
              <li className="list-group-item">
                <strong>Available:</strong> {room.availableFrom || "-"} →{" "}
                {room.availableTo || "-"}
              </li>
            </ul>

            <button
              onClick={handleBooking}
              className="btn btn-lg w-100 fw-bold"
              style={{ backgroundColor: "#8b6f47", color: "white" }}
              disabled={!user || room.isBooked}
            >
              {!user
                ? "Login to Book"
                : room.isBooked
                ? "Currently Unavailable"
                : "Book Now"}
            </button>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}
