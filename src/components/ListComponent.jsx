import { useState }  from "react";
import PropTypes from "prop-types";
import Logo from "./../assets/images/hylls-logo.png";
import menubar from "./../assets/images/menubarTemporal.svg";
import { Link } from "react-router-dom";
import NavBarDespegable from "./nav_bar_despegable";
// import { useLanguage } from "./../context/LanguageContext";
import LanguageContext from "./LanguageBottom";

const ListComponent = ({ elementos, Destino, className}) => {
  // const { isEnglish, toggleLanguage } = useLanguage();
  const [isNavVisible, setIsNavVisible] = useState(false);
  
  const toggleNavVisibility = () => {
    setIsNavVisible(!isNavVisible);
  };
  
  return (
    <div>
      <div className="flex flex-row w-full justify-between bg-[#0A0A0A] pb-8 pt-5 px-8">
        <div className="w-1/2 max-[768px]:hidden">
        </div>
        <div className="w-1/2 flex justify-center max-[768px]:justify-start">
          <Link to={"/"} >
            <img src={Logo} alt="logo" />
          </Link>
        </div>
        <div className="flex flex-row w-1/2 justify-end items-center gap-10">
        <span className="text-md text-[#E8D8B0] underline ">            
            <LanguageContext />
        </span>
           <img src={menubar} className="z-[1600] cursor-pointer	"
          alt="menu" width={30} 
          onClick={toggleNavVisibility}
          />

        {isNavVisible && <NavBarDespegable />}  
        </div>
      </div>
      <ul className={className}>
        {Object.entries(elementos).map(([key, value], index) => {
          const rutaDestino = Destino[key];
          if (rutaDestino) {
            return (
              <li key={index} className=" w-full lg:w-auto">
                <Link to={rutaDestino} className=" hover:font-bold text-opacity-80  sm:text-xl">
                  {value}
                </Link>
              </li>
            );
          }
          return null;
        })}
      </ul>
    </div>
  );
};

ListComponent.propTypes = {
  elementos: PropTypes.object.isRequired,
  Destino: PropTypes.object.isRequired,
  className: PropTypes.string,
  pagina: PropTypes.string,
};

export default ListComponent;
