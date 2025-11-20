import Logo from "../../assets/sky-logo-header.png";
import { FaFacebookF, FaInstagram, FaTripadvisor } from "react-icons/fa";
import "./Footer.css";

export default function Footer() {
  return (
    <footer className="footer mt-5">
      <div className="container py-5">
        <div className="row gy-4">
          {/* Logo + short text */}
          <div className="col-md-3">
            <img
              src={Logo}
              alt="Hotel Paradise Logo"
              className="footer-logo mb-3"
            />
            <p className="small text-muted">
              Experience luxury and comfort at Hotel Paradise.
            </p>
          </div>

          {/* Useful links */}
          <div className="col-6 col-md-3">
            <h6 className="fw-bold text-uppercase footer-title">Explore</h6>
            <ul className="list-unstyled footer-links">
              <li>
                <a href="/rooms">Rooms</a>
              </li>
              <li>
                <a href="/contact">Contact Us</a>
              </li>
              <li>
                <a href="/login">Login</a>
              </li>
              <li>
                <a href="/register">Create Account</a>
              </li>
            </ul>
          </div>

          {/* Legal */}
          <div className="col-6 col-md-3">
            <h6 className="fw-bold text-uppercase footer-title">Legal</h6>
            <ul className="list-unstyled footer-links">
              <li>
                <a href="/">Terms & Conditions</a>
              </li>
              <li>
                <a href="/">Privacy Policy</a>
              </li>
              <li>
                <a href="/">FAQ</a>
              </li>
            </ul>
          </div>

          {/* Socials */}
          <div className="col-md-3">
            <h6 className="fw-bold text-uppercase footer-title">Follow Us</h6>
            <div className="d-flex gap-3 fs-4 mt-2">
              <a href="#" aria-label="Instagram">
                <FaInstagram />
              </a>
              <a href="#" aria-label="Facebook">
                <FaFacebookF />
              </a>
              <a href="#" aria-label="Tripadvisor">
                <FaTripadvisor />
              </a>
            </div>
          </div>
        </div>

        <div className="footer-bottom text-center mt-4">
          <small className="text-muted">
            &copy; {new Date().getFullYear()} Hotel Paradise. All rights
            reserved.
          </small>
        </div>
      </div>
    </footer>
  );
}
