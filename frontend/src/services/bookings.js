const API_BASE = "http://localhost:3000";

export async function get_bookings_services() {
  const res = await fetch(`${API_BASE}/bookings/me`, {
    credentials: "include",
  });
  if (!res.ok) throw new Error("Failed to load bookings");
  return res.json();
}
