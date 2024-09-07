import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Navbar from "./../../componentes/navbar";
import AdminHeader from "./../../componentes/adminHeader";
import SearchBar from "./../../../components/searchBar";
import FooterAdmin from "../../componentes/footerAdmin";
import Paginador from "./../../../components/paginador";
import { mostrarAlerta, mostrarConfirmacion } from "./../../config/Alerta";
import obtenerTokenAlmacenado from "./../../../helpers/obtenerToken";


const VideosCrud = () => {
  const [videos, setVideos] = useState([]);
  const [paginaActual, setPaginaActual] = useState(1);
  const [videosPorPagina] = useState(5);
  const [videosFiltrados, setVideosFiltrados] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    const obtenerVideos = async () => {
      try {
        const respuesta = await fetch(
          "http://localhost:3001/videos/obtenerVideos"
        );
        const datos = await respuesta.json();
        const decryptedData = datos;
        setVideos(decryptedData);
        setVideosFiltrados(decryptedData);
      } catch (error) {
        console.error("Error al obtener videos:", error);
      }
    };

    obtenerVideos();
  }, []);



  const eliminarVideo = async (id) => {
    const token = obtenerTokenAlmacenado();
  
    const confirmacion = await mostrarConfirmacion("¿Deseas eliminar este video?", "Sí, eliminar");
  
    if (confirmacion.isDenied || !confirmacion.isConfirmed) {
      return;
    }
  
    try {
      const response = await fetch(`http://localhost:3001/videos/borrarVideos/${id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
  
      if (!response.ok) {
        // Si el código de estado no es OK, lanza una excepción
        throw new Error(`Error en la eliminación del video (${response.status}): ${response.statusText}`);
      }
  
      // La eliminación en el servidor fue exitosa
      const nuevosVideos = videos.filter((video) => video.Id_video_artista !== id);
      setVideos(nuevosVideos);
      setVideosFiltrados(nuevosVideos);
  
      mostrarAlerta("success", "Video eliminado correctamente");
    } catch (error) {
      console.error("Error al eliminar video:", error.message);
      mostrarAlerta("error", "Hubo un error al intentar eliminar el video o tienes los permisos necesarios");
    }
  };
  


  const obtenerVideosPaginados = () => {
    const indiceUltimoVideo = paginaActual * videosPorPagina;
    const indicePrimerVideo = indiceUltimoVideo - videosPorPagina;
    const videosPaginados = videosFiltrados.slice(
      indicePrimerVideo,
      indiceUltimoVideo
    );
    return videosPaginados;
  };

  const irAPagina = (numeroPagina) => {
    setPaginaActual(numeroPagina);
  };

  const irAtras = () => {
    if (paginaActual > 1) {
      setPaginaActual(paginaActual - 1);
    }
  };

  const irAdelante = () => {
    if (paginaActual < Math.ceil(videos.length / videosPorPagina)) {
      setPaginaActual(paginaActual + 1);
    }
  };

  const irAtrasTres = () => {
    if (paginaActual > 3) {
      setPaginaActual(paginaActual - 3);
    } else {
      setPaginaActual(1);
    }
  };

  const irAdelanteTres = () => {
    if (paginaActual + 3 <= Math.ceil(videos.length / videosPorPagina)) {
      setPaginaActual(paginaActual + 3);
    } else {
      setPaginaActual(Math.ceil(videos.length / videosPorPagina));
    }
  };

  const handleSearch = async (term) => {
    try {
      setSearchTerm(term);

      const videosFiltrados = videos.filter(
        (video) =>
          video.Nombre.toLowerCase().includes(term.toLowerCase()) ||
          video.video_artista.toLowerCase().includes(term.toLowerCase())
      );
      setVideosFiltrados(videosFiltrados);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    const handleSearch = async (term) => {
      try {
        setSearchTerm(term);
        const respuesta = await fetch(
          "http://localhost:3001/videos/obtenerVideos"
        );
        const datos = await respuesta.json();
        console.log(datos);
        const videosFiltrados = datos.filter((video) =>
          video.video_artista.toLowerCase().includes(term.toLowerCase())
        );
        setVideosFiltrados(videosFiltrados);
      } catch (error) {
        console.log(error);
      }
    };

    handleSearch(searchTerm);
  }, [searchTerm]);


  return (
    <div className="flex flex-col min-h-screen bg-[#1E1B1B] relative overflow-hidden pb-[60px]">
      <Navbar />
      <div className="w-full p-5">
        <AdminHeader mostrarBotonProp={false} />
      </div>

      <div>
        <h2 className="text-[20px] text-[#E8D8B0] text-center font-extrabold lg:absolute lg:left-[30%] lg:top-[15%] xl:left-[20%]">
          Nuestros <span className="font-bold admincontainer-h2">Videos</span>
        </h2>

        <div>
          <div className="w-full items-center justify-center h-fit">
            <SearchBar placeholderText={"Buscar..."} onSearch={handleSearch} />
          </div>
        </div>

        <div className="pt-12 flex flex-col justify-center items-center">
          <div className="flex justify-center items-center bg-[#E8D8B0] w-fit p-2 rounded-lg cursor-pointer boton-animado lg:absolute lg:right-[30%] lg:top-[15%] xl:right-[20%]">
            <Link
              to={"/administrador/videosArtista/crear_videos"}
              className="flex items-center gap-1"
            >
              Nuevo registro
              <img
                src="/src/assets/polygonos/boton-agregar.svg"
                className="w-[1rem] h-[1rem]"
                alt="agregar"
              />
            </Link>
          </div>

          <div className="pt-12 text-white w-full sm:w-auto">
            <ul>
              {Array.isArray(videosFiltrados) &&
                obtenerVideosPaginados().map((video) => (
                  <li
                    key={video.Id_video_artista}
                    className="flex items-center gap-9 sm:gap-3 justify-around border-b border-[#E8D8B0] p-3"
                  >
                    <div className="rounded-[50%] w-[60px] sm:w-auto">
                      <img
                        src="/src/assets/icons/youtube.svg"
                        className="w-[5rem] h-[4rem] sm:w-[6rem] sm:h-[6rem] rounded-[50%]"
                        alt=""
                      />
                    </div>

                    <div className="w-2/4 sm:w-[6rem] lg:w-[22rem]">
                      <p>{`#${video.Id_video_artista}`}</p>
                      <p>{video.Nombre || "Sin artista"}</p>
                      <a
                        href={`https://www.youtube.com/watch?v=${video.video_artista}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-[#E8D8B0] text-[16px] sm:text-[20px] hover:underline"
                      >
                        Ver video
                      </a>
                    </div>

                    <div className="flex h-full flex-col justify-between gap-10">
                      <button
                        onClick={() => eliminarVideo(video.Id_video_artista)}
                        className="text-red-500 hover:underline"
                      >
                        <img
                          src="/src/assets/polygonos/borrar-icono.svg"
                          className="w-[1.5rem] h-[1.5rem]"
                          alt="borrar"
                        />
                      </button>

                      <Link
                        to={`/administrador/videosArtista/actualizar_videos/${video.Id_video_artista}`}
                        className="text-blue-500 hover:underline"
                      >
                        <img
                          src="/src/assets/polygonos/editar-icono.svg"
                          className="w-[1.5rem] h-[1.5rem]"
                          alt="editar"
                        />
                      </Link>
                    </div>
                  </li>
                ))}
            </ul>
          </div>
        </div>

        <Paginador
          paginasTotales={Math.ceil(videosFiltrados.length / videosPorPagina)}
          paginaActual={paginaActual}
          irAPagina={irAPagina}
          irAtras={irAtras}
          irAdelante={irAdelante}
          irAtrasTres={irAtrasTres}
          irAdelanteTres={irAdelanteTres}
        />
      </div>
      <FooterAdmin />
    </div>
  );
};

export default VideosCrud;
