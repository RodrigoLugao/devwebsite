import { useQuery } from "@tanstack/react-query";
import Veiculo from "../../interfaces/Veiculo";
import Page from "../../interfaces/Page";
import { FiltroVeiculo } from "../../interfaces/FiltroVeiculo";
import { Pageable } from "../../interfaces/Pageable";

const useRecuperarVeiculosComPaginacao = (
  pageable: Pageable,
  filtro: FiltroVeiculo
) => {
  const recuperarVeiculos = async (): Promise<Page<Veiculo>> => {
    const url = new URL("http://localhost:8080/veiculos");

    if (pageable.itensPorPagina)
      url.searchParams.append("size", pageable.itensPorPagina.toString());
    if (pageable.pagina)
      url.searchParams.append("page", pageable.pagina.toString());
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

    if (!response.ok) {
      throw new Error(
        "Ocorreu um erro ao buscar os veículos. Status code = " +
          response.status
      );
    }
    return (await response.json()) as Page<Veiculo>;
  };

  return useQuery<Page<Veiculo>>({
    queryKey: ["veiculos", pageable, filtro],
    queryFn: recuperarVeiculos,
    staleTime: 10_000,
  });
};

export default useRecuperarVeiculosComPaginacao;
