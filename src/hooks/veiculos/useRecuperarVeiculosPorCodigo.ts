import { useQuery } from "@tanstack/react-query";
import Veiculo from "../../interfaces/Veiculo";
import Page from "../../interfaces/Page";

const useRecuperarVeiculosPorCodigo = (codigo: string) => {
  const recuperarVeiculosPorCodigo = async (codigo: string) => {
    const response = await fetch("http://localhost:8080/veiculos/codigo/" + codigo);
    if (!response.ok) {
      throw new Error(
        "Ocorreu um erro. Status code = " +
          response.status
      );
    }
    return (await response.json()) as Page<Veiculo>;
  };

  return useQuery({
    queryKey: ["veiculos",  {codigo: codigo}],
    queryFn: () => recuperarVeiculosPorCodigo(codigo),
    staleTime: 10_000,
  });
};
export default useRecuperarVeiculosPorCodigo;
