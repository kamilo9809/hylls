import { useState, useEffect } from "react";
import NavbarAbout from "./NavbarAbout";
import Paginador from "./../../components/paginador";
import CardNoticias from "./../noticia/CardNoticias";
import { useTranslation } from "react-i18next";
import axios from "axios";
import React,{Suspense} from "react";

const Footer = React.lazy(()=> import('./../../components/footer_disc'))

const Noticias = () => {
  const [noticias, setNoticias] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [newsPerPage] = useState(3); // Número de noticias por página
  const { t } = useTranslation("global");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "http://localhost:3001/noticias/obtenerNoticia"
        );
        setNoticias(response.data);
      } catch (error) {
        console.error("Error al obtener noticias", error);
      }
    };
    fetchData();
  }, []);

  // Calcular el índice de la última noticia de la página actual
  const indexOfLastNews = currentPage * newsPerPage;
  // Calcular el índice de la primera noticia de la página actual
  const indexOfFirstNews = indexOfLastNews - newsPerPage;
  // Obtener las noticias de la página actual
  const currentNews = noticias.slice(indexOfFirstNews, indexOfLastNews);

  // Cambiar a la siguiente página
  const paginateNext = () => setCurrentPage((prevPage) => prevPage + 1);
  // Cambiar a la página anterior
  const paginatePrev = () => setCurrentPage((prevPage) => prevPage - 1);

  // Calcular el número total de páginas
  const totalPages = Math.ceil(noticias.length / newsPerPage);

  return (
    <>
      <div className="bg-[#0A0A0A] min-h-screen pb-32 overflow-hidden">
        <NavbarAbout />
        <div className="w-full flex justify-center">
          <div
            className="mt-10 b w-full gap-2 sm:gap-20 2xl:gap-24 2xl:w-7/12  xl:gap-2 justify-center"
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", // Ajusta el tamaño de las columnas automáticamente
            }}
          >
            {currentNews.map((noticia) => (
              <CardNoticias key={noticia.Id_noticia} noticia={noticia} />
            ))}
          </div>
        </div>
        <Paginador
          paginasTotales={totalPages}
          paginaActual={currentPage}
          irAtras={paginatePrev}
          irAdelante={paginateNext}
        />

        <div className=" w-full bg-[#111]  flex flex-col sm:flex-row text-white font-akshar items-center justify-between p-4">
          <h2 className="text-3xl w-full sm:w-1/2">{t("news.Title")}</h2>
          <div className="flex flex-col gap-5 w-full sm:flex-row sm:w-1/2 sm:justify-end sm:gap-20">
            <input
              placeholder={t("news.E-mail")}
              className="bg-[#111] sm:w-2/6 border-b my-8"
              type="email"
            />
            <div className="w-2/6 flex justify-start items-center">
              <button onClick={()=>{alert("Correo enviado con exito")}} className="border lg:text-2xl  px-5 py-6 border-[#AEA9A9'] uppercase xl:w-1/2 w-full  ">
                {t("news.Subscribe")}
              </button>
            </div>
          </div>
        </div>


        <div className=" w-full absolute bottom-0">
          <Suspense fallback={<div className="flex justify-center items-center">Cargando..</div>}>
             <Footer />
          </Suspense>
        </div>
      </div>
    </>
  );
};

export default Noticias;
