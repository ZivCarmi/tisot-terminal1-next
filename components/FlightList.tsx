import fs from "fs/promises";
import dynamic from "next/dynamic";
import path from "path";
import { Suspense } from "react";
import type { FetchFlightsResult } from "../types/flight";
import FlightListTableBody from "./FlightListTableBody";
import FlightListTableBodySkeleton from "./FlightListTableBodySkeleton";
import FlightListTableHead from "./FlightListTableHead";
import FlightListTitle from "./FlightListTitle";
import FlightTypeTabs from "./FlightTypeTabs";

export async function FlightList({
  fetchFlights,
}: {
  fetchFlights: () => Promise<FetchFlightsResult>;
}) {
  const filePath = path.join(process.cwd(), "data", "last-updated.json");
  const fileContent = await fs.readFile(filePath, "utf-8");
  const { lastUpdated } = JSON.parse(fileContent);
  const FlightsUpdatedAt = dynamic(() => import("./FlightsUpdatedAt"), {
    ssr: false,
  });

  return (
    <div className="overflow-x-auto rounded-lg shadow bg-white">
      <div className="flex items-center gap-4 justify-between p-4">
        <div>
          <FlightListTitle />
          <FlightsUpdatedAt lastUpdated={lastUpdated as Date} />
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
