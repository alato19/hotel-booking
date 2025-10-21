import { Form, Button, Alert } from "react-bootstrap";
import { useState } from "react";

export default function Support() {
  const [sent, setSent] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setSent(true);
  };

  return (
    <>
      <h3 className="mb-4">Contact Support</h3>
      {sent && (
        <Alert variant="success">Message sent! We'll get back soon.</Alert>
      )}
      <Form onSubmit={handleSubmit} style={{ maxWidth: "500px" }}>
        <Form.Group className="mb-3">
          <Form.Label>Your Message</Form.Label>
          <Form.Control
            as="textarea"
            rows={4}
            placeholder="Type your message..."
            required
          />
        </Form.Group>
        <Button variant="primary" type="submit">
          Send
        </Button>
      </Form>
    </>
  );
}
