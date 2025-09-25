import headerBackground from "../assets/Slider-v1.jpg";
import NavBar from "../components/NavBar/NavBar";
import "bootstrap/dist/css/bootstrap.min.css";
import "../pages/Home.css";
import icon from "../assets/icon-our.png";
import RoomsGrid from "../components/RoomsGrid/RoomsGrid";
import Footer from "../components/Footer/Footer";

export default function Home() {
  return (
    <div className="position-relative">
      <NavBar />

      <section
        className="text-white d-flex align-items-center"
        style={{
          backgroundImage: `url(${headerBackground})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          height: "100vh",
          width: "100%",
        }}
      >
        <div className="container header">
          <h1 className="display-3 fw-bold">Welcome to Paradise</h1>
          <p className="d-flex align-items-center justify-content-center text-white">
            <span className="border-top mx-3" style={{ width: "60px" }}></span>
            Hotels and Resorts
            <span className="border-top mx-3" style={{ width: "60px" }}></span>
          </p>
        </div>
      </section>

      <section id="ourRooms">
        <div className="container">
          <h2>Our Rooms</h2>
          <div>
            {" "}
            <img className="iconDivider" src={icon} />
          </div>
          <p>
            When you host a party or family reunion, the special celebrations
            let you streng then bonds with
          </p>

          <RoomsGrid limit={6} />
        </div>
      </section>

      <section id="footer">
        <Footer />
      </section>
    </div>
  );
}
