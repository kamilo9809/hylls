import circle from "./../assets/images/circ_1.svg";
import { useTranslation } from "react-i18next";
import React,{useEffect, useState} from "react";

const footer_disc = () => {
  const [t] = useTranslation("global");
  const [ocultarFooter, setOcultarFooter] = useState(window.innerWidth)

  useEffect(()=>{
    const anchoPantalla = ()=>{
      setOcultarFooter(window.innerWidth);
      //almacena el ancho de pantalla en el navegador
    }
    window.addEventListener('resize',anchoPantalla);
  
    return()=>{
      window.removeEventListener('resize', anchoPantalla);
    };
  },[]);

  return (
    <div className="w-full h-auto bg-[#11111127] flex flex-col">
      <footer>
        <div className="w-full flex items-center relative">
          <p className="text-white text-lg w-1/2 text-left pl-5 py-5">
          {t("footer.textLeft")}
          </p>
          <div className="relative ">
            <img
            loading="lazy"
              src={circle}
              alt="circle"
              className=" bottom-0"
              height={50}
              width={600}
            />
          </div>
          <p className={`text-white text-lg w-1/2 text-right pr-5 ${ocultarFooter < 640 ? 'hidden': ''}`}>
          {t("footer.textRight")}
          </p>
        </div>
      </footer>
    </div>
  );
};

export default footer_disc;
