import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { Form, Button, Container } from "react-bootstrap";
import NavBar from "../components/NavBar/NavBar";
import Footer from "../components/Footer/Footer";
import optHeaderBackground from "../assets/header.jpg";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { loginUser } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const result = await loginUser(email, password);
      if (result?.role === "admin") {
        navigate("/admin");
      } else {
        navigate("/dashboard");
      }
    } catch (error) {
      alert("Invalid credentials");
    }
  };

  return (
    <div className="position-relative">
      <NavBar />

      <section
        className="text-white d-flex align-items-center"
        style={{
          backgroundImage: `url(${optHeaderBackground})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          height: "50vh",
          width: "100%",
        }}
      >
        <div className="container header text-center">
          <h1 className="display-3 fw-bold">Login or Register</h1>
          <p className="lead text-white">Use the form below</p>
        </div>
      </section>

      <div className="container mt-5" style={{ maxWidth: "400px" }}>
        <h2 className="text-center mb-4">Login</h2>
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
          <Button type="submit" className="w-100" variant="primary">
            Login
          </Button>
        </Form>
        <p className="text-center mt-3">
          Don't have an account? <Link to="/register">Register</Link>
        </p>
      </div>

      <section id="footer">
        <Footer />
      </section>
    </div>
  );
}
