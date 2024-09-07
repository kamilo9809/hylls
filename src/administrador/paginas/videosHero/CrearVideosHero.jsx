import { useState } from "react";
import { Link } from "react-router-dom";
import { mostrarAlerta } from "./../../config/Alerta";
import Navbar from "./../../componentes/navbar";
import AdminHeader from "./../../componentes/adminHeader";
import FooterAdmin from "./../../componentes/footerAdmin";
import "./../../componentes/adminStyles/admin.css";
import obtenerTokenAlmacenado from "./../../../helpers/obtenerToken";


import VistaPreviaVideo from "./VistaPreviaHero";

const CrearVideosHero = () => {
  const [video, setVideo] = useState(null);
  const [titulo, setTitulo] = useState("");

  const token = obtenerTokenAlmacenado();


  //vista previa del video
  const [videoPreviewUrl, setVideoPreviewUrl] = useState(null);
  const [showPreview, setShowPreview] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("video", video);
    formData.append("titulo", titulo);

    const videoData = formData.get("video");

    if (videoData.type !== "video/mp4") {
      mostrarAlerta("error", "Necesitas archivos mp4");
      return;
    }

    try {
      const response = await fetch(
        "http://localhost:3001/videosHero/crearVideosHero",
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
        mostrarAlerta("success", "VideoHero creado correctamente");
      } else {
        mostrarAlerta("error", data.mensaje);
      }
    } catch (error) {
      console.error("Error en la solicitud:", error);
    }
  };

  const handleVideoChange = (e) => {
    const selectedVideo = e.target.files[0];

    if (selectedVideo) {
      // Crear URL para la vista previa del video
      const videoPreviewUrl = URL.createObjectURL(selectedVideo);
      setVideoPreviewUrl(videoPreviewUrl);
      setShowPreview(true);
    } else {
      setVideoPreviewUrl(null);
      setShowPreview(false);
    }

    setVideo(selectedVideo);
  };

  return (
    <div className="flex flex-col min-h-screen bg-[#1E1B1B] relative overflow-hidden">
      <Navbar />
      <div className="flex flex-row">
        <div className="flex flex-col w-full p-5">
          <AdminHeader />
          <div className="w-full flex justify-center mb-24 border-inferior">
            <h2 className="admincontainer-h2 font-extrabold text-[20px] sm:absolute sm:left-[30%]">
              Crear Video Hero
            </h2>
          </div>
          <div className="container mx-auto mt-8">
            <form
              onSubmit={handleSubmit}
              encType="multipart/form-data"
              className="mx-auto sm:w-full sm:pl-16 md:w-[60%] lg:pl-0 lg:w-[50%] xl:w-[40%] p-2 mb-32"
            >
              <div className="mb-4">
                <label
                  htmlFor="titulo"
                  className="block text-sm font-medium text-white"

                >
                  Titulo Del Video
                </label>
                <input
                  type="text"
                  id="titulo"
                  name="titulo"
                  value={titulo}
                  onChange={(e) => setTitulo(e.target.value)}
                  className="mt-1 p-2 w-full rounded-md bg-[#D9D9D98F]"
                  placeholder="Nombre del Video"
                />
              </div>
              <div className="mb-4">
                <label
                  htmlFor="video"
                  className="block text-sm font-medium text-white"
                >
                  Archivo Del Video Mp4
                </label>
                <input
                  type="file"
                  id="video"
                  name="video"
                  onChange={handleVideoChange}
                  className="mt-1 p-2 w-full rounded-md bg-[#D9D9D98F]"
                />
              </div>

              {showPreview && (
                <div className="mb-10">
                  <p className="block text-sm font-medium text-white">
                    Vista previa:
                  </p>
                  <div className="hidden">
                    <VistaPreviaVideo videoUrl={`/${videoPreviewUrl}`}/>
                  </div>
                  <Link
                    to={`/administrador/videosHero/vistaPrevia/${encodeURIComponent(
                      videoPreviewUrl
                    )}`}
                    target="_blank"
                    className="text-[#E8D8B0] py-2 rounded-md"
                  >
                    Ver en simulación
                  </Link>
                </div>
              )}
              <button
                type="submit"
                className="bg-[#E8D8B0] text-gray-800 p-2 rounded-md"
              >
                Crear Video
              </button>
              <Link
                to={"/administrador/videosHero"}
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

export default CrearVideosHero;
