import Logo from "../../assets/sky-logo-header.png";

export default function Footer() {
  return (
    <footer className="bg-dark text-light pt-5 pb-3 mt-5">
      <div className="container">
        <div className="row">
          <div className="col-md-3 mb-4">
            <a
              href="/"
              className="d-flex align-items-center text-light text-decoration-none"
            >
              <img src={Logo} alt="Hotel Paradise Logo" width="120" />
            </a>
          </div>

          <div className="col-md-3 mb-4">
            <ul className="list-unstyled">
              <li>
                <a href="/" className="text-light text-decoration-none">
                  Site Map
                </a>
              </li>
              <li>
                <a href="/" className="text-light text-decoration-none">
                  Term & Conditions
                </a>
              </li>
              <li>
                <a href="/" className="text-light text-decoration-none">
                  Privacy Policy
                </a>
              </li>
              <li>
                <a href="/" className="text-light text-decoration-none">
                  Help
                </a>
              </li>
              <li>
                <a href="/" className="text-light text-decoration-none">
                  Affiliate
                </a>
              </li>
            </ul>
          </div>

          <div className="col-md-3 mb-4">
            <ul className="list-unstyled">
              <li>
                <a href="/" className="text-light text-decoration-none">
                  Our Location
                </a>
              </li>
              <li>
                <a href="/" className="text-light text-decoration-none">
                  Career
                </a>
              </li>
              <li>
                <a href="/" className="text-light text-decoration-none">
                  About Us
                </a>
              </li>
              <li>
                <a href="/" className="text-light text-decoration-none">
                  Contact Us
                </a>
              </li>
            </ul>
          </div>

          <div className="col-md-3 mb-4">
            <ul className="list-unstyled">
              <li>
                <a href="/" className="text-light text-decoration-none">
                  FAQs
                </a>
              </li>
              <li>
                <a href="/" className="text-light text-decoration-none">
                  News
                </a>
              </li>
              <li>
                <a href="/" className="text-light text-decoration-none">
                  Photo & Video
                </a>
              </li>
              <li>
                <a href="/" className="text-light text-decoration-none">
                  Restaurant
                </a>
              </li>
              <li>
                <a href="/" className="text-light text-decoration-none">
                  Gift Card
                </a>
              </li>
            </ul>
          </div>
        </div>

        <hr className="border-secondary" />

        <div className="text-center text-light small">
          &copy; {new Date().getFullYear()} Hotel Paradise
        </div>
      </div>
    </footer>
  );
}
