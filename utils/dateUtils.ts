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

export function getTimeDifference(
  scheduledTime: string,
  actualTime?: string
): number {
  if (!actualTime) return 0;

  try {
    const scheduled = new Date(scheduledTime);
    const actual = new Date(actualTime);
    return Math.round((actual.getTime() - scheduled.getTime()) / (1000 * 60)); // Difference in minutes
  } catch {
    return 0;
  }
}

export function isDelayed(scheduledTime: string, actualTime?: string): boolean {
  return getTimeDifference(scheduledTime, actualTime) > 0;
}

export function getCurrentDate(): string {
  return new Date().toISOString().split("T")[0];
}

export function getDateFromString(dateString: string): Date {
  return new Date(dateString);
}

export function isToday(dateString: string): boolean {
  const today = new Date();
  const date = new Date(dateString);
  return date.toDateString() === today.toDateString();
}

export function isTomorrow(dateString: string): boolean {
  const tomorrow = new Date();
  tomorrow.setDate(tomorrow.getDate() + 1);
  const date = new Date(dateString);
  return date.toDateString() === tomorrow.toDateString();
}
