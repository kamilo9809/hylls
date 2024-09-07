import { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { mostrarAlerta } from "../../config/Alerta";
import Navbar from "./../../componentes/navbar";
import AdminHeader from "./../../componentes/adminHeader";
import FooterAdmin from "./../../componentes/footerAdmin";
import obtenerTokenAlmacenado from "./../../../helpers/obtenerToken";

const ActualizarNoticia = () => {
  const { id } = useParams();

  const [noticia, setNoticias] = useState({
    Titulo: "",
    Descripcion_corta: "",
    Descripcion_larga: "",
    Fecha: "",
    Imagen: "",
  });

  const mostrarBotonProp = false;
  const token = obtenerTokenAlmacenado();

  //rellenar el formulario con las noticias
  useEffect(() => {
    const obtenerNoticia = async () => {
      try {
        const respuesta = await fetch(
          `http://localhost:3001/noticias/obtenerNoticia/${id}`
        );
        const datos = await respuesta.json();

        setNoticias({
          ...datos,
          Imagen: datos.Imagen || "",
        });
      } catch (error) {
        console.error(error.message);
      }
    };

    obtenerNoticia();
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNoticias((prevNoticia) => ({
      ...prevNoticia,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (
      !noticia.Titulo ||
      !noticia.Descripcion_corta ||
      !noticia.Descripcion_larga ||
      !noticia.Fecha
    ) {
      mostrarAlerta("error", "Rellena todos los campos");
      return;
    }

    const formData = new FormData();
    Object.entries(noticia).forEach(([key, value]) => {
      formData.append(key, value);
    });

    try {
      const response = await fetch(
        `http://localhost:3001/noticias/actualizarNoticia/${id}`,
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
        mostrarAlerta("success", "Noticia actualizada correctamente");
      } else {
        mostrarAlerta("error", data.mensaje);
      }
    } catch (error) {
      console.error("Error en la solicitud:", error);
    }
  };

  const handleFileChange = (e) => {
    const { name, files } = e.target;
    setNoticias((prevNoticia) => ({ ...prevNoticia, [name]: files[0] || "" }));
  };

  return (
    <div className="flex flex-col min-h-screen bg-[#1E1B1B] relative overflow-hidden">
      <div>
        <Navbar></Navbar>
        <div className="p-5">
          <AdminHeader mostrarBotonProp={mostrarBotonProp} />
          <div className="w-full flex justify-center mb-24 border-inferior">
            <h2 className="admincontainer-h2 font-extrabold text-[20px] sm:absolute sm:left-[30%]">
              Actualizar Noticia
            </h2>
          </div>

          <form
            onSubmit={handleSubmit}
            encType="multipart/form-data"
            className="mx-auto sm:w-full sm:pl-16 md:w-[60%] lg:pl-0 lg:w-[50%] xl:w-[40%] p-2 mb-32"
          >
            {/* Campo de foto del álbum */}
            <div className="flex">
            <div className="mb-4 flex flex-col justify-center items-start sm:items-start">
                {noticia.Imagen && (
                  <div className="w-[6rem] h-[6rem] sm:w-32 sm:h-32 rounded-[50%] overflow-hidden mb-16">
                    <img src={`/${noticia.Imagen}`} alt="Foto de la noticia" className="w-full h-full object-cover"/>
                  </div>
                )}
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
                  onChange={handleFileChange}
                  className="mt-1 p-2 w-full rounded-md bg-transparent text-[#E8D8B0]"
                />
              </div>

              <div className="mb-4">
                <label
                  htmlFor="Titulo"
                    className="block text-sm font-medium text-white"
                >
                  Nombre
                </label>
                <input
                  type="text"
                  id="Titulo"
                  name="Titulo"
                  value={noticia.Titulo ?? ""}
                  onChange={handleChange}
                  className="mt-1 p-2 w-full rounded-md bg-slate-600 text-[#E8D8B0]"
                />
              </div>
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
                value={noticia.Descripcion_corta ?? ""}
                onChange={handleChange}
                className="mt-1 p-2 w-full rounded-md bg-transparent text-[#E8D8B0]"
              />
            </div>

            <div className="mb-4">
              <label
                htmlFor="Descripcion_larga"
                  className="block text-sm font-medium text-white"
              >
                Descripcion larga
              </label>
              <textarea
                type="text"
                id="Descripcion_larga"
                name="Descripcion_larga"
                value={noticia.Descripcion_larga ?? ""}
                onChange={handleChange}
                className="mt-1 p-2 w-full rounded-md bg-transparent text-[#E8D8B0]"
              />
            </div>

            <div className="mb-4">
              <label
                htmlFor="Fecha"
                  className="block text-sm font-medium text-white"
              >
                Fecha
              </label>
              <input
                type="date"
                id="Fecha"
                name="Fecha"
                value={noticia.Fecha ?? ""}
                onChange={handleChange}
                className="mt-1 p-2 w-full rounded-md bg-transparent text-[#E8D8B0]"
              />
            </div>

            <button
              type="submit"
              className="bg-[#E8D8B0] text-gray-800 p-2 rounded-md"
            >
              Actualizar Noticia
            </button>
            <Link
              to="/administrador/noticias"
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

export default ActualizarNoticia;
