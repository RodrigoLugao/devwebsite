import { Link } from "react-router-dom";
import Peca from "../interfaces/Peca";
import { PecaCarrinho } from "../store/carrinhoStore";
import { useState, useEffect, useRef } from "react";

interface Props {
  pecas: Peca[];
  pecasDoCarrinho: PecaCarrinho[];
  tratarRemocao: (id: number) => void;
  onUpdateQuantidade: (pecaId: number, novaQuantidade: number) => void;
}

const TabelaDePecasDoCarrinho = ({
  pecas,
  pecasDoCarrinho,
  tratarRemocao,
  onUpdateQuantidade,
}: Props) => {
  const imagemPadrao = new URL(
    "../assets/images/pecaplaceholder.jpg",
    import.meta.url
  ).href;

  // Mapa de refs para cada input, usando o ID da peça como chave
  const inputRefs = useRef<{ [key: number]: HTMLInputElement | null }>({});

  // Estado local para gerenciar os valores dos inputs de quantidade enquanto o usuário digita
  // Isso é necessário porque o estado do Zustand pode não ser atualizado imediatamente
  // ou pode ter um valor "corrigido" (como 0) que você não quer ver enquanto o usuário digita.
  const [localInputValues, setLocalInputValues] = useState<{
    [key: number]: string;
  }>({});

  // Efeito para sincronizar os valores locais dos inputs com os valores do carrinho (Zustand)
  // Isso é importante quando o carrinho é carregado ou alterado de forma externa (ex: remoção de item)
  useEffect(() => {
    const newLocalValues: { [key: number]: string } = {};
    pecasDoCarrinho.forEach((item) => {
      newLocalValues[item.idPeca] = item.quantidade.toString();
    });
    setLocalInputValues(newLocalValues);
  }, [pecasDoCarrinho]);

  const handleImageError = (
    event: React.SyntheticEvent<HTMLImageElement, Event>
  ) => {
    event.currentTarget.src = imagemPadrao;
  };

  const handleInputChange = (
    pecaId: number,
    e: React.FormEvent<HTMLInputElement>
  ) => {
    const value = e.currentTarget.value;
    setLocalInputValues((prev) => ({
      ...prev,
      [pecaId]: value,
    }));

    const parsedValue = parseInt(value, 10);

    if (value === "") {
    } else if (!isNaN(parsedValue) && parsedValue >= 0) {
      onUpdateQuantidade(pecaId, parsedValue); 
    }
  };

  const handleOnBlur = (pecaId: number, e: React.FocusEvent<HTMLInputElement>) => {
    const value = e.target.value;
    let finalValue = parseInt(value, 10);

    // Se o valor for NaN ou negativo
    if (isNaN(finalValue) || finalValue < 0) {
      inputRefs.current[pecaId]?.focus();
    } else {
      const quantidadeInicial = pecasDoCarrinho.find(item => item.idPeca === pecaId)?.quantidade || 0;
      if (finalValue !== quantidadeInicial) {
        onUpdateQuantidade(pecaId, finalValue);
      }
      setLocalInputValues((prev) => ({
        ...prev,
        [pecaId]: finalValue.toString(),
      }));
    }
  };

  return (
    <div className="table-responsive">
      <table className="table table-bordered table-sm table-hover table-striped">
        <thead>
          <tr>
            <th className="text-center align-middle"></th>
            <th className="text-center align-middle">Produto</th>
            <th className="text-center align-middle">Preço Unitário</th>
            <th className="text-center align-middle">Quantidade</th>
            <th className="text-center align-middle">Preço Total</th>
            <th className="text-center align-middle">Remover</th>
          </tr>
        </thead>
        <tbody>
          {pecas.map((peca) => {
            const itemNoCarrinho = pecasDoCarrinho.find(
              (item) => item.idPeca === peca.id
            );
            const qtdPecaNoCarrinho = itemNoCarrinho?.quantidade || 0;

            // Obtém o valor do input do estado local, ou usa a quantidade do carrinho como fallback
            const currentInputValue =
              localInputValues[peca.id!] !== undefined
                ? localInputValues[peca.id!]
                : qtdPecaNoCarrinho.toString();

            return (
              <tr key={peca.id}>
                <td className="text-center align-middle">
                  <img
                    src={peca.imagem}
                    alt={peca.nome || "imagem da peça"}
                    style={{ width: "40px" }}
                    onError={handleImageError}
                  />
                </td>
                <td className="ps-3">
                  <Link
                    style={{ textDecoration: "none" }}
                    to={"/pecas/" + peca.id}
                  >
                    {peca.nome}
                  </Link>
                </td>
                <td className="text-end align-middle pe-3">
                  R${" "}
                  {peca.preco.toLocaleString("pt-BR", {
                    minimumFractionDigits: 2,
                    maximumFractionDigits: 2,
                    useGrouping: true,
                  })}
                </td>
                <td className="text-center align-middle">
                  <input
                    type="number"
                    ref={(el) => {
                      inputRefs.current[peca.id!] = el;
                    }}
                    min="0"
                    step={1}
                    value={currentInputValue} 
                    onInput={(e) => handleInputChange(peca.id!, e)}
                    onBlur={(e) => handleOnBlur(peca.id!, e)}
                    className="form-control text-center mx-auto"
                    style={{ width: "80px" }}
                  />
                </td>
                <td className="text-end align-middle pe-3">
                  R${" "}
                  {(peca.preco * qtdPecaNoCarrinho).toLocaleString("pt-BR", {
                    minimumFractionDigits: 2,
                    maximumFractionDigits: 2,
                    useGrouping: true,
                  })}
                </td>
                <td className="text-center align-middle">
                  <button
                    onClick={() => tratarRemocao(peca.id!)}
                    className="btn btn-danger btn-sm"
                    type="button"
                  >
                    Remover
                  </button>
                </td>
              </tr>
            );
          })}
        </tbody>
        <tfoot>
          <tr>
            <td className="ps-3 fw-bold" colSpan={4}>
              Total do Carrinho
            </td>
            <td className="text-end align-middle pe-3 fw-bold" colSpan={1}>
              R${" "}
              {pecasDoCarrinho
                .reduce((total, itemCarrinho) => {
                  const pecaOriginal = pecas.find(
                    (p) => p.id === itemCarrinho.idPeca
                  );
                  return (
                    total +
                    (pecaOriginal
                      ? pecaOriginal.preco * itemCarrinho.quantidade
                      : 0)
                  );
                }, 0)
                .toLocaleString("pt-BR", {
                  minimumFractionDigits: 2,
                  maximumFractionDigits: 2,
                  useGrouping: true,
                })}
            </td>
            <td></td>
          </tr>
        </tfoot>
      </table>
    </div>
  );
};
export default TabelaDePecasDoCarrinho;