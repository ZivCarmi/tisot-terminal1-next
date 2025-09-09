import { getFlightsData } from "@/app/[locale]/actions";
import type { Flight } from "../types/flight";
import FlightListTable from "./FlightListTable";
import FlightListTitle from "./FlightListTitle";
import FlightTypeTabs from "./FlightTypeTabs";
import FlightsUpdatedAt from "./FlightsUpdatedAt";

export async function FlightList({ flights }: { flights: Flight[] }) {
  const { lastUpdated } = await getFlightsData();

  return (
    <div className="overflow-x-auto rounded-lg shadow bg-white">
      <div className="flex items-center gap-4 justify-between p-4">
        <div>
          <FlightListTitle />
          <FlightsUpdatedAt initLastUpdated={lastUpdated} />
        </div>
        <FlightTypeTabs />
      </div>
      <FlightListTable flights={flights} />
    </div>
  );
}
