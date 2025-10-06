"use client";

import { useLocale, useTranslations } from "next-intl";
import { useTabs } from "./TabsProvider";

const FlightListTableHead = () => {
  const t = useTranslations("flightTable");
  const { isArrivals } = useTabs();
  const locale = useLocale();

  return (
    <thead className="">
      <tr className={locale === "he" ? "text-right" : "text-left"}>
        <th className="px-2 py-4 text-sm font-medium text-gray-500 uppercase tracking-wider">
          {t("airline")}
        </th>
        <th className="px-2 py-4 text-sm font-medium text-gray-500 uppercase tracking-wider">
          {t("flight")}
        </th>
        <th className="px-2 py-4 text-sm font-medium text-gray-500 uppercase tracking-wider">
          {isArrivals ? t("destinationFrom") : t("destinationTo")}
        </th>
        <th className="px-2 py-4 text-sm font-medium text-gray-500 uppercase tracking-wider">
          {t("scheduled")}
        </th>
        <th className="px-2 py-4 text-sm font-medium text-gray-500 uppercase tracking-wider">
          {t("actual")}
        </th>
        {!isArrivals && (
          <th className="px-2 py-4 text-sm font-medium text-gray-500 uppercase tracking-wider">
            {t("checkInData")}
          </th>
        )}
        <th className="px-2 py-4 text-sm font-medium text-gray-500 uppercase tracking-wider">
          {t("status")}
        </th>
      </tr>
    </thead>
  );
};

export default FlightListTableHead;
