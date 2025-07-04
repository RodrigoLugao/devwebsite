import { useMutation, useQueryClient } from "@tanstack/react-query";
import Peca from "../../interfaces/Peca";
import ErrorResponse from "../../interfaces/ErrorResponse";

const API_BASE_URL = "http://localhost:8080/pecas";

const removerPeca = async (
  peca: Peca,
): Promise<null> => {
  const response = await fetch(API_BASE_URL + "/" + peca.id, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      //Authorization: `Bearer ${usuario.token}`,
    },
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
        metodo: "DELETE",
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
  return null;
};

const useRemoverPeca = () => {
  const queryClient = useQueryClient();
  return useMutation<null, ErrorResponse, Peca>({
    mutationFn: (peca) => removerPeca(peca),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["pecas"],
      });
      queryClient.invalidateQueries({
        queryKey: ["pecas-por-slug"],
      });
      queryClient.invalidateQueries({
        queryKey: ["pecas-por-ids"],
      });
      queryClient.invalidateQueries({
        queryKey: ["pecas-favoritas"],
      });
    },
  });
};

export default useRemoverPeca;
