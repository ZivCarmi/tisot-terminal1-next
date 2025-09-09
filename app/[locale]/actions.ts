"use server";

import type {
  FetchFlightsResult,
  Flight,
  FlightApiResponse,
  FlightsData,
  RawFlight,
} from "@/types/flight";
import { DateTime } from "luxon";
import fs from "fs/promises";
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
  const { flights, lastUpdated }: FlightsData = JSON.parse(json);
  return {
    flights: filterTerminal1(flights),
    lastUpdated,
  };
}

export async function getDepartures() {
  const { flights } = await getFlightsData();
  return flights.filter((f) => f.CHAORD === "D");
}

export async function getArrivals() {
  const { flights } = await getFlightsData();
  return flights.filter((f) => f.CHAORD === "D");
}

export async function fetchDepartures(): Promise<FetchFlightsResult> {
  // let flights: FetchFlightsResult = [
  //   {
  //     _id: 719,
  //     CHOPER: "6H",
  //     CHFLTN: "115",
  //     CHOPERD: "ISRAIR AIRLINES",
  //     CHSTOL: "2025-09-08T12:35:00",
  //     CHPTOL: "2025-09-08T13:05:00",
  //     CHAORD: "D",
  //     CHLOC1: "LTN",
  //     CHLOC1D: "LUTON",
  //     CHLOC1TH: "לונדון לוטון",
  //     CHLOC1T: "LONDON LUTON",
  //     CHLOC1CH: "בריטניה",
  //     CHLOCCT: "UNITED KINGDOM",
  //     CHTERM: 1,
  //     CHCINT: "316-320",
  //     CHCKZN: "A",
  //     CHRMINE: "DEPARTED",
  //     CHRMINH: "המריאה",
  //   },
  //   {
  //     _id: 720,
  //     CHOPER: "LY",
  //     CHFLTN: "211",
  //     CHOPERD: "EL AL",
  //     CHSTOL: "2025-09-08T14:20:00",
  //     CHPTOL: "2025-09-08T14:50:00",
  //     CHAORD: "D",
  //     CHLOC1: "CDG",
  //     CHLOC1D: "PARIS",
  //     CHLOC1TH: "פריז שארל דה גול",
  //     CHLOC1T: "PARIS CHARLES DE GAULLE",
  //     CHLOC1CH: "צרפת",
  //     CHLOCCT: "FRANCE",
  //     CHTERM: 1,
  //     CHCINT: "321-325",
  //     CHCKZN: "B",
  //     CHRMINE: "DEPARTED",
  //     CHRMINH: "המריאה",
  //   },
  //   {
  //     _id: 721,
  //     CHOPER: "WF",
  //     CHFLTN: "330",
  //     CHOPERD: "WINGS AIR",
  //     CHSTOL: "2025-09-08T15:10:00",
  //     CHPTOL: "2025-09-08T15:40:00",
  //     CHAORD: "D",
  //     CHLOC1: "FCO",
  //     CHLOC1D: "ROME",
  //     CHLOC1TH: "רומא פיומיצ'ינו",
  //     CHLOC1T: "ROME FIUMICINO",
  //     CHLOC1CH: "איטליה",
  //     CHLOCCT: "ITALY",
  //     CHTERM: 1,
  //     CHCINT: "326-330",
  //     CHCKZN: "C",
  //     CHRMINE: "DEPARTED",
  //     CHRMINH: "המריאה",
  //   },
  // ];
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

// Initial api call to write flights to the json (so we won't have empty flights)
fetchAndUpdateFlights();
