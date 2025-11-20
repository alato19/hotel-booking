const API_BASE = "https://hotel-booking-d4se.onrender.com";

export async function get_rooms_services() {
  const res = await fetch(`${API_BASE}/room/all`);
  if (!res.ok) throw new Error("Failed to load rooms");
  return res.json();
}
