import { useParams } from "react-router-dom";
import NavBar from "../../../components/nav_bar";

const VistaPreviaVideo = () => {
  const { videoUrl } = useParams();

  return (
    <>
      <NavBar />
      <div className="relative w-full h-screen overflow-hidden">
        <video
          autoPlay
          loop
          className="w-full rounded-md mb-2"
          src={decodeURIComponent(videoUrl)} // Decodificar la URL del video, enviada desde CrearVideosHero.jsx
          alt="Video Preview"
        />
      </div>

      <footer className="footer-bar fixed bottom-0 left-0 w-full flex flex-col sm:flex-row justify-between items-center py-4 sm:py-9 px-4 sm:px-20 text-base sm:text-lg">
        <div className="mb-4 sm:mb-0 text-center sm:text-left">
          <p>© 2023 HYLLS. Todos los derechos reservados</p>
        </div>

        <div className="reproductor-footer sm:w-5/6 h-8 flex sm:flex-row justify-center items-center  sm:items-center gap-4 px-4">
          <div>
            <img
              className="sm:max-w-5 w-full"
              src="\src\assets\icons\linea-2.svg"
              alt="linea2"
            />
          </div>

          <button className="w-9">
            <img className="w-full" src="/src/assets/icons/mute.svg" alt="" />
          </button>

          <div>
            <img
              className="sm:max-w-5 w-full"
              src="\src\assets\icons\linea-1.svg"
              alt="linea1"
            />
          </div>
        </div>

        <div className="mt-4 sm:mt-0 text-center sm:text-left">
          <p className="text-sm sm:text-lg">
            Términos del Servicio y Políticas de Privacidad
          </p>
        </div>
      </footer>
    </>
  );
};

export default VistaPreviaVideo;
