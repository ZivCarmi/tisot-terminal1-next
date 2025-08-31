"use client";

import { Link, usePathname } from "@/i18n/navigation";
import { PlaneLanding, PlaneTakeoff } from "lucide-react";
import { useTranslations } from "next-intl";

const FlightTypeTabs = () => {
  const t = useTranslations("tabs");
  const pathname = usePathname();

  const tabs = [
    {
      url: "/",
      label: t("departuresLabel"),
      Icon: PlaneTakeoff,
    },
    {
      url: "/arrivals",
      label: t("arrivalsLabel"),
      Icon: PlaneLanding,
    },
  ] as const;

  return (
    <div className="flex justify-center items-center rounded-full shadow-sm w-fit">
      {tabs.map(({ Icon, ...tab }, idx) => (
        <Link
          key={tab.url}
          href={tab.url}
          className={`flex items-center justify-center gap-2 px-6 py-2 text-sm font-medium transition-colors focus:outline-none sm:w-40
            ${
              pathname === tab.url
                ? "bg-gradient-to-r from-blue-500 to-blue-700 text-white shadow"
                : "text-blue-700 hover:bg-blue-200/60"
            }
            ${idx === 0 ? "rounded-s-full" : "rounded-e-full"}
          `}
          aria-pressed={pathname === tab.url}
        >
          <Icon className="text-lg flex items-center" />
          <span className="hidden sm:inline">{tab.label}</span>
        </Link>
      ))}
    </div>
  );
};

export default FlightTypeTabs;
