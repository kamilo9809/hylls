import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Navbar from "./../../componentes/navbar";
import AdminHeader from "./../../componentes/adminHeader";
import SearchBar from "./../../../components/searchBar";
import FooterAdmin from "../../componentes/footerAdmin";
import Paginador from "./../../../components/paginador";
import { mostrarAlerta, mostrarConfirmacion } from "./../../config/Alerta";
import obtenerTokenAlmacenado from "./../../../helpers/obtenerToken";


function VideosHeroCrud() {
  const [videosHero, setVideosHero] = useState([]);
  const [paginaActual, setPaginaActual] = useState(1);
  const [videosPorPagina] = useState(5);
  const [videosHeroFiltrados, setVideosHeroFiltrados] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    const obtenerVideosHero = async () => {
      try {
        const respuesta = await fetch(
          "http://localhost:3001/videosHero/obtenerVideosHero"
        );
        const datos = await respuesta.json();
        setVideosHero(datos);
        setVideosHeroFiltrados(datos);
      } catch (error) {
        console.error("Error al obtener videos", error);
      }
    };

    obtenerVideosHero();
  }, []);



  const eliminarVideoHero = async (id) => {
    const token = obtenerTokenAlmacenado();
  
    const confirmacion = await mostrarConfirmacion("¿Deseas eliminar este video del hero?", "Sí, eliminar");
  
    if (confirmacion.isDenied || !confirmacion.isConfirmed) {
      return;
    }
  
    if (videosHero.length <= 1) {
      mostrarAlerta("error", "El hero no puede quedar vacío.");
      return;
    }
  
    try {
      const response = await fetch(`http://localhost:3001/videosHero/borrarVideoHero/${id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
  
      if (!response.ok) {
        // Si el código de estado no es OK, lanza una excepción
        throw new Error(`Error en la eliminación del video del hero (${response.status}): ${response.statusText}`);
      }
  
      // La eliminación en el servidor fue exitosa
      const nuevosVideosHero = videosHero.filter((video) => video.Id_video !== id);
      setVideosHero(nuevosVideosHero);
      setVideosHeroFiltrados(nuevosVideosHero);
  
      mostrarAlerta("success", "Video del hero eliminado correctamente");
    } catch (error) {
      console.error("Error al eliminar video del hero:", error.message);
      mostrarAlerta("error", "Hubo un error al intentar eliminar el video del hero o no tienes los permisos necesarios");
    }
  };
  


  const obtenerVideosHeroPaginados = () => {
    const indiceUltimoVideoHero = paginaActual * videosPorPagina;
    const indicePrimerVideoHero = indiceUltimoVideoHero - videosPorPagina;
    const videosHeroPaginados = videosHeroFiltrados.slice(
      indicePrimerVideoHero,
      indiceUltimoVideoHero
    );
    return videosHeroPaginados;
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
    if (paginaActual < Math.ceil(videosHero.length / videosPorPagina)) {
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
    if (paginaActual + 3 <= Math.ceil(videosHero.length / videosPorPagina)) {
      setPaginaActual(paginaActual + 3);
    } else {
      setPaginaActual(Math.ceil(videosHero.length / videosPorPagina));
    }
  };

  const handleSearch = async (term) => {
    try {
      setSearchTerm(term);

      const videosHeroFiltrados = videosHero.filter((video) =>
        video.titulo.toLowerCase().includes(term.toLowerCase())
      );
      setVideosHeroFiltrados(videosHeroFiltrados);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    const handleSearch = async (term) => {
      try {
        setSearchTerm(term);
        const respuesta = await fetch(
          "http://localhost:3001/videosHero/obtenerVideosHero"
        );
        const datos = await respuesta.json();
        const videosHeroFiltrados = datos.filter((video) =>
          video.titulo.toLowerCase().includes(term.toLowerCase())
        );
        setVideosHeroFiltrados(videosHeroFiltrados);
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
          Nuestros <span className="font-bold admincontainer-h2">Álbumes</span>
        </h2>

        <div>
          <div className="w-full items-center justify-center h-fit">
            <SearchBar placeholderText={"Buscar..."} onSearch={handleSearch} />
          </div>
        </div>

        <div className="pt-12 flex flex-col justify-center items-center">
          <div className="flex justify-center items-center bg-[#E8D8B0] w-fit p-2 rounded-lg cursor-pointer boton-animado lg:absolute lg:right-[30%] lg:top-[15%] xl:right-[20%]">
            <Link
              to={"/administrador/videosHero/CrearVideosHero"}
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
              {Array.isArray(videosHeroFiltrados) &&
                obtenerVideosHeroPaginados().map((video) => (
                  <li
                    key={video.Id_video}
                    className="flex items-center gap-9 sm:gap-3 justify-around border-b border-[#E8D8B0] p-3"
                  >
                    <div className="rounded-[50%] w-[10rem] xl:w-[15rem]">
                      {video.video && (
                        <video controls className="w-full h-full">
                          <source
                            src={`/${video.video}`}
                            type="video/mp4"
                          />
                          Tu navegador no soporta el elemento de video.
                        </video>
                      )}
                    </div>

                    <div className="w-2/4 sm:w-[6rem] lg:w-[22rem]">
                      <p>{`#${video.Id_video}`}</p>
                      <h3 className="text-[#E8D8B0] text-[16px] sm:text-[20px]">
                        <Link
                          to={`./actualizarVideoHero/${video.Id_video}`}
                          className="text-[#E8D8B0] hover:underline"
                        >
                          {video.titulo}
                        </Link>
                      </h3>
                    </div>

                    <div className="flex h-full flex-col justify-between gap-10">
                      <button
                        onClick={() => eliminarVideoHero(video.Id_video)}
                        className="text-red-500 hover:underline"
                      >
                        <img
                          src="/src/assets/polygonos/borrar-icono.svg"
                          className="w-[1.5rem] h-[1.5rem]"
                          alt="borrar"
                        />
                      </button>

                      <Link
                        to={`./actualizarVideoHero/${video.Id_video}`}
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
          paginasTotales={Math.ceil(
            videosHeroFiltrados.length / videosPorPagina
          )}
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
}

export default VideosHeroCrud;
