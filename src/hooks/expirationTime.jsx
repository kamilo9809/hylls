// Función para verificar y eliminar datos expirados
const checkAndClearData = () => {
  const storedData = localStorage.getItem("nombreDeClave");
  if (storedData) {
    const parsedData = JSON.parse(storedData);
    if (parsedData.expiracion < Date.now()) {
      // Los datos han expirado, eliminarlos
      localStorage.removeItem("nombreDeClave");
      console.log("Datos eliminados debido a la expiración");
      window.location.href = "/administrador/login";
    }
  }
};

export default checkAndClearData;
