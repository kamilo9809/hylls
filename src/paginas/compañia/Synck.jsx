import NavbarAbout from "./NavbarAbout";
import imgSynck from "./../../assets/images/imgSynck.svg";
import { useTranslation } from "react-i18next";
import { useState, useEffect } from "react";
import React, { Suspense } from "react";

const Footer = React.lazy(() => import("./../../components/footer_disc"));

const Synck = () => {
  const [isSmallScreen, setIsSmallScreen] = useState(false);
  const { t } = useTranslation("global");

  useEffect(() => {
    const handleResize = () => {
      setIsSmallScreen(window.innerWidth <= 640);
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <div className="pb-32">
      <div className="bg-[#0A0A0A] min-h-screen pb-32 w-full relative overflow-y-clip overflow-hidden ">
        <NavbarAbout />
        <div className="relative flex flex-row pt-16">
          {!isSmallScreen && (
            <div className="absolute right-0 top-0 z-0">
              <img loading="lazy" src={imgSynck} alt="imgsynck" className="2xl:w-[1300px]" />
            </div>
          )}
          <div className="flex flex-col justify-start items-start w-full font-akshar px-10 sm:ps-24 z-10 ">
            <div className="w-full sm:h-64 flex justify-start items-start">
              {isSmallScreen ? (
                <img
                  loading="lazy"
                  src="src/assets/images/DESCUBRE Y ÚNETE A SYNCK mobile.svg"
                />
              ) : (
                //<h2 className="text-white uppercase tracking-widest font-extrabold text-5xl texto-degradado4">
                //{t("synck.DiscoverAndJoin")} <span className="text-[#E8D8B0]">SYNCK</span>
                //</h2>
                <div className="w-full">
                  <h2 className="text-white w-2/4 text-[100px] font-akshar font-extrabold pb-10">
                    {t("synck.DiscoverAndJoin")}
                    <span className="text-[#f3d077]">SYNCK</span>
                  </h2>
                </div>
              )}
            </div>

            <p className="text-white pt-4 xl:w-[50%] w-1/2 max-sm:w-full">
              <strong>{t("synck.Paragraph1PartOne")}</strong>
              {t("synck.Paragraph1PartTwo")}
              <strong>{t("synck.Paragraph1PartThree")}</strong>
              <div className="pt-10">
                <button className="btnSubmit text-black w-full sm:w-52 max-sm:w-1/2 hover:cursor-pointer">
                  {t("synck.Buttom")}
                </button>
              </div>
            </p>
            {isSmallScreen && (
              <div className="flex justify-center w-screen -ml-20">
                <img loading="lazy" src={imgSynck} alt="imgsynck" />
              </div>
            )}
          </div>
        </div>
      </div>
      <div className="absolute" >
      <Suspense
      fallback={
        <div className="flex justify-center items-center">Cargando...</div>
      }
      >
      <Footer />
      </Suspense>
      </div>
    </div>
  );
};

export default Synck;
