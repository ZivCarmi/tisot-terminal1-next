import { FlightList } from "@/components/FlightList";
import { getTranslations } from "next-intl/server";
import { fetchDepartures } from "./actions";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "Metadata.Departures" });

  return {
    title: t("pageTitle"),
    description: t("pageDescription"),
    openGraph: {
      title: t("pageOg"),
      description: t("pageOg"),
    },
  };
}

export default async function DeparturesPage() {
  return <FlightList fetchFlights={fetchDepartures} />;
}
