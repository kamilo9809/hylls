import { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import Navbar from "./../../componentes/navbar";
import AdminHeader from "./../../componentes/adminHeader";
import FooterAdmin from "./../../componentes/footerAdmin";
import { mostrarAlerta } from "./../../config/Alerta";
import obtenerTokenAlmacenado from "./../../../helpers/obtenerToken";

const ActualizarAlbum = () => {
  const { id } = useParams();
  const [album, setAlbum] = useState({
    Id_artista: "",
    Nombre_album: "",
    Fecha_album: "",
    foto_album: "",
  });

  const mostrarBotonProp = false;
  const token = obtenerTokenAlmacenado();

  const [artistas, setArtistas] = useState([]);

  useEffect(() => {
    const obtenerAlbum = async () => {
      try {
        const respuesta = await fetch(
          `http://localhost:3001/albumes/obtenerAlbum/${id}`
        );
        const datos = await respuesta.json();

        setAlbum({
          ...datos,
          foto_album: datos.Foto_album || "",
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

    obtenerAlbum();
    obtenerArtistas();
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setAlbum((prevAlbum) => ({
      ...prevAlbum,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const { Id_artista, Nombre_album, Fecha_album } = album;

    if (!Id_artista || !Nombre_album || !Fecha_album) {
      mostrarAlerta("error", "Todos los campos son necesarios");
      return;
    }

    const formData = new FormData();

    formData.append("Id_artista", album.Id_artista);
    formData.append("Nombre_album", album.Nombre_album);
    formData.append("Fecha_album", album.Fecha_album);

    if (album.foto_album) {
      formData.append("foto_album", album.foto_album);
    }

    try {
      const response = await fetch(
        `http://localhost:3001/albumes/actualizarAlbum/${id}`,
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
        mostrarAlerta("success", "Álbum actualizado");
      } else {
        mostrarAlerta("error", data.mensaje);
      }
    } catch (error) {
      console.error("Error en la solicitud:", error);
    }
  };

  const handleFileChange = (e) => {
    const { name, files } = e.target;
    setAlbum((prevAlbum) => ({ ...prevAlbum, [name]: files[0] || null }));
  };

  return (
    <div className="flex flex-col min-h-screen bg-[#1E1B1B] relative overflow-hidden">
      <div>
        <Navbar></Navbar>
        <div className="p-5">
          <AdminHeader mostrarBotonProp={mostrarBotonProp} />
          <div className="w-full flex justify-center mb-24 border-inferior">
            <h2 className="admincontainer-h2 font-extrabold text-[20px] sm:absolute sm:left-[30%]">
              Actualizar Album
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
                {album.foto_album && (
                  <div className="w-[6rem] h-[6rem] sm:w-32 sm:h-32 rounded-[50%] overflow-hidden mb-16">
                    <img
                      src={`/${album.foto_album}`}
                      alt="Foto del álbum"
                      className="w-full h-full object-cover"
                    />
                  </div>
                )}

                <label
                  htmlFor="foto_album"
                  className="block text-sm font-medium text-white"
                >
                  Foto del Álbum
                </label>
                <input
                  type="file"
                  id="foto_album"
                  name="foto_album"
                  onChange={handleFileChange}
                  className="mt-1 p-2 w-full rounded-md bg-transparent text-[#E8D8B0]"
                />
              </div>

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
                  value={album.Id_artista}
                  onChange={handleChange}
                  className="mt-1 w-full rounded-md bg-transparent text-[#E8D8B0] text-[16px]"
                >
                  <option className="bg-[#1E1B1B]" disabled value="">Selecciona un artista</option>
                  {artistas.map((artista) => (
                    <option className="bg-[#1E1B1B]" key={artista.Id_artista} value={artista.Id_artista}>
                      {artista.Nombre}{" "}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div className="mb-4">
              <label
                htmlFor="Nombre_album"
                className="block text-sm font-medium text-white"
              >
                Nombre del Álbum
              </label>
              <input
                type="text"
                id="Nombre_album"
                name="Nombre_album"
                value={album.Nombre_album ?? ""}
                onChange={handleChange}
                className="mt-1 w-full rounded-md bg-transparent text-[#E8D8B0] text-[16px]"
              />
            </div>

            <div className="mb-4">
              <label
                htmlFor="Fecha_album"
                className="block text-sm font-medium text-white"
              >
                Fecha de Lanzamiento
              </label>
              <input
                type="date"
                id="Fecha_album"
                name="Fecha_album"
                value={album.Fecha_album ?? ""}
                onChange={handleChange}
                className="mt-1 w-full rounded-md bg-transparent text-[#E8D8B0] text-[16px]"
              />
            </div>

            <button
              type="submit"
              className="bg-[#E8D8B0] text-gray-800 p-2 rounded-md"
            >
              Actualizar Album
            </button>
            <Link
              to="/administrador/albumes"
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

export default ActualizarAlbum;