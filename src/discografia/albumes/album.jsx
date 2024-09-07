import { Link } from "react-router-dom";
import ObtenerAlbumId from "./ObtenerAlbumId";
import NavBarDisc from "../navBarDisc";
import React, { Suspense, useState, useEffect } from "react";

const Footer = React.lazy(() => import('./../../components/footer_disc'));
const FooterFecha = React.lazy(()=> import('./../../administrador/componentes/footerFecha'));

const Album = () => {
  const nombreArtista = localStorage.clave;
  const [ocultar,  setOcultar] = useState(window.innerWidth);

  useEffect(()=>{
    const anchoPantalla = ()=>{
      setOcultar(window.innerWidth);
    }
    window.addEventListener('resize', anchoPantalla);

    return()=>{
      window.addEventListener('resize', anchoPantalla)
    }
  },[])

  return (
    <div>
      <NavBarDisc />
      <div>
        <div className=" pt-5 sm:pt-10 flex w-full justify-center ">
          <Link
            to={"/Albumes"}
            className="text-[#D9D9D9]  w-11/12"
          >
            <p className="text-xs sm:text-lg mt-4 ml-2">&lt; REGRESAR</p>
          </Link>
        </div>
      </div>
      <ObtenerAlbumId nombreArtista={nombreArtista} />
      <div className="mt-10">
        <Suspense fallback={<div className="flex justify-center items-center">Cargando...</div>}>
          <Footer />
        </Suspense>
      </div>

      <div className={`relative mt-32 flex justify-start  ${ocultar > 640 ? 'hidden': ''}`}>
        <Suspense fallback={<div className="flex justify-center items-center">Cargando...</div>}>
          <FooterFecha />
        </Suspense>
      </div>

    </div>
  );
};

export default Album;
