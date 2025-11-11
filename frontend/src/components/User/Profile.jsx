import { Card, Button } from "react-bootstrap";
import { useAuthenticateContext } from "../../context/AuthenticateContext";

export default function Profile() {
  const { authUser } = useAuthenticateContext();

  return (
    <Card className="shadow-sm">
      <Card.Body>
        <Card.Title className="fw-bold mb-3">Profile</Card.Title>

        <Card.Text className="mb-2">
          <strong>First Name:</strong> {authUser?.firstname || "Not provided"}
        </Card.Text>

        <Card.Text className="mb-2">
          <strong>Last Name:</strong> {authUser?.lastname || "Not provided"}
        </Card.Text>

        <Card.Text className="mb-2">
          <strong>Email:</strong> {authUser?.email || "guest@paradise.com"}
        </Card.Text>

        <Card.Text className="mb-2">
          <strong>Role:</strong> {authUser?.role || "user"}
        </Card.Text>

        <Button variant="secondary" disabled className="mt-3">
          Edit Profile (coming soon)
        </Button>
      </Card.Body>
    </Card>
  );
}
