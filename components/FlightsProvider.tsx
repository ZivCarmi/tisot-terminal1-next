"use client";

import { Flight, FlightsData } from "@/types/flight";
import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";

type FlightsContextType = FlightsData;

const FlightsContext = createContext<FlightsContextType>({
  departures: [],
  arrivals: [],
  lastUpdated: "",
});

export function FlightsProvider({
  flightsData,
  children,
}: {
  flightsData: FlightsData;
  children: ReactNode;
}) {
  const [departures, setDepartures] = useState<Flight[]>(
    flightsData.departures
  );
  const [arrivals, setArrivals] = useState<Flight[]>(flightsData.arrivals);
  const [lastUpdated, setLastUpdated] = useState<string>(
    flightsData.lastUpdated
  );

  useEffect(() => {
    const eventSource = new EventSource(
      `/api/update?token=${process.env.NEXT_PUBLIC_GET_TOKEN}`
    );

    eventSource.onmessage = (event) => {
      const data = JSON.parse(event.data);

      console.log(data);

      setDepartures(data.departures);
      setArrivals(data.arrivals);
      setLastUpdated(data.lastUpdated);
    };

    eventSource.onerror = () => {
      console.error("SSE connection lost, retrying...");
      eventSource.close();
    };

    return () => {
      eventSource.close();
    };
  }, []);

  return (
    <FlightsContext.Provider value={{ departures, arrivals, lastUpdated }}>
      {children}
    </FlightsContext.Provider>
  );
}

export function useFlights() {
  const ctx = useContext(FlightsContext);
  if (!ctx) throw new Error("useFlights must be used inside FlightsProvider");
  return ctx;
}
