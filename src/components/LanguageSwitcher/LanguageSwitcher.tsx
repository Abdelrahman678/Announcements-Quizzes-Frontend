import { useTranslation } from "react-i18next";

export default function LanguageSwitcher() {
  const { i18n } = useTranslation();

  const changeLanguage = (lng: string) => {
    i18n.changeLanguage(lng);
    document.documentElement.dir = lng === "ar" ? "rtl" : "ltr";
  };

  return (
    /* check if the language is arabic then make it left-4 else right-4 */
    <div
      className={`absolute top-1 lg:top-4  ${
        i18n.language === "ar" ? "left-4" : "right-4"
      } flex gap-2`}
    >
      <button
        onClick={() => changeLanguage("en")}
        className="px-2 py-1 bg-white cursor-pointer text-primary rounded"
      >
        EN
      </button>
      <button
        onClick={() => changeLanguage("ar")}
        className="px-2 py-1 bg-white cursor-pointer text-primary rounded"
      >
        العربية
      </button>
    </div>
  );
}
