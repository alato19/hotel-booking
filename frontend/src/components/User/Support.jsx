import { Form, Button, Alert, Spinner } from "react-bootstrap";
import { useState } from "react";
import { useAuthenticateContext } from "../../context/AuthenticateContext";
import "./Support.css";

export default function Support() {
  const { authUser } = useAuthenticateContext();
  const [form, setForm] = useState({ subject: "", message: "" });
  const [sent, setSent] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      // (Later: send to backend via API)
      console.log("Support message:", { ...form, user: authUser?.email });
      await new Promise((resolve) => setTimeout(resolve, 800)); // simulate delay
      setSent(true);
      setForm({ subject: "", message: "" });
    } catch (error) {
      console.error("Support form error:", error);
    } finally {
      setLoading(false);
    }
  };

  <div className="support-wrapper">
    <h3 className="text-primary fw-bold mb-4">Contact Support</h3>

    {sent && (
      <Alert
        variant="success"
        onClose={() => setSent(false)}
        dismissible
        className="shadow-sm"
      >
        Message sent successfully! Our team will get back to you soon.
      </Alert>
    )}

    <Form onSubmit={handleSubmit}>
      <Form.Group className="mb-3">
        <Form.Label>Subject</Form.Label>
        <Form.Control
          type="text"
          name="subject"
          placeholder="Enter subject"
          value={form.subject}
          onChange={handleChange}
          required
        />
      </Form.Group>

      <Form.Group className="mb-3">
        <Form.Label>Your Message</Form.Label>
        <Form.Control
          as="textarea"
          rows={4}
          name="message"
          placeholder="Type your message..."
          value={form.message}
          onChange={handleChange}
          required
        />
      </Form.Group>

      <Button type="submit" variant="primary" disabled={loading}>
        {loading ? (
          <>
            <Spinner
              as="span"
              animation="border"
              size="sm"
              role="status"
              aria-hidden="true"
              className="me-2"
            />
            Sending...
          </>
        ) : (
          "Send Message"
        )}
      </Button>
    </Form>
  </div>;
}
