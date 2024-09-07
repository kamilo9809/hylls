import { useEffect, useState } from "react"
import { Link } from "react-router-dom";

const ObtenerCancionesId = (id) => {
  const [canciones, setCanciones] = useState([])



  useEffect(()=>{
    const traerCanciones = async () => {
      try {
        const response = await fetch('http://localhost:3001/canciones//obtenerCanciones');
        const data = await response.json()
        setCanciones(data)
      } catch (error) {
        console.error("hay un error en la solicitu ", error.message);
      }
    }
    traerCanciones()

  },[])

  const cancionesfiltradas = canciones.filter(albumcancion => albumcancion.Id_album == id.id)


  return (
    <div className="pt-8 canciones grid grid-cols-2 gap-4">
    {cancionesfiltradas.map((albumcancion, index) => (
      <div key={index} className="flex items-center">
        <Link to="#" className="truncate">
          {index + 1}. {albumcancion.Cancion}
        </Link>
      </div>
    ))}
  </div>
  
  )
}

export default ObtenerCancionesId
