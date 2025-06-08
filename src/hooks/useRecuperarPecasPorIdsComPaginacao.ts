import { useQuery } from "@tanstack/react-query";
import Peca from "../interfaces/Peca";
import Page from "../interfaces/Page";
import pecas from "../util/Pecas";

const useRecuperarPecasPorIdsComPaginacao = (
  ids: number[] | undefined,
  itensPorPagina: number = 12,
  pagina: number = 0
) => {
  const recuperarPecasPorIdsPaginado = async (): Promise<Page<Peca>> => {
    if (!ids || ids.length === 0) {
      return {
        itens: [],
        paginaAtual: 0, 
        totalPaginas: 0,
        totalItens: 0,
      };
    }

    const pecasFiltradasPorIds = pecas.filter((peca) => ids.includes(peca.id!));

    const totalItens = pecasFiltradasPorIds.length;
    const inicio = pagina * itensPorPagina;
    const fim = inicio + itensPorPagina;

    const conteudoPaginado = pecasFiltradasPorIds.slice(inicio, fim);

    const page: Page<Peca> = {
      itens: conteudoPaginado,
      paginaAtual: pagina,
      totalPaginas: Math.ceil(totalItens / itensPorPagina),
      totalItens,
    };

    // Para simular uma requisição assíncrona (como uma API real)
    // return new Promise((resolve) => setTimeout(() => resolve(page), 500));
    return page;
  };
  
  const initialPageData: Page<Peca> = {
    itens: [],
    paginaAtual: 0,
    totalPaginas: 0,
    totalItens: 0,
  };

  return useQuery<Page<Peca>>({
    queryKey: ["pecasPorIdsPaginado", JSON.stringify(ids), pagina, itensPorPagina],
    queryFn: recuperarPecasPorIdsPaginado,
    enabled: !!ids && ids.length > 0,
    initialData: initialPageData,
  });
};

export default useRecuperarPecasPorIdsComPaginacao;