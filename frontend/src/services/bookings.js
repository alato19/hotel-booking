const API_BASE = "http://localhost:3000";

export async function get_bookings_services(userId) {
  if (!userId) throw new Error("userId is required to fetch bookings");

  const res = await fetch(`${API_BASE}/bookings/by-user/${userId}`, {
    credentials: "include",
  });

  if (!res.ok) throw new Error("Failed to load bookings");
  return res.json();
}

export async function get_all_bookings_services() {
  const res = await fetch(`${API_BASE}/bookings/all`, {
    credentials: "include",
  });

  if (!res.ok) throw new Error("Failed to load all bookings");
  return res.json();
}
