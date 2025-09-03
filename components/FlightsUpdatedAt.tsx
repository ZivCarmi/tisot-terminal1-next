"use client";

import { formatFlightTime } from "@/utils/dateUtils";
import { useTranslations } from "next-intl";
// import dynamic from "next/dynamic";

const FlightsUpdatedAt = ({ lastUpdated }: { lastUpdated: string }) => {
  const t = useTranslations("flightList");
  // const FlightsUpdatedAtNoSSR = dynamic(
  //   () => import("./FlightsUpdatedAt").then((m) => m.FlightsUpdatedAtNoSSR),
  //   {
  //     ssr: false,
  //   }
  // );

  return (
    <span className="text-sm text-neutral-400">
      {t("lastUpdated")} - {formatFlightTime(lastUpdated)}
    </span>
  );
};

// export const FlightsUpdatedAtNoSSR = ({
//   lastUpdated,
// }: {
//   lastUpdated: string;
// }) => {
//   return formatFlightTime(lastUpdated);
// };

export default FlightsUpdatedAt;
