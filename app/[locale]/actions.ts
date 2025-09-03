"use server";

import type {
  FetchFlightsResult,
  Flight,
  FlightApiResponse,
  RawFlight,
} from "@/types/flight";
import { DateTime } from "luxon";

const API_URL =
  "https://data.gov.il/api/3/action/datastore_search?resource_id=e83f763b-b7d7-479e-b172-ae981ddc6de5&limit=32000"; // No pagination at this moment

// Helper: filter for Terminal 1
function filterTerminal1(flights: RawFlight[]): Flight[] {
  const israelNow = DateTime.now().setZone("Asia/Jerusalem");
  const oneHourAgo = israelNow.minus({ hours: 1 });

  return flights.filter((f) => {
    if (f.CHTERM !== 1) return false;
    const flightTime = DateTime.fromISO(f.CHPTOL, { zone: "Asia/Jerusalem" });
    return flightTime >= oneHourAgo;
  });
}

export async function fetchAllFlights(): Promise<FetchFlightsResult> {
  const response = await fetch(API_URL, {
    cache: "force-cache",
    next: { tags: ["flights"] },
  });
  if (!response.ok) throw new Error("Failed to fetch flights");
  const data: FlightApiResponse = await response.json();
  return filterTerminal1(data.result.records);
}

export async function fetchDepartures(): Promise<FetchFlightsResult> {
  const flights = await fetchAllFlights();
  return flights.filter((f) => f.CHAORD === "D");
}

export async function fetchArrivals(): Promise<FetchFlightsResult> {
  const flights = await fetchAllFlights();
  return flights.filter((f) => f.CHAORD === "A");
}

export async function fetchFlightsByDate(
  date: string
): Promise<FetchFlightsResult> {
  const flights = await fetchAllFlights();
  return flights.filter((f) => (f.CHSTOL || "").slice(0, 10) === date);
}

export async function fetchFlightsByStatus(
  status: string
): Promise<FetchFlightsResult> {
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

export async function fetchFlightStats(): Promise<{
  total_flights: number;
  departures: number;
  arrivals: number;
  delayed_flights: number;
  cancelled_flights: number;
}> {
  try {
    const response = await fetch(`http://localhost:3001/api/flights/stats`);

    if (!response.ok) {
      throw new Error(
        `Failed to fetch flight stats: ${response.status} ${response.statusText}`
      );
    }

    const data = await response.json();
    return data.data;
  } catch (error) {
    console.error("Error fetching flight stats:", error);
    throw error;
  }
}
