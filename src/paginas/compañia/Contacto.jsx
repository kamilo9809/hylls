import { useState, useEffect, useRef } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import NavbarAbout from "./NavbarAbout";
import ubication from "./../../assets/icons/ubicationIcon.svg";
import phone from "./../../assets/icons/phoneIcon.svg";
import loadGoogleMapsApi from "load-google-maps-api";
import "./../../styles/compañia.css";
import {useTranslation} from "react-i18next";
import React,{Suspense} from "react";


const Footer = React.lazy(()=> import('./../../components/footer_disc'));

const Contacto = () => {

  const [t] = useTranslation("global");

  const [formData, setFormData] = useState({
    asunto: "",
    nombre: "",
    email: "",
    contenido: "",
  });

  const darkMapStyle = [
    {
      elementType: "geometry",
      stylers: [{ color: "#2E2E2E" }],
    },
    {
      elementType: "labels.text.stroke",
      stylers: [{ color: "#242f3e" }],
    },
    {
      elementType: "labels.text.fill",
      stylers: [{ color: "#ffffff" }], // Cambia el color del texto a blanco
    },
    {
      elementType: "labels.icon",
      stylers: [{ visibility: "on" }],
    },
    {
      featureType: "administrative",
      elementType: "geometry.stroke",
      stylers: [{ color: "#ffffff" }],
    },
    {
      featureType: "administrative.land_parcel",
      elementType: "labels.text.stroke",
      stylers: [{ color: "#ffffff" }],
    },
    {
      featureType: "landscape.natural",
      elementType: "geometry",
      stylers: [{ color: "#3e5748" }],
    },
    {
      featureType: "road",
      stylers: [{ color: "#ffffff" }],
    },

    {
      featureType: "road",
      elementType: "labels.text.fill",
      stylers: [{ color: "#ffffff", weight: 0.8 }], // Cambia el color blanco y ajusta el peso del texto
    },

    // ... más configuraciones de estilo según sea necesario
  ];

  const [loading, setLoading] = useState(false);
  const [scriptLoaded, setScriptLoaded] = useState(false);
  const mapRef = useRef(null);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);
      await axios.post("http://localhost:3001/enviar-correo", formData);
      Swal.fire({
        icon: "success",
        title: "Email enviado con éxito",
        showConfirmButton: false,
        timer: 1500,
      });
    } catch (error) {
      console.error("Error al enviar el correo:", error);

      if (error.response && error.response.status === 400) {
        Swal.fire({
          icon: "error",
          title: "Por favor, proporciona una dirección de correo válida.",
          showConfirmButton: false,
          timer: 2000,
        });
      } else {
        Swal.fire({
          icon: "error",
          title:
            "No se pudo enviar el email, por favor, intenta de nuevo más tarde.",
          showConfirmButton: false,
          timer: 2000,
        });
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    // Cargar el script de Google Maps dinámicamente
    const loadMapScript = async () => {
      try {
        await loadGoogleMapsApi({
          key: "AIzaSyAdT_GHiyQffXs_dSyIqwDldDQZ-lQQWcw",
          libraries: ["places"],
        });
        setScriptLoaded(true);
      } catch (error) {
        console.error("Error al cargar Google Maps:", error);
      }
    };

    loadMapScript();
  }, []);

  let marker = null; // Mantén una referencia al marcador fuera del alcance del useEffect

  useEffect(() => {
    // Cuando el script se ha cargado, inicializar el mapa
    if (scriptLoaded) {
      const map = new window.google.maps.Map(mapRef.current, {
        center: { lat: 7.092816, lng: -73.107119 },
        zoom: 19,
        styles: darkMapStyle,
      });

      // Puedes personalizar el mapa, agregar marcadores, polígonos, etc.
      map.addListener("idle", () => {
        // Elimina el marcador existente antes de agregar uno nuevo
        if (marker) {
          marker.setMap(null);
        }

        // Agrega el marcador después de que el mapa esté listo
        marker = new window.google.maps.Marker({
          position: { lat: 7.092816, lng: -73.107119 },
          map: map,
          title: "Hylls Estudio",
          icon: {
            scale: 8,
            fillColor: "#ff0000",
            fillOpacity: 1,
            strokeWeight: 0,
          },
          animation: window.google.maps.Animation.BOUNCE, // Cambia la animación a rebote
        });
      });

      return () => {
        // Limpiar cualquier recurso al desmontar el componente
        if (marker) {
          marker.setMap(null);
        }
      };
    }
  }, [scriptLoaded]);

  return (
    <div className="bg-[#0A0A0A] h-auto relativ">
      {/**navbar y contenido */}
      <div>
        <NavbarAbout />
        {/** datos de informacion*/}
        <div className="flex flex-col items-start gap-3 px-2 sm:flex-row pt-20 text-[#AEA9A9] text-base font-akshar sm:justify-evenly">
          <p className="traducible font-bold">
            {t("contact.Studio")}
          </p>
          <div className="flex flex-row gap-4">
            <img loading="lazy" src={ubication} alt="ubicationicon" width={17} />
            <p>CR 31 #103-22 DIAMANTE I, BUCARAMANGA, COLOMBIA</p>
          </div>
          <div className="flex flex-row gap-4">
            <img src={phone} alt="phoneicon" width={17} />
            <p>+57 322 2226368</p>
          </div>
        </div>
        {/**mapa */}
        <div className="flex flex-col justify-center w-full h-[40rem] elcontenedor mt-10 relative ">
          {/* Renderizar el mapa solo cuando el script de Google Maps se haya cargado */}
          {scriptLoaded && (
            <div
              className="map-container"
              ref={mapRef}
              style={{ height: "100%", width: "100%" }}
            />
          )}
          <div className="absolute z-[1000] -bottom-10 w-full text-center font-akshar diseñoletras text-[30px] sm:text-[55px]">
            <h2 className="traducible">
            {t("contact.Title")}
            </h2>
          </div>
        </div>

        <div className="flex justify-center mt-12 pb-20">
          <form
            className=" text-white grid w-full p-2 sm:w-2/5 font-akshar px-10 gap-3"
            onSubmit={handleSubmit}
          >
            <label htmlFor="asunto">
              {t("contact.Subject")}
              <span className="text-red-600">*</span>{" "}
            </label>
            <input
              className="bg-[#D9D9D933] py-1 opacity-25 px-2 "
              placeholder={t("contact.SubjectPlaceholder")}
              type="text"
              name="asunto"
              id="asunto"
              value={formData.asunto}
              onChange={handleChange}
            />
            <label htmlFor="nombre">
              {t("contact.Name")}
              <span className="text-red-600">*</span>{" "}
            </label>
            <input
              className="bg-[#D9D9D933] py-1 opacity-25 px-2 "
              placeholder={t("contact.NamePlaceholder")}
              type="text"
              name="nombre"
              id="nombre"
              value={formData.nombre}
              onChange={handleChange}
            />
            <label htmlFor="email">
              E-mail <span className="text-red-600">*</span>{" "}
            </label>
            <input
              className="bg-[#D9D9D933] py-1 opacity-25 px-2 "
              placeholder={t("contact.EmailPlaceholder")}
              type="email"
              name="email"
              id="email"
              value={formData.email}
              onChange={handleChange}
            />
            <label htmlFor="contenido">
              {t("contact.Content")}
              <span className="text-red-600">*</span>{" "}
            </label>
            <textarea
              className="bg-[#D9D9D933] py-1 opacity-25 px-2  h-36 grid"
              style={{
                textAlign: "left",
                overflow: "hidden",
                textOverflow: "ellipsis",
              }}
              placeholder={t("contact.ContentPlaceholder")}
              type="text"
              name="contenido"
              id="contenido"
              value={formData.contenido}
              onChange={handleChange}
            />

            <div className="w-full pt-5">
              <p className="text-center text-zinc-100">
                {t("contact.Conditions")}
                <a className="text-blue-300 border-b border-blue-300" href="#">
                  {t("contact.Conditions2")}
                </a>
              </p>
              <div className="flex justify-center pt-5">
                {!loading && (
                  <button
                    className="btnSubmit text-black w-full max-sm:w-3/5 sm:w-52 hover:cursor-pointer"
                    onClick={handleSubmit}
                  >
                   {t("contact.Buttom")}
                  </button>
                )}
                {loading && (
                  <div
                    className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-current border-r-transparent align-[-0.125em] text-warning motion-reduce:animate-[spin_1.5s_linear_infinite]"
                    role="status"
                  >
                    <span className="!absolute !-m-px !h-px !w-px !overflow-hidden !whitespace-nowrap !border-0 !p-0 ![clip:rect(0,0,0,0)]">
                      Loading...
                    </span>
                  </div>
                )}
              </div>
            </div>
          </form>
        </div>
      </div>

      {/**footer */}
      <Suspense fallback={<div className="flex justify-center items-center">Cargando...</div>}>
        <Footer />
      </Suspense>
      
    </div>
  );
};

export default Contacto;
