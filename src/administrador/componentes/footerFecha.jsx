import React, { Suspense, useState, useEffect } from "react";

const Footer = () => {
  const year = new Date().getFullYear();
  const [ocultar, setOcultar] = useState(window.innerWidth);

  useEffect(() => {
    const anchoPantalla = () => {
      setOcultar(window.innerWidth);
      //almacena el ancho de pantalla en el navegador
    }
    window.addEventListener('resize', anchoPantalla);

    return () => {
      window.removeEventListener('resize', anchoPantalla);
    };
  }, []);

  return (
    <div className={`bg-[#0a0a0a] text-orange-200 text-xs absolute bottom-0 flex w-full justify-between items-center drop-shadow h-24 px-6 z-30 ${ocultar > 639 ? 'hidden' : ''}`}>
      <Suspense fallback={<div>Loading...</div>}>
        <footer className="w-full flex justify-between pb-5">
          <h2 className="uppercase text-[#AEA9A9]">{`© ${year} HYLLS.`}</h2>
        </footer>
      </Suspense>
    </div>
  );
};

export default Footer;
