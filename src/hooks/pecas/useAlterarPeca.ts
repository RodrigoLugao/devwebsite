import { useMutation, useQueryClient } from "@tanstack/react-query";
import Peca from "../../interfaces/Peca";
import ErrorResponse from "../../interfaces/ErrorResponse";

const API_BASE_URL = "http://localhost:8080/pecas";

const alterarPeca = async (
  peca: Peca,
): Promise<Peca> => {
  const response = await fetch(API_BASE_URL + "/" + peca.id, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      //Authorization: `Bearer ${usuario.token}`,
    },
    body: JSON.stringify(peca),
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
        metodo: "PUT",
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

const useAlterarPeca = () => {
  const queryClient = useQueryClient();
  return useMutation<Peca, ErrorResponse, Peca>({
    mutationFn: (peca) => alterarPeca(peca),
    onSuccess: (novaPeca) => {
      console.log(`Peça ${novaPeca.id} alterada com sucesso.`);
      queryClient.invalidateQueries({
        queryKey: ["pecas"],
        exact: false
      });
    },
  });
};

export default useAlterarPeca;
