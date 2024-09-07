import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { mostrarAlerta } from "../../config/Alerta";
import Navbar from "./../../componentes/navbar";
import AdminHeader from "./../../componentes/adminHeader";
import FooterAdmin from "./../../componentes/footerAdmin";
import obtenerTokenAlmacenado from "./../../../helpers/obtenerToken";

const ActualizarCancion = () => {
  const { id } = useParams();
  const [cancion, setCancion] = useState({
    // Define los campos necesarios para la canción
    Id_cancion: "",
    Id_album: "",
    Cancion: "",
  });

  const mostrarBotonProp = false;
  const token = obtenerTokenAlmacenado();

  const [albumes, setAlbumes] = useState([]);

  useEffect(() => {
    // Hacer la solicitud para obtener los detalles de la canción por su ID
    const obtenerDetallesCancion = async () => {
      try {
        const respuestaCancion = await fetch(
          `http://localhost:3001/canciones/obtenerCancion/${id}`
        );
        const datosCancion = await respuestaCancion.json();
        setCancion(datosCancion);

        // Obtener lista de álbumes
        const respuestaAlbumes = await fetch(
          "http://localhost:3001/albumes/obtenerAlbumes"
        );
        const datosAlbumes = await respuestaAlbumes.json();
        setAlbumes(datosAlbumes);
      } catch (error) {
        console.error("Error al obtener detalles de la canción:", error);
      }
    };

    obtenerDetallesCancion();
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Realiza la lógica para enviar los datos actualizados al servidor
    try {
      const response = await fetch(
        `http://localhost:3001/canciones/actualizarCancion/${id}`,
        {
          method: "PUT",
          body: JSON.stringify({
            Id_album: cancion.Id_album,
            Cancion: cancion.Cancion,
          }),
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const data = await response.json();

      if (response.ok) {
        // Muestra una alerta de éxito
        mostrarAlerta("success", "Canción actualizada con éxito");
      } else {
        // Muestra una alerta de error si la solicitud no fue exitosa
        mostrarAlerta("error", data.mensaje);
      }
    } catch (error) {
      // Muestra una alerta de error en caso de excepción
      console.error(error);
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-[#1E1B1B] relative overflow-hidden">
      <div>
        <Navbar></Navbar>
        <div className="p-5">
          <AdminHeader mostrarBotonProp={mostrarBotonProp} />
          <div className="w-full flex justify-center mb-24 border-inferior">
            <h2 className="admincontainer-h2 font-extrabold text-[20px] sm:absolute sm:left-[30%]">
              Actualizar Cancion
            </h2>
          </div>

          <form
            onSubmit={handleSubmit}
            encType="multipart/form-data"
            className="mx-auto sm:w-full sm:pl-16 md:w-[60%] lg:pl-0 lg:w-[50%] xl:w-[40%] p-2 mb-32"
          >
            {/* Campo de foto del álbum */}
            <div className="flex justify-between">
              <div className="mb-4 flex flex-col justify-center items-start sm:items-start">
                <div className="w-[6rem] h-[6rem] sm:w-32 sm:h-32 rounded-[50%] overflow-hidden mb-16">
                  <img
                    src="/src/assets/icons/applemusic.svg"
                    alt="Foto del álbum"
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>

              <div className="mb-4 flex flex-col justify-center items-start sm:items-start">
                <label
                  htmlFor="idAlbum"
                  className="block text-sm font-medium text-white"
                >
                  Álbum
                </label>
                <select
                  id="idAlbum"
                  name="idAlbum"
                  value={cancion.Id_album}
                  onChange={(e) =>
                    setCancion({ ...cancion, Id_album: e.target.value })
                  }
                  className="mt-1 p-2 w-full rounded-md bg-transparent text-[#E8D8B0]"
                >
                  <option value="" disabled className="bg-[#1E1B1B]">
                    Seleccione un álbum
                  </option>
                  {albumes.map((album) => (
                    <option
                      className="bg-[#1E1B1B]"
                      key={album.Id_album}
                      value={album.Id_album}
                    >
                      {album.Nombre_album}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div className="mb-4">
              <label
                htmlFor="Canción:"
                className="block text-sm font-medium text-white"
              >
                Nombre de la Canción
              </label>
              <input
                type="text"
                id="nombreCancion"
                name="nombreCancion"
                value={cancion.Cancion}
                onChange={(e) =>
                  setCancion({ ...cancion, Cancion: e.target.value })
                }
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

export default ActualizarCancion;
