import { useState } from "react";
import { Link } from "react-router-dom";
import { mostrarAlerta } from "./../../config/Alerta";
import Navbar from "./../../componentes/navbar";
import AdminHeader from "./../../componentes/adminHeader";
import FooterAdmin from "./../../componentes/footerAdmin";
import "./../../componentes/adminStyles/admin.css";
import obtenerTokenAlmacenado from "./../../../helpers/obtenerToken";

const CrearUsuario = () => {
  const [rol, setRol] = useState("");
  const [clave, setClave] = useState("");
  const [usuario, setUsuario] = useState("");
  const [nombre, setNombre] = useState("");
  const token = obtenerTokenAlmacenado();


  const handleSubmit = async (e) => {
    e.preventDefault();

    if ([rol, clave, usuario, nombre].includes("")) {
      mostrarAlerta("error", "Rellena todos los campos");
      return;
    }

    try {
      const response = await fetch(
        "http://localhost:3001/usuarios/crearUsuario",
        {
          method: "POST",
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
          },
          body: JSON.stringify({
            Rol: rol,
            Clave: clave,
            Usuario: usuario,
            Nombre: nombre,
          }),
        }
      );

      if (response.ok) {
        mostrarAlerta("success", "Usuario creado correctamente");
      } else {
        mostrarAlerta("error", "Ocurrió un error, revisa tus permisos");
      }
    } catch (error) {
      console.error("Error al crear el usuario:", error);
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
              Crear Usuario
            </h2>
          </div>
          <form
            onSubmit={handleSubmit}
            className="mx-auto sm:w-full sm:pl-16 md:w-[60%] lg:pl-0 lg:w-[50%] xl:w-[40%] p-2 mb-32"
          >
            <div className="mb-4">
              <label htmlFor="rol" className="block text-sm font-medium text-white">
                Rol
              </label>
              <select
                id="rol"
                name="rol"
                value={rol}
                onChange={(e) => setRol(e.target.value)}
                className="mt-1 p-2 w-full rounded-md bg-[#D9D9D98F]"
              >
                <option value="" disabled>
                  Seleccione un rol
                </option>
                <option value="admin" name="admin">Admin</option>
                <option value="usuario" name="usuario">Usuario</option>
              </select>
            </div>

            <div className="mb-4">
              <label htmlFor="clave" className="block text-sm font-medium text-white">
                Clave
              </label>
              <input
                type="password"
                id="clave"
                name="clave"
                value={clave}
                onChange={(e) => setClave(e.target.value)}
                className="mt-1 p-2 w-full rounded-md bg-[#D9D9D98F]"
              />
            </div>

            <div className="mb-4">
              <label htmlFor="usuario" className="block text-sm font-medium text-white">
                Usuario
              </label>
              <input
                type="text"
                id="usuario"
                name="usuario"
                value={usuario}
                onChange={(e) => setUsuario(e.target.value)}
                className="mt-1 p-2 w-full rounded-md bg-[#D9D9D98F]"
              />
            </div>

            <div className="mb-4">
              <label htmlFor="nombre" className="block text-sm font-medium text-white">
                Nombre
              </label>
              <input
                type="text"
                id="nombre"
                name="nombre"
                value={nombre}
                onChange={(e) => setNombre(e.target.value)}
                className="mt-1 p-2 w-full rounded-md bg-[#D9D9D98F]"
              />
            </div>

            <button
              type="submit"
              className="bg-[#E8D8B0] text-gray-800 p-2 rounded-md"
            >
              Crear Usuario
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
      <FooterAdmin></FooterAdmin>
    </div>
  );
};

export default CrearUsuario;
