import { useQuery } from '@tanstack/react-query';
import Page from '../../interfaces/Page';
import Peca from '../../interfaces/Peca';
import { Pageable } from '../../interfaces/Pageable';

const useRecuperarPecasFavoritasComPaginacao = (
  usuarioId: number | undefined,
  pageable: Pageable
) => {

  const recuperarPecasFavoritasComPaginacao = async (): Promise<Page<Peca>> => {
    /* if (!usuarioId || !usuario || !usuario.token) {
      throw new Error("Usuário não logado ou ID do usuário/token ausente.");
    } */

    const url = new URL("http://localhost:8080/pecas/favoritas/usuario/" + usuarioId);

    if(pageable.itensPorPagina) url.searchParams.append("size", pageable.itensPorPagina.toString());
    if(pageable.pagina) url.searchParams.append("page", pageable.pagina.toString());
    const sortString = pageable.ordenarPor + (pageable.ordem? "," + pageable.ordem: "");
    if(pageable.ordenarPor) url.searchParams.append("sort", sortString);

    const response = await fetch(url.toString(), {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({ message: "Erro desconhecido." }));
      throw new Error(errorData.message || `Erro ao carregar peças favoritas: ${response.status} ${response.statusText}`);
    }

    return response.json();
  };

  return useQuery<Page<Peca>, Error>({
    queryKey: ["pecas", "pecas-favoritas-com-paginacao", {usuarioId: usuarioId}, pageable.pagina,
      pageable.itensPorPagina,
      pageable.ordem,
      pageable.ordenarPor,],
    queryFn: () => recuperarPecasFavoritasComPaginacao(),
    staleTime: 1000 * 60 * 5,
    enabled: !!usuarioId
  });
};

export default useRecuperarPecasFavoritasComPaginacao;

