import { Link, NavLink, Outlet } from "react-router-dom";

export default function MainLayout () {
  return (
    <div>
      <header className="border-bottom">
        <nav className="container d-flex align-items-center justify-content-between py-3">
          <Link to="/" className="text-decoration-none h5 m-0">Hotel</Link>
          <div className="d-flex ms-3 gap-3">
            <NavLink to="/rooms" className="text-decoration-none">Rooms</NavLink>
            <NavLink to="/bookings" className="text-decoration-none">My Bookings</NavLink>
            <NavLink to="/admin" className="text-decoration-none">Admin</NavLink>
            <NavLink to="/login" className="text-decoration-none">Login</NavLink>
          </div>
        </nav>
      </header>

      <main className="container py-4">
        <Outlet />
      </main>

      <footer className="border-top">
        <div className="container py-4 small text-muted">
          © {new Date().getFullYear()} Hotel Paradise
        </div>
      </footer>
    </div>
  );
}