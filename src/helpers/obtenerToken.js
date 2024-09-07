const obtenerTokenAlmacenado = () => {
    const tokenAlmacenado = localStorage.getItem("nombreDeClave");
    let token = null;
  
    if (tokenAlmacenado) {
      const tokenObj = JSON.parse(tokenAlmacenado);
      token = tokenObj.token;
    }
  
    return token;
  };


export default obtenerTokenAlmacenado;