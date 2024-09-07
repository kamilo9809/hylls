import { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { mostrarAlerta } from "./../../config/Alerta";
import Navbar from "./../../componentes/navbar";
import AdminHeader from "./../../componentes/adminHeader";
import FooterAdmin from "./../../componentes/footerAdmin";
import "./../../componentes/adminStyles/admin.css";
import obtenerTokenAlmacenado from "./../../../helpers/obtenerToken";

const ActualizarArtista = () => {
  const { id } = useParams();

  const [artista, setArtista] = useState({
    nombre: "",
    biografia: "",
    facebook: "",
    twitter: "",
    instagram: "",
    youtube: "",
    foto: "",
    banner: "",
  });

  const mostrarLogOutButton = false;
  const token = obtenerTokenAlmacenado();

  useEffect(() => {
    const obtenerArtista = async () => {
      try {
        const respuesta = await fetch(
          `http://localhost:3001/artistas/obtenerArtista/${id}`
        );
        const datos = await respuesta.json();

        setArtista({
          ...datos,
          foto: datos.foto || "",
          banner: datos.banner || "",
        });
      } catch (error) {
        console.error(error.message);
      }
    };

    obtenerArtista();
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setArtista((prevArtista) => ({
      ...prevArtista,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    Object.entries(artista).forEach(([key, value]) => {
      formData.append(key, value);
    });

    try {
      const response = await fetch(
        `http://localhost:3001/artistas/actualizarArtista/${id}`,
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
        mostrarAlerta("success", "Artista actualizado correctamente");
      } else {
        mostrarAlerta("error", data.mensaje);
      }
    } catch (error) {
      console.error("Error en la solicitud:", error);
    }
  };

  const handleFileChange = (e) => {
    const { name, files } = e.target;
    setArtista((prevArtista) => ({ ...prevArtista, [name]: files[0] || "" }));
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
            <div className="flex">
              <div className="mb-4 flex flex-col justify-center items-start sm:items-start">
                {artista.foto && (
                  <div className="w-[6rem] h-[6rem] sm:w-32 sm:h-32 rounded-[50%] overflow-hidden mb-16">
                    <img
                      src={`/${artista.foto}`}
                      alt="Foto del artista"
                      className="w-full h-full object-cover"
                    />
                  </div>
                )}

                <label
                  htmlFor="foto"
                  className="block text-sm font-medium text-white"
                ></label>
                <input
                  type="file"
                  id="foto"
                  name="foto"
                  onChange={handleFileChange}
                  className="mt-1 p-2 w-full rounded-md bg-transparent text-[#E8D8B0]"
                />
              </div>

              <div>
                <p className="text-white text-[17px]">{`ID:#${artista.Id_artista}`}</p>
                <div className="mb-4">
                  <label
                    htmlFor="nombre"
                    className="block text-sm font-medium text-white"
                  ></label>
                  <input
                    type="text"
                    id="nombre"
                    name="Nombre"
                    value={artista.Nombre ?? ""}
                    onChange={handleChange}
                    className="mt-1 w-full rounded-md bg-transparent text-[#E8D8B0] text-[26px]"
                  />
                </div>
              </div>
            </div>

            <div className="mb-4">
              <label
                htmlFor="biografia"
                className="block text-sm font-medium text-white text-[17px]"
              >
                Biografía
              </label>
              <textarea
                id="biografia"
                name="biografia"
                value={artista.biografia ?? ""}
                onChange={handleChange}
                className="mt-1 p-2 w-full rounded-md bg-transparent text-[#E8D8B0]"
              />
            </div>

            <div className="mb-4">
              <label
                htmlFor="facebook"
                className="block text-sm font-medium text-white"
              >
                Facebook
              </label>
              <input
                type="text"
                id="facebook"
                name="facebook"
                value={artista.facebook ?? ""}
                onChange={handleChange}
                className="mt-1 p-2 w-full rounded-md bg-transparent text-[#E8D8B0]"
              />
            </div>

            <div className="mb-4">
              <label
                htmlFor="twitter"
                className="block text-sm font-medium text-white"
              >
                Twitter
              </label>
              <input
                type="text"
                id="twitter"
                name="twitter"
                value={artista.twitter ?? ""}
                onChange={handleChange}
                className="mt-1 p-2 w-full rounded-md bg-transparent text-[#E8D8B0]"
              />
            </div>

            <div className="mb-4">
              <label
                htmlFor="instagram"
                className="block text-sm font-medium text-white"
              >
                Instagram
              </label>
              <input
                type="text"
                id="instagram"
                name="instagram"
                value={artista.instagram ?? ""}
                onChange={handleChange}
                className="mt-1 p-2 w-full rounded-md bg-transparent text-[#E8D8B0]"
              />
            </div>

            <div className="mb-4">
              <label
                htmlFor="youtube"
                className="block text-sm font-medium text-white"
              >
                Youtube
              </label>
              <input
                type="text"
                id="youtube"
                name="youtube"
                value={artista.youtube ?? ""}
                onChange={handleChange}
                className="mt-1 p-2 w-full rounded-md bg-transparent text-[#E8D8B0]"
              />
            </div>

            {/* Campo de banner */}
            <div className="mb-4 flex flex-col justify-center items-start">
              {artista.banner && (
                <div className="w-[6rem] h-[6rem] sm:w-32 sm:h-32 rounded-[50%] overflow-hidden mt-12">
                  <img
                    className="w-full h-full object-cover"
                    src={`/${artista.banner}`}
                    alt="Banner del artista"
                  />
                </div>
              )}

              <div className="mb-4">
                <label
                  htmlFor="banner"
                  className="block text-sm font-medium text-white"
                >
                  Banner
                </label>
                <input
                  type="file"
                  id="banner"
                  name="banner"
                  onChange={handleFileChange}
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
              to="/administrador/artistas"
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

export default ActualizarArtista;