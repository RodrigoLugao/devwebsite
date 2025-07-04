import { useQuery } from "@tanstack/react-query";
import { PecaFavoritaResponseDTO } from "../../interfaces/dtos/PecaFavoritaResponseDTO";

const useRecuperarPecaFavoritaPorIds = (usuarioId?: number, pecaId?: number) => {
  const recuperarPecaFavoritaPorIds = async (
    usuarioId: number,
    pecaId: number
  ): Promise<PecaFavoritaResponseDTO | null> => { 
    const response = await fetch(
      `http://localhost:8080/pecas-favoritas/usuario/${usuarioId}/peca/${pecaId}`
    );

    if (response.ok) {
      if (response.status === 204) {
        return null;
      }
      try {
        return (await response.json()) as PecaFavoritaResponseDTO;
      } catch (parseError) {
        console.error("Erro ao parsear JSON da resposta 200 OK:", parseError);
        throw new Error("Resposta inválida do servidor."); 
      }
    } else {
      let errorMessage = `Erro ao recuperar peça favorita. Status: ${response.status}.`;
      try {
        const contentType = response.headers.get("Content-Type");
        if (contentType && contentType.includes("application/json")) {
          const errorData = await response.json();
          if (errorData && errorData.message) {
            errorMessage = errorData.message;
          } else if (typeof errorData === "string") {
            errorMessage = errorData;
          }
        }
      } catch (parseError) {
        console.error("Erro ao parsear a resposta de erro HTTP:", parseError);
      }
      throw new Error(errorMessage);
    }
  };

  return useQuery({
    queryKey: ["pecas-favoritas-DTO", { usuarioId: usuarioId}, {pecaId: pecaId }],
    queryFn: () => recuperarPecaFavoritaPorIds(usuarioId!, pecaId!),
    staleTime: 10_000,
    enabled: !!usuarioId && !!pecaId,
  });
};

export default useRecuperarPecaFavoritaPorIds;