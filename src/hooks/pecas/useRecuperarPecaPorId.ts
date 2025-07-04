import { useQuery } from "@tanstack/react-query";
import Peca from "../../interfaces/Peca";

const useRecuperarPecaPorId = (id?: number) => {
  const recuperarPecaPorId = async (id: number) => {
    const response = await fetch("http://localhost:8080/pecas/" + id);
    if (!response.ok) {
      throw new Error(
        "Ocorreu um erro. Status code = " +
          response.status
      );
    }
    return (await response.json()) as Peca;
  };

  return useQuery({
    queryKey: ["pecas", {id: id}],
    queryFn: () => recuperarPecaPorId(id!),
    staleTime: 10_000,
    enabled: !!id
  });
};
export default useRecuperarPecaPorId;