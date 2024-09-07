import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { mostrarAlerta, mostrarConfirmacion } from "./../../config/Alerta";
import Navbar from "./../../componentes/navbar";
import AdminHeader from "./../../componentes/adminHeader";
import SearchBar from "./../../../components/searchBar";
import FooterAdmin from "../../componentes/footerAdmin";
import Paginador from "./../../../components/paginador";
import obtenerTokenAlmacenado from "./../../../helpers/obtenerToken";

const AlbumesCrud = () => {
  const [albumes, setAlbumes] = useState([]);
  const [paginaActual, setPaginaActual] = useState(1);
  const [albumesPorPagina] = useState(5);
  const [albumesFiltrados, setAlbumesFiltrados] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");



  useEffect(() => {
    const obtenerAlbumes = async () => {
      try {
        const respuesta = await fetch("http://localhost:3001/albumes/obtenerAlbumes");
        const datos = await respuesta.json();
        setAlbumes(datos);
        setAlbumesFiltrados(datos);
      } catch (error) {
        console.error("Error al obtener albumes:", error);
      }
    };

    obtenerAlbumes();
  }, []);



  const eliminarAlbum = async (id) => {
    const token = obtenerTokenAlmacenado();
  
    const confirmacion = await mostrarConfirmacion("¿Deseas eliminar este álbum?", "Sí, eliminar");
  
    if (!confirmacion.isConfirmed) {
      return;
    }
  
    try {
      const respuesta = await fetch(`http://localhost:3001/albumes/borrarAlbum/${id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
  
      if (respuesta.ok) {
        const nuevosAlbumes = albumes.filter((album) => album.Id_album !== id);
        setAlbumes(nuevosAlbumes);
        setAlbumesFiltrados(nuevosAlbumes);
  
        mostrarAlerta("success", "Álbum eliminado correctamente");
      } else {
        mostrarAlerta("error", "Hubo un error al eliminar el álbum o no tienes los permisos necesarios");
      }
    } catch (error) {
      console.error("Error al eliminar álbum:", error);
      mostrarAlerta("error", "Hubo un error");
    }
  };
  
  
  



  const obtenerAlbumesPaginados = () => {
    const indiceUltimoAlbum = paginaActual * albumesPorPagina;
    const indicePrimerAlbum = indiceUltimoAlbum - albumesPorPagina;
    const albumesPaginados = albumesFiltrados.slice(indicePrimerAlbum, indiceUltimoAlbum);
    return albumesPaginados;
  };

  const irAPagina = (numeroPagina) => {
    setPaginaActual(numeroPagina);
  };

  const irAtras = () => {
    if (paginaActual > 1) {
      setPaginaActual(paginaActual - 1);
    }
  };

  const irAdelante = () => {
    if (paginaActual < Math.ceil(albumes.length / albumesPorPagina)) {
      setPaginaActual(paginaActual + 1);
    }
  };

  const irAtrasTres = () => {
    if (paginaActual > 3) {
      setPaginaActual(paginaActual - 3);
    } else {
      setPaginaActual(1);
    }
  };

  const irAdelanteTres = () => {
    if (paginaActual + 3 <= Math.ceil(albumes.length / albumesPorPagina)) {
      setPaginaActual(paginaActual + 3);
    } else {
      setPaginaActual(Math.ceil(albumes.length / albumesPorPagina));
    }
  };



  const handleSearch = async (term) => {
    try {
      setSearchTerm(term);

      const albumesFiltrados = albumes.filter((album) =>
        album.Nombre_album.toLowerCase().includes(term.toLowerCase())
      );
      setAlbumesFiltrados(albumesFiltrados);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    const handleSearch = async (term) => {
      try {
        setSearchTerm(term);
        const respuesta = await fetch("http://localhost:3001/albumes/obtenerAlbumes");
        const datos = await respuesta.json();
        const albumesFiltrados = datos.filter((album) =>
          album.Nombre_album.toLowerCase().includes(term.toLowerCase())
        );
        setAlbumesFiltrados(albumesFiltrados);
      } catch (error) {
        console.log(error);
      }
    };

    handleSearch(searchTerm);
  }, [searchTerm]);



  return (
    <div className="flex flex-col min-h-screen bg-[#1E1B1B] relative overflow-hidden pb-[60px]">
      <Navbar />
      <div className="w-full p-5">
        <AdminHeader mostrarBotonProp={false} />
      </div>

      <div>
        <h2 className="text-[20px] text-[#E8D8B0] text-center font-extrabold lg:absolute lg:left-[30%] lg:top-[15%] xl:left-[20%]">
          Nuestros <span className="font-bold admincontainer-h2">Álbumes</span>
        </h2>

        <div>
          <div className="w-full items-center justify-center h-fit">
            <SearchBar
              placeholderText={"Buscar..."}
              onSearch={handleSearch}
            />
          </div>
        </div>

        <div className="pt-12 flex flex-col justify-center items-center">
          <div className="flex justify-center items-center bg-[#E8D8B0] w-fit p-2 rounded-lg cursor-pointer boton-animado lg:absolute lg:right-[30%] lg:top-[15%] xl:right-[20%]">
            <Link
              to={"/administrador/albumes/crear-album"}
              className="flex items-center gap-1"
            >
              Nuevo registro
              <img
                src="/src/assets/polygonos/boton-agregar.svg"
                className="w-[1rem] h-[1rem]"
                alt="agregar"
              />
            </Link>
          </div>

          <div className="pt-12 text-white w-full sm:w-auto">
            <ul>
              {Array.isArray(albumesFiltrados) &&
                obtenerAlbumesPaginados().map((album) => (
                  <li
                    key={album.Id_album}
                    className="flex items-center gap-9 sm:gap-3 justify-around border-b border-[#E8D8B0] p-3"
                  >
                    <div className="rounded-[50%] w-[60px] sm:w-auto">
                      <img
                        src={`./../../public/${album.Foto_album}`}
                        className="w-[5rem] h-[4rem] sm:w-[6rem] sm:h-[6rem] rounded-[50%]"
                        alt=""
                      />
                    </div>

                    <div className="w-2/4 sm:w-[6rem] lg:w-[22rem]">
                      <p>{`#${album.Id_album}`}</p>
                      <h3 className="text-[#E8D8B0] text-[16px] sm:text-[20px]">
                        {album.Nombre_album}
                      </h3>
                      <p className="text-[#E8D8B0] text-[12px] sm:text-[16px] truncate">
                        {album.Fecha_album}
                      </p>
                    </div>

                    <div className="flex h-full flex-col justify-between gap-10">
                      <button
                        onClick={() => eliminarAlbum(album.Id_album)}
                        className="text-red-500 hover:underline"
                      >
                        <img
                          src="/src/assets/polygonos/borrar-icono.svg"
                          className="w-[1.5rem] h-[1.5rem]"
                          alt="borrar"
                        />
                      </button>

                      <Link
                        to={`/administrador/albumes/actualizar-album/${album.Id_album}`}
                        className="text-blue-500 hover:underline"
                      >
                        <img
                          src="/src/assets/polygonos/editar-icono.svg"
                          className="w-[1.5rem] h-[1.5rem]"
                          alt="borrar"
                        />
                      </Link>
                    </div>
                  </li>
                ))}
            </ul>
          </div>
        </div>

        <Paginador
          paginasTotales={Math.ceil(
            albumesFiltrados.length / albumesPorPagina
          )}
          paginaActual={paginaActual}
          irAPagina={irAPagina}
          irAtras={irAtras}
          irAdelante={irAdelante}
          irAtrasTres={irAtrasTres}
          irAdelanteTres={irAdelanteTres}
        />
      </div>
      <FooterAdmin />
    </div>
  );
};

export default AlbumesCrud;