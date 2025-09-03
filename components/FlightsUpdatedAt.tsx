"use client";

import { useTranslations } from "next-intl";

const FlightsUpdatedAt = ({ children }: { children: React.ReactNode }) => {
  const t = useTranslations("flightList");

  return (
    <span className="text-sm text-neutral-400">
      {t("lastUpdated")} - {children}
    </span>
  );
};

export default FlightsUpdatedAt;
