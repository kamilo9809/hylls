import { useState } from "react";
import "./../../styles/cardsPlaylist.css";
// import { useLanguage } from "./../../context/LanguageContext";

// Componente Card
const Card = ({ playlist }) => {
  const [isHover, setIsHover] = useState(false);
  const [isClicky, setIsClicky] = useState(false);

  const handleHover = () => {
    setIsHover(true);
  };

  const handleHoverOff = () => {
    setIsHover(false);
    setIsClicky(false);
  };

  const handleClick = () => {
    setIsClicky(true);
  };

  const handleClickLink = (e) => {
    if (!isClicky) {
      e.preventDefault();
    }
  };

  return (
    <div
    className="card w-64"
    onMouseEnter={handleHover}
    onMouseLeave={handleHoverOff}
  >
    <img
      className="w-full h-64 object-cover rounded-sm"
      src={`/public/${playlist.foto_playlist}`}
      alt={playlist.Nombre_playlist}
    />
    <div className={``}>
      <div>
        <h2
          className={`w-8 card-content text-[1.5rem] xl:text-[2rem] ${isHover ? "show-stream" : ""}`}
          onClick={handleClick}
        >
          stream
        </h2>
      </div>
  
      <div className={`enlaces-playlist ${isClicky ? "show-links" : ""}`}>
        <div className="enlaces">
          <h3 className="text-base xl:text-xl font-bold">{playlist.Nombre_playList}</h3>
          {playlist.enlace_spotify && (
            <a
              className="flex justify-start items-center gap-2 text-base sm:text-lg" // Ajusta el tamaño del texto aquí
              href={`${playlist.enlace_spotify}`}
            >
              <img
                className="w-10"
                src="src\assets\icons\spotify.svg"
                alt="spotify-icon"
              />
              <span className="text-base sm:text-lg">Escúchalo en Spotify!</span>
            </a>
          )}
          {playlist.enlace_applemusic && (
            <a
              className="flex justify-start items-center gap-2 text-base sm:text-lg" // Ajusta el tamaño del texto aquí
              href={`${playlist.enlace_applemusic}`}
            >
              <img
                className="w-10"
                src="src\assets\icons\applemusic.svg"
                alt="spotify-icon"
              />
              <span className="text-base sm:text-lg">Escúchalo en AppleMusic!</span>
            </a>
          )}
        </div>
      </div>
    </div>
  </div>
  

  );
};

export default Card;
