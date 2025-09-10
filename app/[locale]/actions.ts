"use server";

import type {
  Flight,
  FlightApiResponse,
  FlightsData,
  FlightsJsonData,
  RawFlight,
} from "@/types/flight";
import fs from "fs/promises";
import { DateTime } from "luxon";
import path from "path";

const API_URL =
  "https://data.gov.il/api/3/action/datastore_search?resource_id=e83f763b-b7d7-479e-b172-ae981ddc6de5&limit=32000"; // No pagination at this moment
const flightsJsonPath = path.join(process.cwd(), "data", "flights.json");

// Helper: filter for Terminal 1
function filterTerminal1(flights: RawFlight[]): Flight[] {
  const israelNow = DateTime.now().setZone("Asia/Jerusalem");
  const oneHourAgo = israelNow.minus({ hours: 1 });

  return flights.filter((f) => {
    if (f.CHTERM !== 1) return false;
    const flightTime = DateTime.fromISO(f.CHPTOL);
    return flightTime >= oneHourAgo;
  });
}

export async function fetchAndUpdateFlights() {
  const response = await fetch(API_URL);
  if (!response.ok) throw new Error("Failed to fetch flights");

  const data: FlightApiResponse = await response.json();
  const now = new Date().toISOString();

  await fs.writeFile(
    flightsJsonPath,
    JSON.stringify({ flights: data.result.records, lastUpdated: now }, null, 2),
    "utf-8"
  );
}

export async function getFlightsData(): Promise<FlightsData> {
  const json = await fs.readFile(flightsJsonPath, "utf8");
  const { flights, lastUpdated }: FlightsJsonData = JSON.parse(json);

  const allFlights = filterTerminal1(flights);
  const departures = allFlights.filter((f) => f.CHAORD === "D");
  const arrivals = allFlights.filter((f) => f.CHAORD === "A");

  return {
    departures,
    arrivals,
    lastUpdated,
  };
}
