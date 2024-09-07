
import { useState } from 'react';
import './../styles/footer.css';

export default function FooterBar() {
  const [isPlaying, setIsPlaying] = useState(true);

  const togglePlay = () => {
    setIsPlaying((prevIsPlaying) => !prevIsPlaying);
  };

  return (
    <footer className="footer-bar fixed bottom-0 left-0 w-full flex flex-col sm:flex-row justify-between items-center py-4 sm:py-9 px-4 sm:px-[65px] text-base sm:text-lg">
      <div className="mb-4 sm:mb-0 text-center sm:text-left sm:w-[576px]">
        <p className='traducible text-[#AEA9A9]'>
          © 2023 HYLLS. Todos los derechos reservados
        </p>
      </div>

      <div className="reproductor-footer sm:w-5/6 h-8 flex sm:flex-row justify-center items-center  sm:items-center gap-4 px-4">
        <div>
          <img
            className="sm:max-w-5 w-full"
            loading='lazy'
            src="\src\assets\icons\linea-2.svg"
            alt="linea2"
          />
        </div>

        <button className="w-9" onClick={togglePlay}>
          <img
            className="w-full"
            loading='lazy'
            src={
              isPlaying
                ? "/src/assets/icons/playing.svg"
                : "/src/assets/icons/mute.svg"
            }
            alt=""
          />

        </button>

        <div>
          <img
          loading='lazy'
            className="sm:max-w-5 w-full"
            src="\src\assets\icons\linea-1.svg"
            alt="linea1"
          />
        </div>
      </div>
  
      <div className="mt-4 sm:mt-0 text-center sm:text-left sm:w-[576px] sm:ml-[25px]">
        <p className='text-sm sm:text-lg traducible text-[#AEA9A9]'>
        Términos del Servicio y Políticas de Privacidad
        </p>
      </div>
    </footer>
  );
}
