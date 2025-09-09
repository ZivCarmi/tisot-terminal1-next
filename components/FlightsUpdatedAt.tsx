"use client";

import { formatFlightTime } from "@/utils/dateUtils";
import { useTranslations } from "next-intl";
import { useEffect, useState } from "react";

const FlightsUpdatedAt = ({ initLastUpdated }: { initLastUpdated: string }) => {
  const [lastUpdated, setLastUpdated] = useState<string>(initLastUpdated);
  const t = useTranslations("flightList");

  // need to disable first fetch
  useEffect(() => {
    const eventSource = new EventSource(
      `/api/update?token=${process.env.NEXT_PUBLIC_GET_TOKEN}`
    );

    eventSource.onmessage = (event) => {
      const data = JSON.parse(event.data);
      setLastUpdated(data.lastUpdated);
    };

    eventSource.onerror = () => {
      console.error("SSE connection lost, retrying...");
      eventSource.close();
    };

    return () => {
      eventSource.close();
    };
  }, []);

  return (
    <span className="text-sm text-neutral-400">
      {t("lastUpdated")} - {formatFlightTime(lastUpdated)}
    </span>
  );
};

export default FlightsUpdatedAt;
