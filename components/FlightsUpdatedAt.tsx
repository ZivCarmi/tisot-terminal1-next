"use client";

import LastUpdatedJSON from "@/data/last-updated.json";
import { formatFlightTime } from "@/utils/dateUtils";
import { useTranslations } from "next-intl";

const FlightsUpdatedAt = () => {
  const { lastUpdated } = LastUpdatedJSON;
  const t = useTranslations("flightList");
  const date = new Date(lastUpdated);

  return (
    <span className="text-sm text-neutral-400">
      {t("lastUpdated")} - {formatFlightTime(date.toLocaleString())}
    </span>
  );
};

// const FlightsUpdatedAt = ({ lastUpdated }: { lastUpdated: string }) => {
//   const FlightsUpdatedAtNoSSR = dynamic(
//     () => import("./FlightsUpdatedAt").then((m) => m.FlightsUpdatedAtNoSSR),
//     {
//       ssr: false,
//     }
//   );

//   return (
//     <Suspense fallback={<p>test....</p>}>
//       <FlightsUpdatedAtNoSSR lastUpdated={lastUpdated} />
//     </Suspense>
//   );
// };

// export const FlightsUpdatedAtNoSSR = ({
//   lastUpdated,
// }: {
//   lastUpdated: string;
// }) => {
//   const date = new Date(lastUpdated);
//   const t = useTranslations("flightList");

//   return (
//     <span className="text-sm text-neutral-400">
//       {t("lastUpdated")} - {formatFlightTime(date.toLocaleString())}
//     </span>
//   );
// };

export default FlightsUpdatedAt;
