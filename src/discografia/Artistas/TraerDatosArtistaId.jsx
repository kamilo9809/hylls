import { Link, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import twitter from "./../../assets/icons/artistTwitter.svg";
import facebook from "./../../assets/icons/artistFace.svg";
import instagram from "./../../assets/icons/artistInst.svg";
import youtube from "./../../assets/icons/artistYout.svg";
import andres from "./../../assets/images/andresprueba.svg";





const TraerDatosArtistaId = () => {
  const { id } = useParams();
  const [datos, setDatos] = useState([]);
  const [t] = useTranslation("global");
  const [ocultarImagen, setOcultarImagen] = useState(window.innerWidth);


  useEffect(() => {
    const anchoPantalla = () => {
      setOcultarImagen(window.innerWidth);
    }
    window.addEventListener('resize', anchoPantalla);
    return () => {
      window.removeEventListener('resize', anchoPantalla);
    };
  }, []);

  useEffect(() => {
    const traerDatosId = async () => {
      try {
        const response = await fetch(
          `http://localhost:3001/artistas/obtenerArtista/${id}`
        );
        const data = await response.json();
        setDatos(data);
      } catch (error) {
        console.error("el error es:", error.message);
      }
    };
    traerDatosId();
  }, [id]);
  console.log(datos);

  localStorage.setItem("idArtista", datos.Id_artista)

  console.log(localStorage);


  return (
    <div className="w-full h-full pt-16">
      {datos && (
        
        <div className="pt-5">
          <div className="w-full relative " >

            <img
              loading="lazy"
              src={andres}
              alt="imagen banner"
              className={`w-full object-cover sm:object-containh-[25vh] md:h-auto md:object-cover pb-5 ${ocultarImagen < 451 ? 'hidden' : ''}`}
            /*src={`./../../../public/${datos.banner}`}*/
            //el codigo esta bueno y funciona solo que puse la imagen del figma porque las que tenia estaban todas chiquitas y pedorras
            />
            <img
              loading="lazy"
              src={`./../../../public/${datos.bannerMobil}`}
              alt="imagen banner"
              className={`w-full pb-5 ${ocultarImagen > 450 ? 'hidden' : ''}`}
            //el codigo esta bueno y funciona solo que puse la imagen del figma porque las que tenia estaban todas chiquitas y pedorras
            />
            <div className="w-full absolute flex justify-center bottom-9 sm:bottom-9 space-x-10 lg:space-x-20 2xl:bottom-16">
              <Link to={datos.twitter}>
                <img className="w-6 sm:w-12" src={twitter} alt="redes" />
              </Link>
              <Link to={datos.facebook}>
                <img className="w-6 sm:w-10" src={facebook} alt="redes" />
              </Link>
              <Link to={datos.instagram}>
                <img className="w-6 sm:w-10" src={instagram} alt="redes" />
              </Link>
              <Link to={datos.youtube}>
                <img className="w-8 sm:w-14" src={youtube} alt="redes" />
              </Link>
            </div>

            <div className="flex w-full justify-center sm:justify-end sm:pe-20 sm:absolute sm:bottom-9 2xl:bottom-16 ">
              <div>
                <Link
                  to={"#"}
                  className="w-full flex justify-center  text-xs text-gray-300 sm:text-4xl font-akshar border-b-2 ">
                  SMARTLINK
                </Link>
              </div>

            </div>
          </div>
          <div className=" font-akshar lg:px-36 max-sm:px-8 pt-10 sm:p-5">
            <h2 className="w-full text-start text-4xl texto-degradado6">{t("navbar.Discography.Biografy")}</h2>
            <p className="w-full text-lg text-justify flex justify-center py-10 text-white" >{datos.biografia}</p>
          </div>
        </div>
      )}


    </div>
  );
};

export default TraerDatosArtistaId;


