import { useState, useEffect } from "react";
import obtenerTokenAlmacenado from "./../../../helpers/obtenerToken";

export function useMostrarUsuarios() {
  const [mostrarUsuarios, setMostrarUsuarios] = useState(false);

  useEffect(() => {
    const token = obtenerTokenAlmacenado();

    if (token) {
      const [header, payload, signature] = token.split(".");

      console.log(signature);
      console.log(header);
      console.log(payload);


      // Decodificar las partes base64
      const decodedHeader = atob(header);
      const decodedPayload = atob(payload);

      console.log(decodedHeader);
      console.log(decodedPayload);

      // Convertir las cadenas decodificadas a objetos JSON
      const headerObj = JSON.parse(decodedHeader);
      const payloadObj = JSON.parse(decodedPayload);

      console.log(payloadObj);
      console.log(headerObj);

      const usuarioRol = payloadObj.Rol;
      if (usuarioRol === "superadmin") {
        setMostrarUsuarios(true);
      }
    }
  }, []);

  return mostrarUsuarios;
}
