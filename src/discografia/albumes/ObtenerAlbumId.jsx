import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { PropTypes } from "prop-types";
import ObtenerArtistaId from "./ObtenerArtistaId";
import ObtenerCancionesId from "./ObtenerCancionesId";

const ObtenerAlbumId = ({ nombreArtista }) => {
  const [ocultarAlbum, setOcultarAlbum] = useState(window.innerWidth)
  const { id } = useParams();
  const [datos, setDatos] = useState([]);
  const [alumes, setAlbumes] = useState([]);

  useEffect(() => {
    const anchoPantalla = () => {
      setOcultarAlbum(window.innerWidth);
      //almacena el ancho de pantalla en el navegador
    }
    window.addEventListener('resize', anchoPantalla);

    return () => {
      window.removeEventListener('resize', anchoPantalla);
    };
  }, []);


  useEffect(() => {
    const TraerDatos = async () => {
      try {
        const response = await fetch(
          `http://localhost:3001/albumes/obtenerAlbum/${id}`
        );
        const data = await response.json();
        setDatos(data);
      } catch (error) {
        console.error("el error es :", error.message);
      }
    };
    TraerDatos();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  const idArtista = datos.Id_artista;

  return (
    <div className="flex flex-col m-5 sm:m-20">
      <ObtenerArtistaId idArtista={idArtista} />
      {datos && (
        <div className="w-full text-white font-akshar flex flex-col lg:flex-row lg:gap-14">
          <div className="w-full lg:w-5/12">

            <div className={`texto-degradado ${ocultarAlbum > 640 ? 'hidden' : ''}`}>
              <h2 className={`text-5xl font-extrabold sm:mt-5 sm:p-5 lg:mt-0 `}>
                {datos.Nombre_album}
              </h2>

              <div className="flex justify-between p-2 sm:p-4">
                <p>Juan Manuel Sanchez</p>
                <p className="text-sm sm:text-xl">
                  {new Date(datos.Fecha_album)
                    .toLocaleDateString()
                    .replace(/\//g, "-")}
                </p>
              </div>
            </div>

            <div >
              <img
                className="w-auto sm:h-[500px] object-contain"
                loading="lazy"
                src={`./../../../public/${datos.Foto_album}`}
                alt="foto del album"
              />
            </div>


            <p className={`text-xl ${ocultarAlbum < 640 ? 'hidden' : ''}`}>
              {new Date(datos.Fecha_album)
                .toLocaleDateString()
                .replace(/\//g, "-")}
            </p>
          </div>
          <div className="w-full lg:w-7/12">
            <p className={`font-bold texto-degradado text-3xl lg:text-7xl ${ocultarAlbum < 641 ? 'hidden' : ''}`}>
              {datos.Nombre_album}
            </p>
            <ObtenerCancionesId id={id} />
          </div>
        </div>
      )}
      <div className="w-full flex justify-center mt-5">
        <hr className=" w-11/12" />


      </div>
    </div>

  );
};

ObtenerAlbumId.propTypes = {
  nombreArtista: PropTypes.string,
};

export default ObtenerAlbumId;
