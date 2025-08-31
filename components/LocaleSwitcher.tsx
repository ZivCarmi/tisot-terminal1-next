"use client";

import { usePathname, useRouter } from "@/i18n/navigation";
import { routing } from "@/i18n/routing";
import { useLocale } from "next-intl";

const langs = {
  he: { nativeName: "עברית" },
  en: { nativeName: "English" },
};

export default function LocaleSwitcher() {
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();

  const switchLocale = (newLocale: string) => {
    if (newLocale !== locale) {
      router.replace(pathname, { locale: newLocale });
      router.refresh();
    }
  };

  return routing.locales.map((lang, idx) => {
    const isCurrentLang = locale === lang;

    return (
      <button
        key={lang}
        type="button"
        onClick={() => switchLocale(lang)}
        className={`flex items-center justify-center w-20 px-4 py-2 text-sm font-medium transition-colors focus:outline-none ${
          isCurrentLang
            ? "bg-white text-blue-700 shadow"
            : "text-white hover:bg-white/30 cursor-pointer"
        } ${idx === 0 ? "rounded-s-full" : "rounded-e-full"}
                  `}
        aria-pressed={isCurrentLang}
      >
        {langs[lang].nativeName}
      </button>
    );
  });
}
