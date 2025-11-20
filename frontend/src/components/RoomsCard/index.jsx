//index.jsx
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import { Link } from "react-router-dom";
import room1 from "../../assets/our-1.jpg";
import room2 from "../../assets/our-2.jpg";
import room3 from "../../assets/our-3.jpg";
import room4 from "../../assets/our-4.jpg";
import room5 from "../../assets/our-5.jpg";
import room6 from "../../assets/our-6.jpg";
import "./RoomCard.css";

const roomImages = {
  1: room1,
  2: room2,
  3: room3,
  4: room4,
  5: room5,
  6: room6,
};

export default function RoomCard({ rooms }) {
  return (
    <div className="row g-4">
      {rooms.map((room) => (
        <div key={room.id} className="col-12 col-md-6 col-lg-4">
          <Card className="room-card h-100 border-0 shadow-sm">
            <img
              src={roomImages[room.id] || room1}
              alt={room.title}
              className="img-fluid room-card-image"
            />

            <Card.Body>
              <Card.Title className="fw-bold text-dark mb-2">
                {room.title}
              </Card.Title>

              <small className="text-muted d-block mb-2">
                Sleeps {room.maxPeople} •{" "}
                {room.hasBalcony ? "Balcony" : "No Balcony"} •{" "}
                {room.oceanView ? "Ocean view" : "City view"}
              </small>

              <Card.Text className="text-muted room-description mb-3">
                {room.description}
              </Card.Text>

              <div className="d-flex justify-content-between align-items-center">
                <span className="fw-semibold text-primary">
                  {room.price}€ / night
                </span>

                <Button
                  as={Link}
                  to={`/rooms/${room.id}`}
                  variant="primary"
                  size="sm"
                  className="fw-semibold"
                >
                  View Details
                </Button>
              </div>
            </Card.Body>
          </Card>
        </div>
      ))}
    </div>
  );
}
