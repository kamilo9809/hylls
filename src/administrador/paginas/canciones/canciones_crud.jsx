import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { mostrarAlerta, mostrarConfirmacion } from "./../../config/Alerta";
import Navbar from "./../../componentes/navbar";
import AdminHeader from "./../../componentes/adminHeader";
import SearchBar from "./../../../components/searchBar";
import FooterAdmin from "../../componentes/footerAdmin";
import Paginador from "./../../../components/paginador";
import obtenerTokenAlmacenado from "./../../../helpers/obtenerToken";

const CancionesCrud = () => {
  const [canciones, setCanciones] = useState([]);
  const [paginaActual, setPaginaActual] = useState(1);
  const [cancionesPorPagina] = useState(5);
  const [cancionesFiltradas, setCancionesFiltradas] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    const obtenerCanciones = async () => {
      try {
        const respuesta = await fetch("http://localhost:3001/canciones/obtenerCanciones");
        const datos = await respuesta.json();
        setCanciones(datos);
        setCancionesFiltradas(datos);
      } catch (error) {
        console.error("Error al obtener canciones:", error);
      }
    };

    obtenerCanciones();
  }, []);



  const eliminarCancion = async (id) => {
    const token = obtenerTokenAlmacenado();
  
    const confirmacion = await mostrarConfirmacion("¿Deseas eliminar esta canción?", "Sí, eliminar");
  
    if (confirmacion.isDenied || !confirmacion.isConfirmed) {
      return;
    }
  
    try {
      const response = await fetch(`http://localhost:3001/canciones/borrarCancion/${id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
  
      if (!response.ok) {
        // Si el código de estado no es OK, lanza una excepción
        throw new Error(`Error en la eliminación (${response.status}): ${response.statusText}`);
      }
  
      // La eliminación en el servidor fue exitosa
      const nuevasCanciones = canciones.filter((cancion) => cancion.Id_cancion !== id);
      setCanciones(nuevasCanciones);
      setCancionesFiltradas(nuevasCanciones);
  
      mostrarAlerta("success", "Canción eliminada correctamente");
    } catch (error) {
      console.error("Error al eliminar canción:", error.message);
      mostrarAlerta("error", "Hubo un error al intentar eliminar la canción");
    }
  };
  
  



  const obtenerCancionesPaginadas = () => {
    const indiceUltimaCancion = paginaActual * cancionesPorPagina;
    const indicePrimeraCancion = indiceUltimaCancion - cancionesPorPagina;
    const cancionesPaginadas = cancionesFiltradas.slice(
      indicePrimeraCancion,
      indiceUltimaCancion
    );
    return cancionesPaginadas;
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
    if (paginaActual < Math.ceil(canciones.length / cancionesPorPagina)) {
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
    if (paginaActual + 3 <= Math.ceil(canciones.length / cancionesPorPagina)) {
      setPaginaActual(paginaActual + 3);
    } else {
      setPaginaActual(Math.ceil(canciones.length / cancionesPorPagina));
    }
  };

  const handleSearch = async (term) => {
    try {
      setSearchTerm(term);

      const cancionesFiltradas = canciones.filter((cancion) =>
        cancion.Cancion.toLowerCase().includes(term.toLowerCase())
      );
      setCancionesFiltradas(cancionesFiltradas);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    const handleSearch = async (term) => {
      try {
        setSearchTerm(term);
        const respuesta = await fetch("http://localhost:3001/canciones/obtenerCanciones");
        const datos = await respuesta.json();
        const cancionesFiltradas = datos.filter((cancion) =>
          cancion.Cancion.toLowerCase().includes(term.toLowerCase())
        );
        setCancionesFiltradas(cancionesFiltradas);
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
          Nuestras{" "}
          <span className="font-bold admincontainer-h2">Canciones</span>
        </h2>

        <div>
          <div className="w-full items-center justify-center h-fit">
            <SearchBar placeholderText={"Buscar..."} onSearch={handleSearch} />
          </div>
        </div>

        <div className="pt-12 flex flex-col justify-center items-center">
          <div className="flex justify-center items-center bg-[#E8D8B0] w-fit p-2 rounded-lg cursor-pointer boton-animado lg:absolute lg:right-[30%] lg:top-[15%] xl:right-[20%]">
            <Link
              to={"/administrador/canciones/crear-cancion"}
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
              {Array.isArray(cancionesFiltradas) &&
                obtenerCancionesPaginadas().map((cancion) => (
                  <li
                    key={cancion.Id_cancion}
                    className="flex items-center gap-9 sm:gap-3 justify-around border-b border-[#E8D8B0] p-3"
                  >
                    <div className="rounded-[50%] w-[60px] sm:w-auto">
                      <img
                        src="/src/assets/icons/applemusic.svg"
                        className="w-[5rem] h-[4rem] sm:w-[6rem] sm:h-[6rem] rounded-[50%]"
                        alt=""
                      />
                    </div>

                    <div className="w-2/4 sm:w-[6rem] lg:w-[22rem]">
                      <p>{`#${cancion.Id_cancion}`}</p>
                      <p>{cancion.Nombre_album || "Sin album"}</p>
                      <h3 className="text-[#E8D8B0] text-[16px] sm:text-[20px]">
                        {cancion.Cancion}
                      </h3>
                    </div>

                    <div className="flex h-full flex-col justify-between gap-10">
                      <button
                        onClick={() => eliminarCancion(cancion.Id_cancion)}
                        className="text-red-500 hover:underline"
                      >
                        <img
                          src="/src/assets/polygonos/borrar-icono.svg"
                          className="w-[1.5rem] h-[1.5rem]"
                          alt="borrar"
                        />
                      </button>

                      <Link
                        to={`/administrador/canciones/actualizar-cancion/${cancion.Id_cancion}`}
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
            cancionesFiltradas.length / cancionesPorPagina
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

export default CancionesCrud;
