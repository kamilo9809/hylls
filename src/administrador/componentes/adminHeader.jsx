import { useState } from "react";
import './adminStyles/admin.css'
import React,{Suspense} from "react";

const Dashboard = React.lazy(()=> import('./dashboard'));

export default function AdminHeader({mostrarBotonProp}) {
    const [mostrarBoton, setMostrarBoton] = useState(mostrarBotonProp);

    const fechaActual = new Date();
    const formatoFecha = {
      month: "long",
      day: "numeric",
      year: "numeric",
    };
  
    const fechaFormateada = fechaActual.toLocaleDateString("es-ES", formatoFecha);


  return (
    <> 
        <aside className="flex flex-col w-auto h-40 ">
              <div className="flex flex-col w-full dashboard">
                <h2 className="text-[31px] font-medium admincontainer-h2">
                  Hola, Administrador.
                </h2>
                <div className="w-full flex justify-between fecha-boton">
                  <p className="text-[13px] font-normal text-white">
                    {fechaFormateada}
                  </p>

                  <div className={`w-full flex justify-end ${mostrarBoton ? '' : 'ocultar'}`}>
                    <button className={`bg-[#E8D8B0] p-2 text-[12px] rounded-xl font-medium boton-animado ${mostrarBoton ? '' : 'ocultar'}`}>
                      Cerrar Sesión
                    </button>
                  </div>
                </div>
                <Suspense fallback={<div className="flex justify-center items-center">Cargando...</div>}>
                  <Dashboard></Dashboard>
                </Suspense>
                
              </div>
            </aside>

        <div className="lateral-line"></div>
    </>
  )
}
