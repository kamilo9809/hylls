import { Link } from "react-router-dom";
import './adminStyles/menuDesplegable.css';

const MenuEscritorio = (props) => {


  return (
    <div className="navbar-container flex justify-between sm:px-20 hovered"
     >
      <div className="hylls-logo pt-9 -ml-4">
        <Link to="/">
          <img src="\src\assets\images\hylls-logo.png" alt="logo" />
        </Link>
      </div>

      <div>
        <div className="flex contenedor-nav">
        <nav className="uppercase pt-10 enlaces-container">
          <div className="text-base mb-4 block">
            <h3 className="sm:mb-10 categoria font-bold">Compañia</h3>
            <ul className="links-list sm:flex sm:flex-col">
              <li className="mb-10">
                <Link to={"/About"}>Sobre Nosotros</Link>
              </li>
              <li className="mb-10">
                <Link to={"/Contact"}>Contacto</Link>
              </li>
              <li className="mb-10">
                <Link to={"/News"}>Noticias</Link>
              </li>
              <li className="mb-10">
                <Link to={"/Synck"}>Synck</Link>
              </li>
            </ul>
          </div>

          <div className="text-base mb-4 block">
            <h3 className="sm:mb-10 categoria font-bold">Discografía</h3>
            <ul className="links-list sm:flex sm:flex-col">
              <li className="mb-10">
                <Link to={'#'}>Artistas</Link>
              </li>
              <li className="mb-10">
                <Link to={"#"}>Albumes</Link>
              </li>
              <li className="mb-10">
                <Link to={"#"}>Videos</Link>
              </li>
            </ul>
          </div>

          <div className="text-base text-left">
            <Link to="Servicios" className="font-bold">Servicios</Link>
            <ul className="text-left sm:flex sm:flex-col sm:mt-12 overflow-hidden">
              <li className="mb-10">
                <Link to={"#"} style={{ whiteSpace: "pre-wrap" }}>
                  Producción y <br />Composición
                </Link>
              </li>
              <li className="mb-10">
                <Link to={"#"}>Distribución</Link>
              </li>
              <li className="mb-10">
                <Link to={"#"}>Promoción</Link>
              </li>
              <li className="mb-10">
                <Link to={"#"}>Audiovisual</Link>
              </li>
              <li className="mb-10">
                <Link to={"#"}>Legal</Link>
              </li>
            </ul>
          </div>

          <div className="text-base text-center ">
            <Link className="font-bold">Lanzamientos</Link>
            <ul className="text-left sm:flex sm:flex-col sm:mt-12 " >
              <li className="mb-10">
                <Link to={"#"}>Destacadas</Link>
              </li>
              <li className="mb-10">
                <Link to={"#"}>Novedades</Link>
              </li>
              <li className="mb-10">
                <Link to={"#"}>Especiales</Link>
              </li>
            </ul>
          </div>



        </nav>
        <div className="bg-[#E8D8B0] fixed top-9 right-8 bg-clip-text button-esp flex items-center">
            <button className="border-b">ESP</button>
            <div className="ml-10">
            <p className="text-white text-2xl cursor-pointer" onClick={props.closeMenu}>X</p>
        </div>
          </div>
        </div>

        <div className="h1-container min-w-full show-h1">
          <div className="w-full flex flex-row justify-between items-center p-0 m-0">
          <h1 className="uppecase max-w-3xl traducible text-[4rem] lg:text-[5rem] texto-fluido">Obsesión y Arte.</h1>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MenuEscritorio;
