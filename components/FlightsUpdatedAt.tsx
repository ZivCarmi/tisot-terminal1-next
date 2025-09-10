"use client";

import { formatFlightTime } from "@/utils/dateUtils";
import { useTranslations } from "next-intl";
import { useFlights } from "./FlightsProvider";

const FlightsUpdatedAt = () => {
  const { lastUpdated } = useFlights();
  const t = useTranslations("flightList");

  return (
    <span className="text-sm text-neutral-400">
      {t("lastUpdated")} - {formatFlightTime(lastUpdated)}
    </span>
  );
};

export default FlightsUpdatedAt;
