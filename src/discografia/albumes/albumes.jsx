import Search from "./../../assets/icons/search.png";
import Filter from "./../../assets/icons/Filter.svg";
import Line from "./../../assets/icons/line.svg";
import VerticalLine from "./../../assets/icons/vertical-line.svg";
import { useTranslation } from "react-i18next";
import React from "react";
const NavBarDisc = React.lazy(() => import("./../navBarDisc"));
const CardsAlbumes = React.lazy(() => import("./CardsAlbumes"));
const Footer = React.lazy(() => import("./../../components/footer_disc"));
const FooterFecha = React.lazy(()=> import('./../../administrador/componentes/footerFecha'));

const Albumes = () => {
  const [t] = useTranslation("global");

  return (
    <div className="w-full min-h-screen pb-32 relative">
      <React.Suspense fallback={<div className="flex justify-center items-center">Cargando...</div>}>
        <NavBarDisc />
      </React.Suspense>
      <div className="w-full pt-16" id="global">
        <div className="w-screen items-center justify-center h-fit bg-[#0A0A0A]">
          <div className="items-center justify-center flex gap-4 pt-6">
            <button>
              <img src={Search} alt="Search" loading="lazy" />
            </button>
            <img src={VerticalLine} alt="" loading="lazy" />
            <input
              type="text"
              className="w-60 border-none bg-[#0A0A0A] text-white sm:w-1/4"
              placeholder={t("filter.Placeholder2")}
            />
            <button>
              <img src={Filter} alt="Filter" loading="lazy" />
            </button>
          </div>
          <div className="items-center justify-center bg-[#0A0A0A] pt-0 flex">
            <img src={Line} alt="Filter" className="w-4/5 pr-4 sm:w-4/12 sm:pr-14 sm:pl-8" loading="lazy" />
          </div>
        </div>
        <div className="w-screen bg-[#0A0A0A] flex" id="Artistas"></div>
      </div>
      <div className="pt-2">
        <React.Suspense fallback={<div className="flex justify-center items-center">Cargando...</div>}>
          <CardsAlbumes />
        </React.Suspense>
      </div>
      <div className=" absolute w-full  bottom-0  ">
        <React.Suspense fallback={<div className="flex justify-center items-center">Cargando...</div>}>
          <Footer />
        </React.Suspense>

        <React.Suspense fallback={<div className="flex justify-center items-center">Cargando...</div>}>
          <FooterFecha />
        </React.Suspense>
      </div>
    </div>
  );
};

export default Albumes;
