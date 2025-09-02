"use client";

import { formatFlightTime } from "@/utils/dateUtils";

const FlightsUpdatedAt = ({ lastUpdated }: { lastUpdated: Date }) => {
  const date = new Date(lastUpdated);

  return <span>עדכון אחרון ב - {formatFlightTime(date.toLocaleString())}</span>;
};

export default FlightsUpdatedAt;
