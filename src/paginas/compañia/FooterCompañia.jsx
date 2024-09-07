import {useTranslation} from "react-i18next";

const FooterCompañia = () => {
  const [t] = useTranslation("global");

  return (
    <footer className='relative bottom-0 w-full bg-black text-white py-8 px-6'>
      <div className='flex flex-row justify-between gap-3 text-[14px] sm:text-[20px]'>
        <p>{t("footer.textLeft")}</p>
        <p>{t("footer.textRight")}</p>
      </div>
    </footer>
  );
};

export default FooterCompañia;
