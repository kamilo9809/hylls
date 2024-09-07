import { useEffect, useState } from "react"
import { PropTypes } from 'prop-types'

const ObtenerArtistaId = (idArtista) => {
  const [nombre, setNombre] = useState("")

  
  const id = idArtista.idArtista
  useEffect(()=>{
    const traerNombre= async ()=>{
        const response = await fetch(`http://localhost:3001/artistas/obtenerArtista/${id && id}`);
        const data = await response.json()
        setNombre(data.Nombre)
    }
    traerNombre()
  },[id])

  localStorage.setItem("clave", nombre)
  return (<div></div>);
}

ObtenerArtistaId.propTypes = {
    idArtista:PropTypes
}

export default ObtenerArtistaId
