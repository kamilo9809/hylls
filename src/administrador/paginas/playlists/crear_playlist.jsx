import { useState } from "react";
import { mostrarAlerta } from "../../config/Alerta";
import { Link } from "react-router-dom";
import Navbar from "./../../componentes/navbar";
import AdminHeader from "./../../componentes/adminHeader";
import FooterAdmin from "./../../componentes/footerAdmin";
import "./../../componentes/adminStyles/admin.css";
import obtenerTokenAlmacenado from "./../../../helpers/obtenerToken";

const CrearPlaylist = () => {
  const [enlaceSpotify, setEnlaceSpotify] = useState("");
  const [enlaceAppleMusic, setEnlaceAppleMusic] = useState("");
  const [nombrePlaylist, setNombrePlaylist] = useState("");
  const [fotoPlaylist, setFotoPlaylist] = useState(null);
  const [tipo, setTipo] = useState('');

  const token = obtenerTokenAlmacenado();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (
      [enlaceSpotify, enlaceAppleMusic, nombrePlaylist, fotoPlaylist].includes(
        ""
      )
    ) {
      mostrarAlerta('error', 'Rellena todos los campos');
      return;
    }

    try {
      const formData = new FormData();
      formData.append("enlace_spotify", enlaceSpotify);
      formData.append("enlace_applemusic", enlaceAppleMusic);
      formData.append("Nombre_playlist", nombrePlaylist);
      formData.append("foto_playlist", fotoPlaylist);
      formData.append("tipo", tipo);

      const response = await fetch(
        "http://localhost:3001/playlists/crearPlaylist",
        {
          method: "POST",
          body: formData,
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const data = await response.json();

      if (response.ok) {
        mostrarAlerta('success', 'Playlist creada con éxito');
      } else {
        mostrarAlerta('error', data.mensaje);
      }
    } catch (error) {
      mostrarAlerta('error', 'Hubo un error')
    }
  };

  const handleFileChange = (e) => {
    setFotoPlaylist(e.target.files[0]);
  };

  return (
    <div className="flex flex-col min-h-screen bg-[#1E1B1B] relative overflow-hidden">
      <div>
        <Navbar></Navbar>
        <div className="p-5">
          <AdminHeader />
          <div className="w-full flex justify-center mb-24 border-inferior">
            <h2 className="admincontainer-h2 font-extrabold text-[20px] sm:absolute sm:left-[30%]">
              Crear Playlist
            </h2>
          </div>
          <form
            onSubmit={handleSubmit}
            encType="multipart/form-data"
            className="mx-auto sm:w-full sm:pl-16 md:w-[60%] lg:pl-0 lg:w-[50%] xl:w-[40%] p-2 mb-32"
          >
            <div className="mb-4">
              <label
                htmlFor="enlaceSpotify"
                className="block text-sm font-medium text-white"
              >
                Enlace de Spotify
              </label>
              <input
                type="text"
                id="enlaceSpotify"
                name="enlaceSpotify"
                value={enlaceSpotify}
                onChange={(e) => setEnlaceSpotify(e.target.value)}
                className="mt-1 p-2 w-full rounded-md bg-[#D9D9D98F]"
              />
            </div>

            <div className="mb-4">
              <label
                htmlFor="enlaceAppleMusic"
                className="block text-sm font-medium text-white"
              >
                Enlace de Apple Music
              </label>
              <input
                type="text"
                id="enlaceAppleMusic"
                name="enlaceAppleMusic"
                value={enlaceAppleMusic}
                onChange={(e) => setEnlaceAppleMusic(e.target.value)}
                className="mt-1 p-2 w-full rounded-md bg-[#D9D9D98F]"
              />
            </div>

            <div className="mb-4">
              <label
                htmlFor="nombrePlaylist"
                className="block text-sm font-medium text-white"
              >
                Nombre de la Playlist
              </label>
              <input
                type="text"
                id="nombrePlaylist"
                name="nombrePlaylist"
                value={nombrePlaylist}
                onChange={(e) => setNombrePlaylist(e.target.value)}
                className="mt-1 p-2 w-full rounded-md bg-[#D9D9D98F]"
              />
            </div>

            <div className="mb-4">
              <label
                htmlFor="fotoPlaylist"
                className="block text-sm font-medium text-white"
              >
                Foto de la Playlist
              </label>
              <input
                type="file"
                id="fotoPlaylist"
                name="fotoPlaylist"
                onChange={handleFileChange}
                className="mt-1 p-2 w-full rounded-md bg-[#D9D9D98F]"
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
                onChange={(e) => setTipo(e.target.value)}
                className="mt-1 p-2 w-full rounded-md bg-[#D9D9D98F]"
              >
                <option selected disabled>--Selecciona un tipo--</option>
                <option value="destacadas" name="destacadas">Destacadas</option>
                <option value="novedades" name="novedades">Novedades</option>
                <option value="especiales" name="especiales">Especiales</option>
              </select>
            </div>

            <button
              type="submit"
              className="bg-[#E8D8B0] text-gray-800 p-2 rounded-md"
            >
              Crear Playlist
            </button>
            <Link
              to={"/administrador/playlists"}
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

export default CrearPlaylist;
