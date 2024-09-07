import React, { Suspense } from "react";
import Footer_ser from "./../../components/footer_ser";
import { useTranslation } from "react-i18next";
import { PropTypes } from "prop-types";
import Logo from "./../../assets/images/hylls-logo.png";
import { Link } from "react-router-dom";
import LanguageContext from "./../../components/LanguageBottom";
import { useState } from "react";
import NavBarDespegable from "./../../components/nav_bar_despegable";
import menubar from "./../../assets/images/menubarTemporal.svg";

// Importa los componentes de forma diferida
const ProduccionComposicion = React.lazy(() => import("./prod_com"));
const Mezcla = React.lazy(() => import("./mezcla"));
const Distribuccion = React.lazy(() => import("./distrib"));
const AudioVisual = React.lazy(() => import("./audiovi"));
const Legal = React.lazy(() => import("./legal"));

const Destino = {
  "Produccion y composicion": "#produccion",
  Distribucion: "#Distribucion",
  AudioVisual: "#AudioVisual",
  Legal: "#Legal",
};

const ListComponentService = ({ Destino }) => {
  const [isNavVisible, setIsNavVisible] = useState(false);

  const toggleNavVisibility = () => {
    setIsNavVisible(!isNavVisible);
  };

  Object.keys(Destino).map((key) => {
    console.log(Destino[key]);
  })

  return (
    <div className="">
      <div className="flex flex-row w-full justify-between bg-[#0A0A0A] pb-8 pt-5 px-8">
        <div className="w-1/2 max-[768px]:hidden"></div>
        <div className="w-1/2 flex justify-center max-[768px]:justify-start">
          <Link to={"/"}>
            <img src={Logo} alt="logo" />
          </Link>
        </div>
        <div className="flex flex-row w-1/2 justify-end items-center gap-10">
          <span className="text-md text-[#E8D8B0] underline ">
            <LanguageContext />
          </span>
          <img
            src={menubar}
            className="z-[1600] cursor-pointer	"
            alt="menu"
            width={30}
            onClick={toggleNavVisibility}
          />

          {isNavVisible && <NavBarDespegable />}
        </div>
      </div>
      <div className="flex w-full space-x-3 sm:space-x-10 sm:px-32 pe-5">
        {Object.keys(Destino).map((key) => (
          <a key={key} href={Destino[key]}>
            <p className="texto-degradado text-center sm:text-xl font-akshar uppercase">{key}</p>
          </a>
        ))}
      </div>
    </div>
  );
};

const BodyServicios = () => {
  const [t] = useTranslation("global");
  const elementos = {
    Produccion: t("navbar.Services.Production"),
    Distribucion: t("navbar.Services.Distribution"),
    AudioVisual: t("navbar.Services.Promotion"),
    Legal: "LEGAL",
  };
  return (
    <div className="bg-[#0A0A0A] h-full font-akshar overflow-x-hidden ">
      <ListComponentService
        elementos={elementos}
        Destino={Destino}
        className="flex justify-center md:justify-start gap-2 sm:gap-20 w-full  bg-[#0A0A0A]  sm:pl-20 texto-degradado6  font-ligth sm:text-base uppercase text-[8px] text-end pe-3 sm:pe-0"
        pagina="Artistas"
      />
      <Suspense
        fallback={
          <div className="flex justify-center items-center">Cargando...</div>
        }
      >
        {/* Renderiza los componentes de forma diferida */}
        <ProduccionComposicion id="produccion" />
        <Mezcla id="Mezcla" />
        <Distribuccion id="Distribucion" />
        <AudioVisual id="AudioVisual" />
        <Legal id="Legal" />
      </Suspense>
      <Footer_ser />
    </div>
  );
};

ListComponentService.propTypes = {
  Destino: PropTypes.String,
};

export default BodyServicios;
