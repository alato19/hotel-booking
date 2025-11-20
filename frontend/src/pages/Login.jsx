//Login.jsx
import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { Form, Button, Card } from "react-bootstrap";
import { useAuthenticateContext } from "../context/AuthenticateContext";

import NavBar from "../components/NavBar/NavBar";
import Footer from "../components/Footer/Footer";
import optHeaderBackground from "../assets/header.jpg";
import "./Login.css";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { login } = useAuthenticateContext();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const result = await login({ email, password });

      if (result?.role === "admin") navigate("/admin");
      else if (result?.role === "user") navigate("/dashboard");
      else navigate("/");
    } catch (error) {
      alert("Invalid credentials or server error.");
    }
  };

  return (
    <div className="position-relative">
      <NavBar />

      {/* Hero */}
      <section
        className="login-hero text-white d-flex align-items-center justify-content-center text-center"
        style={{
          backgroundImage: `url(${optHeaderBackground})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div>
          <h1 className="fw-bold">Login or Register</h1>
          <p className="lead">Access your account and start booking</p>
        </div>
      </section>

      {/* Form */}
      <div className="container py-5 d-flex justify-content-center">
        <Card className="shadow-sm p-4 login-card">
          <h3 className="fw-bold text-center mb-4 text-primary">Login</h3>

          <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3">
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="email"
                placeholder="Enter email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                placeholder="Enter password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </Form.Group>

            <Button
              type="submit"
              variant="primary"
              className="w-100 fw-semibold"
            >
              Login
            </Button>
          </Form>

          <p className="text-center mt-3 small">
            Don’t have an account?{" "}
            <Link to="/register" className="fw-bold text-primary">
              Register
            </Link>
          </p>
        </Card>
      </div>

      <Footer />
    </div>
  );
}
