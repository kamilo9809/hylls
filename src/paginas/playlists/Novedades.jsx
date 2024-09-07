import './../../styles/playlists-tittles.css';
import { useTranslation } from "react-i18next";


export default function Novedades() {
  const [t] = useTranslation("global");

  return (
    <div>
        <div className="playlist-nov mt-8">
            <div className='flex justify-center items-center'>
                <h2 className="playlist-title playlist-title-novedades text-[2.5rem] xl:text-[3.3rem]"> {t("navbar.Releases.News")}
</h2>

            </div>
            <div className='border-button-title-nov'></div>
            <div className='border-button-title-nov'></div>
        </div>
    </div>
  )
}
