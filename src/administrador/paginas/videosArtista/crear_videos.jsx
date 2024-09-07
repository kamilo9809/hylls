import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { mostrarAlerta } from "./../../config/Alerta";
import Navbar from "./../../componentes/navbar";
import AdminHeader from "./../../componentes/adminHeader";
import FooterAdmin from "./../../componentes/footerAdmin";
import "./../../componentes/adminStyles/admin.css";
import obtenerTokenAlmacenado from "./../../../helpers/obtenerToken";

const CrearVideos = () => {
  const [video_artista, setVideo_artista] = useState('');
  const [video_artista_embed, setVideo_artista_embed] = useState('');
  const [Id_artista, setId_artista] = useState("");
  const [artistas, setArtistas] = useState([]);

  const token = obtenerTokenAlmacenado();

  useEffect(() => {
    const obtenerArtistas = async () => {
      try {
        const respuesta = await fetch(
          "http://localhost:3001/artistas/obtenerArtistas"
        );
        const datos = await respuesta.json();
        setArtistas(datos);
      } catch (error) {
        console.error("Error al obtener artistas:", error);
      }
    };

    obtenerArtistas();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("video_artista", video_artista);
    formData.append("video_artista_embed", video_artista_embed);
    formData.append("Id_artista", Id_artista);

    try {
      const response = await fetch("http://localhost:3001/videos/crearVideo", {
        method: "POST",
        body: formData,
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await response.json();

      if (response.ok) {
        mostrarAlerta('success', 'Video para artista creado correctamente');
      } else {
        mostrarAlerta('error', data.mensaje)
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
          <AdminHeader />
          <div className="w-full flex justify-center mb-24 border-inferior">
            <h2 className="admincontainer-h2 font-extrabold text-[20px] sm:absolute sm:left-[30%]">
              Crear Video
            </h2>
          </div>
          <div className="container mx-auto mt-8">
            <form onSubmit={handleSubmit} encType="multipart/form-data" className="mx-auto sm:w-full sm:pl-16 md:w-[60%] lg:pl-0 lg:w-[50%] xl:w-[40%] p-2 mb-32">
              <div className="mb-4">
                <label htmlFor="Id_artista" className="block text-sm font-medium text-white">
                  Artista
                </label>
                <select
                  id="Id_artista"
                  name="Id_artista"
                  value={Id_artista}
                  onChange={(e) => setId_artista(e.target.value)}
                  className="mt-1 p-2 w-full rounded-md bg-[#D9D9D98F]"
                >
                  <option value="" disabled>
                    Seleccione un artista
                  </option>
                  {artistas.map((artista) => (
                    <option key={artista.Id_artista} value={artista.Id_artista}>
                      {artista.Nombre}
                    </option>
                  ))}
                </select>
              </div>

              <div className="mb-4">
                <label htmlFor="video_artista" className="block text-sm font-medium text-white">
                  Enlace al video
                </label>
                <input
                  type="text"
                  id="video_artista"
                  name="video_artista"
                  value={video_artista}
                  onChange={(e) => setVideo_artista(e.target.value)}
                  className="mt-1 p-2 w-full rounded-md bg-[#D9D9D98F]"
                />
              </div>

              <div className="mb-4">
                <label htmlFor="video_artista" className="block text-sm font-medium text-white">
                  Enlace al video (versión embed)
                </label>
                <input
                  type="text"
                  id="video_artista_embed"
                  name="video_artista_embed"
                  value={video_artista_embed}
                  onChange={(e) => setVideo_artista_embed(e.target.value)}
                  className="mt-1 p-2 w-full rounded-md bg-[#D9D9D98F]"
                />
              </div>

              <button
                type="submit"
                className="bg-[#E8D8B0] text-gray-800 p-2 rounded-md"
              >
                Crear Video
              </button>
              <Link
                to={"/administrador/videosArtista"}
                className="ml-2 bg-[#E8D8B0] text-gray-800 p-2 rounded-md"
              >
                Volver
              </Link>
            </form>
          </div>
        </div>
      </div>
      <FooterAdmin />
    </div>
  );
};

export default CrearVideos;