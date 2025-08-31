import { fetchArrivals } from "@/api/flights";
import { FlightList } from "@/components/FlightList";
import { getTranslations } from "next-intl/server";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "Metadata.Arrivals" });

  return {
    title: t("pageTitle"),
    description: t("pageDescription"),
    openGraph: {
      title: t("pageOg"),
      description: t("pageOg"),
    },
  };
}

const ArrivalsPage = async () => {
  const flights = await fetchArrivals();

  return <FlightList flights={flights} />;
};

export default ArrivalsPage;
