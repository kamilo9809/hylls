import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { obtenerInformacionVideo } from "./youtubeService";
import "./../../styles/cardVideo.css";
import { PropTypes } from "prop-types"

/**
 * Componente que muestra un video en formato de tarjeta.
 * @param {Object} props - Propiedades del componente.
 * @param {string} props.videoUrl - URL del video de YouTube.
 * @returns {JSX.Element} Elemento JSX que representa la tarjeta del video.
 */
export default function CardVideo({ videoUrl }) {
  const [videoInfo, setVideoInfo] = useState(null);
  const [ocultarInfo, setOcultarInfo] = useState(window.innerWidth);


  useEffect(() => {
    const anchoPantalla = () => {
      setOcultarInfo(window.innerWidth);
    }
    window.addEventListener('resize', anchoPantalla);

    return () => {
      window.removeEventListener('resize', anchoPantalla);
    }
  }, []);

  useEffect(() => {
    const fetchVideoInfo = async () => {
      try {
        const videoInfo = await obtenerInformacionVideo(videoUrl);
        setVideoInfo(videoInfo);
      } catch (error) {
        console.error("Error al obtener información del video:", error);
      }
    };

    fetchVideoInfo();
  }, [videoUrl]);

  if (!videoInfo) {
    return console.log('Error al cargar video');
  }

  const publishDate = new Date(videoInfo.publishDate);
  const formattedDate = `${publishDate.getDate()}/${publishDate.getMonth() + 1
    }/${publishDate.getFullYear() % 100}`;
  // w-[24rem] h-[25rem] 
  return (

    <div className="flex justify-center items-center">
      <Link to={`https://www.youtube.com/watch?v=${videoUrl}`} className="no-underline">
        <div className="card-video-container text-white bg-opacity-50 bg-black relative w-full justify-center items-center">
          <div>
            <img
              className="w-[20rem] h-[12rem] sm:w-full sm:max-w-[340px] sm:h-[22rem] object-cover"
              src={videoInfo.thumbnail}
              alt="Miniatura del video"
            />
          </div>
          <div className={`flex sm:hidden`}>
            {/* <h2 className="uppercase text-xs font-normal truncate titulo-video">
              {videoInfo.title}
            </h2>
            <p className="uppercase text-xs font-normal fecha-video pt-2">
              {formattedDate}
            </p> */}
          </div>
          <div className="cortina absolute inset-0 flex items-center justify-center">
            <div className="play-btn-container">
              <img
                className="w-full"
                src="./src/assets/polygonos/next.svg"
                alt="Botón de reproducción"
              />
            </div>
          </div>
          <div className={`absolute bottom-0 left-0 right-0 px-2 py-2 bg-black bg-opacity-50 ${ocultarInfo < 700 ? 'hidden' : ''}`}>
            <h2 className="uppercase text-2xl font-normal truncate titulo-video">
              {videoInfo.title}
            </h2>
            <p className="uppercase text-2xl font-normal fecha-video pt-2">
              {formattedDate}
            </p>
          </div>

        </div>
      </Link>
      <div>

      </div>

    </div>
  );
}

CardVideo.propTypes = {
  videoUrl: PropTypes.String
}
