import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useUsuarioStore } from "../../store/usuarioStore";
import { PecaFavoritaPayloadDTO } from "../../interfaces/dtos/PecaFavoritaPayloadDTO";
import Usuario from "../../interfaces/Usuario";

const API_BASE_URL = "http://localhost:8080/pecas-favoritas";

const desfavoritarPeca = async (
  pecaId: number,
  usuario: Usuario
): Promise<void> => {
  if (!usuario || !usuario.id || !usuario.token) {
    throw new Error(
      "Usuário não logado ou token ausente. Impossível desfavoritar peça."
    );
  }

  const payload: PecaFavoritaPayloadDTO = {
    pecaId: pecaId,
    usuarioId: usuario.id,
  };

  const response = await fetch(API_BASE_URL, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${usuario.token}`,
    },
    body: JSON.stringify(payload),
  });

  if (!response.ok) {
    let errorMessage = `Ocorreu um erro ao desfavoritar a peça. Status: ${response.status}.`;
    try {
      const errorData = await response.json();
      if (errorData && errorData.message) {
        errorMessage = errorData.message;
      } else if (typeof errorData === "string") {
        errorMessage = errorData;
      }
    } catch (parseError) {
      console.error("Erro ao parsear a resposta de erro:", parseError);
    }
    throw new Error(errorMessage);
  }
};

const useDesfavoritarPeca = () => {
  const queryClient = useQueryClient();
  const { usuario } = useUsuarioStore.getState();
  if (!usuario || !usuario.id || !usuario.token) {
    throw new Error(
      "Usuário não logado ou token ausente. Impossível desfavoritar peça."
    );
  }
  return useMutation<void, Error, number>({
    mutationFn: (pecaId) => desfavoritarPeca(pecaId, usuario),
    onSuccess: (_, pecaId) => {
      console.log(`Peça ${pecaId} desfavoritada com sucesso.`);
      queryClient.invalidateQueries({
        queryKey: ["pecas", { usuarioId: usuario.id }],
      });
      queryClient.invalidateQueries({
        queryKey: ["pecasFavoritasDTO", {usuarioId: usuario.id}],
      });
    },
    onError: (error, pecaId) => {
      console.error(`Erro ao desfavoritar peça ${pecaId}:`, error.message);
      alert(`Erro ao desfavoritar peça: ${error.message}`);
    },
  });
};

export default useDesfavoritarPeca;
