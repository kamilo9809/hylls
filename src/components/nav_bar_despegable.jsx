import { Link } from "react-router-dom";
import "./../styles/navbar.css";

// import { useLanguage } from "../context/LanguageContext";

const NavBarDespegable = () => {



  return (
    <div className="navbar-container justify-between sm:px-20 hovered">
      <div className="hylls-logo pt-9">
        <Link to="/">
          <img src="\src\assets\images\hylls-logo.png" alt="logo" />
        </Link>
      </div>

      <div>
        <nav className="uppercase pt-10 enlaces-container">
          <div className="text-base mb-4 block">
            <h3 className="sm:mb-10 categoria font-bold">Compañia</h3>
            <ul className="links-list sm:flex sm:flex-col">
              <li className="mb-10">
                <Link className="hover:font-bold" to={"/About"}>Sobre Nosotros</Link>
              </li>
              <li className="mb-10">
                <Link className="hover:font-bold" to={"/Contact"}>Contacto</Link>
              </li>
              <li className="mb-10">
                <Link className="hover:font-bold" to={"/News"}>Noticias</Link>
              </li>
              <li className="mb-10">
                <Link className="hover:font-bold" to={"/Synck"}>Synck</Link>
              </li>
            </ul>
          </div>

          <div className="text-base mb-4 block">
            <h3 className="sm:mb-10 categoria font-bold">Discografía</h3>
            <ul className="links-list sm:flex sm:flex-col">
              <li className="mb-10">

                <Link to={"/Artistas"}>Artistas</Link>
              </li>
              <li className="mb-10">
                <Link to={"/Albumes"}>Albumes</Link>
              </li>
              <li className="mb-10">
                <Link to={"/Videos"}>Videos</Link>
              </li>
            </ul>
          </div>
{/* 


*/}
          <div className="text-base text-left">
            <Link to="Servicios" className="font-bold">
              Servicios
            </Link>
            <ul className="text-left sm:flex sm:flex-col sm:mt-12 overflow-hidden">
              <li className="mb-10 hover:font-bold">
                <Link to={"#"} style={{ whiteSpace: "pre-wrap" }}>
                  Producción y <br />Composición
                </Link>
              </li>
              <li className="mb-10 hover:font-bold">
                <Link to={"#"}>Distribución</Link>
              </li>
              <li className="mb-10 hover:font-bold">
                <Link to={"#"}>Promoción</Link>
              </li>
              <li className="mb-10 hover:font-bold">
                <Link to={"#"}>Audiovisual</Link>
              </li>
              <li className="mb-10 hover:font-bold">
                <Link to={"#"}>Legal</Link>
              </li>
            </ul>
          </div>

          <div className="text-base text-center ">
            <Link className="font-bold">Lanzamientos</Link>
            <ul className="text-left sm:flex sm:flex-col sm:mt-12 " >
              <li className="mb-10 hover:font-bold">
                <Link to={"#"}>Destacadas</Link>
              </li>
              <li className="mb-10 hover:font-bold">
                <Link to={"#"}>Novedades</Link>
              </li>
              <li className="mb-10 hover:font-bold">
                <Link to={"#"}>Especiales</Link>
              </li>
            </ul>
          </div>

          <div>
            <button className="border-b ">ESP</button>
          </div>
        </nav>

        <div className="h1-container min-w-full show-h1">
          <div className="w-full flex flex-row justify-between items-center p-0 m-0">
            <h1 className="uppecase text-8xl max-w-3xl">Obsesión y Arte.</h1>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NavBarDespegable;
