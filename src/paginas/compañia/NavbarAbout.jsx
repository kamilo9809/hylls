import ListComponent from "./../../components/ListComponent";
import {useTranslation} from "react-i18next";

const NavbarAbout = () => {

  const [t] = useTranslation("global");

  const elementos = {
    About: t("navbar.Company.About"),
    Contact:  t("navbar.Company.Contact"),
    News:  t("navbar.Company.News"),
    Synck: "SYNCK", // Este elemento no cambia de idioma, según el contexto
  };

  const Destino = {
    About: "/About",
    Contact: "/Contact",
    News: "/News",
    Synck: "/Synck",
  };

  return (
    <div className="flex flex-col">
      <div>
        <ListComponent
          elementos={elementos}
          Destino={Destino}
          className=" flex w-full text-[13px]  ps-5
                      justify-center sm:flex-row 
                      sm:justify-evenly sm:text-[20px] 
                      lg:w-7/12 uppercase font-light bg-clip-text 
                      text-transparent  bg-gradient-to-r    
                      from-[#E8D8B0] to-[#E4E4E4] 
                      font-akshar text-center"
        />
      </div>
    </div>
  );
};

export default NavbarAbout;
