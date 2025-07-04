import { keepPreviousData, useInfiniteQuery } from "@tanstack/react-query";
import Veiculo from "../../interfaces/Veiculo";
import Page from "../../interfaces/Page"; // Sua interface Page correta
import { FiltroVeiculo } from "../../interfaces/FiltroVeiculo";
import { Pageable } from "../../interfaces/Pageable"; // Usamos Pageable para os parâmetros de paginação

const useRecuperarVeiculosComPaginacaoInfiniteQuery = (
  filtro: FiltroVeiculo,
  pageable: Pageable // Recebe o Pageable completo agora
) => {
  const recuperarVeiculos = async ({
    pageParam = 0,
  }: {
    pageParam?: number;
  }): Promise<Page<Veiculo>> => {
    const url = new URL("http://localhost:8080/veiculos");

    url.searchParams.append("size", (pageable.itensPorPagina || 10).toString());
    url.searchParams.append("page", pageParam.toString());

    const sortString =
      pageable.ordenarPor + (pageable.ordem ? "," + pageable.ordem : "");
    if (pageable.ordenarPor) url.searchParams.append("sort", sortString);

    if (filtro.nomeModelo)
      url.searchParams.append("nomeModelo", filtro.nomeModelo);
    if (filtro.fabricante)
      url.searchParams.append("fabricante", filtro.fabricante);
    if (filtro.tipo) url.searchParams.append("tipo", filtro.tipo);
    if (filtro.anoMin !== undefined && filtro.anoMin !== null)
      url.searchParams.append("anoMin", filtro.anoMin.toString());
    if (filtro.anoMax !== undefined && filtro.anoMax !== null)
      url.searchParams.append("anoMax", filtro.anoMax.toString());
    if (filtro.precoMin !== undefined && filtro.precoMin !== null)
      url.searchParams.append("precoMin", filtro.precoMin.toString());
    if (filtro.precoMax !== undefined && filtro.precoMax !== null)
      url.searchParams.append("precoMax", filtro.precoMax.toString());
    if (filtro.kmsMin !== undefined && filtro.kmsMin !== null)
      url.searchParams.append("kmsMin", filtro.kmsMin.toString());
    if (filtro.kmsMax !== undefined && filtro.kmsMax !== null)
      url.searchParams.append("kmsMax", filtro.kmsMax.toString());
    if (filtro.cambio) url.searchParams.append("cambio", filtro.cambio);
    if (filtro.cor) url.searchParams.append("cor", filtro.cor);

    const response = await fetch(url.toString());

    /* await new Promise((resolve) => {
      setTimeout(resolve, 5000);
    }); */

    if (!response.ok) {
      throw new Error(
        "Ocorreu um erro ao buscar os veículos. Status code = " +
          response.status
      );
    }
    return (await response.json()) as Page<Veiculo>;
  };

  return useInfiniteQuery<
    Page<Veiculo>,
    Error,
    Veiculo[],
    ["veiculos", FiltroVeiculo, Pageable],
    number
  >({
    queryKey: [
      "veiculos",
      filtro,
      {
        itensPorPagina: pageable.itensPorPagina,
        ordem: pageable.ordem,
        ordenarPor: pageable.ordenarPor,
      },
    ],

    queryFn: ({ pageParam }) => recuperarVeiculos({ pageParam }),

    staleTime: 60 * 1000,
    placeholderData: keepPreviousData,
    initialPageParam: 0,

    getNextPageParam: (lastPage) => {
      if (lastPage.paginaAtual < lastPage.totalPaginas - 1) {
        return lastPage.paginaAtual + 1;
      }
      return undefined;
    },

    //Para ter só os veiculos no data
    select: (data) => {
      return data.pages.flatMap((page) => page.itens);
    },
  });
};

export default useRecuperarVeiculosComPaginacaoInfiniteQuery;
