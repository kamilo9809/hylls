import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { mostrarAlerta } from "../../config/Alerta";
import Navbar from "./../../componentes/navbar";
import AdminHeader from "./../../componentes/adminHeader";
import FooterAdmin from "./../../componentes/footerAdmin";
import "./../../componentes/adminStyles/admin.css";
import obtenerTokenAlmacenado from "./../../../helpers/obtenerToken";

const CrearAlbum = () => {
  const [artistas, setArtistas] = useState([]);
  const [idArtista, setIdArtista] = useState("");
  const [nombreAlbum, setNombreAlbum] = useState("");
  const [fechaAlbum, setFechaAlbum] = useState("");
  const [fotoAlbum, setFotoAlbum] = useState(null);
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

    if ([nombreAlbum, fechaAlbum, idArtista].includes("")) {
      mostrarAlerta("error", "Todos los campos son necesarios");
      return;
    }

    const fechaFormateada = new Date(fechaAlbum).toISOString().split("T")[0];

    const formData = new FormData();
    formData.append("Id_artista", idArtista);
    formData.append("Nombre_album", nombreAlbum);
    formData.append("Fecha_album", fechaFormateada);
    formData.append("foto_album", fotoAlbum);

    try {
      console.log(token)
      const response = await fetch(
        "http://localhost:3001/albumes/crearAlbum",
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
        mostrarAlerta("success", "Álbum creado con éxito");
      } else {
        mostrarAlerta("error", data.mensaje);
      }
    } catch (error) {
      console.error("Error en la solicitud:", error);
    }

    // Redireccionar al administrador de álbumes
    window.location.href = "/administrador/albumes";
  };

  return (
    <div className="flex flex-col min-h-screen bg-[#1E1B1B] relative overflow-hidden">
      <div>
        <Navbar></Navbar>
        <div className="p-5">
          <AdminHeader />
          <div className="w-full flex justify-center mb-24 border-inferior">
            <h2 className="admincontainer-h2 font-extrabold text-[20px] sm:absolute sm:left-[30%]">
              Crear Álbum
            </h2>
          </div>
          <form
            onSubmit={handleSubmit}
            encType="multipart/form-data"
            className="mx-auto sm:w-full sm:pl-16 md:w-[60%] lg:pl-0 lg:w-[50%] xl:w-[40%] p-2 mb-32"
          >
              <div className="mb-4">
                <label
                  htmlFor="idArtista"
                className="block text-sm font-medium text-white"
                >
                Artista
                </label>
                <select
                  id="idArtista"
                  name="idArtista"
                  value={idArtista}
                  onChange={(e) => setIdArtista(e.target.value)}
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
                <label
                  htmlFor="nombreAlbum"
                className="block text-sm font-medium text-white"
                >
                  Nombre del Álbum
                </label>
                <input
                  type="text"
                  id="nombreAlbum"
                  name="nombreAlbum"
                  value={nombreAlbum}
                  onChange={(e) => setNombreAlbum(e.target.value)}
                  className="mt-1 p-2 w-full rounded-md bg-[#D9D9D98F]"
                />
              </div>

              <div className="mb-4">
                <label
                  htmlFor="fechaAlbum"
                className="block text-sm font-medium text-white"
                >
                  Fecha de Lanzamiento
                </label>
                <input
                  type="date"
                  id="fechaAlbum"
                  name="fechaAlbum"
                  value={fechaAlbum}
                  onChange={(e) => setFechaAlbum(e.target.value)}
                  className="mt-1 p-2 w-full rounded-md bg-[#D9D9D98F]"
                />
              </div>

              <div className="mb-4">
                <label
                  htmlFor="fotoAlbum"
                className="block text-sm font-medium text-white"
                >
                  Foto del Álbum
                </label>
                <input
                  type="file"
                  id="fotoAlbum"
                  name="fotoAlbum"
                  onChange={(e) => setFotoAlbum(e.target.files[0])}
                  className="mt-1 p-2 w-full rounded-md bg-[#D9D9D98F]"
                />
              </div>

              <button
              type="submit"
              className="bg-[#E8D8B0] text-gray-800 p-2 rounded-md"
            >
              Crear Álbum
            </button>
            <Link
              to={"/administrador/albumes"}
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


export default CrearAlbum;