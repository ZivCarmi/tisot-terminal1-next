import fs from "fs/promises";
import { Suspense } from "react";
import type { FetchFlightsResult } from "../types/flight";
import FlightListTableBody from "./FlightListTableBody";
import FlightListTableBodySkeleton from "./FlightListTableBodySkeleton";
import FlightListTableHead from "./FlightListTableHead";
import FlightListTitle from "./FlightListTitle";
import FlightTypeTabs from "./FlightTypeTabs";
import FlightsUpdatedAt from "./FlightsUpdatedAt";

export async function FlightList({
  fetchFlights,
}: {
  fetchFlights: () => Promise<FetchFlightsResult>;
}) {
  const fileContent = await fs.readFile(
    process.cwd() + "/data/last-updated.json",
    "utf8"
  );
  const { lastUpdated } = JSON.parse(fileContent);

  return (
    <div className="overflow-x-auto rounded-lg shadow bg-white">
      <div className="flex items-center gap-4 justify-between p-4">
        <div>
          <FlightListTitle />
          <FlightsUpdatedAt lastUpdated={lastUpdated} />
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
