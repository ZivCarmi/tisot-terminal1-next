"use client";

import { Suspense } from "react";
import FlightListTableBodyData from "./FlightListTableBodyData";
import FlightListTableBodySkeleton from "./FlightListTableBodySkeleton";
import FlightListTableHead from "./FlightListTableHead";
import { useFlights } from "./FlightsProvider";
import FlightListNotFound from "./FlightListNotFound";

const FlightListTable = () => {
  const { arrivals, departures } = useFlights();
  const allFlights = [...arrivals, ...departures];

  if (allFlights.length === 0) {
    return <FlightListNotFound />;
  }

  return (
    <table className="min-w-full divide-y divide-gray-200">
      <FlightListTableHead />
      <Suspense fallback={<FlightListTableBodySkeleton />}>
        <FlightListTableBody />
      </Suspense>
    </table>
  );
};

const FlightListTableBody = () => {
  return (
    <tbody className="divide-y divide-gray-200">
      <FlightListTableBodyData />
    </tbody>
  );
};

export default FlightListTable;
