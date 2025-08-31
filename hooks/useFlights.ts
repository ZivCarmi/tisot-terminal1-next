import { useQuery } from "@tanstack/react-query";
import type { Flight } from "../types/flight";
import * as flightsApi from "../api/flights";

// Query keys for React Query
export const flightQueryKeys = {
  all: ["flights"] as const,
  allFlights: () => [...flightQueryKeys.all, "all"] as const,
  byDate: (date: string) => [...flightQueryKeys.all, "byDate", date] as const,
  byStatus: (status: Flight["CHRMINE"]) =>
    [...flightQueryKeys.all, "byStatus", status] as const,
  byAirline: (airline: string) =>
    [...flightQueryKeys.all, "byAirline", airline] as const,
  departures: () => [...flightQueryKeys.all, "departures"] as const,
  arrivals: () => [...flightQueryKeys.all, "arrivals"] as const,
};

// Hook to fetch all Terminal 1 flights
export function useAllFlights() {
  return useQuery({
    queryKey: flightQueryKeys.allFlights(),
    queryFn: flightsApi.fetchAllFlights,
    refetchInterval: 15 * 60 * 1000, // Refetch every 15 minutes
    staleTime: 5 * 60 * 1000, // Consider data stale after 5 minutes
  });
}

// Hook to fetch flights by date
export function useFlightsByDate(date: string) {
  return useQuery({
    queryKey: flightQueryKeys.byDate(date),
    queryFn: () => flightsApi.fetchFlightsByDate(date),
    enabled: !!date,
    refetchInterval: 15 * 60 * 1000,
    staleTime: 5 * 60 * 1000,
  });
}

// Hook to fetch flights by status
export function useFlightsByStatus(status: Flight["CHRMINE"]) {
  return useQuery({
    queryKey: flightQueryKeys.byStatus(status),
    queryFn: () => flightsApi.fetchFlightsByStatus(status),
    enabled: !!status,
    refetchInterval: 15 * 60 * 1000,
    staleTime: 5 * 60 * 1000,
  });
}

// Hook to fetch flights by airline
export function useFlightsByAirline(airline: string) {
  return useQuery({
    queryKey: flightQueryKeys.byAirline(airline),
    queryFn: () => flightsApi.fetchFlightsByAirline(airline),
    enabled: !!airline,
    refetchInterval: 15 * 60 * 1000,
    staleTime: 5 * 60 * 1000,
  });
}

// Hook to fetch departures
export function useDepartures() {
  return useQuery({
    queryKey: flightQueryKeys.departures(),
    queryFn: flightsApi.fetchDepartures,
    refetchInterval: 15 * 60 * 1000,
    staleTime: 5 * 60 * 1000,
  });
}

// Hook to fetch arrivals
export function useArrivals() {
  return useQuery({
    queryKey: flightQueryKeys.arrivals(),
    queryFn: flightsApi.fetchArrivals,
    refetchInterval: 15 * 60 * 1000,
    staleTime: 5 * 60 * 1000,
  });
}
