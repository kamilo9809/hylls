import ListComponent from "./../../components/ListComponent";
import { useTranslation } from "react-i18next";

const NavPlayList = () => {
  const [t] = useTranslation("global");


  const elementos = {
    About: t("navbar.Releases.Featured"),
    Contact: t("navbar.Releases.News"),
    News: t("navbar.Releases.Specials"),
  };

  const Destino = {
    About: "#Destacadas",
    Contact: "#Novedades",
    News: "#Especiales",
  };

  return (
    <div className="flex flex-col">
      <div>
        <ListComponent
          elementos={elementos}
          Destino={Destino}
          className="flex flex-row w-full justify-center sm:justify-start px-9 gap-12 sm:w-7/12 font-akshar font-normal uppercase text-[#E8D8B0]"
        />
      </div>
    </div>
  );
};

export default NavPlayList;
