import axios from "axios";
import { AuthProvider } from "./context/AuthContext.jsx";
import { RoomProvider } from "./context/RoomContext.jsx";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Home from "./pages/Home";
import Rooms from "./pages/Rooms-A.jsx";
import RoomDetail from "./pages/RoomDetail";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Book from "./pages/Book";
import Contact from "./pages/Contact.jsx";
import AdminDashboard from "./pages/AdminDashboard";
import Dashboard from "./pages/UserDashboard.jsx";
import Profile from "./components/User/Profile.jsx";
import MyBookings from "./components/User/MyBookings.jsx";
import Support from "./components/User/Support.jsx";

axios.defaults.withCredentials = true;
export default function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <RoomProvider>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/rooms" element={<Rooms />} />
            <Route path="/rooms/:id" element={<RoomDetail />} />
            <Route path="/book" element={<Book />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/admin" element={<AdminDashboard />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route index element={<Profile />} />
            <Route path="profile" element={<Profile />} />
            <Route path="bookings" element={<MyBookings />} />
            <Route path="support" element={<Support />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
          </Routes>
        </RoomProvider>
      </AuthProvider>
    </BrowserRouter>
  );
}
