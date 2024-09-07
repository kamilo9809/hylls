import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { mostrarAlerta, mostrarConfirmacion } from "../../config/Alerta";
import Navbar from "./../../componentes/navbar";
import AdminHeader from "./../../componentes/adminHeader";
import SearchBar from "./../../../components/searchBar";
import FooterAdmin from "../../componentes/footerAdmin";
import Paginador from "./../../../components/paginador";
import obtenerTokenAlmacenado from "./../../../helpers/obtenerToken";

const PlaylistsCrud = () => {
  const [playlists, setPlaylists] = useState([]);
  const [paginaActual, setPaginaActual] = useState(1);
  const [playlistsPorPagina] = useState(5);
  const [playlistsFiltradas, setPlaylistsFiltradas] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    const obtenerPlaylists = async () => {
      try {
        const respuesta = await fetch(
          "http://localhost:3001/playlists/obtenerPlaylists"
        );
        const datos = await respuesta.json();
        setPlaylists(datos);
        setPlaylistsFiltradas(datos);
      } catch (error) {
        console.error("Error al obtener playlists:", error);
      }
    };

    obtenerPlaylists();
  }, []);

  const eliminarPlaylist = async (id) => {
    const token = obtenerTokenAlmacenado();
  
    const confirmacion = await mostrarConfirmacion('¿Deseas eliminar esta playlist?', 'Sí, eliminar');
  
    if (confirmacion.isDenied || !confirmacion.isConfirmed) {
      return;
    }
  
    try {
      const response = await fetch(`http://localhost:3001/playlists/eliminarPlaylist/${id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
  
      if (!response.ok) {
        // Si el código de estado no es OK, lanza una excepción
        throw new Error(`Error en la eliminación de la playlist (${response.status}): ${response.statusText}`);
      }
  
      // La eliminación en el servidor fue exitosa
      const nuevasPlaylists = playlists.filter((playlist) => playlist.Id_playlist !== id);
      setPlaylists(nuevasPlaylists);
      setPlaylistsFiltradas(nuevasPlaylists);
  
      mostrarAlerta('success', 'Playlist eliminada correctamente');
    } catch (error) {
      console.error("Error al eliminar playlist:", error.message);
      mostrarAlerta('error', 'Hubo un error al intentar eliminar la playlist o no tienes los permisos necesarios');
    }
  };

  const obtenerPlaylistsPaginadas = () => {
    const indiceUltimaPlaylist = paginaActual * playlistsPorPagina;
    const indicePrimeraPlaylist = indiceUltimaPlaylist - playlistsPorPagina;
    const playlistsPaginadas = playlistsFiltradas.slice(indicePrimeraPlaylist, indiceUltimaPlaylist);
    return playlistsPaginadas;
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
    if (paginaActual < Math.ceil(playlists.length / playlistsPorPagina)) {
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
    if (paginaActual + 3 <= Math.ceil(playlists.length / playlistsPorPagina)) {
      setPaginaActual(paginaActual + 3);
    } else {
      setPaginaActual(Math.ceil(playlists.length / playlistsPorPagina));
    }
  };

  const handleSearch = async (term) => {
    try {
      setSearchTerm(term);

      const playlistsFiltradas = playlists.filter((playlist) =>
        playlist.Nombre_playList.toLowerCase().includes(term.toLowerCase())
      );
      setPlaylistsFiltradas(playlistsFiltradas);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    const handleSearch = async (term) => {
      try {
        setSearchTerm(term);
        const respuesta = await fetch("http://localhost:3001/playlists/obtenerPlaylists");
        const datos = await respuesta.json();
        const playlistsFiltradas = datos.filter((playlist) =>
          playlist.Nombre_playList.toLowerCase().includes(term.toLowerCase())
        );
        setPlaylistsFiltradas(playlistsFiltradas);
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
          Nuestras <span className="font-bold admincontainer-h2">Playlists</span>
        </h2>

        <div>
          <div className="w-full items-center justify-center h-fit">
            <SearchBar
              placeholderText={"Buscar..."}
              onSearch={handleSearch}
            />
          </div>
        </div>

        <div className="pt-12 flex flex-col justify-center items-center">
          <div className="flex justify-center items-center bg-[#E8D8B0] w-fit p-2 rounded-lg cursor-pointer boton-animado lg:absolute lg:right-[30%] lg:top-[15%] xl:right-[20%]">
            <Link
              to={"/administrador/playlists/crear-playlist"}
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
            <ul className="divide-y divide-[#E8D8B0]">
              {Array.isArray(playlistsFiltradas) &&
                obtenerPlaylistsPaginadas().map((playlist) => (
                  <li
                    key={playlist.Id_playlist}
                    className="flex items-center gap-9 sm:gap-3 justify-around p-3"
                  >
                    <div className="rounded-[50%] w-[60px] sm:w-auto">
                      <img
                        src={`./../../../../public/imagenes_playlist/${playlist.foto_playlist}`}
                        className="w-[5rem] h-[4rem] sm:w-[6rem] sm:h-[6rem] rounded-[50%]"
                        alt="Foto de la Playlist"
                      />
                    </div>

                    <div className="w-2/4 sm:w-[6rem] lg:w-[22rem]">
                      <h3 className="text-[#E8D8B0] text-[16px] sm:text-[20px]">
                        {playlist.Nombre_playList}
                      </h3>
                      <p className="text-[#E8D8B0] text-[12px] sm:text-[16px] truncate">
                        {playlist.tipo}
                      </p>
                    </div>

                    <div className="flex h-full flex-col justify-between gap-10">
                      <button
                        onClick={() => eliminarPlaylist(playlist.Id_playlist)}
                        className="text-red-500 hover:underline"
                      >
                        <img
                          src="/src/assets/polygonos/borrar-icono.svg"
                          className="w-[1.5rem] h-[1.5rem]"
                          alt="borrar"
                        />
                      </button>

                      <Link
                        to={`/administrador/playlists/actualizar-playlist/${playlist.Id_playlist}`}
                        className="text-blue-500 hover:underline"
                      >
                        <img
                          src="/src/assets/polygonos/editar-icono.svg"
                          className="w-[1.5rem] h-[1.5rem]"
                          alt="borrar"
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
            playlistsFiltradas.length / playlistsPorPagina
          )}
          paginaActual={paginaActual}
          irAPagina={irAPagina}
          irAtras={irAtras}
          irAdelante={irAdelante}
          irAtrasTres={irAtrasTres}
          irAdelanteTres={irAdelanteTres}
        />
      </div>
      {/* Puedes ajustar el componente FooterAdmin según tus necesidades */}
      <FooterAdmin />
    </div>
  );
};

export default PlaylistsCrud;