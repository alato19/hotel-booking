//Register.jsx
import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { Form, Button, Card } from "react-bootstrap";
import { useAuthenticateContext } from "../context/AuthenticateContext";

import NavBar from "../components/NavBar/NavBar";
import Footer from "../components/Footer/Footer";
import optHeaderBackground from "../assets/header.jpg";
import "./Register.css";

export default function Register() {
  const { register } = useAuthenticateContext();
  const navigate = useNavigate();

  const [values, setValues] = useState({
    firstname: "",
    lastname: "",
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setValues((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const result = await register(values);
      if (result) {
        alert("Account created successfully! You can now log in.");
        navigate("/login");
      }
    } catch {
      alert("Registration failed. Try again.");
    }
  };

  return (
    <div className="position-relative">
      <NavBar />

      {/* Hero */}
      <section
        className="register-hero text-white d-flex align-items-center justify-content-center text-center"
        style={{
          backgroundImage: `url(${optHeaderBackground})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div>
          <h1 className="fw-bold">Create Your Account</h1>
          <p className="lead">Complete the form below to get started</p>
        </div>
      </section>

      {/* Form */}
      <div className="container py-5 d-flex justify-content-center">
        <Card className="shadow-sm p-4 register-card">
          <h3 className="fw-bold text-center text-primary mb-4">Register</h3>

          <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3">
              <Form.Label>First Name</Form.Label>
              <Form.Control
                type="text"
                name="firstname"
                placeholder="Enter first name"
                value={values.firstname}
                onChange={handleChange}
                required
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Last Name</Form.Label>
              <Form.Control
                type="text"
                name="lastname"
                placeholder="Enter last name"
                value={values.lastname}
                onChange={handleChange}
                required
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="email"
                name="email"
                placeholder="Enter email"
                value={values.email}
                onChange={handleChange}
                required
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                name="password"
                placeholder="Enter password"
                value={values.password}
                onChange={handleChange}
                required
              />
            </Form.Group>

            <Button
              type="submit"
              className="w-100 fw-semibold"
              variant="primary"
            >
              Register
            </Button>
          </Form>

          <p className="text-center small mt-3">
            Already have an account?{" "}
            <Link to="/login" className="fw-bold text-primary">
              Login
            </Link>
          </p>
        </Card>
      </div>

      <Footer />
    </div>
  );
}
