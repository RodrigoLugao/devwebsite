import { useQuery } from "@tanstack/react-query";
import Veiculo from "../../interfaces/Veiculo";

const useRecuperarVeiculoPorCodigo = (codigo?: string) => {
  const recuperarVeiculoPorCodigo = async (codigo: string) => {
    const response = await fetch("http://localhost:8080/veiculos/codigo/" + codigo);
    if (!response.ok) {
      throw new Error(
        "Ocorreu um erro. Status code = " +
          response.status
      );
    }
    return (await response.json()) as Veiculo;
  };

  return useQuery({
    queryKey: ["veiculos", {codigo: codigo}],
    queryFn: () => recuperarVeiculoPorCodigo(codigo!),
    staleTime: 10_000,
    enabled: !!codigo
  });
};
export default useRecuperarVeiculoPorCodigo;