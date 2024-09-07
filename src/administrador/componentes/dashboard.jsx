import { Link } from "react-router-dom";
import { useMostrarUsuarios } from "./../paginas/usuarios/useMostrarUsuarios";

function Dashboard() {
  const mostrarUsuarios = useMostrarUsuarios();

  return (
    <aside className="dashboard-desk">
      <ul className="h-[440px] flex flex-col justify-between font-medium pt-10 text-[#E8D8B0] uppercase">
        <li>
          <Link to="/administrador/albumes" className="enlace">
            Albumes
          </Link>
        </li>
        <li>
          <Link to="/administrador/artistas" className="enlace">
            artistas
          </Link>
        </li>
        <li>
          <Link to="/administrador/canciones" className="enlace">
            canciones
          </Link>
        </li>
        <li>
          <Link to="/administrador/noticias" className="enlace">
            noticias
          </Link>
        </li>
        <li>
          <Link to="/administrador/playlists" className="enlace">
            playlist
          </Link>
        </li>
        <li>
          <Link to="/administrador/videosArtista" className="enlace">
            videos
          </Link>
        </li>
        <li>
          <Link to="/administrador/videosHero" className="enlace">
            Hero
          </Link>
        </li>

        {/* Enlace condicional */}
        {mostrarUsuarios && (
          <li>
            <Link to="/administrador/usuarios" className="enlace">
              Usuarios
            </Link>
          </li>
        )}

        <li>
          <Link to="/administrador/admin" className="enlace">
            Log-out
          </Link>
        </li>
      </ul>
    </aside>
  );
}
export default Dashboard;
