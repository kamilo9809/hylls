import checkAndClearData from "../../hooks/expirationTime";
import AdminHeader from "./adminHeader";
import Navbar from "./navbar";
import { useEffect } from "react";
import { Link } from "react-router-dom";
import "./adminStyles/admin.css";
import { useMostrarUsuarios } from "./../paginas/usuarios/useMostrarUsuarios";
import React,{Suspense} from "react";

const FooterAdmin = React.lazy(()=> import('./footerAdmin'));

function Admin() {
  const mostrarLogOutButton = true;
  const mostrarUsuarios = useMostrarUsuarios();

  useEffect(() => {
    console.log(localStorage);
    checkAndClearData();
  }, []);

  return (
    <div className="h-screen w-full relative bg-[#1E1B1B] overflow-hidden">
      <Navbar />

      <div className="flex flex-row w-full p-5">
        <main className="w-full">
          <div>
            <AdminHeader mostrarBotonProp={mostrarLogOutButton} />
            <div>
              <div className="w-full flex justify-center my-11">
                <h3 className="admincontainer-h3 text-[16px] font-medium">
                  Bienvenido al panel de Administrador.
                </h3>
              </div>
            </div>
          </div>

          <section className="text-[#E8D8B0] py-9 uppercase font-medium flex flex-col gap-3 enlaces-mobile">
            <div className="flex justify-start items-center gap-4">
              <Link to="/administrador/albumes" className="enlace">
                Albumes
              </Link>
              <div className="w-[90%] absolute left-32 overflow-hidden borde-color"></div>
            </div>

            <div className="flex justify-start items-center gap-4">
              <Link to="/administrador/artistas" className="enlace">
                artistas
              </Link>
              <div className="w-[90%] absolute left-32 overflow-hidden borde-color"></div>
            </div>

            <div className="flex justify-start items-center gap-4">
              <Link to="/administrador/canciones" className="enlace">
                canciones
              </Link>
              <div className="w-[90%] absolute left-32 overflow-hidden borde-color"></div>
            </div>

            <div className="flex justify-start items-center gap-4">
              <Link to="/administrador/noticias" className="enlace">
                noticias
              </Link>
              <div className="w-[90%] absolute left-32 overflow-hidden borde-color"></div>
            </div>

            <div className="flex justify-start items-center gap-4">
              <Link to="/administrador/videosArtista" className="enlace">
                videos
              </Link>
              <div className="w-[90%] absolute left-32 overflow-hidden borde-color"></div>
            </div>

            <div className="flex justify-start items-center gap-4">
              <Link to="/administrador/videosHero" className="enlace">
                Hero
              </Link>
              <div className="w-[90%] absolute left-32 overflow-hidden borde-color"></div>
            </div>

            {/* Enlace condicional */}
            {mostrarUsuarios && (
              <div className="flex justify-start items-center gap-4">
                <Link to="/administrador/usuarios" className="enlace">
                  Usuarios
                </Link>
                <div className="w-[90%] absolute left-32 overflow-hidden borde-color"></div>
              </div>
            )}
          </section>
        </main>
      </div>
      <Suspense fallback={<div className="flex justify-center items-center">Cargando...</div>}>
        <FooterAdmin></FooterAdmin>
      </Suspense>
      
    </div>
  );
}

export default Admin;
