import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { mostrarAlerta } from "./../../config/Alerta";
import Navbar from "./../../componentes/navbar";
import AdminHeader from "./../../componentes/adminHeader";
import FooterAdmin from "./../../componentes/footerAdmin";
import "./../../componentes/adminStyles/admin.css";
import obtenerTokenAlmacenado from "./../../../helpers/obtenerToken";

const CrearCancion = () => {
  const [albumes, setAlbumes] = useState([]);
  const [idAlbum, setIdAlbum] = useState("");
  const [nombreCancion, setNombreCancion] = useState("");

  const token = obtenerTokenAlmacenado();

  useEffect(() => {
    const obtenerAlbumes = async () => {
      try {
        const respuesta = await fetch(
          "http://localhost:3001/albumes/obtenerAlbumes"
        );
        const datos = await respuesta.json();
        setAlbumes(datos);
      } catch (error) {
        console.error("Error al obtener álbumes:", error);
      }
    };

    obtenerAlbumes();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if ([nombreCancion, idAlbum].includes("")) {
      mostrarAlerta("error", "Rellena todos los campos");
      return;
    }

    try {
      const response = await fetch(
        "http://localhost:3001/canciones/crearCancion",
        {
          method: "POST",
          body: JSON.stringify({
            Id_album: idAlbum,
            Cancion: nombreCancion,
          }),
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const data = await response.json();

      if (response.ok) {
        mostrarAlerta("success", "Canción creada correctamente");
      } else {
        mostrarAlerta("error", data.mensaje);
      }
    } catch (error) {
      console.error("Error al crear la canción:", error);
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
              Crear Canción
            </h2>
          </div>
          <form
            onSubmit={handleSubmit}
            className="mx-auto sm:w-full sm:pl-16 md:w-[60%] lg:pl-0 lg:w-[50%] xl:w-[40%] p-2 mb-32"
          >
            <div className="mb-4">
              <label
                htmlFor="idAlbum"
                className="block text-sm font-medium text-white"
              >
                Álbum
              </label>
              <select
                id="idAlbum"
                name="idAlbum"
                value={idAlbum}
                onChange={(e) => setIdAlbum(e.target.value)}
                className="mt-1 p-2 w-full rounded-md bg-[#D9D9D98F]"
              >
                <option value="" disabled>
                  Seleccione un álbum
                </option>
                {albumes.map((album) => (
                  <option key={album.Id_album} value={album.Id_album}>
                    {album.Nombre_album}
                  </option>
                ))}
              </select>
            </div>

            <div className="mb-4">
              <label
                htmlFor="nombreCancion"
                className="block text-sm font-medium text-white"
              >
                Nombre de la Canción
              </label>
              <input
                type="text"
                id="nombreCancion"
                name="nombreCancion"
                value={nombreCancion}
                onChange={(e) => setNombreCancion(e.target.value)}
                className="mt-1 p-2 w-full rounded-md bg-[#D9D9D98F]"
              />
            </div>

            <button
              type="submit"
              className="bg-[#E8D8B0] text-gray-800 p-2 rounded-md"
            >
              Crear Canción
            </button>
            <Link
              to="/administrador/canciones"
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

export default CrearCancion;
