"use client";

import { formatFlightTime } from "@/utils/dateUtils";
import { useTranslations } from "next-intl";
import dynamic from "next/dynamic";

const FlightsUpdatedAt = ({ lastUpdated }: { lastUpdated: Date }) => {
  const FlightsUpdatedAtNoSSR = dynamic(
    () => import("./FlightsUpdatedAt").then((m) => m.FlightsUpdatedAtNoSSR),
    {
      ssr: false,
    }
  );

  return <FlightsUpdatedAtNoSSR lastUpdated={lastUpdated} />;
};

export const FlightsUpdatedAtNoSSR = ({
  lastUpdated,
}: {
  lastUpdated: Date;
}) => {
  const date = new Date(lastUpdated);
  const t = useTranslations("flightList");

  return (
    <span className="text-sm text-neutral-400">
      {t("lastUpdated")} - {formatFlightTime(date.toLocaleString())}
    </span>
  );
};

export default FlightsUpdatedAt;
