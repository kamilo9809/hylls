import { useState } from "react";
import NavBar from "./nav_bar";
import { Link } from "react-router-dom";
import "./../administrador/componentes/adminStyles/menuDesplegable.css";

function NavbarMobile() {
  const [menuOpen, setMenuOpen] = useState(false);
  

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  const closeMenu = () => {
    setMenuOpen(false);
  };

  return (
    <>
      <div className="fixed w-full z-40 overflow-hidden menu-movil">
        <div className="flex w-full justify-between items-center py-7 px-4 backdrop-blur-sm bg-opacity-75">
          <div className="w-8">
          </div>
          <div>
            <img src="./src/assets/images/hylls-logo.png" alt="hylls logo" />
          </div>
          <div>
            <button onClick={toggleMenu}>
              <img src="./src/assets/images/menubarTemporal.svg" alt="" />
            </button>
          </div>
        </div>
        {/* Menú desplegable */}
        <div className={`fixed top-0 left-0 w-full h-full bg-black text-[#E8D8B0] bg-opacity-90 flex flex-col pt-8 px-6 transition-opacity duration-300 ${menuOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}>
          <div className="flex justify-between pb-12">
            <div className="flex gap-2">
              <Link className="border-r-2 border-[#E8D8B0] px-1" to="/">ESP</Link>
              <Link className="border-r-2 border-[#E8D8B0] px-1" to="/">ENG</Link>
              <Link className="border-r-2 border-[#E8D8B0] px-1" to="/">FRN</Link>
              <Link to="/">POR</Link>
            </div>
            <div>
              <button onClick={closeMenu}>
                <p className="text-3xl">X</p>
              </button>
            </div>
          </div>
          <ul className={`text-[#e7e1d2] flex flex-col gap-3 uppercase text-base transition-all duration-300 ${menuOpen ? 'translate-y-0' : '-translate-y-full'}`}>
            <li>
              <div className="enlace-tittle">
                  <Link to="/">Compañía</Link>
              </div>
              <div className="flex flex-col gap-2 py-2">
                <Link to="/" className="opacity-50 transition-all hover:opacity-100">Sobre Nosotros</Link>
                <Link to="/" className="opacity-50 transition-all hover:opacity-100">Contacto</Link>
                <Link to="/" className="opacity-50 transition-all hover:opacity-100">Noticias</Link>
                <Link to="/" className="opacity-50 transition-all hover:opacity-100">Synck</Link>
              </div>
            </li>

            <li>
              <div className="enlace-tittle2">
                  <Link to="/">Discografía</Link>
              </div>
              <div className="flex flex-col gap-2 py-2">
                <Link to="/" className="opacity-50 transition-all hover:opacity-100">Artistas</Link>
                <Link to="/" className="opacity-50 transition-all hover:opacity-100">Albumes</Link>
                <Link to="/" className="opacity-50 transition-all hover:opacity-100">Videos</Link>
              </div>
            </li>


            <li>
              <div className="enlace-tittle3">
                  <Link to="/">Servicios</Link>
              </div>
              <div className="flex flex-col gap-2 py-2">
                <Link to="/" className="opacity-50 transition-all hover:opacity-100">Prod. Y Composición</Link>
                <Link to="/" className="opacity-50 transition-all hover:opacity-100">Distribución</Link>
                <Link to="/" className="opacity-50 transition-all hover:opacity-100">Audiovisual</Link>
              </div>
            </li>

            <li>
              <div className="enlace-tittle4">
                  <Link to="/">Playlist</Link>
              </div>
              <div className="flex flex-col gap-2 py-2">
                <Link to="/" className="opacity-50 transition-all hover:opacity-100">Destacadas</Link>
                <Link to="/" className="opacity-50 transition-all hover:opacity-100">Novedades</Link>
                <Link to="/" className="opacity-50 transition-all hover:opacity-100">Especiales</Link>
              </div>
            </li>
          </ul>

          <div className="my-5 min-w-full w-full">
        <h2 className={`uppercase text-4xl font-extrabold font-plaster degradado transition-all duration-600 ${menuOpen ? 'opacity-70' : 'opacity-0'}`}>Obsesión y arte.</h2>
      </div>
        </div>
      </div>
      <NavBar />
    </>
  );
}

export default NavbarMobile;
