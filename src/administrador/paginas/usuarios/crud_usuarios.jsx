import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { mostrarAlerta, mostrarConfirmacion } from './../../config/Alerta';
import Navbar from './../../componentes/navbar';
import AdminHeader from './../../componentes/adminHeader';
import SearchBar from './../../../components/searchBar';
import FooterAdmin from './../../componentes/footerAdmin';
import Paginador from './../../../components/paginador';
import obtenerTokenAlmacenado from './../../../helpers/obtenerToken';

const CrudUsuarios = () => {
  const [usuarios, setUsuarios] = useState([]);
  const [paginaActual, setPaginaActual] = useState(1);
  const [usuariosPorPagina] = useState(5);
  const [usuariosFiltrados, setUsuariosFiltrados] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  const token = obtenerTokenAlmacenado();

  useEffect(() => {
    const obtenerUsuarios = async () => {
      try {
        // Modifica la URL y la lógica para obtener los usuarios
        const respuesta = await fetch("http://localhost:3001/usuarios/obtenerTodosUsuarios", {
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
          },
        });
        const datos = await respuesta.json();
        setUsuarios(datos);
        setUsuariosFiltrados(datos);
      } catch (error) {
        console.error("Error al obtener usuarios:", error);
        mostrarAlerta('error', 'Ocurrió un error, revisa tus permisos');
      }
    };

    obtenerUsuarios();
  }, [token]);

  const eliminarUsuario = async (id) => {
    const confirmacion = await mostrarConfirmacion("¿Deseas eliminar este usuario?", "Sí, eliminar");

    if (confirmacion.isDenied || !confirmacion.isConfirmed) {
      return;
    }

    try {
      // Modifica la URL y la lógica para eliminar usuarios
      const response = await fetch(`http://localhost:3001/usuarios/borrarUsuario/${id}`, {
        method: "DELETE",
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
      });

      if (!response.ok) {
        // Si el código de estado no es OK, lanza una excepción
        throw new Error(`Error en la eliminación (${response.status}): ${response.statusText}`);
      }

      // La eliminación en el servidor fue exitosa
      const nuevosUsuarios = usuarios.filter((usuario) => usuario.Id_usuario !== id);
      setUsuarios(nuevosUsuarios);
      setUsuariosFiltrados(nuevosUsuarios);

      mostrarAlerta("success", "Usuario eliminado correctamente");
    } catch (error) {
      console.error("Error al eliminar usuario:", error.message);
      mostrarAlerta("error", "Hubo un error al intentar eliminar el usuario");
    }
  };

  const obtenerUsuariosPaginados = () => {
    const indiceUltimoUsuario = paginaActual * usuariosPorPagina;
    const indicePrimerUsuario = indiceUltimoUsuario - usuariosPorPagina;
    const usuariosPaginados = usuariosFiltrados.slice(indicePrimerUsuario, indiceUltimoUsuario);
    return usuariosPaginados;
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
    if (paginaActual < Math.ceil(usuarios.length / usuariosPorPagina)) {
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
    if (paginaActual + 3 <= Math.ceil(usuarios.length / usuariosPorPagina)) {
      setPaginaActual(paginaActual + 3);
    } else {
      setPaginaActual(Math.ceil(usuarios.length / usuariosPorPagina));
    }
  };

  const handleSearch = async (term) => {
    try {
      setSearchTerm(term);

      const usuariosFiltrados = usuarios.filter((usuario) =>
        usuario.Nombre.toLowerCase().includes(term.toLowerCase())
      );
      setUsuariosFiltrados(usuariosFiltrados);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    const handleSearch = async (term) => {
      try {
        setSearchTerm(term);

        // Modifica la URL y la lógica para obtener los usuarios
        const respuesta = await fetch("http://localhost:3001/usuarios/obtenerTodosUsuarios", {
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
          },
        });
        const datos = await respuesta.json();
        const usuariosFiltrados = datos.filter((usuario) =>
          usuario.Nombre.toLowerCase().includes(term.toLowerCase())
        );
        setUsuariosFiltrados(usuariosFiltrados);
      } catch (error) {
        console.log(error);
        mostrarAlerta('error', 'Ocurrió un error, revisa tus permisos')
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
          Nuestros <span className="font-bold admincontainer-h2">Usuarios</span>
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
              to={"/administrador/usuarios/crear-usuario"}
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
              {Array.isArray(usuariosFiltrados) &&
                obtenerUsuariosPaginados().map((usuario) => (
                  <li
                    key={usuario.IdUsuarios}
                    className="flex items-center gap-9 sm:gap-3 justify-around border-b border-[#E8D8B0] p-3"
                  >
                    <div className="rounded-[50%] w-[60px] sm:w-auto">
                      <img
                        src='/src/assets/icons/user-regular.svg'
                        className="w-[5rem] h-[4rem] sm:w-[6rem] sm:h-[5rem] rounded-[50%]"
                        alt=""
                      />
                    </div>

                    <div className="w-2/4 sm:w-[6rem] lg:w-[22rem]">
                      <p>{`#${usuario.IdUsuarios}`}</p>
                      <p className='font-bold'>{`${usuario.Rol}`}</p>
                      <p>{usuario.Nombre}</p>
                      <h3 className="text-[#E8D8B0] text-[16px] sm:text-[20px] truncate">
                        {usuario.Usuario}
                      </h3>
                    </div>

                    <div className="flex h-full flex-col justify-between gap-10">
                      <button
                        onClick={() => eliminarUsuario(usuario.IdUsuarios)}
                        className="text-red-500 hover:underline"
                      >
                        <img
                          src="/src/assets/polygonos/borrar-icono.svg"
                          className="w-[1.5rem] h-[1.5rem]"
                          alt="borrar"
                        />
                      </button>

                      <Link
                        to={`/administrador/usuarios/actualizar-usuario/${usuario.IdUsuarios}`}
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
            usuariosFiltrados.length / usuariosPorPagina
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

export default CrudUsuarios;
