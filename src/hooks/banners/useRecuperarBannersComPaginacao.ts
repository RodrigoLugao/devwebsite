import { useQuery } from "@tanstack/react-query";
import Banner from "../../interfaces/Banner";
import Page from "../../interfaces/Page";
import { Pageable } from "../../interfaces/Pageable";

const useRecuperarBannersComPaginacao = (
  pageable: Pageable
) => {
  const recuperarBanners = async (): Promise<Page<Banner>> => {
    const url = new URL("http://localhost:8080/banners");
    
    if(pageable.itensPorPagina) url.searchParams.append("size", pageable.itensPorPagina.toString());
    if(pageable.pagina) url.searchParams.append("page", pageable.pagina.toString());
    const sortString = pageable.ordenarPor + (pageable.ordem? "," + pageable.ordem: "");
    if(pageable.ordenarPor) url.searchParams.append("sort", sortString);

    const response = await fetch(url.toString());

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({ message: "Erro desconhecido." }));
      throw new Error(errorData.message || `Erro ao carregar banners: ${response.status} ${response.statusText}`);
    }
    return (await response.json()) as Page<Banner>;
  };

  return useQuery<Page<Banner>>({
    queryKey: ["banners", pageable],
    queryFn: recuperarBanners,
    staleTime: 10_000,
  });
};

export default useRecuperarBannersComPaginacao;