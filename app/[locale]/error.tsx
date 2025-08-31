"use client"; // Error boundaries must be Client Components

import { useTranslations } from "next-intl";
import { useEffect } from "react";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  const t = useTranslations("flightList");

  useEffect(() => {
    // Log the error to an error reporting service
    console.error(error);
  }, [error]);

  return (
    <div className="text-center py-8">
      <div className="text-red-500 text-lg font-medium mb-2">
        {t("flightsLoadingError")}
      </div>
      <button
        onClick={() => reset()}
        className="mt-4 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
      >
        {t("flightsTryAgain")}
      </button>
    </div>
  );
}
