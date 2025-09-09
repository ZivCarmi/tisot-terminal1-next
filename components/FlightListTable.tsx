import { Flight } from "@/types/flight";
import { Suspense } from "react";
import FlightListNotFound from "./FlightListNotFound";
import FlightListTableBodyData from "./FlightListTableBodyData";
import FlightListTableBodySkeleton from "./FlightListTableBodySkeleton";
import FlightListTableHead from "./FlightListTableHead";

const FlightListTable = async ({ flights }: { flights: Flight[] }) => {
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
    <table className="min-w-full divide-y divide-gray-200">
      <FlightListTableHead />
      <Suspense fallback={<FlightListTableBodySkeleton />}>
        <FlightListTableBody flights={sortedFlights} />
      </Suspense>
    </table>
  );
};

const FlightListTableBody = ({ flights }: { flights: Flight[] }) => {
  return (
    <tbody className="bg-white divide-y divide-gray-200">
      <FlightListTableBodyData flights={flights} />
    </tbody>
  );
};

export default FlightListTable;
