//importa el modulo de carga diferida
import React, { Suspense } from 'react';

//importa los componentes q requiere pero utilizando la carga dCargando
const LazyNavPlayList = React.lazy(() => import('./NavPlayList'));
const LazyDestacados = React.lazy(() => import('./Destacados'));
const LazyDestacadosCarrousel = React.lazy(() => import('./DestacadosCarrousel'));
const LazyNovedades = React.lazy(() => import('./Novedades'));
const LazyNovedadesCarrousel = React.lazy(() => import('./NovedadesCarrousel'));
const LazyEspeciales = React.lazy(() => import('./Especiales'));
const LazyEspecialesCarrousel = React.lazy(() => import('./EspecialesCarrousel'));
const LazyFooterPlaylist = React.lazy(() => import('./FooterPlaylist'));

function PlaylistLayout() {
  return (
    <div className="bg-[#0A0A0A] text-[#E8D8B0] overflow-hidden">
      <Suspense fallback={<div className='flex justify-center items-center'>Cargando...</div>}>
        <LazyNavPlayList />
      </Suspense>

      <Suspense fallback={<div className='flex justify-center items-center'>Cargando...</div>}>
        <LazyDestacados /> 
      </Suspense>

      <Suspense fallback={<div className='flex justify-center items-center'>Cargando...</div>}>
        <LazyDestacadosCarrousel />
      </Suspense>

      <Suspense fallback={<div className='flex justify-center items-center'>Cargando...</div>}>
        <LazyNovedades />
      </Suspense>

      <Suspense fallback={<div className='flex justify-center items-center'>Cargando...</div>}>
        <LazyNovedadesCarrousel />
      </Suspense>

      <Suspense fallback={<div className='flex justify-center items-center'>Cargando...</div>}>
        <LazyEspeciales />
      </Suspense>

      <Suspense fallback={<div className='flex justify-center items-center'>Cargando...</div>}>
        <LazyEspecialesCarrousel />
      </Suspense>

      <Suspense fallback={<div className='flex justify-center items-center'>Cargando...</div>}>
        <LazyFooterPlaylist />
      </Suspense>
    </div>
  );
}

export default PlaylistLayout;
