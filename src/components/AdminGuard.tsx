import { Navigate, Outlet } from 'react-router-dom';
import { useUsuarioStore } from '../store/usuarioStore'; 
const AdminGuard = () => {
  const { isAdmin } = useUsuarioStore();

  if (!isAdmin) {
    return <Navigate to="/" replace />;
  }

  return <Outlet />;
};

export default AdminGuard;