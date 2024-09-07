import mastering from './../../assets/icons/mezclaMastering.svg'
import plugins from './../../assets/images/plugins.png'
import { useTranslation } from 'react-i18next';
import { useEffect, useState } from 'react';
import {PropTypes} from 'prop-types'



function Mezcla({id}) {
  const [t] = useTranslation("global");
  const [ocultarImagen, setOcultarImagen] = useState(window.innerWidth);


  useEffect(() => {
    const anchoPantalla = () => {
      setOcultarImagen(window.innerWidth)
    }
    window.addEventListener('resize', anchoPantalla);

    return () => {
      window.addEventListener('resize', anchoPantalla);
    }
  }, [])

//sm: tamaño de pantalla 640
//md: tamaño de pantalla 768
//lg: tamaño de pantalla 1024


  return (

    <div id={id} className="relative w-full lg:h-screen mt-10 sm:-mt-36 lg:mt-36 flex flex-col justify-center items-center">
      <div className="relative top-0 justify-center sm:-top-[150px] md:-top-[250px] items-center lg:relative lg:-top-[300px] p-5">
        <img className=' lg:w-[80vw]' src={plugins} alt="" />
      </div>

      <div className="absolute inset-0 z-20 flex flex-col items-center w-11/12 mx-auto max-w-[1900px] ">
        <div className="flex flex-col items-center lg:items-end w-full">
          <h2 className="bg-clip-text text-transparent text-2xl lg:text-6xl font-bold leading-[78.73px] tracking-[4.48px] bg-gradient-to-r  from-[#E4E4E4] via-[#E8D8B0] to-[#C09373] pb-6 ">
            {t("bodyServicios.Title2")}
          </h2>
          <div className='xl:pl-[400px] sm:text-right lg:p-5'>
            <p className="text-zinc-300 text-sm font-light md:px-5">
              <span className="font-bold">
                {t("bodyServicios.Paragraph2PartOne")}
              </span>{t("bodyServicios.Paragraph2PartTwo")}
            </p>
          </div>
        </div>

        <div className={`lg:absolute w-full ${ocultarImagen < 640 ? 'hidden' : ''}`}>
          <img loading='lazy' className="w-[98%]" src={mastering} alt="23" />
        </div>

      </div>
      <div loading='lazy' className={`absolute right-0 top-[200px] lg:top-[170px] ${ocultarImagen > 1199 ? 'hidden' : ''}`}>
        <svg xmlns="http://www.w3.org/2000/svg" width="201" height="2" viewBox="0 0 301 2" fill="none">
          <path d="M0.40332 0.629395L482.807 0.629437" stroke="#E8D8B0" />
        </svg>
      </div>
      <div loading='lazy' className={`absolute bottom-0 sm:bottom-14 md:bottom-56 left-0 ${ocultarImagen > 1199 ? 'hidden' : ''}`}>
        <svg xmlns="http://www.w3.org/2000/svg" width="181" height="2" viewBox="0 0 301 2" fill="none">
          <path d="M0.40332 0.629395L482.807 0.629437" stroke="#E8D8B0" />
        </svg>
      </div>
      <div loading='lazy' className={`absolute -right-44 top-[200px] md:top-[170px] ${ocultarImagen < 1200 ? 'hidden' : '' }`}>
        <svg xmlns="http://www.w3.org/2000/svg" width="1001" height="2" viewBox="0 0 301 2" fill="none">
          <path d="M0.40332 0.629395L482.807 0.629437" stroke="#E8D8B0" />
        </svg>
      </div>
      <div loading='lazy' className={`absolute bottom-0 -left-52 ${ocultarImagen < 1200 ? 'hidden' : ''}`}>
        <svg xmlns="http://www.w3.org/2000/svg" width="681" height="2" viewBox="0 0 301 2" fill="none">
          <path d="M0.40332 0.629395L482.807 0.629437" stroke="#E8D8B0" />
        </svg>
      </div>
      <div className="sm:hidden">
        <img loading='lazy' className="w-[98%]" src={mastering} alt="23" />
      </div>
    </div>


  );
}

Mezcla.propTypes = {
  id:PropTypes.string
}

export default Mezcla;
