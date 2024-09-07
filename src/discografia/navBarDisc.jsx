import ListComponent from "./../components/ListComponent";
import { useTranslation } from "react-i18next";

const NavBarDisc = () => {

  const [t] = useTranslation("global");

  const elementos = {
    Artists: t("navbar.Discography.Artist"),
    Albums: t("navbar.Discography.Albums"),
    Videos: t("navbar.Discography.Videos"),
  };

  const Destino = {
    Artists: "/Artistas",
    Albums: "/Albumes",
    Videos: "/Videos",
  };

  return (
    <div className="flex flex-col ">
      <div>
        <ListComponent
          elementos={elementos}
          Destino={Destino}
          className="flex justify-center gap-4 sm:justify-start md:gap-40 w-full h-fit lg:pl-20 bg-[#0A0A0A] texto-degradado text-center"
          pagina="Artistas"
        />

      </div>
    </div>
  );
};

export default NavBarDisc;