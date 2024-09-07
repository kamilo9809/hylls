import { Route, Navigate } from "react-router-dom";
import {PropTypes} from 'prop-types'

const ProtectedRoute = ({ element }) => {
  const usuario = localStorage.getItem("nombreDeClave");

  if (usuario) {
    return <Route element={element} />;
  } else {
    // Si no hay usuario, redirigir al componente de inicio de sesión
    return <Navigate to="/administrador/login" />;
  }
};

ProtectedRoute.propTypes={
    element:PropTypes
}

export default ProtectedRoute;
