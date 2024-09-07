import { useState, useEffect } from "react";
import CardVideo from "./cardVideo";
import SearchBar from "./../../components/searchBar";
import { obtenerInformacionVideo } from './youtubeService';
import { mostrarAlerta } from "./../../administrador/config/Alerta";
import { useTranslation } from "react-i18next";

const GrillaVideos = () => {
  const [videos, setVideos] = useState([]);
  const [filteredVideos, setFilteredVideos] = useState([]);
  const [t] = useTranslation("global");

  useEffect(() => {
    const traerVideos = async () => {
      try {
        const url = `http://localhost:3001/videos/obtenerVideos`;
        const respuesta = await fetch(url);
        const datos = await respuesta.json();
        setVideos(datos);
        setFilteredVideos(datos); // Inicialmente, los videos filtrados son los mismos que los videos obtenidos.
      } catch (error) {
        console.error(error);
        // Mostrar una alerta de error
        mostrarAlerta("error", "Hubo un error al obtener los videos");
      }
    };

    traerVideos();
  }, []);

  const handleSearch = async (searchTerm) => {
    try {
      const filtered = await Promise.all(
        videos.map(async (video) => {
          const videoInfo = await obtenerInformacionVideo(video.video_artista);
          return {
            ...video,
            title: videoInfo.title,
          };
        })
      );

      const filteredVideos = filtered.filter((video) =>
        video.video_artista.toLowerCase().includes(searchTerm.toLowerCase()) ||
        (video.title && video.title.toLowerCase().includes(searchTerm.toLowerCase()))
      );

      setFilteredVideos(filteredVideos);

      if (filteredVideos.length === 0) {
        // Mostrar una alerta si no se encuentran videos
        mostrarAlerta("info", "No se encontraron videos");
      }
    } catch (error) {
      console.error(error);
      // Mostrar una alerta de error
      mostrarAlerta("error", "Hubo un error al realizar la búsqueda");
    }
  };

  return (
    <>
      <div className="w-full items-center justify-center h-fit bg-[#0A0A0A]">
        <SearchBar onSearch={handleSearch} placeholderText={t("filter.Placeholder3")} />
      </div>

      <div className="flex justify-center items-center ">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-5 mt-5 sm:mt-10 bg-[#0A0A0A]">
          {filteredVideos.length > 0 ? (
            filteredVideos.map((video) => (
              <CardVideo key={video.Id_video_artista} videoUrl={video.video_artista} />
            ))
          ) : null}
        </div>
      </div>

    </>
  );
};

export default GrillaVideos;