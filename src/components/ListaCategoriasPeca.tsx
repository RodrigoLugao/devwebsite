import { useEffect, useRef, useState } from "react";
import { CategoriaPecas } from "../util/CategoriaPecas";
import CardCategoriaPeca from "./CardCategoriaPeca";
import { useNavigate } from "react-router-dom";
import { gerarSlug } from "../util/gerarSlug";

interface ListaCategoriasPecaProps {
  onCategoriaSelecionada: (nomeCategoria: string | null) => void;
}

const ListaCategoriasPeca = ({ onCategoriaSelecionada }: ListaCategoriasPecaProps) => {
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);

  const navigate = useNavigate();

  const handleSelect = (index: number) => {
    if (index === selectedIndex) {
      setSelectedIndex(null);
    } else setSelectedIndex(index);
  };

  useEffect(() => {
    let nomeCategoriaSelecionada: string | null = "";
    if (selectedIndex !== null) {
      nomeCategoriaSelecionada = CategoriaPecas[selectedIndex]?.nome ?? null;
    } else {
      nomeCategoriaSelecionada = null;
    }
    onCategoriaSelecionada(nomeCategoriaSelecionada);
    navigate("categoria/" + gerarSlug(nomeCategoriaSelecionada? nomeCategoriaSelecionada : ""));
  }, [selectedIndex,  navigate, onCategoriaSelecionada]);

  return (
    <div className="row px-3 mb-3 g-3 justify-content-center">
      {CategoriaPecas.map((categoria, index) => (
        <CardCategoriaPeca
          key={index}
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
