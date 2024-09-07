import { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { mostrarAlerta } from "./../../config/Alerta";
import Navbar from "./../../componentes/navbar";
import AdminHeader from "./../../componentes/adminHeader";
import FooterAdmin from "./../../componentes/footerAdmin";
import "./../../componentes/adminStyles/admin.css";
import obtenerTokenAlmacenado from "./../../../helpers/obtenerToken";

function ActualizarVideos() {
  const { id } = useParams();
  const [video, setVideo] = useState({
    Id_artista: "",
    video_artista: "",
    video_artista_embed: ""
  });

  const [artistas, setArtistas] = useState([]);

  const mostrarLogOutButton = false;
  const token = obtenerTokenAlmacenado();

  useEffect(() => {
    const obtenerVideos = async () => {
      try {
        const respuesta = await fetch(
          `http://localhost:3001/videos/obtenerVideos/${id}`
        );

        const datos = await respuesta.json();
        console.log(datos);
        setVideo({
          ...datos,
          fotoVideo: datos.fotoVideo || null,
        });
      } catch (error) {
        console.error(error.message);
      }
    };

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

    obtenerVideos();
    obtenerArtistas();
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setVideo((prevVideo) => ({
      ...prevVideo,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    Object.entries(video).forEach(([key, value]) => {
      formData.append(key, value);
    });

    try {
      const response = await fetch(
        `http://localhost:3001/videos/actualizarVideos/${id}`,
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
        // Muestra una alerta de éxito
        mostrarAlerta("success", "Video del artista actualizado con éxito");
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
              Actualizar Artista
            </h2>
          </div>
          <form
            onSubmit={handleSubmit}
            encType="multipart/form-data"
            className="mx-auto sm:w-full sm:pl-16 md:w-[60%] lg:pl-0 lg:w-[50%] xl:w-[40%] p-2 mb-32"
          >
            <div className="mb-4">
              <label
                htmlFor="Id_artista"
                className="block text-sm font-medium text-white"
              >
                Artista
              </label>
              <select
                id="Id_artista"
                name="Id_artista"
                value={video.Id_artista}
                onChange={handleChange}
                className="mt-1 p-2 w-full rounded-md bg-transparent text-[#E8D8B0]"
              >
                <option className="bg-[#1E1B1B]" value="" disabled>
                  Seleccione un artista
                </option>
                {artistas.map((artista) => (
                  <option className="bg-[#1E1B1B]" key={artista.Id_artista} value={artista.Id_artista}>
                    {artista.Nombre}
                  </option>
                ))}
              </select>
            </div>

            <div className="mb-4">
              <label
                htmlFor="video_artista"
                className="block text-sm font-medium text-white"
              >
                Link Video
              </label>
              <input
                id="video_artista"
                name="video_artista"
                value={video.video_artista}
                onChange={handleChange}
                className="mt-1 p-2 w-full rounded-md bg-transparent text-[#E8D8B0]"
              />
            </div>


            <div className="mb-4">
              <label
                htmlFor="video_artista_embed"
                className="block text-sm font-medium text-white"
              >
                Link Video Embed
              </label>
              <input
                id="video_artista_embed"
                name="video_artista_embed"
                value={video.video_artista_embed}
                onChange={handleChange}
                className="mt-1 p-2 w-full rounded-md bg-transparent text-[#E8D8B0]"
              />
            </div>


            <button
              type="submit"
              className="bg-[#E8D8B0] text-gray-800 p-2 rounded-md"
            >
              Actualizar Artista
            </button>
            <Link
              to="/administrador/videosArtista"
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
}
export default ActualizarVideos;
