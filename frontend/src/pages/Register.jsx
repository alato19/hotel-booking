import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { Form, Button, Container } from "react-bootstrap";
import NavBar from "../components/NavBar/NavBar";
import Footer from "../components/Footer/Footer";
import optHeaderBackground from "../assets/header.jpg";

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
      </div>

      <section id="footer">
        <Footer />
      </section>
    </div>
  );
}
