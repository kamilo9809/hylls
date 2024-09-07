import Admin from "./componentes/admin";

//Crud Videos
import VideosCrud from "./paginas/videosArtista/videosCrud";
import CrearVideos from "./paginas/videosArtista/crear_videos";
import ActualizarVideos from "./paginas/videosArtista/actualizar_videos";

//Crud VideosHero
import VideosHeroCrud from "./paginas/videosHero/VideosHeroCrud";
import CrearVideosHero from "./paginas/videosHero/CrearVideosHero";
import ActualizarVideoHero from "./paginas/videosHero/ActualizarVideoHero";
//vistaprevia
import VistaPreviaHero from "./paginas/videosHero/VistaPreviaHero";

//crud artistas
import ArtistasCrud from "./paginas/artistas/artistas_crud";
import CrearArtista from "./paginas/artistas/crear_artista";
import ActualizarArtista from "./paginas/artistas/actualizar_artista";

//crud albumes
import AlbumesCrud from "./paginas/albumes/albumes_crud";
import CrearAlbum from "./paginas/albumes/crear_album";
import ActualizarAlbum from "./paginas/albumes/actualizar_album";

//crud playlist
import PlaylistsCrud from "./paginas/playlists/playlists_crud";
import CrearPlaylist from "./paginas/playlists/crear_playlist";
import ActualizarPlaylist from "./paginas/playlists/actualizar_playlist";

//crud canciones
import CancionesCrud from "./paginas/canciones/canciones_crud";
import CrearCancion from "./paginas/canciones/crear_cancion";
import ActualizarCancion from "./paginas/canciones/actualizar_cancion";

import { Route, Routes } from "react-router-dom";
import ProtectedRoute from "../hooks/ProtectedRoute";

//enlaces para renderizar noticia
import ActualizarNoticia from "./paginas/noticia/ActualizarNoticia";
import CrearNoticia from "./paginas/noticia/CrearNoticia";
import CrudNoticias from "./paginas/noticia/noticias";

import CrudUsuarios from "./paginas/usuarios/crud_usuarios";
import CrearUsuario from "./paginas/usuarios/crear_usuario";
import ActualizarUsuario from "./paginas/usuarios/actualizar_usuario";

function index() {
  return (
    <Routes basename="">
      <Route path="/administrador/admin" element={<Admin />} />

      {/* Rutas para álbumes */}
      <Route path="/administrador/albumes" element={<AlbumesCrud />} />
      <Route
        path="/administrador/albumes/crear-album"
        element={<CrearAlbum />}
      />
      <Route
        path="/administrador/albumes/actualizar-album/:id"
        element={<ActualizarAlbum />}
      />

      {/* Rutas para canciones */}
      <Route path="/administrador/canciones" element={<CancionesCrud />} />
      <Route
        path="/administrador/canciones/crear-cancion"
        element={<CrearCancion />}
      />
      <Route
        path="/administrador/canciones/actualizar-cancion/:id"
        element={<ActualizarCancion />}
      />

      {/* Rutas para videos de artistas */}
      <Route path="/administrador/videosArtista" element={<VideosCrud />} />
      <Route
        path="/administrador/videosArtista/crear_videos"
        element={<CrearVideos />}
      />
      <Route
        path="/administrador/videosArtista/actualizar_videos/:id"
        element={<ActualizarVideos />}
      />

      {/* Rutas para videos del HERO */}
      <Route path="/administrador/videosHero" element={<VideosHeroCrud />} />

      <Route
        path="/administrador/videosHero/CrearVideosHero"
        element={<CrearVideosHero />}
      />

      <Route
        path="/administrador/videosHero/actualizarVideoHero/:id"
        element={<ActualizarVideoHero />}
      />

      {/* Rutas para playlists */}
      <Route path="/administrador/playlists" element={<PlaylistsCrud />} />
      <Route
        path="/administrador/playlists/crear-playlist"
        element={<CrearPlaylist />}
      />
      <Route
        path="/administrador/playlists/actualizar-playlist/:id"
        element={<ActualizarPlaylist />}
      />

      {/**rutas para crud artista */}
      <Route path="/administrador/artistas" element={<ArtistasCrud />} />
      <Route
        path="/administrador/artistas/crear-artista"
        element={<CrearArtista />}
      />
      <Route
        path="/administrador/artistas/actualizar-artista/:id"
        element={<ActualizarArtista />}
      />
      {/**rutas para crud noticias */}
      <Route path="/administrador/noticias" element={<CrudNoticias />} />
      <Route
        path="/administrador/noticias/crear-noticias"
        element={<CrearNoticia />}
      />
      <Route
        path="/administrador/noticias/actualizarNoticia/:id"
        element={<ActualizarNoticia />}
      />

      {/* ruta de la vista previa */}
      <Route
        path="/administrador/videosHero/vistaPrevia/:videoUrl"
        element={<VistaPreviaHero/>}
      ></Route>


      {/* ruta para el crud de usuarios, exclusiva del superadmin*/}
      <Route
        path="/administrador/usuarios"
        element={<CrudUsuarios/>}
      ></Route>

      <Route
        path="/administrador/usuarios/crear-usuario"
        element={<CrearUsuario/>}
      ></Route>

      <Route
        path="/administrador/usuarios/actualizar-usuario/:id"
        element={<ActualizarUsuario/>}
      ></Route>
    </Routes>
  );
}

export default index;
