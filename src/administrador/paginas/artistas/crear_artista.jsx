import { useState } from "react";
import { Link } from "react-router-dom";
import { mostrarAlerta } from "./../../config/Alerta";
import Navbar from "./../../componentes/navbar";
import AdminHeader from "./../../componentes/adminHeader";
import FooterAdmin from "./../../componentes/footerAdmin";
import "./../../componentes/adminStyles/admin.css";
import obtenerTokenAlmacenado from "./../../../helpers/obtenerToken";

const CrearArtista = () => {
  const [nombre, setNombre] = useState("");
  const [biografia, setBiografia] = useState("");
  const [facebook, setFacebook] = useState("");
  const [twitter, setTwitter] = useState("");
  const [instagram, setInstagram] = useState("");
  const [youtube, setYoutube] = useState("");
  const [foto, setFoto] = useState(null);
  const [banner, setBanner] = useState(null);
  const [bannerMobil, setBannerMobil] = useState(null);//nuevo


  const mostrarLogOutButton = false;
  const token = obtenerTokenAlmacenado();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if ([nombre, biografia].includes("")) {
      mostrarAlerta(
        "error",
        "Debes añadir como mínimo, un nombre y una biografía"
      );

      return;
    }

    const formData = new FormData();
    formData.append("nombre", nombre);
    formData.append("biografia", biografia);
    formData.append("facebook", facebook);
    formData.append("twitter", twitter);
    formData.append("instagram", instagram);
    formData.append("youtube", youtube);
    formData.append("foto", foto);
    formData.append("banner", banner);
    formData.append("bannerMobil", bannerMobil);//nuevo p

    try {
      const response = await fetch(
        "http://localhost:3001/artistas/crearArtista",
        {
          method: "POST",
          body: formData,
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const data = await response.json();

      if (response.ok) {
        mostrarAlerta("success", "Artista añadido correctamente");
      } else {

        mostrarAlerta("error", data.mensaje);
      }
    } catch (error) {
      console.log(error);
    }

    return <Link to="/administrador/artistas" />;
  };

  return (
    <div className="flex flex-col min-h-screen bg-[#1E1B1B] relative overflow-hidden">
      <div>
        <Navbar></Navbar>
        <div className="p-5">
          <AdminHeader mostrarBotonProp={mostrarLogOutButton} />
          <div className="w-full flex justify-center mb-24 border-inferior">
            <h2 className="admincontainer-h2 font-extrabold text-[20px] sm:absolute sm:left-[30%]">
              Nuevo Artista
            </h2>
          </div>
          <form
            onSubmit={handleSubmit}
            encType="multipart/form-data"
            className="mx-auto sm:w-full sm:pl-16 md:w-[60%] lg:pl-0 lg:w-[50%] xl:w-[40%] p-2 mb-32"
          >
            <div className="mb-4">
              <label
                htmlFor="nombre"
                className="block text-sm font-medium text-white"
              >
                Nombre
              </label>
              <input
                type="text"
                id="nombre"
                name="nombre"
                value={nombre}
                onChange={(e) => setNombre(e.target.value)}
                className="mt-1 p-2 w-full rounded-md bg-[#D9D9D98F]"
              />
            </div>

            <div className="mb-4">
              <label
                htmlFor="biografia"
                className="block text-sm font-medium text-white"
              >
                Biografía
              </label>
              <textarea
                id="biografia"
                name="biografia"
                value={biografia}
                onChange={(e) => setBiografia(e.target.value)}
                className="mt-1 p-2 w-full rounded-md bg-[#D9D9D98F]"
              ></textarea>
            </div>

            <div className="mb-4">
              <label
                htmlFor="facebook"
                className="block text-sm font-medium text-white"
              >
                Facebook
              </label>
              <input
                id="facebook"
                name="facebook"
                value={facebook}
                onChange={(e) => setFacebook(e.target.value)}
                className="mt-1 p-2 w-full rounded-md bg-[#D9D9D98F]"
              ></input>
            </div>

            {/* Campo de twitter */}
            <div className="mb-4">
              <label
                htmlFor="twitter"
                className="block text-sm font-medium text-white"
              >
                Twitter
              </label>
              <input
                id="twitter"
                name="twitter"
                value={twitter}
                onChange={(e) => setTwitter(e.target.value)}
                className="mt-1 p-2 w-full rounded-md bg-[#D9D9D98F]"
              ></input>
            </div>

            {/* Campo de instagram */}
            <div className="mb-4">
              <label
                htmlFor="instagram"
                className="block text-sm font-medium text-white"
              >
                Instagram
              </label>
              <input
                id="instagram"
                name="instagram"
                value={instagram}
                onChange={(e) => setInstagram(e.target.value)}
                className="mt-1 p-2 w-full rounded-md bg-[#D9D9D98F]"
              ></input>
            </div>

            {/* Campo de youtube */}
            <div className="mb-4">
              <label
                htmlFor="youtube"
                className="block text-sm font-medium text-white"
              >
                Youtube
              </label>
              <input
                id="youtube"
                name="youtube"
                value={youtube}
                onChange={(e) => setYoutube(e.target.value)}
                className="mt-1 p-2 w-full rounded-md bg-[#D9D9D98F]"
              ></input>
            </div>

            <div className="mb-4">
              <label
                htmlFor="foto"
                className="block text-sm font-medium text-white"
              >
                Foto
              </label>
              <input
                type="file"
                id="foto"
                name="foto"
                onChange={(e) => setFoto(e.target.files[0])}
                className="mt-1 p-2 w-full rounded-md bg-[#D9D9D98F]"
              />
            </div>

            <div className="mb-4">
              <label
                htmlFor="banner"
                className="block text-sm font-medium text-white"
              >
                Banner
              </label>
              <input
                type="file"
                id="banner"
                name="banner"
                required
                onChange={(e) => setBanner(e.target.files[0])}
                className="mt-1 p-2 w-full rounded-md bg-[#D9D9D98F]"
              />
            </div>

            <div className="mb-4">{/**nuevo */}
              <label
                htmlFor="bannerMobil"
                className="block text-sm font-medium text-white"
              >
                Banner Mobiles
              </label>
              <input
                type="file"
                id="bannerMobil"
                name="bannerMobil"
                required
                onChange={(e) => setBannerMobil(e.target.files[0])}
                className="mt-1 p-2 w-full rounded-md bg-[#D9D9D98F]"
              />
            </div>

            <button
              type="submit"
              className="bg-[#E8D8B0] text-gray-800 p-2 rounded-md"
            >
              Crear Artista
            </button>
            <Link
              to={"/administrador/artistas"}
              className="ml-2 bg-[#E8D8B0] text-gray-800 p-2 rounded-md"
            >
              Volver
            </Link>
          </form>
        </div>
      </div>
      <FooterAdmin></FooterAdmin>
    </div>
  );
};

export default CrearArtista;
