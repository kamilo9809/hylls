import check from './../../assets/icons/check-circle.svg'
import demo from './../../assets/images/spotifyDemo.png'
import { useState, useEffect } from 'react';
import { useTranslation } from "react-i18next";
import {PropTypes} from 'prop-types'

function Distribuccion({id}) {
    const [t] = useTranslation("global");
    const [ocultarImagen, setOcultarImagen] = useState(window.innerWidth);


    useEffect(() => {
        const anchoPantalla = () => {
            setOcultarImagen(window.innerWidth);
            //almacena el ancho de pantalla en el navegador
        }
        window.addEventListener('resize', anchoPantalla);

        return () => {
            window.removeEventListener('resize', anchoPantalla);
        };
    }, []);



    return (
        <>
            <div id={id} className="pt-5 text-zinc-300 flex justify-around relative md:-top-72 lg:top-0 ">

                <div className="absolute right-0 md:bottom-0 lg:h-[678.10px] w-11/12 md:h-[658.10px] bg-neutral-900 bg-opacity-60 z-10 mt-20">
                </div>
                <div className="w-full m-3 z-20 flex flex-col justify-center md:mt-56 md:flex-row md:justify-between">
                    <div className={`w-2/6 sm:h-[30rem] sm:w-4/6 md:w-2/6 lg:w-2/6 md:h-[30rem] lg:h-[50rem] ml-28 ${ocultarImagen < 640 ? 'hidden' : ''}`}>
                        <div className="relative w-full h-full lg:bottom-7 md:top-20 lg:-top-5">
                            <img loading='lazy' className="object-fill w-full h-full" src={demo} alt="500" />
                        </div>
                    </div>


                    <div className="flex flex-col md:gap-3 lg:gap-8 md:w-[45%]">
                        <div className='flex flex-col justify-center items-center lg:w-[45%]'>
                            <h2 className="bg-clip-text text-transparent font-medium text-3xl lg:text-[64px] leading-[78.73px] tracking-[4.48px] bg-gradient-to-r from-zinc-200 via-[#E8D8B0] to-[#C09373] lg:pb-16 uppercase">
                                {t("bodyServicios.Title3")}
                            </h2>
                        </div>

                        <div className="flex items-start gap-6">
                            <img loading='lazy' className="w-8" src={check} alt="2" />
                            <div>
                                <h4 className="lg:pb-4 font-bold text-xl lg:text-2xl">{t("bodyServicios.Subtitle1")}</h4>
                                <p className="text-base sm:text-lx font-light ">{t("bodyServicios.Text1")}</p>
                            </div>
                        </div>

                        <div className="flex items-start gap-6">
                            <img loading='lazy' className="w-8" src={check} alt="2" />
                            <div>
                                <h4 className="lg:pb-4 font-bold text-xl lg:text-2xl">{t("bodyServicios.Subtitle2")}</h4>
                                <p className="text-base sm:text-lx font-light ">{t("bodyServicios.Text2")}</p>
                            </div>
                        </div>

                        <div className="flex items-start gap-6">
                            <img loading='lazy' className="w-8" src={check} alt="2" />
                            <div>
                                <h4 className="lg:pb-4  text-xl lg:text-2xl font-bold  text-zinc-300">{t("bodyServicios.Subtitle3")}</h4>
                                <p className="text-base sm:text-lx font-light ">{t("bodyServicios.Text3")}</p>
                            </div>
                        </div>

                        <div className="flex items-start gap-6">
                            <img loading='lazy' className="w-8" src={check} alt="2" />
                            <div>
                                <h4 className="lg:pb-4 text-xl lg:text-2xl font-bold  text-zinc-300">{t("bodyServicios.Subtitle4")}</h4>
                                <p className="text-base sm:text-lx font-light ">{t("bodyServicios.Text4")}</p>
                            </div>
                        </div>

                        <div className="flex items-start gap-6">
                            <img loading='lazy' className="w-8" src={check} alt="2" />
                            <div>
                                <h4 className="lg:pb-4 text-xl lg:text-2xl font-bold  text-zinc-300">{t("bodyServicios.Subtitle4")}</h4>
                                <p className="text-base sm:text-lx font-light ">{t("bodyServicios.Text4")}</p>
                            </div>
                        </div>

                    </div>
                </div>


            </div>

            <div className="z-20 mt-16 p-1 w-200 h-64 overflow-hidden sm:hidden">
                <img loading='lazy' className="object-cover w-full h-full" src={demo} alt="500" />
            </div>

        </>

    );

}

Distribuccion.propTypes = {
    id:PropTypes.string
  }
  

export default Distribuccion;