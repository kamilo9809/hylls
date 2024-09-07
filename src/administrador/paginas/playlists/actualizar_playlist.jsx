import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { mostrarAlerta } from "../../config/Alerta";
import Navbar from "./../../componentes/navbar";
import AdminHeader from "./../../componentes/adminHeader";
import FooterAdmin from "./../../componentes/footerAdmin";
import "./../../componentes/adminStyles/admin.css";
import obtenerTokenAlmacenado from "./../../../helpers/obtenerToken";

const ActualizarPlaylist = () => {
  const { id } = useParams();
  const [playlist, setPlaylist] = useState({
    enlace_spotify: "",
    enlace_applemusic: "",
    Nombre_playList: "",
    tipo: "",
  });
  const [playlistFoto, setPlaylistFoto] = useState(null);

  const mostrarLogOutButton = false;
  const token = obtenerTokenAlmacenado();

  useEffect(() => {
    const obtenerPlaylist = async () => {
      try {
        const respuesta = await fetch(
          `http://localhost:3001/playlists/obtenerPlaylist/${id}`
        );
        const datos = await respuesta.json();

        setPlaylist(datos);
      } catch (error) {
        console.error(error.message);
      }
    };

    obtenerPlaylist();
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setPlaylist((prevPlaylist) => ({
      ...prevPlaylist,
      [name]: value,
    }));
  };

  const handleFileChange = (e) => {
    setPlaylistFoto(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (
      (!playlist.enlace_spotify && !playlist.enlace_applemusic) ||
      !playlist.Nombre_playList ||
      !playlist.tipo
    ) {
      mostrarAlerta("error", "Hay campos sin completar");
      return;
    }

    try {
      const formData = new FormData();
      formData.append("enlace_spotify", playlist.enlace_spotify);
      formData.append("enlace_applemusic", playlist.enlace_applemusic);
      formData.append("Nombre_playList", playlist.Nombre_playList);
      formData.append("tipo", playlist.tipo);

      // Verifica si se proporciona una nueva foto antes de agregarla al formData
      if (playlistFoto) {
        formData.append("foto_playlist", playlistFoto);
      }

      const response = await fetch(
        `http://localhost:3001/playlists/actualizarPlaylist/${id}`,
        {
          method: "PUT",
          body: formData,
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const data = await response.json();

      if (response.ok) {
        mostrarAlerta("success", "Playlist actualizada con éxito");
      } else {
        mostrarAlerta("error", data.mensaje);
      }
    } catch (error) {
      console.error("Error en la solicitud:", error);
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-[#1E1B1B] relative overflow-hidden">
      <div>
        <Navbar></Navbar>
        <div className="p-5">
          <AdminHeader mostrarBotonProp={mostrarLogOutButton} />
          <div className="w-full flex justify-center mb-24 border-inferior">
            <h2 className="admincontainer-h2 font-extrabold text-[20px] sm:absolute sm:left-[30%]">
              Actualizar Playlist
            </h2>
          </div>
          <form
            onSubmit={handleSubmit}
            encType="multipart/form-data"
            className="mx-auto sm:w-full sm:pl-16 md:w-[60%] lg:pl-0 lg:w-[50%] xl:w-[40%] p-2 mb-32"
          >
            <div className="flex">
              <div className="mb-4 flex flex-col justify-center items-start sm:items-start">
                {playlist.foto_playlist && (
                  <div className="w-[6rem] h-[6rem] sm:w-32 sm:h-32 rounded-[50%] overflow-hidden mb-16">
                    <img
                      src={`./../../../../public/imagenes_playlist/${playlist.foto_playlist}`}
                      alt="Foto de la playlist"
                      className="w-full h-full object-cover"
                    />
                  </div>
                )}
                <label
                  htmlFor="foto_playlist"
                  className="block text-sm font-medium text-white"
                >
                  Foto Playlist
                </label>
                <input
                  type="file"
                  id="foto_playlist"
                  name="foto_playlist"
                  onChange={handleFileChange}
                  className="mt-1 p-2 w-full rounded-md bg-transparent text-[#E8D8B0]"
                />
              </div>

              <div className="mb-4">
                <label
                  htmlFor="Nombre_playList"
                  className="block text-sm font-medium text-white"
                >
                  Nombre Playlist
                </label>
                <input
                  type="text"
                  id="Nombre_playList"
                  name="Nombre_playList"
                  value={playlist.Nombre_playList}
                  onChange={handleChange}
                  className="mt-1 p-2 w-full rounded-md bg-transparent text-[#E8D8B0]"
                />
              </div>
            </div>

            <div className="mb-4">
              <label
                htmlFor="enlace_spotify"
                className="block text-sm font-medium text-white"
              >
                Enlace Spotify
              </label>
              <input
                type="text"
                id="enlace_spotify"
                name="enlace_spotify"
                value={playlist.enlace_spotify}
                onChange={handleChange}
                className="mt-1 p-2 w-full rounded-md bg-transparent text-[#E8D8B0]"
              />
            </div>

            <div className="mb-4">
              <label
                htmlFor="enlace_applemusic"
                className="block text-sm font-medium text-white"
              >
                Enlace Apple Music
              </label>
              <input
                type="text"
                id="enlace_applemusic"
                name="enlace_applemusic"
                value={playlist.enlace_applemusic}
                onChange={handleChange}
                className="mt-1 p-2 w-full rounded-md bg-transparent text-[#E8D8B0]"
              />
            </div>

            <div className="mb-4">
              <label
                htmlFor="tipo"
                className="block text-sm font-medium text-white"
              >
                Tipo
              </label>
              <select
                type="text"
                id="tipo"
                name="tipo"
                value={playlist.tipo}
                onChange={handleChange}
                className="mt-1 p-2 w-full rounded-md bg-transparent text-[#E8D8B0]"
              >
                <option className="bg-[#1E1B1B]" selected disabled>
                  --Selecciona un tipo--
                </option>
                <option
                  className="bg-[#1E1B1B]"
                  value="destacadas"
                  name="destacadas"
                >
                  Destacadas
                </option>
                <option
                  className="bg-[#1E1B1B]"
                  value="novedades"
                  name="novedades"
                >
                  Novedades
                </option>
                <option
                  className="bg-[#1E1B1B]"
                  value="especiales"
                  name="especiales"
                >
                  Especiales
                </option>
              </select>
            </div>

            <button
              type="submit"
              className="bg-[#E8D8B0] text-gray-800 p-2 rounded-md"
            >
              Actualizar Playlist
            </button>
            <Link
              to="/administrador/playlists"
              className="ml-2 bg-[#E8D8B0] text-gray-800 p-2 rounded-md"
            >
              Volver
            </Link>
          </form>
        </div>
      </div>
      <FooterAdmin></FooterAdmin>
    </div>
  );
};

export default ActualizarPlaylist;
