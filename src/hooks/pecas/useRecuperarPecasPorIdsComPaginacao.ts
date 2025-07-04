import { useQuery } from "@tanstack/react-query";
import Peca from "../../interfaces/Peca";
import Page from "../../interfaces/Page";
import { Pageable } from "../../interfaces/Pageable";

const useRecuperarPecasPorIdsComPaginacao = (
  ids: number[] | undefined,
  pageable: Pageable
) => {
  const recuperarPecasPorIdsComPaginacao = async (): Promise<Page<Peca>> => {
    if (!ids || ids.length === 0) {
      return {
        itens: [],
        paginaAtual: 0,
        totalPaginas: 0,
        totalItens: 0,
      };
    }

    const url = new URL("http://localhost:8080/pecas/ids");

    ids.forEach((id: number) => {
      url.searchParams.append("ids", "" + id);
    });

    if (pageable.itensPorPagina)
      url.searchParams.append("size", pageable.itensPorPagina.toString());
    if (pageable.pagina)
      url.searchParams.append("page", pageable.pagina.toString());
    const sortString =
      pageable.ordenarPor + (pageable.ordem ? "," + pageable.ordem : "");
    if (pageable.ordenarPor) url.searchParams.append("sort", sortString);

    const response = await fetch(url.toString(), {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      const errorData = await response
        .json()
        .catch(() => ({ message: "Erro desconhecido." }));
      throw new Error(
        errorData.message ||
          `Erro ao carregar peças: ${response.status} ${response.statusText}`
      );
    }

    return response.json();
  };

  return useQuery<Page<Peca>, Error>({
    queryKey: [
      "pecas",
      "pecas-por-ids",
      "carrinho",
      ids?.slice().sort().join(","),
      pageable.pagina,
      pageable.itensPorPagina,
      pageable.ordem,
      pageable.ordenarPor,
    ],
    queryFn: recuperarPecasPorIdsComPaginacao,
    staleTime: 1000 * 60 * 60,
    enabled: ids && ids.length > 0,
  });
};

export default useRecuperarPecasPorIdsComPaginacao;
