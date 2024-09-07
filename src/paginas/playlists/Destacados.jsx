import './../../styles/playlists-tittles.css';
import { useTranslation } from "react-i18next";


export default function Destacados() {
  const [t] = useTranslation("global");

  return (
    <div>
        <div className="playlist">
            <div className='flex justify-center items-center'>
                <h2 className="playlist-title text-[2.5rem] xl:text-[3.3rem]">{t("navbar.Releases.Featured")}</h2>

            </div>
            <div className='border-button-title'></div>
            <div className='border-button-title'></div>
        </div>
    </div>
  )
}
