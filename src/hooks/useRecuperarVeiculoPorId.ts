import { useQuery } from "@tanstack/react-query";
import Veiculo from "../interfaces/Veiculo";

const useRecuperarVeiculoPorId = (id: number) => {
  const recuperarVeiculoPorId = async (id: number) => {
    const response = await fetch("http://localhost:8080/veiculos/" + id);
    if (!response.ok) {
      throw new Error(
        "Ocorreu um erro. Status code = " +
          response.status
      );
    }
    return (await response.json()) as Veiculo;
  };

  return useQuery({
    queryKey: ["veiculos", id],
    queryFn: () => recuperarVeiculoPorId(id),
    staleTime: 10_000,
  });
};
export default useRecuperarVeiculoPorId;
