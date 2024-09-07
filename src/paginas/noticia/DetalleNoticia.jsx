import React, { useEffect, useState, Suspense } from "react";
import { useParams } from "react-router-dom";
import NavbarAbout from "../compañia/NavbarAbout";
import axios from "axios";
import "./../../styles/noticias.css";

const CarruselNoticias = React.lazy(() => import("./CarrouselNoticias"));
const Footer = React.lazy(() => import('../../components/footer_disc'));

const DetalleNoticia = () => {
  const [noticia, setNoticia] = useState(null);
  const { id } = useParams();

  useEffect(() => {
    const traerDetalleNoticia = async () => {
      try {
        const response = await axios.get(
          `http://localhost:3001/noticias/obtenerNoticia/${id}`
        );
        const data = response.data;
        console.log("Detalles de la noticia", data);
        setNoticia(data);
      } catch (error) {
        console.error("Error al obtener detalles de la noticia", error);
      }
    };

    traerDetalleNoticia();
  }, []);

  if (!noticia) {
    return <div>Cargando...</div>;
  }

  return (
    <div className="bg-[#0A0A0A] h-full">
      <NavbarAbout />
      <div className="w-full h-5/6">
        <div className="text-white py-20 sm:px-20 lg:flex gap-12">
          <div className=" w-full sm:w-2/3 p-5 flex">
            <div className="w-[100%] flex flex-col justify-evenly gap-10">
              <h2 className="texto-degradado text-4xl sm:text-5xl uppercase">
                {noticia.Titulo}
              </h2>
              <h3 className="uppercase text-xl">{noticia.Descripcion_corta}</h3>
              <div>
                <p className="text-[#E8D8B0] text-xl mb-10 ">{noticia.Fecha}</p>
                <span className="w-2/4">
                  <img
                    loading="lazy"
                    className="w-1/2 sm:w-1/4"
                    src="\src\assets\icons\linea-2.svg"
                    alt="noticia imagen"
                  />
                </span>
              </div>

              <div className="sm:hidden relative">
              <img
                loading="lazy"
                src={`./../public/${noticia.Imagen}`}
                alt=""
                className="w-full h-96 object-cover  "
              />
              <h2 className="absolute z-50 text-right pr-5 text-4xl text-[#E8D8B0] shadow-md right-0 bottom-1">
                {noticia.Id_noticia}
              </h2>
  
            </div>

              <p className="text-xl w-full max-w-full overflow-hidden whitespace-pre-wrap descripcion-larga">
                {`"${noticia.Descripcion_larga}"`}
              </p>
              <div className="w-full pl-5 flex justify-between">
                <button className="texto-degradado4 text-xl boton-compartir">
                  Compartir
                </button>
                <a
                  href="#"
                  className="uppercase text-xl texto-degradado3 boton-visitar"
                >
                  Visitar Anexos
                </a>
              </div>
            </div>
          </div>

          <div className="h-full hidden sm:block">
            <img
              loading="lazy"
              src={`./../public/${noticia.Imagen}`}
              alt=""
              className="sm:w-full w-64 h-full bg-cover"
            />
            <h2 className="relative z-50 bottom-14 text-right pr-5 text-4xl text-[#E8D8B0] shadow-md">
              {noticia.Id_noticia}
            </h2>

          </div>
        </div>
      </div>
      <Suspense fallback={<div className="flex justify-center items-center">Cargando...</div>}>
        <CarruselNoticias />
      </Suspense>

      <div className="relative bottom-0 left-0 right-0 pt-11">
        <Suspense fallback={<div>Cargando...</div>}>
          <Footer />
        </Suspense>

      </div>
    </div>
  );
};

export default DetalleNoticia;
