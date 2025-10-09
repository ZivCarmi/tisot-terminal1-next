import { DateTime } from "luxon";

export function formatFlightTime(timeString?: string): string {
  if (!timeString) return "N/A";
  try {
    const date = new Date(timeString);
    if (isNaN(date.getTime())) return "N/A";
    return date.toLocaleTimeString("he-IL", {
      hour: "2-digit",
      minute: "2-digit",
      hour12: false,
    });
  } catch {
    return timeString;
  }
}

export function formatFlightDate(dateString?: string): string {
  if (!dateString) return "N/A";
  try {
    const date = new Date(dateString);
    if (isNaN(date.getTime())) return "N/A";
    const day = String(date.getDate()).padStart(2, "0");
    const month = String(date.getMonth() + 1).padStart(2, "0");
    return `${day}/${month}`;
  } catch {
    return dateString;
  }
}

export function parseTimestamp(ts: string) {
  if (!ts) return null;

  let dt = DateTime.fromISO(ts, { zone: "Asia/Jerusalem" });
  if (dt.isValid) return dt;

  dt = DateTime.fromFormat(ts, "yyyy-MM-dd HH:mm:ss", {
    zone: "Asia/Jerusalem",
  });
  if (dt.isValid) return dt;

  console.warn("Unparsable timestamp:", ts);
  return null;
}
