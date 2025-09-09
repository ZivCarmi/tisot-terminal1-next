"use client";

import { useLocale, useTranslations } from "next-intl";
import type { Flight } from "../types/flight";
import { formatFlightDate, formatFlightTime } from "../utils/dateUtils";
import FlightStatus from "./FlightStatus";
import { useTabs } from "./TabsProvider";

const FlightListTableBodyData = ({ flights }: { flights: Flight[] }) => {
  const t = useTranslations("flightTable");
  const locale = useLocale();
  const { isArrivals } = useTabs();

  return flights.map((flight) => (
    <tr key={flight._id}>
      <td className="px-4 py-3 whitespace-nowrap text-gray-700">
        {flight.CHOPERD}
      </td>
      <td className="px-4 py-3 whitespace-nowrap text-gray-900">
        {flight.CHOPER} {flight.CHFLTN}
      </td>
      <td className="px-4 py-3 whitespace-nowrap text-gray-700">
        {locale === "he" ? flight.CHLOC1TH : flight.CHLOC1T}
      </td>
      <td className="px-4 py-3 whitespace-nowrap text-gray-700">
        <span>{formatFlightTime(flight.CHSTOL)}</span>
        <div>{formatFlightDate(flight.CHSTOL)}</div>
      </td>
      <td className="px-4 py-3 whitespace-nowrap text-gray-700 bg-blue-50">
        <strong>{formatFlightTime(flight.CHPTOL)}</strong>
        <div>{formatFlightDate(flight.CHPTOL)}</div>
      </td>
      {!isArrivals && (
        <td className="px-4 py-3 whitespace-nowrap text-gray-700">
          <span>{flight.CHCKZN || t("notSpecified")} </span>
          <span>{flight.CHCINT || t("notSpecified")}</span>
        </td>
      )}
      <FlightStatus status={flight.CHRMINE} />
    </tr>
  ));
};

export default FlightListTableBodyData;
