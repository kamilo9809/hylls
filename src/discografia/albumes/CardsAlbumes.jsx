import { useEffect, useState } from "react";
import { Link } from "react-router-dom";


const CardsAlbumes = () => {
  const [album, setAlbum] = useState([]);

  useEffect(() => {
    const traerAlbum = async () => {
      const response = await fetch(
        "http://localhost:3001/albumes/obtenerAlbumes",
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      try {
        if (!response.ok) {
          throw new Error(`Error en la solicitud: ${response.status}`);
        }
        const data = await response.json();
        const datos = data;
        setAlbum(datos);
        console.log(datos);
      } catch (error) {
        console.error("el error es:", error);
      }
    };

    traerAlbum();
  }, []);


  return (
    <div className="w-full h-auto flex justify-center items-center pb-10 sm:mt-10">
      <div className=" grid-cols-2 px-3 gap-4 w-auto pt-5 bg-[#0A0A0A] sm:px-20 sm:pt-10 sm:gap-10 grid sm:grid-cols-2 lg:grid-cols-3 relative ">
        {album.map((albumindividual) => (
          <Link
            key={albumindividual.Id_album}
            to={`/album/${albumindividual.Id_album}`}
            className="hover:transition-transform hover:scale-105"
          >
            <img
              loading="lazy"
              src={`/public/${albumindividual.Foto_album}`}
              alt="imagenAlbum"
              className="w-full h-[12rem] sm:w-full sm:max-w-[340px] sm:h-[22rem] object-cover"
            />
            <h3 className="text-sm texto-degradado sm:text-white mt-3 font-akshar sm:text-2xl pt-2">
              {albumindividual.Nombre_album}
            </h3>

            <p className="texto-degradado font-akshar">
              {albumindividual.Fecha_album.split("/")
                .map((parte) => parte.padStart(2, "0"))
                .join("-")}
            </p>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default CardsAlbumes;
