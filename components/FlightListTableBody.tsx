"use client";

import { useLocale, useTranslations } from "next-intl";
import { useTabs } from "./TabsProvider";
import { Fragment, useState } from "react";
import type { Flight } from "../types/flight";
import { formatFlightDate, formatFlightTime } from "../utils/dateUtils";
import FlightStatus from "./FlightStatus";
import { ChevronDown } from "lucide-react";

interface FlightListTableHeadProps {
  flights: Flight[];
}

const FlightListTableBody = ({ flights }: FlightListTableHeadProps) => {
  const [expandedRows, setExpandedRows] = useState<Set<number>>(new Set());
  const t = useTranslations("flightTable");
  const locale = useLocale();
  const { isArrivals } = useTabs();

  const toggleRow = (flightId: number) => {
    const newExpanded = new Set(expandedRows);
    if (newExpanded.has(flightId)) {
      newExpanded.delete(flightId);
    } else {
      newExpanded.add(flightId);
    }
    setExpandedRows(newExpanded);
  };

  return (
    <tbody className="bg-white divide-y divide-gray-100">
      {flights.map((flight) => {
        const isExpanded = expandedRows.has(flight._id);

        return (
          <Fragment key={flight._id}>
            <tr
              className={`hover:bg-blue-50 transition${
                !isArrivals ? " cursor-pointer" : ""
              }`}
              onClick={() => !isArrivals && toggleRow(flight._id)}
            >
              <td className={`px-4 py-3 whitespace-nowrap text-gray-700`}>
                {flight.CHOPERD}
              </td>
              <td className={`px-4 py-3 whitespace-nowrap text-gray-900`}>
                {flight.CHOPER} {flight.CHFLTN}
              </td>
              <td className={`px-4 py-3 whitespace-nowrap text-gray-700`}>
                {locale === "he" ? flight.CHLOC1TH : flight.CHLOC1T}
              </td>
              <td className={`px-4 py-3 whitespace-nowrap text-gray-700`}>
                <strong>{formatFlightTime(flight.CHSTOL)}</strong>
                <div>{formatFlightDate(flight.CHSTOL)}</div>
              </td>
              <td className={`px-4 py-3 whitespace-nowrap text-gray-700`}>
                <strong>{formatFlightTime(flight.CHPTOL)}</strong>
                <div>{formatFlightDate(flight.CHPTOL)}</div>
              </td>
              <FlightStatus status={flight.CHRMINE} />
              {!isArrivals && (
                <td className="px-4 py-3 whitespace-nowrap text-center">
                  <ChevronDown
                    className={`inline-block transition-transform ${
                      isExpanded ? "rotate-180" : ""
                    }`}
                  />
                </td>
              )}
            </tr>
            {isExpanded && (
              <tr key={`${flight._id}-details`} className="bg-gray-50">
                <td colSpan={8} className="px-4 py-3">
                  <div className={`flex gap-4 text-sm`}>
                    <div className="flex-1">
                      <span className="font-medium text-gray-700">
                        {t("checkInCounter")}:
                      </span>
                      <span className={`ms-2 text-gray-600`}>
                        {flight.CHCINT || t("notSpecified")}
                      </span>
                    </div>
                    <div className="flex-1">
                      <span className="font-medium text-gray-700">
                        {t("checkInArea")}:
                      </span>
                      <span className="ms-2 text-gray-600">
                        {flight.CHCKZN || t("notSpecified")}
                      </span>
                    </div>
                  </div>
                </td>
              </tr>
            )}
          </Fragment>
        );
      })}
    </tbody>
  );
};

export default FlightListTableBody;
