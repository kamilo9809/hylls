import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { mostrarAlerta } from "./../../config/Alerta";
import Navbar from "./../../componentes/navbar";
import AdminHeader from "./../../componentes/adminHeader";
import FooterAdmin from "./../../componentes/footerAdmin";
import "./../../componentes/adminStyles/admin.css";
import obtenerTokenAlmacenado from "./../../../helpers/obtenerToken";


const ActualizarVideoHero = () => {
  const { id } = useParams();
  const [video, setVideo] = useState({
    titulo: "",
    video: "", // Agrega el campo de video al estado
  });
  const [videoFile, setVideoFile] = useState(null);
  const [showPreview, setShowPreview] = useState(false);

  const mostrarLogOutButton = false;
  const token = obtenerTokenAlmacenado();

  useEffect(() => {
    const obtenerVideo = async () => {
      try {
        const respuesta = await fetch(
          `http://localhost:3001/videosHero/obtenerVideoHero/${id}`
        );
        const datos = await respuesta.json();

        if (datos && datos.video && datos.video.titulo) {
          setVideo(datos.video);
        }
      } catch (error) {
        console.error(error.message);
      }
    };

    obtenerVideo();
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setVideo((prevVideo) => ({
      ...prevVideo,
      [name]: value,
    }));
  };

  const handleFileChange = (e) => {
    setVideoFile(e.target.files[0]);
    setShowPreview(true); // Muestra la vista previa cuando se selecciona un nuevo archivo
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!video) {
      mostrarAlerta("error", "Ambos campos son necesarios");
      return;
    }

    try {
      const formData = new FormData();
      formData.append("titulo", video.titulo);

      // Verifica si se proporciona un nuevo video antes de agregarlo al formData
      if (videoFile) {
        formData.append("video", videoFile);
      }

      const response = await fetch(
        `http://localhost:3001/videosHero/actualizarVideoHero/${id}`,
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
        mostrarAlerta("success", "Video actualizado con éxito");
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
              Actualizar Video Hero
            </h2>
          </div>
          <form
            onSubmit={handleSubmit}
            encType="multipart/form-data"
            className="mx-auto sm:w-full sm:pl-16 md:w-[60%] lg:pl-0 lg:w-[50%] xl:w-[40%] p-2 mb-32"
          >
            <div className="sm:flex items-start">
              <div className="mb-4 flex flex-col justify-center items-start sm:items-start">
                {video.video && (
                  <div className="pb-4 pr-4 w-56 xl:w-[20rem]">
                    <video
                      src={`/${video.video}`}
                      alt="Captura del video"
                    ></video>
                  </div>
                )}

                <label
                  htmlFor="video"
                  className="block text-sm font-medium text-white"
                >
                  Archivo de Video
                </label>
                <input
                  type="file"
                  id="video"
                  name="video"
                  onChange={handleFileChange}
                  className="mt-1 py-2 w-full rounded-md bg-transparent text-[#E8D8B0]"
                />

                {showPreview && videoFile && (
                  <div className="mb-10">
                    <p className="block text-sm font-medium text-white">
                      Vista previa:
                    </p>
                    <Link
                      to={`/administrador/videosHero/vistaPrevia/${encodeURIComponent(
                        URL.createObjectURL(videoFile)
                      )}`}
                      target="_blank"
                      className="text-[#E8D8B0] py-2 rounded-md"
                    >
                      Ver nuevo video en simulación
                    </Link>
                  </div>
                )}
              </div>

              <div className="mb-4">
                <label
                  htmlFor="titulo"
                  className="block text-sm font-medium text-white"
                >
                  Título del Video
                </label>
                <input
                  type="text"
                  id="titulo"
                  name="titulo"
                  value={video.titulo}
                  onChange={handleChange}
                  className="mt-1 p-2 w-full rounded-md bg-transparent text-[#E8D8B0]"
                />
              </div>
            </div>

            <button
              type="submit"
              className="bg-[#E8D8B0] text-gray-800 p-2 rounded-md"
            >
              Actualizar Artista
            </button>
            <Link
              to="/administrador/videosHero"
              className="ml-2 bg-[#E8D8B0] text-gray-800 p-2 rounded-md"
            >
              Volver
            </Link>
            {/* Enlace para ver la simulación */}
          </form>
        </div>
      </div>
      <FooterAdmin></FooterAdmin>
    </div>
  );
};

export default ActualizarVideoHero;
