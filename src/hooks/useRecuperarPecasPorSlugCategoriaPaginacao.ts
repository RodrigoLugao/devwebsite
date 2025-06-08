import { useQuery } from "@tanstack/react-query";
import Peca from "../interfaces/Peca";
import Page from "../interfaces/Page";
import pecas from "../util/Pecas";

const useRecuperarPecasPorSlugCategoriaComPaginacao = (
  slugCategoria?: string,
  itensPorPagina: number = 10,
  pagina: number = 0
) => {
  /* const recuperarPecasPorSlugCategoriaComPaginacao = async (): Promise<Page<Peca>> => {
    const baseUrl = "http://localhost:8080/pecas";
    const categoriaPath = slugCategoria ? `/categoria/${slugCategoria}` : "";
    const queryParams = `?pagina=${pagina}&itensPorPagina=${itensPorPagina}`;
    
    const response = await fetch(`${baseUrl}${categoriaPath}${queryParams}`);

    if (!response.ok) {
      throw new Error("Erro ao buscar peças");
    }

    return await response.json();
  };

  return useQuery<Page<Peca>>({
    queryKey: ["pecas", slugCategoria, pagina, itensPorPagina],
    queryFn: recuperarPecasPorSlugCategoriaComPaginacao,
  }); */

  console.log("recuperando peças por categoria");
  const recuperarPecasPorSlugCategoriaComPaginacao = async (): Promise<
    Page<Peca>
  > => {
    const pecasFiltradas = slugCategoria
      ? pecas.filter((peca) => peca.categoriaPeca.slug === slugCategoria)
      : pecas;

    const totalItens = pecasFiltradas.length;
    const inicio = pagina * itensPorPagina;
    const fim = inicio + itensPorPagina;

    const conteudo = pecasFiltradas.slice(inicio, fim);

    const page: Page<Peca> = {
      itens: conteudo,
      paginaAtual: pagina,
      totalPaginas: Math.ceil(totalItens / itensPorPagina),
      totalItens,
    };
    return await page;
  };
  return useQuery<Page<Peca>>({
    queryKey: ["pecas", slugCategoria, pagina, itensPorPagina],
    queryFn: recuperarPecasPorSlugCategoriaComPaginacao,
  });
};

export default useRecuperarPecasPorSlugCategoriaComPaginacao;
