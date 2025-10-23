const API_BASE = "http://localhost:3000";

export async function get_bookings_services(userId) {
  if (!userId) throw new Error("userId is required to fetch bookings");

  const res = await fetch(`${API_BASE}/bookings/by-user/${userId}`, {
    credentials: "include",
  });

  if (!res.ok) throw new Error("Failed to load bookings");
  return res.json();
}
