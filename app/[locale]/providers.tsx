import { FlightsProvider } from "@/components/FlightsProvider";
import { TabsProvider } from "@/components/TabsProvider";
import { NextIntlClientProvider } from "next-intl";
import { ReactNode } from "react";
import { getFlightsData } from "./actions";

export default async function Providers({ children }: { children: ReactNode }) {
  const flightsData = await getFlightsData();

  return (
    <NextIntlClientProvider>
      <FlightsProvider flightsData={flightsData}>
        <TabsProvider>{children}</TabsProvider>
      </FlightsProvider>
    </NextIntlClientProvider>
  );
}
