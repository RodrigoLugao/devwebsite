import { useEffect, useRef, useState } from "react";
import CardCategoriaPeca from "./CardCategoriaPeca";
import { gerarSlug } from "../util/gerarSlug";
import useRecuperarCategoriasPeca from "../hooks/categoriasPeca/useRecuperarCategoriasPeca";

interface ListaCategoriasPecaProps {
  onCategoriaSelecionada: (nomeCategoria: string | null) => void;
  categoriaAtual?: string | null;
}

const ListaCategoriasPeca = ({ onCategoriaSelecionada, categoriaAtual }: ListaCategoriasPecaProps) => {
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);

  const { data: categoriasPeca, isLoading, error } = useRecuperarCategoriasPeca();

  useEffect(() => {
    if (categoriasPeca && categoriaAtual) {
      const indexFromUrl = categoriasPeca.findIndex(
        (cat) => gerarSlug(cat.nome) === categoriaAtual
      );
      if (indexFromUrl !== -1 && selectedIndex !== indexFromUrl) {
        setSelectedIndex(indexFromUrl);
      }
    } else if (categoriaAtual === null && selectedIndex !== null) {
      setSelectedIndex(null);
    }
  }, [categoriaAtual, categoriasPeca, selectedIndex]);


  const handleSelect = (index: number) => {
    let nomeCategoria: string | null = null;
    let newIndex: number | null = null;

    if (index === selectedIndex) {
      newIndex = null;
      nomeCategoria = null;
    } else {
      newIndex = index;
      if (categoriasPeca && categoriasPeca[index]) {
        nomeCategoria = categoriasPeca[index].nome;
      }
    }
    
    setSelectedIndex(newIndex);
    onCategoriaSelecionada(nomeCategoria ? gerarSlug(nomeCategoria) : null);
  };

  if (isLoading) {
    return (
      <div className="text-center my-5">
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Carregando categorias...</span>
        </div>
        <p className="mt-2">Carregando categorias de peças...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="alert alert-danger text-center my-5" role="alert">
        Erro ao carregar categorias de peças: {error.message}. Por favor, tente novamente.
      </div>
    );
  }

  if (!categoriasPeca || categoriasPeca.length === 0) {
    return (
      <div className="alert alert-info text-center my-5" role="alert">
        Nenhuma categoria de peça encontrada.
      </div>
    );
  }

  return (
    <div className="row px-3 mb-3 g-3 justify-content-center">

      {categoriasPeca.map((categoria, index) => (
        <CardCategoriaPeca
          key={categoria.id || index} 
          categoriaPeca={categoria}
          isSelected={selectedIndex === index}
          onClick={() => handleSelect(index)}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              handleSelect(index);
            }
          }}
          ref={(el) => {
            cardRefs.current[index] = el;
          }}
        />
      ))}
    </div>
  );
};

export default ListaCategoriasPeca;