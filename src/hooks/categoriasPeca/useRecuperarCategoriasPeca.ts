import { useQuery } from "@tanstack/react-query";
import CategoriaPeca from "../../interfaces/CategoriaPeca"; 

const useRecuperarCategoriasPeca = () => {
  const fetchTodasCategoriasPeca = async () => {
    const response = await fetch("http://localhost:8080/categorias-peca");

    if (!response.ok) {
      throw new Error(
        "Ocorreu um erro ao recuperar as categorias de peça. Status code = " +
          response.status +
          ". Mensagem: " +
          (await response.text())
      );
    }
    return (await response.json()) as CategoriaPeca[];
  };

  return useQuery<CategoriaPeca[], Error>({
    queryKey: ["categoriasPeca"],
    
    queryFn: fetchTodasCategoriasPeca,
    
  });
};

export default useRecuperarCategoriasPeca;