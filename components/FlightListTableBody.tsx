import type { FetchFlightsResult } from "../types/flight";
import FlightListNotFound from "./FlightListNotFound";
import FlightListTableBodyData from "./FlightListTableBodyData";

const FlightListTableBody = async ({
  fetchFlights,
}: {
  fetchFlights: () => Promise<FetchFlightsResult>;
}) => {
  const flights = await fetchFlights();

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
    <tbody className="bg-white divide-y divide-gray-100">
      <FlightListTableBodyData flights={flights} />
    </tbody>
  );
};

export default FlightListTableBody;
