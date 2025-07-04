import { useQuery } from '@tanstack/react-query';
import { PecaFavoritaResponseDTO } from '../../interfaces/dtos/PecaFavoritaResponseDTO';

export const FAVORITE_PIECES_QUERY_KEY = ['pecasFavoritas'];

const API_BASE_URL = "http://localhost:8080/pecas-favoritas/usuario";

export const useRecuperarPecasFavoritasDTO = (usuarioId?: number) => {
  /* if (!usuario || !usuario.id || !usuario.token) {
    throw new Error(
      "Usuário não logado ou token ausente. Impossível favoritar peça."
    );
  } */
  const recuperarPecasFavoritasDTO = async (): Promise<PecaFavoritaResponseDTO[]> => {

    const response = await fetch(`${API_BASE_URL}/${usuarioId}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({ message: "Erro desconhecido." }));
      throw new Error(errorData.message || `Erro ao carregar favoritos: ${response.status} ${response.statusText}`);
    }

    return response.json();
  };

  return useQuery<PecaFavoritaResponseDTO[]>({
    queryKey: ["pecasFavoritasDTO", {usuarioId: usuarioId}],
    queryFn: recuperarPecasFavoritasDTO,
    staleTime: 10_000,
    enabled: !!usuarioId
  });
};

export default useRecuperarPecasFavoritasDTO;