const API_BASE = "http://localhost:3000";

export async function get_rooms_services() {
  const res = await fetch(`${API_BASE}/room/all`);
  if (!res.ok) throw new Error("Failed to load rooms");
  return res.json();
}
