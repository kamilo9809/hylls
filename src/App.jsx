import React, { Suspense, lazy } from "react";
import { Route, Routes } from "react-router-dom";
import Hero from "./components/hero";
import "./index.css";

// Carga diferida de componentes
const NavbarAbout = lazy(() => import("./paginas/compañia/NavbarAbout"));
const SobreNosotros = lazy(() => import("./paginas/compañia/SobreNosotros"));
const Contacto = lazy(() => import("./paginas/compañia/Contacto"));
const Noticias = lazy(() => import("./paginas/compañia/Noticias"));
const DetalleNoticia = lazy(() => import("./paginas/noticia/DetalleNoticia"));
const Synck = lazy(() => import("./paginas/compañia/Synck"));
const BodyServicios = lazy(() => import("./paginas/servicios/bodyServicios"));
const PlaylistLayout = lazy(() => import("./paginas/playlists/PlaylistLayout"));
const ArtistasPageP = lazy(() => import("./discografia/Artistas/ArtistasPage"));
const Artista = lazy(() => import("./discografia/Artistas/artista"));
const Albumes = lazy(() => import("./discografia/albumes/albumes"));
const Album = lazy(() => import("./discografia/albumes/album"));
const Videos = lazy(() => import("./discografia/videos/videos"));
const NavBarDespegable = lazy(() => import("./components/nav_bar_despegable"));
const Index = lazy(() => import("./administrador/index"));
const Login = lazy(() => import("./paginas/login/login"));

function App() {
  return (
    <Suspense fallback={<div className='flex justify-center items-center'>Cargando...</div>}>
      <Routes basename="">
        <Route path="/" element={<Hero />} />
        {/* compañia */}
        <Route path="/NavAbout" element={<NavbarAbout />} />
        <Route path="/About" element={<SobreNosotros />} />
        <Route path="/Contact" element={<Contacto />} />
        <Route path="/News" element={<Noticias />} />
        <Route path="/News/:id" element={<DetalleNoticia />} />
        <Route path="/Synck" element={<Synck />} />

        {/* playlist o lanzamientos */}
        <Route path="/playlist" element={<PlaylistLayout />} />

        {/* servicios */}
        <Route path="/Servicios" element={<BodyServicios />} />

        {/* Rutas comunes */}
        <Route path="/NavBar" element={<NavBarDespegable />} />
        <Route path="/Artistas" element={<ArtistasPageP />} />
        <Route path="/Artista/:id" element={<Artista />} />
        <Route path="/Albumes" element={<Albumes />} />
        <Route path="/album/:id" element={<Album />} />
        <Route path="/Videos" element={<Videos />} />
        <Route path="/administrador/login" element={<Login />} />

        {/* Rutas Administrador */}
        <Route path="*" element={<Index />} />
      </Routes>
    </Suspense>
  );
}
///utilize carga diferida para mermar el tiempo de carga
//sm: tamaño de pantalla 640
//md: tamaño de pantalla 768
//lg: tamaño de pantalla 1024
//loading='lazy' indica q la imagen carga cuando la necesite
export default App;
