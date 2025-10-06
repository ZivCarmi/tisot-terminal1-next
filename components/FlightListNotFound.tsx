"use client";

import { useTranslations } from "next-intl";

const FlightListNotFound = () => {
  const t = useTranslations("flightList");

  return (
    <div className="text-center py-8">
      <div className="text-gray-900 text-lg font-medium mb-2">
        {t("flightsNotFound")}
      </div>
      <div className="text-neutral-400 text-sm">{t("noScheduleFlights")}</div>
    </div>
  );
};

export default FlightListNotFound;
