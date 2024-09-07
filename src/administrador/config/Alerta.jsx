import Swal from "sweetalert2";

export const mostrarAlerta = (tipo, mensaje) => {
  Swal.fire({
    icon: tipo,
    title: mensaje,
    showConfirmButton: false,
    timer: 1500,
  });
};


export const mostrarConfirmacion = (mensaje, confirmText) => {
  const config = {
    icon: "warning",
    title: mensaje,
    showCancelButton: true,
    confirmButtonText: confirmText,
    cancelButtonText: "Cancelar",
  };

  return Swal.fire(config).then((result) => ({
    isConfirmed: result.isConfirmed,
  }));
};



const Alerta = () => {
  return null;
};

export default Alerta;
