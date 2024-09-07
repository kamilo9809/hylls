import React, { Suspense } from "react";
import NavBarDisc from "../navBarDisc";


// Importa los componentes de forma diferida
const LazyTraerDatosArtistaId = React.lazy(() => import("./TraerDatosArtistaId"));
const LazyVideosYoutube = React.lazy(() => import("./VideosYoutube"));
const Footer = React.lazy(()=> import('./../../components/footer_disc'));
const FooterFecha = React.lazy(()=> import('./../../administrador/componentes/footerFecha'));


const Artista = () => {
  return (
    <div className="w-full min-h-screen pb-44 relative overflow-x-hidden overflow-y-hidden">
      <NavBarDisc />
      {/* Suspense para TraerDatosArtistaId */}
      <Suspense fallback={<div className="flex justify-center items-center">Cargando...</div>}>
        <LazyTraerDatosArtistaId />
      </Suspense>

      <div className="flex justify-start ps-8 text-lg pb-5 sm:-pb-0 sm:-mb-20 items-center sm:justify-start text-white sm:ps-36 sm:text-3xl">
        <h2 className="texto-degradado5">ÙLTIMOS LANZAMIENTOS</h2>
      </div>

      {/* Suspense para VideosYoutube */}
      <Suspense fallback={<div className="flex justify-center items-center">Cargando...</div>}>
        <LazyVideosYoutube />
      </Suspense>

      <div className="absolute w-full bottom-0 left-0">
        <Suspense fallback={<div className="flex justify-center items-center">Cargando...</div>}>
          <Footer />
        </Suspense>
        
        <Suspense fallback={<div className="flex justify-center items-center">Cargando...</div>}>
          <FooterFecha />
        </Suspense>
      </div>
    </div>
  );
};

export default Artista;
