import { Link } from "react-router-dom";
import Peca from "../interfaces/Peca";
import { PecaCarrinho, useCarrinhoStore } from "../store/carrinhoStore";
import { useState, useEffect, useRef, ReactNode } from "react";

interface Props {
  pecas: Peca[];
  showTotalPrice?: boolean;
  showOnlyCartItems?: boolean;
  tratarDesfavoritar?: (id: number) => void;
}

const TabelaDePecasDoCarrinho = ({
  pecas,
  showTotalPrice = true,
  showOnlyCartItems = true,
  tratarDesfavoritar,
}: Props) => {
  const carrinhoItens = useCarrinhoStore((state) => state.itens);
  const setQuantidadeAction = useCarrinhoStore((state) => state.setQuantidade);
  const removerPecaAction = useCarrinhoStore((state) => state.removerPeca);
  const adicionarPecaAction = useCarrinhoStore((state) => state.adicionarItem);

  const imagemPadrao = new URL(
    "../assets/images/pecaplaceholder.jpg",
    import.meta.url
  ).href;

  const inputRefs = useRef<{ [key: number]: HTMLInputElement | null }>({});

  const [localInputValues, setLocalInputValues] = useState<{
    [key: number]: string;
  }>({});

  useEffect(() => {
    const newLocalValues: { [key: number]: string } = {};
    carrinhoItens.forEach((item) => {
      newLocalValues[item.idPeca] = item.quantidade.toString();
    });
    setLocalInputValues(newLocalValues);
  }, [carrinhoItens]);

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
    const itemNoCarrinho = carrinhoItens.find((item) => item.idPeca === pecaId);
    const quantidadeAtualNoCarrinho = itemNoCarrinho?.quantidade || 0;
    const pecaOriginal = pecas.find((p) => p.id === pecaId);

    if (value === "") {
    } else if (!isNaN(parsedValue) && parsedValue >= 0) {
      if (quantidadeAtualNoCarrinho === 0 && parsedValue > 0 && pecaOriginal) {
        adicionarPecaAction(pecaOriginal.id!);
        setQuantidadeAction(pecaId, parsedValue);
      } else if (parsedValue === 0) {
        removerPecaAction(pecaId);
      } else {
        setQuantidadeAction(pecaId, parsedValue);
      }
    }
  };

  const handleOnBlur = (
    pecaId: number,
    e: React.FocusEvent<HTMLInputElement>
  ) => {
    const value = e.target.value;
    let finalValue = parseInt(value, 10);

    const quantidadeInicial =
      carrinhoItens.find((item) => item.idPeca === pecaId)?.quantidade || 0;

    if (isNaN(finalValue) || finalValue < 0) {
      setLocalInputValues((prev) => ({
        ...prev,
        [pecaId]: quantidadeInicial.toString(), // Reverte para o valor válido anterior
      }));
      setTimeout(() => {
        if (inputRefs.current[pecaId]) {
          inputRefs.current[pecaId]?.focus();
        }
      }, 0);
    } else {
      const quantidadeInicial =
        carrinhoItens.find((item) => item.idPeca === pecaId)?.quantidade || 0;
      if (finalValue === 0 && quantidadeInicial > 0) {
        removerPecaAction(pecaId);
      } else if (finalValue !== quantidadeInicial) {
        setQuantidadeAction(pecaId, finalValue);
      }
      setLocalInputValues((prev) => ({
        ...prev,
        [pecaId]: finalValue.toString(),
      }));
    }
  };

  const handleRemocaoPeca = (id: number) => {
    removerPecaAction(id);
  };

  const pecasARenderizar = showOnlyCartItems
    ? pecas.filter((p) => carrinhoItens.some((item) => item.idPeca === p.id))
    : pecas;

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
            <th className="text-center align-middle">Ação</th>
          </tr>
        </thead>
        <tbody>
          {pecasARenderizar.map((peca) => {
            const itemNoCarrinho = carrinhoItens.find(
              (item) => item.idPeca === peca.id
            );
            const qtdPecaNoCarrinho = itemNoCarrinho?.quantidade || 0;

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
                  {qtdPecaNoCarrinho > 0 && (
                    <button
                      onClick={() => handleRemocaoPeca(peca.id!)}
                      className="btn btn-danger btn-sm me-2"
                      type="button"
                    >
                      Remover do Carrinho
                    </button>
                  )}
                  {qtdPecaNoCarrinho <= 0 && (
                    <button
                      onClick={() => adicionarPecaAction(peca.id!)}
                      className="btn btn-primary btn-sm me-2"
                      type="button"
                    >
                      Adicionar ao Carrinho
                    </button>
                  )}
                  {tratarDesfavoritar !== undefined && (
                    <button
                      onClick={() => tratarDesfavoritar(peca.id!)}
                      className="btn btn-danger btn-sm me-2"
                      type="button"
                    >
                      Desfavoritar
                    </button>
                  )}
                </td>
              </tr>
            );
          })}
        </tbody>

        {showTotalPrice && (
          <tfoot>
            <tr>
              <td className="ps-3 fw-bold" colSpan={4}>
                Total do Carrinho
              </td>
              <td className="text-end align-middle pe-3 fw-bold" colSpan={1}>
                R${" "}
                {carrinhoItens
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
        )}
      </table>
    </div>
  );
};

export default TabelaDePecasDoCarrinho;
