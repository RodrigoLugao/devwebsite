import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useUsuarioStore } from "../../store/usuarioStore";

const useLogoutApi = () => {
  const [isLoggingOut, setIsLoggingOut] = useState(false);
  const [logoutError, setLogoutError] = useState<string | null>(null);
  const navigate = useNavigate();
  const logoutAction = useUsuarioStore((state) => state.logout);

  const handleLogout = async () => {
    setIsLoggingOut(true);
    setLogoutError(null);

    const token = useUsuarioStore.getState().usuario?.token;
    try {
      const response = await fetch("http://localhost:8080/auth/logout", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: token ? `Bearer ${token}` : "",
        },
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Erro ao deslogar no servidor.");
      }

      logoutAction();
      navigate("/"); 
    } catch (error: any) {
      console.error("Erro ao deslogar via API:", error);
      setLogoutError(
        error.message || "Ocorreu um erro desconhecido ao deslogar."
      );
    } finally {
      setIsLoggingOut(false); 
    }
  };

  return {
    handleLogout,
    isLoggingOut,
    logoutError, 
  };
};

export default useLogoutApi;
