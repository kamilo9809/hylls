import { useState, useEffect } from 'react';
import React,{Suspense} from 'react';

import CardNoticias from './CardNoticias'; // Asegúrate de tener la ruta correcta
const Slider = React.lazy(()=> import('react-slick'))
// Estilos básicos para el carrusel
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

export default function CarruselNoticias() {
  const [noticias, setNoticias] = useState([]);

  useEffect(() => {
    const obtenerNoticias = async () => {
      try {
        const response = await fetch('http://localhost:3001/noticias/obtenerNoticia');
        const data = await response.json();
        setNoticias(data);
      } catch (error) {
        console.error('Error al obtener noticias', error);
      }
    };

    obtenerNoticias();
  }, []);

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 1,
  };

  return (
    <div className='py-20  px-5 overflow-hidden'>
      <Suspense fallback={<div className='flex justify-center items-center overflow-x-auto'>Cargando...</div>}>
        <Slider {...settings} className='overflow-hidden'>
            {noticias.map((noticia, index) => (
              <CardNoticias key={index} noticia={noticia} />
            ))}
        </Slider>
      </Suspense>
    </div>
  );
}