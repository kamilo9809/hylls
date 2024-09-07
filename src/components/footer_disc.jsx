import circle from "./../assets/images/circ_1.svg";
import {useTranslation} from "react-i18next";
const Footer = () => {

  const [t] = useTranslation("global");

  return (
    <div className="w-full h-32 max-sm:h-20 bg-[#11111127] flex flex-col  px-6">
      <footer>
        <div className="w-full flex items-center relative">
          <p className="sm:hidden text-[#ffffffca]  h-20 flex justify-center items-center font-akshar text-base " >© 2023 HYLLS.</p>
          <p className=" text-white text-[14px] sm:text-lg w-1/2 text-left pl-5 py-8 max-sm:hidden">
            {t("footer.textLeft")}
          </p>
          <div className="w-1/3 relative max-sm:hidden">
            <img
              src={circle}
              alt="circle"
              className="relative bottom-[-2rem] xl:bottom-[-2rem] h-full"
            />
          </div>
          <p className="text-white text-[14px] max-sm:hidden sm:text-lg w-1/2 text-right pr-5">
            {t("footer.textRight")}
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Footer;