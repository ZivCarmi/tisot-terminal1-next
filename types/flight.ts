export interface RawFlight {
  _id: number;
  CHOPER: string; // Airline code
  CHFLTN: number; // Flight number
  CHOPERD: string; // Airline name
  CHSTOL: string; // Scheduled time (ISO)
  CHPTOL: string; // Actual time (ISO)
  CHAORD: "A" | "D"; // Arrival or Departure
  CHLOC1: string; // Location code
  CHLOC1D: string; // Location name (EN)
  CHLOC1TH: string; // Location name (HE)
  CHLOC1T: string; // Location name (EN)
  CHLOC1CH: string; // Country (HE)
  CHLOCCT: string; // Country (EN)
  CHTERM: number; // Terminal number
  CHCINT?: string; // Check-in counter
  CHCKZN?: string; // Check-in zone
  CHRMINE: string; // Status (EN)
  CHRMINH: string; // Status (HE)
}

export interface Flight extends RawFlight {
  // Add any computed fields here if needed
}

export interface FlightFilters {
  terminal?: string;
  status?: Flight["CHRMINE"];
  airline?: string;
  origin?: string;
  destination?: string;
  date?: string;
}

export interface FlightApiResponse {
  help: string;
  success: boolean;
  result: {
    records: RawFlight[];
    total: number;
    [key: string]: any;
  };
}

export interface FlightStats {
  total_flights: number;
  departures: number;
  arrivals: number;
  delayed_flights: number;
  cancelled_flights: number;
}
