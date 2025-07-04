import React from 'react';
import { Navigate, Outlet, useLocation } from 'react-router-dom';
import { useUsuarioStore } from '../store/usuarioStore'; 
const AuthGuard: React.FC = () => {
  const { isAuthenticated } = useUsuarioStore();
  const location = useLocation(); 

  if (!isAuthenticated) {
    return <Navigate to="/login" state={{ from: location.pathname }} replace />;
  }

  return <Outlet />;
};

export default AuthGuard;