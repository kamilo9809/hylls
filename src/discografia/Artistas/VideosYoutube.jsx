import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import prev from "./../../assets/icons/prev.svg";
import next from "./../../assets/icons/next.svg";

const VideosYoutube = () => {
  const [datos, setDatos] = useState([]);
  const [videoIndex, setVideoIndex] = useState(0); 
  const [ocultarBotones, setOcultarBotones] = useState(window.innerWidth);
  
  const { id } = useParams();
  console.log(id)

  useEffect(() => {
    const traerVideos = async () => {
      try {
        const response = await fetch(
          `http://localhost:3001/videos/obtenerVideosEmbed/${id}`
        );
        const data = await response.json();
        console.log("Datos recibidos:", data); // Agregar esta línea para imprimir los datos recibidos
        setDatos(data);      
      } catch (error) {
        console.error("Error al obtener los videos:", error);
      }
    };
    traerVideos();
  }, [id]);

  useEffect(() => {
    const anchoPantalla = () => {
      setOcultarBotones(window.innerWidth);
    }
    window.addEventListener('resize', anchoPantalla);
    return () => {
      window.removeEventListener('resize', anchoPantalla);
    };
  }, []);

  const handleClickPrev = () => {
    if (videoIndex > 0) {
      setVideoIndex(videoIndex - 1);
    }
  };

  const handleClickNext = () => {
    if (videoIndex < datos.length - 1) {
      setVideoIndex(videoIndex + 1);
    }
  };



  return (
    <>
      <div className="w-full mt-20 sm:h-[110vh] flex justify-between items-center mb-16">
      {datos && datos.map((video, index) => (
        <div
          key={video.Id_video_artista}
          className={`w-full absolute flex justify-center z-0 transition-opacity${index === videoIndex ? "" : " hidden"} pt-10`}
        >
          <div className={`absolute -left-96 top-[200px] md:-top-[10px] ${ocultarBotones < 768 ? 'hidden' : '' }`}>
            <svg xmlns="http://www.w3.org/2000/svg" width="1200" height="3" viewBox="0 0 301 2" fill="none">
              <path d="M0.40332 0.629395L482.807 0.629437" stroke="#E8D8B0" />
            </svg>
          </div>

          <div className={`absolute -bottom-12 -right-10 ${ocultarBotones < 768 ? 'hidden' : ''}`}>
            <svg xmlns="http://www.w3.org/2000/svg" width="881" height="3" viewBox="0 0 301 2" fill="none">
              <path d="M0.40332 0.629395L482.807 0.629437" stroke="#E8D8B0" />
            </svg>
          </div>

          <div className={`absolute right-1/4 top-[9px] md:top-[0px] sm:right-1/2 ${ocultarBotones > 767 ? 'hidden' : '' }`}>
            <svg xmlns="http://www.w3.org/2000/svg" width="1001" height="2" viewBox="0 0 301 2" fill="none">
              <path d="M0.40332 0.629395L482.807 0.629437" stroke="#E8D8B0" />
            </svg>
          </div>

          <div className={`absolute -bottom-7 left-1/4 sm:ml-40 ${ocultarBotones > 767 ? 'hidden' : ''}`}>
            <svg xmlns="http://www.w3.org/2000/svg" width="681" height="2" viewBox="0 0 301 2" fill="none">
              <path d="M0.40332 0.629395L482.807 0.629437" stroke="#E8D8B0" />
            </svg>
          </div>


          <div className="sm:w-9/12 sm:h-[100vh] flex relative ">
            <iframe
              className="w-full h-full " 
              src={datos[0].video_artista_embed} // Actualizar el src con el enlace del video embed del primer elemento
              title="YouTube video player"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              allowFullScreen
              style={{ border: "none", margin: "0", padding: "0", width: "100%", height: "100%" }}
            ></iframe>
          </div>
        </div>
      ))}

      <div className="z-20 sm:relative sm:-mx-20" >
        <button className={`${ocultarBotones < 640 ? 'hidden' : ''}`} onClick={handleClickPrev}>
          <img loading="lazy" className="sm:ps-28 pointer-events-none" src={prev} alt="" />
        </button>
      </div>
      <div className="z-20 sm:relative sm:-mx-20">
        <button className={`${ocultarBotones < 640 ? 'hidden' : ''}`} onClick={handleClickNext}>
          <img loading="lazy" className="sm:pe-28 pointer-events-none relative" src={next} alt="" />
        </button>
      </div>
    </div>

    <div className={`mt-40 flex justify-center relative  ${ocultarBotones > 640 ? 'hidden' : ''}`}>
      <div className="z-20">
        <button onClick={handleClickPrev}>
          <img loading="lazy" className="sm:ps-28 pointer-events-none" src={prev} alt="" />
        </button>
      </div>
      <div className="z-20">
        <button onClick={handleClickNext}>
          <img loading="lazy" className="sm:pe-28 pointer-events-none relative" src={next} alt="" />
        </button>
      </div>
    </div>
  </>
  );
};

export default VideosYoutube;
