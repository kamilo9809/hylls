import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { mostrarAlerta, mostrarConfirmacion } from "./../../config/Alerta";
import Navbar from "./../../componentes/navbar";
import AdminHeader from "./../../componentes/adminHeader";
import SearchBar from "./../../../components/searchBar";
import FooterAdmin from "../../componentes/footerAdmin";
import Paginador from "./../../../components/paginador";
import obtenerTokenAlmacenado from "./../../../helpers/obtenerToken";

const ArtistasCrud = () => {
  const [artistas, setArtistas] = useState([]);
  const [paginaActual, setPaginaActual] = useState(1); // estado para la página actual
  const [artistasPorPagina] = useState(5); // se ajusta
  const [artistasFiltrados, setArtistasFiltrados] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  //consultas a la API
  useEffect(() => {
    // Hacer la solicitud para obtener la lista de artistas
    const obtenerArtistas = async () => {
      try {
        const respuesta = await fetch(
          "http://localhost:3001/artistas/obtenerArtistas"
        );
        const datos = await respuesta.json();
        setArtistas(datos);
        setArtistasFiltrados(datos);
      } catch (error) {
        console.error("Error al obtener artistas:", error);
      }
    };

    obtenerArtistas();
  }, []);



  const eliminarArtista = async (id) => {
    // Verifica si el usuario tiene un token almacenado
    const token = obtenerTokenAlmacenado();
  
    // Primera alerta para confirmar la eliminación del artista y sus datos asociados
    const primeraConfirmacion = await mostrarConfirmacion(
      "¿Deseas eliminar este artista y todos sus álbumes y canciones asociadas?",
      "Sí, eliminar"
    );
  
    if (!primeraConfirmacion.isConfirmed) {
      return;
    }
  
    // Segunda alerta para confirmar la eliminación una vez más
    const segundaConfirmacion = await mostrarConfirmacion(
      "¿Estás realmente seguro? Esta acción no se puede deshacer.",
      "Sí, estoy seguro"
    );
  
    if (!segundaConfirmacion.isConfirmed) {
      return;
    }
  
    try {
      const respuestaAlbumes = await fetch(
        `http://localhost:3001/albumes/obtenerAlbumPorArtista/${id}`
      );
      const datosAlbumes = await respuestaAlbumes.json();
  
      const albumes = Array.isArray(datosAlbumes) ? datosAlbumes : [datosAlbumes];
  
      // Promesas de eliminación de canciones y álbumes
      const deletePromises = [];
  
      for (const album of albumes) {
        const respuestaCanciones = await fetch(
          `http://localhost:3001/canciones/obtenerCancionesPorAlbum/${album.Id_album}`
        );
        const datosCanciones = await respuestaCanciones.json();
  
        if (Array.isArray(datosCanciones)) {
          for (const cancion of datosCanciones) {
            deletePromises.push(
              fetch(`http://localhost:3001/canciones/borrarCancion/${cancion.Id_cancion}`, {
                method: "DELETE",
                headers: {
                  "Content-Type": "application/json",
                  Authorization: `Bearer ${token}`,
                },
              })
            );
          }
        }
  
        deletePromises.push(
          fetch(`http://localhost:3001/albumes/borrarAlbum/${album.Id_album}`, {
            method: "DELETE",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
          })
        );
      }
  
      // Esperar a que todas las eliminaciones se completen
      await Promise.all(deletePromises);
  
      // Eliminar el artista después de eliminar álbumes y canciones
      const respuestaArtista = await fetch(`http://localhost:3001/artistas/borrarArtista/${id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
  
      if (respuestaArtista.ok) {
        // Filtrar artistas después de completar todas las eliminaciones
        const nuevosArtistas = artistas.filter(
          (artista) => artista.Id_artista !== id
        );
        setArtistas(nuevosArtistas);
        setArtistasFiltrados(nuevosArtistas);
  
        mostrarAlerta("success", "Registro eliminado correctamente");
      } else {
        mostrarAlerta("error", "Hubo un error al eliminar el artista o no tienes los permisos necesarios");
      }
    } catch (error) {
      console.error(error);
      mostrarAlerta("error", "Hubo un error");
    }
  };
  

  //termina consultas a la api

  //Paginación
  const obtenerArtistasPaginados = () => {
    const indiceUltimoArtista = paginaActual * artistasPorPagina;
    const indicePrimerArtista = indiceUltimoArtista - artistasPorPagina;
    const artistasPaginados = artistasFiltrados.slice(
      indicePrimerArtista,
      indiceUltimoArtista
    );
    return artistasPaginados;
  };

  const irAPagina = (numeroPagina) => {
    setPaginaActual(numeroPagina);
  };

  const irAtras = () => {
    // Implementa la lógica para retroceder una página
    if (paginaActual > 1) {
      setPaginaActual(paginaActual - 1);
    }
  };

  const irAdelante = () => {
    // Implementa la lógica para avanzar una página
    if (paginaActual < Math.ceil(artistas.length / artistasPorPagina)) {
      setPaginaActual(paginaActual + 1);
    }
  };

  const irAtrasTres = () => {
    // Implementa la lógica para retroceder tres páginas
    if (paginaActual > 3) {
      setPaginaActual(paginaActual - 3);
    } else {
      setPaginaActual(1);
    }
  };

  const irAdelanteTres = () => {
    // Implementa la lógica para avanzar tres páginas
    if (paginaActual + 3 <= Math.ceil(artistas.length / artistasPorPagina)) {
      setPaginaActual(paginaActual + 3);
    } else {
      setPaginaActual(Math.ceil(artistas.length / artistasPorPagina));
    }
  };
  //termina paginación

  //configuración del buscador:
  const handleSearch = async (term) => {
    try {
      setSearchTerm(term);

      const artistasFiltrados = artistas.filter((artista) =>
        artista.Nombre.toLowerCase().includes(term.toLowerCase())
      );
      setArtistasFiltrados(artistasFiltrados);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    const handleSearch = async (term) => {
      try {
        setSearchTerm(term);
        const respuesta = await fetch(
          "http://localhost:3001/artistas/obtenerArtistas"
        );
        const datos = await respuesta.json();
        const artistasFiltrados = datos.filter((artista) =>
          artista.Nombre.toLowerCase().includes(term.toLowerCase())
        );
        setArtistasFiltrados(artistasFiltrados);
      } catch (error) {
        console.log(error);
      }
    };

    handleSearch(searchTerm);
  }, [searchTerm]);
  //termina configuracion buscador

  return (
    <div className="flex flex-col min-h-screen bg-[#1E1B1B] relative overflow-hidden pb-[60px]">
      <Navbar />
      <div className="w-full p-5">
        <AdminHeader mostrarBotonProp={false} />
      </div>

      <div>
        <h2 className="text-[20px] text-[#E8D8B0] text-center font-extrabold lg:absolute lg:left-[30%] lg:top-[15%] xl:left-[20%]">
          Nuestros <span className="font-bold admincontainer-h2">Artistas</span>
        </h2>

        <div>
          <div className="w-full items-center justify-center h-fit">
            <SearchBar
              placeholderText={"Buscar..."}
              onSearch={handleSearch} // Pasa la función de búsqueda al componente SearchBar
            />
          </div>
        </div>

        <div className="pt-12 flex flex-col justify-center items-center">
          <div className="flex justify-center items-center bg-[#E8D8B0] w-fit p-2 rounded-lg cursor-pointer boton-animado lg:absolute lg:right-[30%] lg:top-[15%] xl:right-[20%]">
            <Link
              to={"/administrador/artistas/crear-artista"}
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
              {Array.isArray(artistasFiltrados) &&
                obtenerArtistasPaginados().map((artista) => (
                  <li
                    key={artista.Id_artista}
                    className="flex items-center gap-9 sm:gap-3 justify-around border-b border-[#E8D8B0] p-3"
                  >
                    <div className="rounded-[50%] w-[60px] sm:w-auto">
                      <img
                        src={`./../../../../public/${artista.foto}`}
                        className="w-[5rem] h-[4rem] sm:w-[6rem] sm:h-[6rem] rounded-[50%]"
                        alt=""
                      />
                    </div>

                    <div className="w-2/4 sm:w-[6rem] lg:w-[22rem]">
                      <p>{`#${artista.Id_artista}`}</p>
                      <h3 className="text-[#E8D8B0] text-[16px] sm:text-[20px]">
                        {artista.Nombre}
                      </h3>
                      <p className="text-[#E8D8B0] text-[12px] sm:text-[16px] truncate">
                        {artista.biografia}
                      </p>
                    </div>

                    <div className="flex h-full flex-col justify-between gap-10">
                      <button
                        onClick={() => eliminarArtista(artista.Id_artista)}
                        className="text-red-500 hover:underline"
                      >
                        <img
                          src="/src/assets/polygonos/borrar-icono.svg"
                          className="w-[1.5rem] h-[1.5rem]"
                          alt="borrar"
                        />
                      </button>

                      <Link
                        to={`/administrador/artistas/actualizar-artista/${artista.Id_artista}`}
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
            artistasFiltrados.length / artistasPorPagina
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

export default ArtistasCrud;