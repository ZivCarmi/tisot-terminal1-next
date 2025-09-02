import { Suspense } from "react";
import type { FetchFlightsResult } from "../types/flight";
import FlightListTableBody from "./FlightListTableBody";
import FlightListTableBodySkeleton from "./FlightListTableBodySkeleton";
import FlightListTableHead from "./FlightListTableHead";
import FlightListTitle from "./FlightListTitle";
import FlightsUpdatedAt from "./FlightsUpdatedAt";
import FlightTypeTabs from "./FlightTypeTabs";

export async function FlightList({
  fetchFlights,
}: {
  fetchFlights: () => Promise<FetchFlightsResult>;
}) {
  return (
    <div className="overflow-x-auto rounded-lg shadow bg-white">
      <div className="flex items-center gap-4 justify-between p-4">
        <div>
          <FlightListTitle />
          <span>
            עדכון אחרון ב - <FlightsUpdatedAt />
          </span>
        </div>
        <FlightTypeTabs />
      </div>
      <table className="min-w-full divide-y divide-gray-200">
        <FlightListTableHead />
        <Suspense fallback={<FlightListTableBodySkeleton />}>
          <FlightListTableBody fetchFlights={fetchFlights} />
        </Suspense>
      </table>
    </div>
  );
}
