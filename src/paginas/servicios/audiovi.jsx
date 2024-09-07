import audiovisual from './../../assets/images/audiovisual.png'
import { useTranslation } from "react-i18next";
import {PropTypes} from 'prop-types'

function AudioVisual({id}) {
    const [t] = useTranslation("global");

    return (
        <div id={id} className="flex flex-col mt-10 items-center justify-center lg:flex-row md:justify-between gap-4 lg:mt-40">
            <div className="flex flex-col lg:w-3/5 lg:px-40 md:px-10 lg:gap-4">
                <div className='flex justify-center sm:mt-20 md:-mt-52 lg:mt-5 sm:justify-start'>
                    <h2 className="bg-clip-text text-transparent sm:font-medium text-4xl md:text-6xl p-2 tracking-[4.48px] bg-gradient-to-r from-zinc-200 via-[#E8D8B0] to-[#C09373] pr-36 font-bold">AUDIOVISUAL</h2>
                </div>

                <div className='pt-2 pb-3 flex flex-col justify-center md:justify-start'>
                    <h4 className="text-2xl texto-degradado4 flex flex-col mx-5">
                        {t("bodyServicios.AudiovisualText")}
                    </h4>
                </div>

                <div className='p-5 text-left'>
                    <p className="text-zinc-300 text-lg sm:text-xl tracking-wide text-left">
                        <span className="font-bold">
                            {t("bodyServicios.AudiovisualText1")}
                        </span>
                        <span>
                            {t("bodyServicios.AudiovisualText2")}
                        </span>
                    </p>

                    <button type='submit' name="button" className="w-[204.19px] h-[48.75px] border border-orange-200 text-xl mt-3 text-orange-200 self-center">
                        {t("bodyServicios.Buttom1")}
                    </button>
                </div>

                <ul className="uppercase text-xs sm:text-xl flex flex-row  gap-2 texto-degradado5 items-center justify-center sm:gap-7 lg:justify-between mt-5">
                    <li>{t("bodyServicios.AudiovisualIl1")}</li>
                    <span className="sm:w-[4.10px] sm:h-[4.10px] bg-neutral-400 rounded-full" />
                    <li>{t("bodyServicios.AudiovisualIl2")}</li>
                    <span className="sm:w-[4.10px] sm:h-[4.10px] bg-neutral-400 rounded-full" />
                    <li>{t("bodyServicios.AudiovisualIl3")}</li>
                    <span className="sm:w-[4.10px] sm:h-[4.10px] bg-neutral-400 rounded-full" />
                    <li>{t("bodyServicios.AudiovisualIl4")}</li>
                    <span className="sm:w-[4.10px] sm:h-[4.10px] bg-neutral-400 rounded-full" />
                    <li>{t("bodyServicios.AudiovisualIl5")}</li>
                </ul>

            </div>

            <div className="flex justify-center items-center ">
                <img loading='lazy' src={audiovisual} alt="300" />
            </div>
        </div>


    );
}

AudioVisual.propTypes = {
    id:PropTypes.string
  }
  

export default AudioVisual;