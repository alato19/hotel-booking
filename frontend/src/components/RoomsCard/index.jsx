import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import { Link } from "react-router-dom";
import room1 from "../../assets/our-1.jpg";
import room2 from "../../assets/our-2.jpg";
import room3 from "../../assets/our-3.jpg";
import room4 from "../../assets/our-4.jpg";
import room5 from "../../assets/our-5.jpg";
import room6 from "../../assets/our-6.jpg";

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
          <Card className="h-100 shadow-sm">
            <img
              src={roomImages[room.id] || room1}
              alt={room.title}
              className="img-fluid rounded shadow-sm"
              style={{ objectFit: "cover" }}
            />
            <Card.Body>
              <Card.Title className="mb-1">{room.title}</Card.Title>

              <div className="text-muted small mb-2">
                Sleeps {room.maxPeople} •{" "}
                {room.hasBalcony ? "Balcony" : "No Balcony"} •{" "}
                {room.oceanView ? "Ocean view" : "City view"}
              </div>

              <Card.Text className="mb-3">{room.description}</Card.Text>

              <div className="d-flex justify-content-between align-items-center">
                <div className="fw-semibold">
                  <span className="text-muted small">
                    {room.price}€ / night
                  </span>
                </div>
                <Button
                  as={Link}
                  to={`/rooms/${room.id}`}
                  variant="outline-primary"
                  size="sm"
                >
                  View details
                </Button>
              </div>
            </Card.Body>
          </Card>
        </div>
      ))}
    </div>
  );
}
