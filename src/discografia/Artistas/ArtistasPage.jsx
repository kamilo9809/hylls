import NavBarDisc from "../navBarDisc";
import Search from "./../../assets/icons/search.png";
import Filter from "./../../assets/icons/Filter.svg";
import Line from "./../../assets/icons/line.svg";
import VerticalLine from "./../../assets/icons/vertical-line.svg";
import { useTranslation } from "react-i18next";
import React, { Suspense } from "react";

const Footer = React.lazy(() => import('./../../components/footer_disc'));
const ArtistasCard = React.lazy(() => import('./ArtistasCard'));
const FooterFecha = React.lazy(()=> import('./../../administrador/componentes/footerFecha'));

const ArtistasPageP = () => {
  const [t] = useTranslation("global");

  return (
    <div className="min-h-screen bg-[#0A0A0A] overflow-x-hidden overflow-y-hidden pb-44 relative  ">
      <NavBarDisc />
      <div className="flex flex-col h-full justify-between pt-16">
        <div className="w-full" id="global">
          <div className="w-screen items-center justify-center  bg-[#0A0A0A] ">
            <div className="items-center justify-center flex gap-4 pt-6">
              <button>
                <img loading="lazy" src={Search} alt="Search" />
              </button>
              <img loading="lazy" src={VerticalLine} alt="" />
              <input
                type="text"
                className="w-60 border-none bg-[#0A0A0A] text-white sm:w-1/4"
                placeholder={t("filter.Placeholder")}
              />
              <button>
                <img loading="lazy" src={Filter} alt="Filter" />
              </button>
            </div>
            <div className="items-center justify-center bg-[#0A0A0A] pt-0 flex">
              <img loading="lazy" src={Line} alt="Filter" className="w-4/5 sm:w-3/5 sm:pl-32 sm:pr-28 md:w-6/12 md:pl-16 md:pr-28 lg:w-1/2 lg:pr-32 lg:pl-24 xl:w-2/6 xl:pr-16 xl:pl-5" />
            </div>
          </div>
        </div>

        <Suspense fallback={<div className="flex justify-center items-center">Cargando...</div>}>
          <ArtistasCard />
        </Suspense>

      </div>
      <div className="absolute bottom-0 w-full">
        <Suspense fallback={<div className="flex justify-center items-center">Cargando...</div>}>
          <Footer />
        </Suspense>
      </div>

      <div className="absolute bottom-0 w-full">
        <Suspense fallback={<div className="flex justify-center items-center">Cargando...</div>}>
          <FooterFecha />
        </Suspense>
      </div>

    </div>
  )
}
export default ArtistasPageP;
