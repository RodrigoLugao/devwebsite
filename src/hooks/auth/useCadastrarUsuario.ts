import { useMutation, useQueryClient } from "@tanstack/react-query";
import ErrorResponse from "../../interfaces/ErrorResponse";
import Usuario from "../../interfaces/Usuario";
import { CreateUsuarioDTO } from "../../interfaces/dtos/CreateUsuarioDTO";

const API_BASE_URL = "http://localhost:8080/auth/cadastrar";

const cadastrarUsuario = async (
  usuario: CreateUsuarioDTO,
): Promise<Usuario> => {
  const response = await fetch(API_BASE_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      //Authorization: `Bearer ${usuario.token}`,
    },
    body: JSON.stringify(usuario),
  });

  if (!response.ok) {
    // Tenta parsear a resposta de erro como ErrorResponse
    let errorData: ErrorResponse;
    try {
      errorData = await response.json();
    } catch (parseError) {
      // Se não conseguir parsear, cria um ErrorResponse genérico
      errorData = {
        localDateTime: new Date().toISOString(),
        errorCode: response.status,
        error: response.statusText,
        metodo: "POST",
        requestUri: API_BASE_URL, 
        map: null,
        message: `Ocorreu um erro inesperado: ${response.status} ${response.statusText}`,
      };
      console.error("Erro ao parsear a resposta de erro da API:", parseError);
    }
    
    // Lança o objeto ErrorResponse diretamente.
    // O tipo de erro do useMutation será ErrorResponse.
    throw errorData; 
  }
  return await response.json();
};

const useCadastrarUsuario = () => {
  const queryClient = useQueryClient();
  return useMutation<Usuario, ErrorResponse, CreateUsuarioDTO>({
    mutationFn: (usuario) => cadastrarUsuario(usuario),
    onSuccess: (novoUsuario) => {
      console.log(`Usuário ${novoUsuario.nome} cadastrado com sucesso.`);
      queryClient.invalidateQueries({
        queryKey: ["usuario"],
      });
    },
  });
};

export default useCadastrarUsuario;
