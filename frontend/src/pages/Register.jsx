import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { Form, Button, Container } from "react-bootstrap";

export default function Register() {
  const { registerUser } = useAuth();
  const navigate = useNavigate();
  const [values, setValues] = useState({
    firstname: "",
    lastname: "",
    email: "",
    password: "",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    await registerUser(values);
    navigate("/login");
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setValues(() => {
      return {
        ...values,
        [name]: value,
      };
    });
  };

  return (
    <Container className="mt-5" style={{ maxWidth: "400px" }}>
      <h2 className="text-center mb-4">Create Account</h2>
      <Form onSubmit={handleSubmit}>
        <Form.Group className="mb-3" controlId="first_name">
          <Form.Label>Firstname</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter firstname"
            value={values.firstname}
            onChange={handleChange}
            name="firstname"
            required
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="last_name">
          <Form.Label>Lastname</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter firstname"
            value={values.lastname}
            onChange={handleChange}
            name="lastname"
            required
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="email_field">
          <Form.Label>Email</Form.Label>
          <Form.Control
            type="email"
            placeholder="Enter email"
            value={values.email}
            onChange={handleChange}
            name="email"
            required
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="password_field">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            placeholder="Enter password"
            value={values.password}
            onChange={handleChange}
            name="password"
            required
          />
        </Form.Group>

        <button className="btn btn-primary" type="submit">
          Submit
        </button>
      </Form>
    </Container>
  );
}
