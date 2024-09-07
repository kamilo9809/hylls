import { Link } from "react-router-dom";
import NavBar from "./nav_bar";
import axios from "axios";
import "./../styles/hero.css";
import { useEffect, useState } from "react";
import {useTranslation} from "react-i18next"
import NavbarMobile from "./navBar-mobile";


export default function Hero() {
  const [isPlaying, setIsPlaying] = useState(true);
  const [videosHero, setVideosHero] = useState([]);
  const [videoPosition, setVideoPosition] = useState(0);

  const togglePlay = () => {
    setIsPlaying((prevIsPlaying) => !prevIsPlaying);
  };
  const [t] = useTranslation("global");

  const traerData = async () => {
    try {
      const response = await axios.get(
        "http://localhost:3001/videosHero/obtenerVideosHero"
      );
      const data = await response.data;
      setVideosHero(data);
    } catch (error) {
      console.error("Error axios data backend xd", error);
    }
  };

  const nextVideo = () => {
    if (videosHero.length > 1 && videoPosition < videosHero.length - 1) {
      setVideoPosition((prevPosition) => prevPosition + 1);
    } else {
      setVideoPosition((prevPosition) => 0);
    }
  };

  useEffect(() => {
    traerData();
  }, []);

  return (
    <>
      <NavbarMobile/>
      <div className="relative w-full h-screen overflow-hidden">
        {/* Video de fondo */}
        <video
          autoPlay
          loop
          muted={isPlaying}
          className="w-full h-full object-cover"
          src={
            videosHero.length > 0
              ? `./../public/${videosHero[videoPosition].video}`
              : ""
          }
        ></video>

        {/* Redes y botón encima del video */}
        <div className=" w-[95%] flex justify-between items-center absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
          <div className="pl-3">
            <div className="w-[20px] mt-12">
              <Link to={"#"}>
                <img
                  className="w-full"
                  src="\src\assets\icons\tw-icon.svg"
                  alt=""
                />
              </Link>
            </div>

            <div className="w-[20px] mt-12">
              <Link to={"#"}>
                <img
                  className="w-full"
                  src="\src\assets\icons\fb-icon.svg"
                  alt=""
                />
              </Link>
            </div>

            <div className="w-[20px] mt-12 mb-5">
              <Link to={"#"}>
                <img
                  className="w-full"
                  src="\src\assets\icons\ig-icon.svg"
                  alt=""
                />
              </Link>
            </div>
          </div>

          <div>
            <button className="sm:mr-[45px]" onClick={nextVideo}>
              <img className="w-5" src="\src\assets\icons\next.svg" alt="" />
            </button>
          </div>
        </div>
      </div>

      <footer className="footer-bar fixed bottom-0 left-0 w-full flex flex-col sm:flex-row justify-between items-center py-9  xl:px-20 text-base sm:text-lg">
        <div className="hidden sm:flex mb-4 sm:mb-0 text-center sm:text-left capitalize">
          <p
            className="text-sm xl:text-lg capitalize text-[#AEA9A9] px-4"
            >{t("footer.textLeft")}</p>
        </div>

        <div className="reproductor-footer sm:w-5/6 h-8 flex sm:flex-row justify-center items-center  sm:items-center gap-4 px-4">
          <div>
            <img
              className="sm:max-w-5 w-full"
              src="\src\assets\icons\linea-2.svg"
              alt="linea2"
            />
          </div>

          <button className="w-12 xl:w-9" onClick={togglePlay}>
            <img
              className="w-full"
              src={
                isPlaying
                  ? "/src/assets/icons/mute.svg"
                  : "/src/assets/icons/playing.svg"
              }
              alt=""
            />
          </button>

          <div>
            <img
              className="sm:max-w-6"
              src="\src\assets\icons\linea-1.svg"
              alt="linea1"
            />
          </div>
        </div>

        <div className="hidden sm:flex mt-4 sm:mt-0 text-center sm:text-left">
          <p className="text-sm xl:text-lg capitalize text-[#AEA9A9]">
          {t("footer.textRight")}
          </p>
        </div>
      </footer>
    </>
  );
}
