import type { Flight } from "../types/flight";
import FlightListNotFound from "./FlightListNotFound";
import FlightListTableBody from "./FlightListTableBody";
import FlightListTableHead from "./FlightListTableHead";
import FlightListTitle from "./FlightListTitle";
import FlightTypeTabs from "./FlightTypeTabs";

interface FlightListProps {
  flights: Flight[];
}

export function FlightList({ flights }: FlightListProps) {
  // Sort flights by scheduled time (CHSTOL)
  const sortedFlights = [...flights].sort((a, b) => {
    const aTime = new Date(a.CHSTOL).getTime();
    const bTime = new Date(b.CHSTOL).getTime();

    return aTime - bTime;
  });

  if (sortedFlights.length === 0) {
    return <FlightListNotFound />;
  }

  return (
    <div className="overflow-x-auto rounded-lg shadow bg-white">
      <div className="flex items-center gap-4 justify-between p-4">
        <FlightListTitle />
        <FlightTypeTabs />
      </div>
      <table className="min-w-full divide-y divide-gray-200">
        <FlightListTableHead />
        <FlightListTableBody flights={sortedFlights} />
      </table>
    </div>
  );
}
