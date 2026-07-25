const STORAGE_KEY = "uru-bookings";
export const OPEN_HOUR = 10;
export const LAST_START_HOUR = 18;
export const CLOSED_WEEKDAY = 1; // 0=日,1=月,...
export const WEEKDAY_LABELS = ["日", "月", "火", "水", "木", "金", "土"];

export function getBookings() {
  try {
    return JSON.parse(localStorage.getItem(STORAGE_KEY)) || [];
  } catch {
    return [];
  }
}

export function saveBooking(entry) {
  const bookings = getBookings();
  bookings.push(entry);
  localStorage.setItem(STORAGE_KEY, JSON.stringify(bookings));
}

export function deleteBooking(id) {
  const remaining = getBookings().filter((b) => b.id !== id);
  localStorage.setItem(STORAGE_KEY, JSON.stringify(remaining));
}

export function toDateKey(date) {
  const y = date.getFullYear();
  const m = String(date.getMonth() + 1).padStart(2, "0");
  const d = String(date.getDate()).padStart(2, "0");
  return `${y}-${m}-${d}`;
}

export function timeSlotsForDate(dateKey) {
  const slots = [];
  for (let h = OPEN_HOUR; h <= LAST_START_HOUR; h++) {
    slots.push(`${String(h).padStart(2, "0")}:00`);
  }
  const booked = getBookings()
    .filter((b) => b.date === dateKey)
    .map((b) => b.time);
  return slots.map((time) => ({ time, booked: booked.includes(time) }));
}
