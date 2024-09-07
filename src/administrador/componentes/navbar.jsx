import { useState } from "react";
import LogoHylls from "./../../assets/images/hylls-logo.png";
import MenuEscritorio from "./nav-escritorio";
import { Link } from "react-router-dom";
import "./adminStyles/menuDesplegable.css";
import { useMostrarUsuarios } from "./../paginas/usuarios/useMostrarUsuarios";

function Navbar() {
  const mostrarUsuarios = useMostrarUsuarios();
  const [isMenuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => {
    setMenuOpen(!isMenuOpen);
  };

  const closeMenu = () => {
    setMenuOpen(false);
  };

  return (
    <>
      <div>
        <nav className="bg-[#0a0a0a] text-orange-200 sticky top-0 flex w-full justify-between items-center drop-shadow h-20 px-4 lg:px-12 z-30">
          <div className="w-6 h-8"></div>
          <div className="w-16 h-8">
            <Link to="/administrador/admin">
              <img src={LogoHylls} alt="LogoHylls" width={70} />
            </Link>
          </div>
          <div>
            <button className="w-6 h-8" onClick={toggleMenu}>
              <img
                className="w-full logo-menu"
                src="/src/assets/images/menubarTemporal.svg"
                alt="logo menu"
              />
            </button>
          </div>
        </nav>
      </div>

      {isMenuOpen && (
        // Menu Móvil
        <>
          <div
            className={`fixed inset-0 w-full bg-[#1E1B1B] bg-opacity-50 z-40 overflow-hidden menu-movil`}
          >
            <div>
              <p
                className="text-[#E8D8B0] absolute right-8 top-7 uppercase font-bold cursor-pointer z-40"
                onClick={closeMenu}
              >
                x
              </p>
            </div>
            <div className="w-full h-full absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 px-4 py-6 rounded-md backdrop-blur-md">
              <ul className="h-[440px] flex flex-col justify-between font-medium pt-32 text-[#E8D8B0] uppercase gap-7">
                <li className="flex justify-start items-center gap-4">
                  <Link to="/administrador/albumes" className="enlace">
                    Albumes
                  </Link>
                  <div className="w-[90%] absolute left-32 overflow-hidden borde-color"></div>
                </li>

                <li className="flex justify-start items-center gap-4">
                  <Link to="/administrador/artistas" className="enlace">
                    Artistas
                  </Link>
                  <div className="w-[90%] absolute left-32 overflow-hidden borde-color"></div>
                </li>

                <li className="flex justify-start items-center gap-4">
                  <Link to="/administrador/canciones" className="enlace">
                    canciones
                  </Link>
                  <div className="w-[90%] absolute left-32 overflow-hidden borde-color"></div>
                </li>

                <li className="flex justify-start items-center gap-4">
                  <Link to="/administrador/noticias" className="enlace">
                    noticias
                  </Link>
                  <div className="w-[90%] absolute left-32 overflow-hidden borde-color"></div>
                </li>

                <li className="flex justify-start items-center gap-4">
                  <Link to="/administrador/playlists" className="enlace">
                    playlists
                  </Link>
                  <div className="w-[90%] absolute left-32 overflow-hidden borde-color"></div>
                </li>

                <li className="flex justify-start items-center gap-4">
                  <Link to="/administrador/videosArtista" className="enlace">
                    videos
                  </Link>
                  <div className="w-[90%] absolute left-32 overflow-hidden borde-color"></div>
                </li>

                <li className="flex justify-start items-center gap-4">
                  <Link to="/administrador/videosHero" className="enlace">
                    Hero
                  </Link>
                  <div className="w-[90%] absolute left-32 overflow-hidden borde-color"></div>
                </li>

                {mostrarUsuarios && (
                  <li className="flex justify-start items-center gap-4">
                    <Link to="/administrador/usuarios" className="enlace">
                      Usuarios
                    </Link>
                    <div className="w-[90%] absolute left-32 overflow-hidden borde-color"></div>
                  </li>
                )}

                <li className="flex justify-start items-center gap-4">
                  <Link to="/administrador/admin" className="enlace">
                    Log-out
                  </Link>
                  <div className="w-[90%] absolute left-32 overflow-hidden borde-color"></div>
                </li>
              </ul>
            </div>
          </div>

          <MenuEscritorio closeMenu={closeMenu} />
        </>
        // Menu de toda la life
      )}
    </>
  );
}

export default Navbar;
