import Footer_disc from "./../../components/footer_disc";
import GrillaVideos from "./grillaVideos";
import NavBarDisc from "./../navBarDisc";

/**
 * Página principal que muestra la lista de videos.
 * @returns {JSX.Element} Elemento JSX que representa la página de videos.
 */
const VideosPage = () => {

  return (
    <div className="w-full h-full bg-[#0A0A0A] relative">
      {/* Barra de navegación */}
      <NavBarDisc/>
      <div className="bg-tranparent w-auto h-full mt-5 md:pt-16">
          <GrillaVideos />
      </div>

      {/* Componente del pie de página */}
      <div className="relative pt-10 h-auto w-full">
        <Footer_disc />
      </div>
    </div>
  );
};

export default VideosPage;