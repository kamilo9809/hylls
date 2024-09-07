import axios from "axios";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

const ArtistasCard = () => {
  const [artistas, setArtistas] = useState([]);

  const traerData = async () => {
    try {
      const response = await axios.get(
        "http://localhost:3001/artistas/obtenerArtistas"
      );
      const data = response.data;
      console.log("Data backend", data);
      setArtistas(data);
    } catch (error) {
      console.error("Error axios data backend xd", error);
    }
  };
  ///absolute inset-0 bg-black opacity-0 hover:opacity-50 transition duration-300 ease-in-out
  useEffect(() => {
    traerData();
  }, []);

  return (
    <div className="w-full h-auto flex justify-center items-center pb-10 sm:mt-10">
      <div className=" grid-cols-2 px-3 gap-4 w-auto pt-3 bg-[#0A0A0A] sm:px-20 sm:pt-10 sm:gap-10 grid sm:grid-cols-2 lg:grid-cols-3 relative ">
        {artistas.map((artista) => (
          <div key={artista.Id_artista}
            className="w-full h-auto hover:scale-105 hover:transition-all relative "

          >
            <Link
              to={`/Artista/${artista.Id_artista}`}
              className="cardReaction w-auto h-full relative"
            >
              <img
                loading="lazy"
                src={`../public/${artista.foto}`}
                alt={`Imagen de ${artista.Nombre}`}
                className="w-full h-[12rem] sm:w-full sm:max-w-[340px] sm:h-[22rem] object-cover"

              />
              <div className="text-lg texto-degradado sm:text-white mt-3 font-akshar sm:text-lg pt-0">{artista.Nombre.toUpperCase()}</div>
            </Link>
            <div className="cortinaArtista  text-center font-akshar  flex-col justify-center items-center hidden">
              <h2 className="text-3xl texto-degradado5">VISITAR</h2>
              <Link className="border-gradient texto-degradado6">SmartLink</Link>
            </div>
          </div>


        ))}
      </div>
    </div>
  );
};

export default ArtistasCard;