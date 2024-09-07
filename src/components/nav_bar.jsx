import { useState } from "react";
import { Link } from "react-router-dom";
import "./../styles/navbar.css";
import LanguageContext from "./LanguageBottom";
import { useTranslation } from "react-i18next";

const NavBar = () => {
  const [isHovered, setIsHovered] = useState(false);
  const [t] = useTranslation("global");

  return (
    <div
      className={`flex   navbar-container  textos max-[600px]:hidden  sm:px-20 ${
        isHovered ? "hovered" : ""
      }`}
    >
      <div className="hylls-logo pt-9 -ml-4">
        <Link to="/">
          <img src="\src\assets\images\hylls-logo.png" alt="logo" />
        </Link>
      </div>

      <div className="flex min-[1450px]:w-[55%] max-[830px]:w-[100%] min-[1450px]:h-[55%] mx-10">
        <div
          className="flex justify-end mr-10 w-full"
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          <nav
            className={` uppercase pt-10 enlaces-container -ml-[20] ${
              isHovered ? "hovered" : ""
            }`}
          >
            <div className="text-base mb-4 block ">
              <h3
                className={`sm:mb-10 categoria traducible ${
                  isHovered ? "font-bold" : ""
                }`}
              >
                {t("navbar.Company.Company")}{" "}
              </h3>
              {isHovered && (
                <ul className="ul-fluid links-list sm:flex sm:flex-col">
                  <li className="mb-10 hover:font-bold traducible ">
                    <Link to={"/About"}>{t("navbar.Company.About")}</Link>
                  </li>
                  <li className="mb-10 hover:font-bold traducible">
                    <Link to={"/Contact"}>{t("navbar.Company.Contact")}</Link>
                  </li>
                  <li className="mb-10 hover:font-bold traducible">
                    <Link to={"/News"}>{t("navbar.Company.News")}</Link>
                  </li>
                  <li className="mb-10 hover:font-bold traducible">
                    <Link to={"/Synck"}>Synck</Link>
                  </li>
                </ul>
              )}
            </div>

            <div className="text-base mb-4 block">
              <h3
                className={`sm:mb-10 categoria traducible ${
                  isHovered ? "font-bold" : ""
                }`}
              >
                {t("navbar.Discography.Discography")}
              </h3>
              {isHovered && (
                <ul className="ul-fluid links-list sm:flex sm:flex-col">
                  <li className="mb-10 traducible hover:font-bold">
                    <Link to={"/Artistas"}>
                      {t("navbar.Discography.Artist")}
                    </Link>
                  </li>
                  <li className="mb-10 traducible hover:font-bold">
                    <Link to={"/Albumes"}>
                      {t("navbar.Discography.Albums")}
                    </Link>
                  </li>
                  <li className="mb-10 traducible hover:font-bold">
                    <Link to={"/Videos"}>{t("navbar.Discography.Videos")}</Link>
                  </li>
                </ul>
              )}
            </div>

            <div className="text-base text-left">
              <Link
                to={"/servicios"}
                className={`traducible ${isHovered ? "font-bold" : ""}`}
              >
                {t("navbar.Services.Services")}
              </Link>
              {isHovered && (
                <ul className="ul-fluid text-left sm:flex sm:flex-col sm:mt-12 overflow-hidden">
                  <li className="mb-10 traducible hover:font-bold">
                    <Link to={"/servicios"} style={{ whiteSpace: "pre-wrap" }}>
                      {t("navbar.Services.Production")}
                    </Link>
                  </li>
                  <li className="mb-10 traducible hover:font-bold">
                    <Link to={"/servicios#Distribucion"}>
                      {t("navbar.Services.Distribution")}
                    </Link>
                  </li>
                  <li className="mb-10 traducible hover:font-bold">
                    <Link to={"/servicios#promocion"}>
                      {t("navbar.Services.Promotion")}
                    </Link>
                  </li>
                  <li className="mb-10 traducible hover:font-bold">
                    <Link to={"/servicios#AudioVisual"}>
                      {t("navbar.Services.Audiovisual")}
                    </Link>
                  </li>
                  <li className="mb-10 traducible hover:font-bold">
                    <Link to={"/servicios#Legal"}>
                      {t("navbar.Services.Legal")}
                    </Link>
                  </li>
                </ul>
              )}
            </div>
            <div className="text-base">
              <Link className={`traducible ${isHovered ? "font-bold" : ""}`}>
                {t("navbar.Releases.Releases")}
              </Link>
              {isHovered && (
                <ul className="ul-fluid text-left sm:flex sm:flex-col sm:mt-12">
                  <li className="mb-10 traducible hover:font-bold">
                    <Link to={"/playlist#Destacadas"}>
                      {t("navbar.Releases.Featured")}
                    </Link>
                  </li>
                  <li className="mb-10 traducible hover:font-bold">
                    <Link to={"/playlist#Novedades"}>
                      {t("navbar.Releases.News")}
                    </Link>
                  </li>
                  <li className="mb-10 traducible hover:font-bold">
                    <Link to={"/playlist#Especiales"}>
                      {t("navbar.Releases.Specials")}
                    </Link>
                  </li>
                </ul>
              )}
            </div>
          </nav>
          <div
            className="bg-[#E8D8B0] fixed top-10 right-20 bg-clip-text button-esp"
            onMouseEnter={() => setIsHovered(false)}
            onMouseLeave={() => setIsHovered(false)}
          >
            <span className="cursor-pointer border-b  text-sm ">
              <LanguageContext />
            </span>
          </div>
        </div>

        <div
          className={`h1-container min-w-full ${isHovered ? "show-h1" : ""}`}
        >
          <div className="w-full flex flex-row justify-between items-center p-0 m-0">
            <h1 className="uppecase max-w-3xl traducible h1-fluid">
              {t("navbar.Phrase")}
            </h1>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NavBar;
