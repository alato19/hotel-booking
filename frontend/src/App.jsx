import axios from "axios";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import { AuthenticateProvider } from "./context/AuthenticateContext.jsx";
import { RoomProvider } from "./context/RoomContext.jsx";
import { BookingsProvider } from "./context/BookingContext.jsx";

import AdminRoute from "./components/AdminRoute/index.jsx";
import AuthUserRoute from "./components/AuthUserRoute/index.jsx";

import Home from "./pages/Home";
import Rooms from "./pages/Rooms-A.jsx";
import RoomDetail from "./pages/RoomDetail";
import Login from "./pages/Login";
import Register from "./pages/Register";
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
      <AuthenticateProvider>
        <BookingsProvider>
          <RoomProvider>
            <Routes>
              {/* Public routes */}
              <Route path="/" element={<Home />} />
              <Route path="/rooms" element={<Rooms />} />
              <Route path="/rooms/:id" element={<RoomDetail />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />

              {/* Protected user routes */}
              <Route
                path="/dashboard"
                element={
                  <AuthUserRoute>
                    <Dashboard />
                  </AuthUserRoute>
                }
              />
              <Route
                path="/profile"
                element={
                  <AuthUserRoute>
                    <Profile />
                  </AuthUserRoute>
                }
              />
              <Route
                path="/bookings"
                element={
                  <AuthUserRoute>
                    <MyBookings />
                  </AuthUserRoute>
                }
              />
              <Route
                path="/support"
                element={
                  <AuthUserRoute>
                    <Support />
                  </AuthUserRoute>
                }
              />

              {/* Protected admin route */}
              <Route
                path="/admin"
                element={
                  <AdminRoute>
                    <AdminDashboard />
                  </AdminRoute>
                }
              />
            </Routes>
          </RoomProvider>
        </BookingsProvider>
      </AuthenticateProvider>
    </BrowserRouter>
  );
}
