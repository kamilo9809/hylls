import { Link } from "react-router-dom";
import { useState } from "react";
import { mostrarAlerta } from "../../config/Alerta";
import Navbar from "./../../componentes/navbar";
import AdminHeader from "./../../componentes/adminHeader";
import FooterAdmin from "./../../componentes/footerAdmin";
import "./../../componentes/adminStyles/admin.css";
import obtenerTokenAlmacenado from "./../../../helpers/obtenerToken";

const CrearNoticia = () => {
  const [Titulo, setTitulo] = useState("");
  const [Descripcion_corta, setDcorta] = useState("");
  const [Descripcion_larga, setDlarga] = useState("");
  const [Fecha, setFecha] = useState("");
  const [Imagen, setImagen] = useState(null);

  const token = obtenerTokenAlmacenado();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("Titulo", Titulo);
    formData.append("Descripcion_corta", Descripcion_corta);
    formData.append("Descripcion_larga", Descripcion_larga);
    formData.append("Fecha", Fecha);
    formData.append("Imagen", Imagen);

    try {
      const response = await fetch(
        "http://localhost:3001/noticias/crearNoticia",
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
        mostrarAlerta("success", "Noticia creada correctamente");
      } else {
        mostrarAlerta("error", data.mensaje);
      }
    } catch (error) {
      console.log(error);
    }

    // Redireccionar al administrador de noticias
    window.location.href = "/administrador/noticias";
  };

  return (
    <div className="flex flex-col min-h-screen bg-[#1E1B1B] relative overflow-hidden">
      <div>
        <Navbar></Navbar>
        <div className="p-5">
          <AdminHeader />
          <div className="w-full flex justify-center mb-24 border-inferior">
            <h2 className="admincontainer-h2 font-extrabold text-[20px] sm:absolute sm:left-[30%]">
              Crear Noticia
            </h2>
          </div>
          <form
            onSubmit={handleSubmit}
            encType="multipart/form-data"
            className="mx-auto sm:w-full sm:pl-16 md:w-[60%] lg:pl-0 lg:w-[50%] xl:w-[40%] p-2 mb-32"
          >
            <div className="mb-4">
              <label
                htmlFor="Titulo"
                className="block text-sm font-medium text-white"
              >
                Titulo
              </label>
              <input
                type="text"
                id="Titulo"
                name="Titulo"
                value={Titulo}
                onChange={(e) => setTitulo(e.target.value)}
                className="mt-1 p-2 w-full rounded-md bg-[#D9D9D98F]"
              />
            </div>

            <div className="mb-4">
              <label
                htmlFor="Descripcion_corta"
                className="block text-sm font-medium text-white"
              >
                Descripcion corta
              </label>
              <textarea
                id="Descripcion_corta"
                name="Descripcion_corta"
                value={Descripcion_corta}
                onChange={(e) => setDcorta(e.target.value)}
                className="mt-1 p-2 w-full rounded-md bg-[#D9D9D98F]"
              ></textarea>
            </div>

            <div className="mb-4">
              <label
                htmlFor="Descripcion_larga"
                className="block text-sm font-medium text-white"
              >
                Descripcion larga
              </label>
              <textarea
                id="Descripcion_larga"
                name="Descripcion_larga"
                value={Descripcion_larga}
                onChange={(e) => setDlarga(e.target.value)}
                className="mt-1 p-2 w-full rounded-md bg-[#D9D9D98F]"
              ></textarea>
            </div>

            <div className="mb-4">
              <label
                htmlFor="Fecha"
                className="block text-sm font-medium text-white"
              >
                Fecha
              </label>
              <input
                id="Fecha"
                name="Fecha"
                type="date"
                value={Fecha}
                onChange={(e) => setFecha(e.target.value)}
                className="mt-1 p-2 w-full rounded-md bg-[#D9D9D98F]"
              />
            </div>

            <div className="mb-4">
              <label
                htmlFor="Imagen"
                className="block text-sm font-medium text-white"
              >
                Imagen
              </label>
              <input
                type="file"
                id="Imagen"
                name="Imagen"
                onChange={(e) => setImagen(e.target.files[0])}
                className="mt-1 p-2 w-full rounded-md bg-[#D9D9D98F]"
              />
            </div>

            <button
              type="submit"
              className="bg-[#E8D8B0] text-gray-800 p-2 rounded-md"
            >
              Crear Noticia
            </button>
            <Link
              to={"/administrador/noticias"}
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

export default CrearNoticia;
