import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { mostrarAlerta } from "../../config/Alerta";
import Navbar from "./../../componentes/navbar";
import AdminHeader from "./../../componentes/adminHeader";
import FooterAdmin from "./../../componentes/footerAdmin";
import "./../../componentes/adminStyles/admin.css";

import obtenerTokenAlmacenado from "./../../../helpers/obtenerToken";

const ActualizarUsuario = () => {
  const { id } = useParams();
  const [usuario, setUsuario] = useState({
    Rol: "",
    Clave: "",
    Usuario: "",
    Nombre: "",
  });

  const token = obtenerTokenAlmacenado();


  useEffect(() => {
    const obtenerUsuario = async () => {
      try {
        const respuesta = await fetch(
          `http://localhost:3001/usuarios/obtenerUsuario/${id}`, {
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${token}`
            },
          }
        );
        const datos = await respuesta.json();
        setUsuario(datos);
      } catch (error) {
        console.error(error.message);
      }
    };

    obtenerUsuario();
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUsuario((prevUsuario) => ({
      ...prevUsuario,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!usuario.Rol || !usuario.Clave || !usuario.Usuario || !usuario.Nombre) {
      mostrarAlerta("error", "Hay campos sin completar");
      return;
    }

    try {
      const response = await fetch(
        `http://localhost:3001/usuarios/actualizarUsuario/${id}`,
        {
          method: "PUT",
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
          },
          body: JSON.stringify(usuario),
        }
      );

      const data = await response.json();

      if (response.ok) {
        mostrarAlerta("success", "Usuario actualizado con éxito");
      } else {
        mostrarAlerta("error", data.mensaje);
      }
    } catch (error) {
      console.error("Error en la solicitud:", error);
      mostrarAlerta('error', 'Ocurrió un error, revisa tus permisos');
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-[#1E1B1B] relative overflow-hidden">
      <div>
        <Navbar />
        <div className="p-5">
          <AdminHeader />
          <div className="w-full flex justify-center mb-24 border-inferior">
            <h2 className="admincontainer-h2 font-extrabold text-[20px] sm:absolute sm:left-[30%]">
              Actualizar Usuario
            </h2>
          </div>
          <form
            onSubmit={handleSubmit}
            className="mx-auto sm:w-full sm:pl-16 md:w-[60%] lg:pl-0 lg:w-[50%] xl:w-[40%] p-2 mb-32"
          >
            <div className="mb-4">
              <label
                htmlFor="Clave"
                className="block text-sm font-medium text-white"
              >
                Clave
              </label>
              <input
                type="password"
                id="Clave"
                name="Clave"
                value={usuario.Clave}
                onChange={handleChange}
                className="mt-1 p-2 w-full rounded-md bg-transparent text-[#E8D8B0]"
              />
            </div>

            <div className="mb-4">
              <label
                htmlFor="Usuario"
                className="block text-sm font-medium text-white"
              >
                Usuario
              </label>
              <input
                type="text"
                id="Usuario"
                name="Usuario"
                value={usuario.Usuario}
                onChange={handleChange}
                className="mt-1 p-2 w-full rounded-md bg-transparent text-[#E8D8B0]"
              />
            </div>

            <div className="mb-4">
              <label
                htmlFor="Nombre"
                className="block text-sm font-medium text-white"
              >
                Nombre
              </label>
              <input
                type="text"
                id="Nombre"
                name="Nombre"
                value={usuario.Nombre}
                onChange={handleChange}
                className="mt-1 p-2 w-full rounded-md bg-transparent text-[#E8D8B0]"
              />
            </div>

            {/* Aquí incluir los campos del formulario según la estructura del usuario */}

            <div className="mb-4">
              <label
                htmlFor="Rol"
                className="block text-sm font-medium text-white"
              >
                Rol
              </label>
              <select
                id="Rol"
                name="Rol"
                value={usuario.Rol}
                onChange={handleChange}
                className="mt-1 p-2 w-full rounded-md bg-transparent text-[#E8D8B0]"
              >
                <option value="" disabled>
                  Seleccione un rol
                </option>
                <option value="admin">Admin</option>
                <option value="usuario">Usuario</option>
              </select>
            </div>

            {/* Agrega los demás campos del formulario de acuerdo a tu estructura de usuario */}

            <button
              type="submit"
              className="bg-[#E8D8B0] text-gray-800 p-2 rounded-md"
            >
              Actualizar Usuario
            </button>
            <Link
              to="/administrador/usuarios"
              className="ml-2 bg-[#E8D8B0] text-gray-800 p-2 rounded-md"
            >
              Volver
            </Link>
          </form>
        </div>
      </div>
      <FooterAdmin />
    </div>
  );
};

export default ActualizarUsuario;
