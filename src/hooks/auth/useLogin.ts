import { useMutation, useQueryClient } from '@tanstack/react-query'; // Importe useMutation
import { useUsuarioStore } from '../../store/usuarioStore';
import Usuario from '../../interfaces/Usuario'; // Certifique-se de que esta interface está correta

interface Credenciais {
  username: string;
  password: string;
}

const API_LOGIN_URL = "http://localhost:8080/auth/login";

const performLogin = async (credenciais: Credenciais): Promise<Usuario> => {
  const response = await fetch(API_LOGIN_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(credenciais),
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.message || errorData.error || "Credenciais inválidas ou erro no servidor.");
  }

  return response.json();
};

const useLogin = () => {
  const queryClient = useQueryClient();
  const loginAction = useUsuarioStore(state => state.login); 


  return useMutation<Usuario, Error, Credenciais>({
    mutationFn: performLogin, 

    onSuccess: (data) => {

      console.log("Login bem-sucedido:", data);

      const usuarioLogado: Usuario = data;

      loginAction(usuarioLogado); 

      queryClient.invalidateQueries({
        queryKey: ["pecasFavoritasDTO"],
      });
    },

    onError: (error) => {
      console.error("Erro no login:", error.message);
    },

    retry: false,
  });
};

export default useLogin;