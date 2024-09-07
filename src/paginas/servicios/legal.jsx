import { useTranslation } from "react-i18next";
import { PropTypes } from 'prop-types'


function Legal ({id}) {
    const [t] = useTranslation("global");

    return(

        <div id={id} className="flex flex-col py-12 text-zinc-300  text-center sm:mx-auto max-w-4xl ">
            <div className="mx-5">
                <h2 className="bg-clip-text text-transparent text-4xl font-bold sm:text-6xl sm:font-medium leading-[78.73px] tracking-[4.48px] bg-gradient-to-r  from-[#E8D8B0] to-[#696969] pb-6">LEGAL</h2>
                <p className="text-base sm:text-xl font-light">
                    {t("bodyServicios.LegalText1")}
                    <span className="font-bold">
                    {t("bodyServicios.LegalText2")}
                    </span>
                    {t("bodyServicios.LegalText3")}
                </p>
                <div className="py-20 text-3xl flex flex-col gap-8">
                <div className="flex flex-row justify-around pb-16 text-xl">
                    <p>SPLIT SHEET</p>
                    <p>{t("bodyServicios.FinalText")}</p>
                </div>
                <div className="flex flex-row justify-between text-xl">
                    <p>WORK FOR HIRE</p>
                    <p>PUBLISHING</p>
                </div>
                <div className="text-xl">
                    <p><p>{t("bodyServicios.FinalText1")}</p></p>
                </div>
                </div>
            </div>
        </div>

    );
}

Legal.propTypes = {
    id: PropTypes.String
}

export default Legal;