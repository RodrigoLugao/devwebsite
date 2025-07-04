import { useQuery } from "@tanstack/react-query";
import Peca from "../../interfaces/Peca";
import Page from "../../interfaces/Page";
import { Pageable } from "../../interfaces/Pageable";

const useRecuperarPecasPorSlugCategoriaComPaginacao = (
  pageable: Pageable,
  slugCategoria?: string
) => {
  const recuperarPecasPorSlugCategoriaComPaginacao = async (): Promise<
    Page<Peca>
  > => {
    const url = new URL("http://localhost:8080/pecas/filtrar");

    if (slugCategoria) {
      url.searchParams.append("slug", slugCategoria);
    }

    if (pageable.itensPorPagina)
      url.searchParams.append("size", pageable.itensPorPagina.toString());
    if (pageable.pagina)
      url.searchParams.append("page", pageable.pagina.toString());
    const sortString = pageable.ordenarPor
      ? pageable.ordenarPor + (pageable.ordem ? "," + pageable.ordem : "")
      : "id,asc";
    if (pageable.ordenarPor) url.searchParams.append("sort", sortString);

    const response = await fetch(url.toString());

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(
        `Erro ao buscar peças: ${response.status} - ${
          errorText || "Resposta vazia"
        }`
      );
    }
    const data = (await response.json()) as Page<Peca>;
    console.log("Peças recebidas da consulta:", data.itens);
    return data;
  };

  return useQuery<Page<Peca>, Error>({
    queryKey: ["pecas", "pecas-por-categoria", slugCategoria || "todas", pageable.pagina, pageable.itensPorPagina, pageable.ordem, pageable.ordenarPor],
    queryFn: recuperarPecasPorSlugCategoriaComPaginacao,
    staleTime: 10_000,
  });
};

export default useRecuperarPecasPorSlugCategoriaComPaginacao;
