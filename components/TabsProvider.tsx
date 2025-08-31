"use client";

import { usePathname } from "@/i18n/navigation";
import { useTranslations } from "next-intl";
import { createContext, ReactNode, useContext, useRef } from "react";

type TabsContextType = {
  title: string;
  isArrivals: boolean;
};

const TabsContext = createContext<TabsContextType | undefined>(undefined);

export function TabsProvider({ children }: { children: ReactNode }) {
  const title = useRef("");
  const t = useTranslations("tabs");
  const pathname = usePathname();
  const isArrivals = pathname === "/arrivals";

  if (pathname === "/") {
    title.current = t("departuresTitle");
  } else if (isArrivals) {
    title.current = t("arrivalsTitle");
  } else {
    title.current = t("defaultTitle");
  }

  return (
    <TabsContext.Provider value={{ isArrivals, title: title.current }}>
      {children}
    </TabsContext.Provider>
  );
}

export function useTabs() {
  const ctx = useContext(TabsContext);
  if (!ctx) throw new Error("useTabs must be used inside TabsProvider");
  return ctx;
}
