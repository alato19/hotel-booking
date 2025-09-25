const API_BASE = import.meta.env.VITE_API_URL || "http://localhost:3000";

export async function getRooms() {
  const res = await fetch(`${API_BASE}/room/all`);
  if (!res.ok) throw new Error("Failed to load rooms");
  return res.json();
}
