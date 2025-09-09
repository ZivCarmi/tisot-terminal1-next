import type { Flight, FlightApiResponse, RawFlight } from "../types/flight";

const API_URL =
  "https://data.gov.il/api/3/action/datastore_search?resource_id=e83f763b-b7d7-479e-b172-ae981ddc6de5&limit=32000"; // No pagination at this moment

// Helper: filter for Terminal 1
function filterTerminal1(flights: RawFlight[]): Flight[] {
  const now = new Date();
  const oneHourAgo = new Date(now.getTime() - 60 * 60 * 1000);
  return flights.filter((f) => {
    if (f.CHTERM !== 1) return false;
    const chptolDate = new Date(f.CHPTOL);
    return chptolDate >= oneHourAgo;
  });
}

export async function fetchAllFlights(): Promise<Flight[]> {
  const response = await fetch(API_URL, { cache: "force-cache" });
  if (!response.ok) throw new Error("Failed to fetch flights");
  const data: FlightApiResponse = await response.json();
  return filterTerminal1(data.result.records);
}

export async function fetchDepartures(): Promise<Flight[]> {
  const flights = await fetchAllFlights();
  return flights.filter((f) => f.CHAORD === "D");
}

export async function fetchArrivals(): Promise<Flight[]> {
  const flights = await fetchAllFlights();
  return flights.filter((f) => f.CHAORD === "A");
}

export async function fetchFlightsByDate(date: string): Promise<Flight[]> {
  const flights = await fetchAllFlights();
  return flights.filter((f) => (f.CHSTOL || "").slice(0, 10) === date);
}

export async function fetchFlightsByStatus(status: string): Promise<Flight[]> {
  const flights = await fetchAllFlights();
  return flights.filter(
    (f) => f.CHRMINE.toLowerCase() === status.toLowerCase()
  );
}

export async function fetchFlightsByAirline(
  airline: string
): Promise<Flight[]> {
  const flights = await fetchAllFlights();
  return flights.filter(
    (f) =>
      f.CHOPERD.toLowerCase().includes(airline.toLowerCase()) ||
      f.CHOPER.toLowerCase().includes(airline.toLowerCase())
  );
}
