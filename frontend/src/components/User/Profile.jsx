import { Card, Button } from "react-bootstrap";
import { useAuth } from "../../context/AuthContext";

export default function Profile() {
  const { user } = useAuth();

  return (
    <Card className="shadow-sm">
      <Card.Body>
        <Card.Title>Profile</Card.Title>
        <Card.Text>
          <strong>Email:</strong> {user?.email || "guest@paradise.com"}
        </Card.Text>
        <Button variant="primary" disabled>
          Edit Profile (coming soon)
        </Button>
      </Card.Body>
    </Card>
  );
}
