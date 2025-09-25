import { useEffect, useState } from "react";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import { Link } from "react-router-dom";
import { getRooms } from "../../services/rooms";
import roomImg1 from "../../assets/our-1.jpg";

const FALLBACK_IMG = roomImg1;

const fmt = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "EUR",
});

export default function RoomsGrid({ limit = 6 }) {
  const [rooms, setRooms] = useState([]);
  const [loading, setLoading] = useState(true);
  const [err, setErr] = useState("");

  useEffect(() => {
    (async () => {
      try {
        const data = await getRooms();
        // optional: show only published rooms
        setRooms(
          (Array.isArray(data) ? data : []).filter((r) => r.isPublished)
        );
      } catch (e) {
        setErr(e.message || "Could not load rooms");
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  if (loading) return <p className="text-center my-4">Loading rooms…</p>;
  if (err) return <p className="text-danger text-center my-4">{err}</p>;
  if (!rooms.length) return <p className="text-center my-4">No rooms found.</p>;

  const display = rooms.slice(0, limit);

  return (
    <div className="row g-4">
      {display.map((room) => (
        <div key={room.id} className="col-12 col-md-6 col-lg-4">
          <Card className="h-100 shadow-sm">
            <Card.Img variant="top" src={FALLBACK_IMG} alt={room.title} />
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
                  {fmt.format(Number(room.price))}{" "}
                  <span className="text-muted small">/ night</span>
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
