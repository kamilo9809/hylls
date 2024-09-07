import React, { useEffect, useState, Suspense } from 'react';
import Card from './Card';
import './../../styles/carrouselPlaylist.css';

// Importa el componente Paginador de forma diferida
const LazyPaginador = React.lazy(() => import('./../../components/paginador'));

const EspecialesCarrousel = () => {
  const [playlists, setPlaylists] = useState([]);
  const cardsPorPagina = 3;
  const [paginaActual, setPaginaActual] = useState(1);

  useEffect(() => {
    const obtenerPlaylists = async () => {
      const data = await fetch(`http://localhost:3001/playlists/obtenerPlaylistsTipo?tipo=especiales`);
      const resultado = await data.json();
      setPlaylists(resultado);
    }

    obtenerPlaylists();
  }, []);

  const paginasTotales = Math.ceil(playlists.length / cardsPorPagina);

  const irAPagina = (numeroPagina) => {
    setPaginaActual(numeroPagina);
  };

  const irAtras = () => {
    setPaginaActual((prevPagina) => Math.max(prevPagina - 1, 1));
  };

  const irAdelante = () => {
    setPaginaActual((prevPagina) => Math.min(prevPagina + 1, paginasTotales));
  };

  const irAtrasTres = () => {
    setPaginaActual((prevPagina) => Math.max(prevPagina - 3, 1));
  };

  const irAdelanteTres = () => {
    setPaginaActual((prevPagina) => Math.min(prevPagina + 3, paginasTotales));
  };

  const indiceInicio = (paginaActual - 1) * cardsPorPagina;
  const indiceFin = indiceInicio + cardsPorPagina;
  const playlistsPaginaActual = playlists.slice(indiceInicio, indiceFin);

  return (
    <>
      <div className='flex justify-center'>
        <div className="playlist-container w-[95%] lg:w-[70%]">
          {playlistsPaginaActual.map(playlist => (
            <Card key={playlist.Id_playlist} playlist={playlist} />
          ))}
        </div>
      </div>
      {/* Renderiza el componente Paginador dentro de Suspense */}
      <Suspense fallback={<div className='flex justify-center items-center'>Cargando...</div>}>
        <LazyPaginador
          paginasTotales={paginasTotales}
          paginaActual={paginaActual}
          irAPagina={irAPagina}
          irAtras={irAtras}
          irAdelante={irAdelante}
          irAtrasTres={irAtrasTres}
          irAdelanteTres={irAdelanteTres}
        />
      </Suspense>
    </>
  );
};

export default EspecialesCarrousel;
