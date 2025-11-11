import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { Form, Button } from "react-bootstrap";
import { useAuthenticateContext } from "../context/AuthenticateContext";

import NavBar from "../components/NavBar/NavBar";
import Footer from "../components/Footer/Footer";
import optHeaderBackground from "../assets/header.jpg";

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
    } catch (error) {
      console.error("Registration error:", error);
      alert(
        "Registration failed. Please check your information and try again."
      );
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
          <h1 className="display-3 fw-bold">Create your account</h1>
          <p className="lead text-white">Use the form below</p>
        </div>
      </section>

      <div className="container mt-5" style={{ maxWidth: "400px" }}>
        <h2 className="text-center mb-4">Create Account</h2>
        <Form onSubmit={handleSubmit}>
          <Form.Group className="mb-3" controlId="first_name">
            <Form.Label>Firstname</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter firstname"
              name="firstname"
              value={values.firstname}
              onChange={handleChange}
              required
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="last_name">
            <Form.Label>Lastname</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter lastname"
              name="lastname"
              value={values.lastname}
              onChange={handleChange}
              required
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="email_field">
            <Form.Label>Email</Form.Label>
            <Form.Control
              type="email"
              placeholder="Enter email"
              name="email"
              value={values.email}
              onChange={handleChange}
              required
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="password_field">
            <Form.Label>Password</Form.Label>
            <Form.Control
              type="password"
              placeholder="Enter password"
              name="password"
              value={values.password}
              onChange={handleChange}
              required
            />
          </Form.Group>

          <Button type="submit" variant="primary" className="w-100">
            Register
          </Button>
        </Form>

        <p className="text-center mt-3">
          Already have an account? <Link to="/login">Login</Link>
        </p>
      </div>

      <section id="footer">
        <Footer />
      </section>
    </div>
  );
}
