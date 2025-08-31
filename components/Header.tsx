import { getTranslations } from "next-intl/server";
import LocaleSwitcher from "./LocaleSwitcher";

export async function Header() {
  const t = await getTranslations("HomePage");

  return (
    <header className="bg-gradient-to-r from-blue-600 via-blue-700 to-blue-800 shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between py-6">
          <div className="flex items-center justify-between mb-4 sm:mb-0">
            <div className="flex-shrink-0">
              <h1 className="text-3xl font-bold text-white">{t("title")}</h1>
              <p className="text-blue-100 text-sm mt-1">{t("description")}</p>
            </div>
          </div>
          <div className="flex items-center">
            <div className="flex bg-white/20 rounded-full overflow-hidden border border-white/30">
              <LocaleSwitcher />
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
