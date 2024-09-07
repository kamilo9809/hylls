import { Link } from "react-router-dom";
import "./../../styles/noticias.css";

export default function CardNoticias({ noticia }) {
  const redirectToNoticia = () => {
    const url = `/News/${noticia.Id_noticia}`;
    window.location.href = url;
  };

  return (
    <Link
      to={`/News/${noticia.Id_noticia}`}
      onClick={redirectToNoticia}
      className="no-underline  "
    >
      <div className="card flex  flex-col justify-center items-center">
        <article className="bg-[#1E1E1E59]  py-2 px-2 rounded-lg lg:rounded-xl w-[200px] lg:w-[400px] ">
          <div>
            <img
              className="object-cover w-full h-[15rem] lg:h-[18rem] rounded-t-lg"
            loading="lazy"
              src={`./../public/${noticia.Imagen}`}
              alt={noticia.Titulo}
            />
          </div>

          <div className="p-4 flex gap-8 lg:gap-12 flex-col justify-between">
            <div className="flex flex-col justify-between">
              <h3 className="text-[#E8D8B0] uppercase text-xl font-[300] truncate">
                {noticia.Titulo}
              </h3>
              <p className="pt-2 truncate texto-degradado3 text-lg lg:text-xl">
                {noticia.Descripcion_corta}
              </p>
            </div>

            <div className="flex justify-between">
              <p className="text-[#E8D8B0] text-lg lg:text-xl">
                {noticia.Fecha}
              </p>
              <p className="text-[#E8D8B0] text-lg lg:text-xl">
                {noticia.Id_noticia}
              </p>
            </div>
          </div>
        </article>
      </div>
    </Link>
  );
}
