import { useState } from "react";
import { useTranslation } from "react-i18next";
import "./../styles/navbar.css";

const LanguageContext = () => {
  const [isLanguageOptionVisible, setLanguageOptionVisible] = useState(false);

  const toggleLanguageOption = () => {
    setLanguageOptionVisible(!isLanguageOptionVisible);
  };

  const [t, i18n] = useTranslation("global");

  return (
    <div>
      <div className="relative text-left z-50">
        <button
          type="button"
          className="w-auto h-auto flex"
          id="menu-button"
          aria-expanded="true"
          aria-haspopup="true"
          onClick={toggleLanguageOption}
        >
          <span
            className=" rounded-md"
            onClick={() => i18n.changeLanguage("es")}
          >
            ESP
          </span>
          <svg
            className="-mr-1 h-5 w-5 text-gray-400"
            viewBox="0 0 20 20"
            fill="currentColor"
            aria-hidden="true"
          >
            <path
              fillRule="evenodd"
              d="M5.23 7.21a.75.75 0 011.06.02L10 11.168l3.71-3.938a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z"
              clipRule="evenodd"
            />
          </svg>
        </button>
      </div>
      {isLanguageOptionVisible && (
        <div
          className=" right-0 z-10 mt w-26 origin-top-right border rounded-lg shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none"
          role="menu"
          aria-orientation="vertical"
          aria-labelledby="menu-button"
          tabIndex="-1"
        >
          <div className="py-1" role="none">
            <button
              onClick={() => i18n.changeLanguage("en")}
              href="#"
              className=" block px-4 "
              role="menuitem"
              tabIndex="-1"
              id="menu-item-0"
            >
              ENG
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
export default LanguageContext;
