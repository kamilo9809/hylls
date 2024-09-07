import estudio from './../../assets/images/estudio.png'
import generos from './../../assets/images/generos.png'
import { useTranslation } from "react-i18next";
import {PropTypes} from 'prop-types'


function ProduccionComposicion({id}) {
  const [t] = useTranslation("global");

  return (
    <div id={id} className='grid grid-cols-1 sm:grid-cols-3 pt-5 sm:pt-20 overflow-hidden' >
      <div className='col-span-2'>
        <div className=" flex flex-col justify-center items-center font-['akshar'] gap-12 ">
          <div className="relative lg:pl-32 w-4/5">
            <h2 className="bg-clip-text text-transparent font-medium text-4xl sm:text-4xl leading-[78.73px] tracking-[4.48px] bg-gradient-to-r from-zinc-200 via-[#E8D8B0] to-[#C09373]">
              BEATMAKING</h2>
            <p className="text-zinc-300 text-sm
            sm:text-xl
            sm:py-8
            ">
              {t("bodyServicios.Paragraph1PartOne")}
              <strong >{t("bodyServicios.Paragraph1PartTwo")}</strong>{t("bodyServicios.Paragraph1PartThree")}
            </p>

            <div className='mb-20 relative'>
              {/* Botón */}
              <div>
                <button type='button' name="button" className="mt-3 p-1 w-[120.4px] sm:w-[204.19px] sm:h-[48.75px] border-gradient2 text-xl texto-degradado6 z-10 relative bg-transparent">
                  {t("bodyServicios.Buttom1")}
                </button>
              </div>
            </div>
          </div>

          <div className="absolute mt-44 sm:hidden w-100 h-36 justify-center items-center mb-6">
            <img className=" w-full h-full " src={generos} alt="330" />
          </div>

          <div className='relative sm:-top-48 md:-top-44 lg:top-0'>
              <img loading='lazy' className=" w-full h-full " src={generos} alt="330" />
            </div>

        </div>

      </div>
      <div className="col-span-1 flex justify-center items-center sm:mb-32 md:mb-32 lg:m-1">
        <img loading='lazy' className='w-full max-h-[650px]' src={estudio} alt="1000" />
      </div>

    </div>


  );
}

ProduccionComposicion.propTypes = {
  id:PropTypes.string
}

export default ProduccionComposicion;