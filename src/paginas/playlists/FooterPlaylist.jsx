import './../../styles/footer.css'
import { useTranslation } from "react-i18next";

const FooterPlaylist = () => {
  const [t] = useTranslation("global");

  return (
    <footer className='bg-[#101010] h-32 footer'>
      <div className='w-full h-full flex flex-row justify-between items-center gap-2 text-white px-4 lg:px-10 footer-light'>
        <p className='footer-info'>{t("footer.textLeft")}</p>
        <p className='footer-info'>{t("footer.textRight")}</p>
      </div>
    </footer>
  );
};

export default FooterPlaylist;
