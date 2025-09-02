import { TabsProvider } from "@/components/TabsProvider";
import { NextIntlClientProvider } from "next-intl";
import { ReactNode } from "react";

export default function Providers({ children }: { children: ReactNode }) {
  return (
    <NextIntlClientProvider>
      <TabsProvider>{children}</TabsProvider>
    </NextIntlClientProvider>
  );
}
