import NavbarAbout from "./NavbarAbout";
import { useTranslation } from "react-i18next";
import fbicon from "./../../assets/icons/fb-icon.svg";
import igicon from "./../../assets/icons/ig-icon.svg";
import twicon from "./../../assets/icons/tw-icon.svg";
import hyllsBanner from "./../../assets/images/Vector.png";
import circuloblur from "./../../assets/polygonos/circuloBlur.svg";
import poligonoAbout from "./../../assets/polygonos/poligonoAbout.svg";
import React,{ Suspense } from "react";

const Footer = React.lazy(()=> import('./../../components/footer_disc'));

const SobreNosotros = () => {
  const [t] = useTranslation("global");

  return (
    <div>
      <div className="w-full min-h-screen relative overflow-hidden">
        <div>
          <div className="absolute z-20 pointer-events-none">
            <img loading="lazy" src={poligonoAbout} alt="poligonotransversal" width={1400} />
          </div>
          <div className="relative z-0">
            <NavbarAbout />
            <div className="pt-28 flex flex-col gap-5 lg:px-28 ">
              <h2 className="text-white text-center diseñoletras sm:text-[64px] font-akshar font-extrabold text-[35px]">
                {t("about.Title")}
              </h2>
              <div className=" text-zinc-300 flex flex-col gap-5 text-center font-akshar text-xl">
                <p>
                  <strong>{t("about.Paragraph1PartOne")}</strong>
                  {t("about.Paragraph1PartTwo")}
                  <strong>{t("about.Paragraph1PartThree")}</strong>
                </p>
                <p>
                  {t("about.Paragraph2PartOne")}
                  <strong>{t("about.Paragraph2PartTwo")}</strong>
                  {t("about.Paragraph2PartThree")}
                </p>
              </div>
            </div>
            <div className="flex w-full justify-center gap-16 pt-10">
              <img loading="lazy" src={fbicon} alt="iconofb" width={20} />
              <img loading="lazy" src={igicon} alt="iconoig" width={20} />
              <img loading="lazy" src={twicon} alt="iconotw" width={20} />
            </div>
            <div className=" w-full flex justify-center pt-10">
              <img
              loading="lazy"
                src={hyllsBanner}
                alt="Banner"
                className="w-full sm:w-[86%]"
              />
            </div>
          </div>
          <div className="absolute w-2/3 right-5 bottom-0 pointer-events-none ">
            <img loading="lazy" src={circuloblur} alt="circulo" width={517} />
          </div>
        </div>
        <div className="w-full absolute bottom-0">
          <Suspense fallback={<div className="flex justify-center items-center">Cargando...</div>}>
            <Footer />
          </Suspense>
          
        </div>
      </div>
    </div>
  );
};

export default SobreNosotros;
