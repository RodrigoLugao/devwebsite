import { useQuery } from "@tanstack/react-query";
import Veiculo from "../interfaces/Veiculo";
import Page from "../interfaces/Page";

const useRecuperarVeiculos = () => {
  const recuperarVeiculos = async () => {
    const response = await fetch("http://localhost:8080/veiculos");
    if (!response.ok) {
      throw new Error(
        "Ocorreu um erro. Status code = " +
          response.status
      );
    }
    return (await response.json()) as Page<Veiculo>;
  };

  return useQuery({
    queryKey: ["veiculos"],
    queryFn: () => recuperarVeiculos(),
    staleTime: 10_000,
  });
};
export default useRecuperarVeiculos;
