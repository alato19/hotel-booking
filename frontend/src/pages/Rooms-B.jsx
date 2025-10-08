import { useRoomContext } from "../context/RoomContext";
import NavBar from "../components/NavBar/NavBar";
import optHeaderBackground from "../assets/header.jpg";
import RoomCard from "../components/RoomsCard/index";
import Footer from "../components/Footer/Footer";

export default function Rooms() {
  const { rooms } = useRoomContext();

  return (
    <>
      <div className="position-relative">
        <NavBar />

        {/* Hero section with background */}
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
          <div className="container text-center">
            <h1 className="display-3 fw-bold">Our Rooms</h1>
          </div>
        </section>
      </div>
      <div>
        <div className="container mt-5">
          <RoomCard rooms={rooms} />
        </div>
        <Footer />
      </div>
    </>
  );
}
