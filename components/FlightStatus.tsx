"use client";

import { useLocale } from "next-intl";

const FlightStatus = ({ status }: { status: string }) => {
  const locale = useLocale();

  const getStatusText = () => {
    if (locale === "en") return status;

    switch (status.toLowerCase()) {
      case "departed":
        return "המריאה";
      case "landed":
        return "נחתה";
      case "landing":
        return "בנחיתה";
      case "on time":
        return "בזמן";
      case "final":
        return "סופי";
      case "delayed":
        return "עיכוב";
      case "canceled":
        return "בוטלה";
      case "not final":
        return "לא סופי";
      default:
        return "";
    }
  };

  const getStatusColor = () => {
    switch (status.toLowerCase()) {
      case "departed":
      case "landed":
      case "landing":
      case "on time":
      case "final":
        return "bg-green-100 text-green-800";
      case "delayed":
      case "canceled":
        return "bg-red-100 text-red-800";
      case "not final":
        return "bg-yellow-100 text-yellow-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <td className={`px-4 py-3 whitespace-nowrap`}>
      <span
        className={`inline-block px-2 py-1 rounded-full text-xs font-medium ${getStatusColor()}`}
      >
        {getStatusText()}
      </span>
    </td>
  );
};

export default FlightStatus;
