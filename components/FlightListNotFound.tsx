import { getTranslations } from "next-intl/server";

const FlightListNotFound = async () => {
  const t = await getTranslations("flightList");

  return (
    <div className="text-center py-8">
      <div className="text-gray-500 text-lg font-medium mb-2">
        {t("flightsNotFound")}
      </div>
      <div className="text-gray-400 text-sm">{t("noScheduleFlights")}</div>
    </div>
  );
};

export default FlightListNotFound;
