import FlightListTable from "./FlightListTable";
import FlightListTitle from "./FlightListTitle";
import FlightTypeTabs from "./FlightTypeTabs";
import FlightsUpdatedAt from "./FlightsUpdatedAt";

export function FlightList() {
  return (
    <div className="overflow-x-auto rounded-lg shadow bg-white">
      <div className="flex items-center gap-4 justify-between p-4">
        <div>
          <FlightListTitle />
          <FlightsUpdatedAt />
        </div>
        <FlightTypeTabs />
      </div>
      <FlightListTable />
    </div>
  );
}
