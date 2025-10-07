import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import { Link } from "react-router-dom";

export default function RoomCard({ rooms }) {
  return (
    <div className="row g-4">
      {rooms.map((room) => (
        <div key={room.id} className="col-12 col-md-6 col-lg-4">
          <Card className="h-100 shadow-sm">
            <Card.Img variant="top" alt={room.title} />
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
